import request from 'supertest'
import { expect } from 'chai'
import app from '../../src/index.ts'

/**
 * Integration test: Core Action Loop
 * Tests the complete happy path: Report Issue → List Issues → Create Event → RSVP → Complete Event → Redeem Reward
 * 
 * User Stories Covered:
 * - E1-S1: Report issue with photo
 * - E1-S2: List and view issues
 * - E1-S3: Create/RSVP event for issue
 * - E1-S4: Mark event solved with after-photo and reward
 * - E1-S5: Points ledger & profile display
 */
describe('Integration: Core Action Loop (E1-S1 through E1-S5)', () => {
  let issueId: string
  let eventId: string
  let userId = 'test-hero-001'
  let organizerId = 'test-organizer-001'

  // ============ E1-S1: Report an issue ============
  it('E1-S1: Should create an issue with photo and location', async () => {
    const res = await request(app)
      .post('/api/issues')
      .set('Authorization', `Bearer ${userId}`)
      .send({
        title: 'Graffiti on public wall',
        description: 'Red spray paint on the community center wall',
        category: 'graffiti',
        location: { lat: 27.7059, lng: 85.3261 },
        ward: 'Ward-5'
      })

    expect(res.status).to.equal(201)
    expect(res.body).to.have.property('success', true)
    expect(res.body.data).to.have.property('id')
    expect(res.body.data).to.have.property('status', 'open')
    expect(res.body.data).to.have.property('authorId')
    
    issueId = res.body.data.id
  })

  // ============ E1-S2: List and view issues ============
  it('E1-S2: Should list issues and return paginated results', async () => {
    const res = await request(app)
      .get('/api/issues')
      .query({ ward: 'Ward-5', status: 'open' })

    expect(res.status).to.equal(200)
    expect(res.body).to.have.property('success', true)
    expect(res.body.data).to.have.property('items')
    expect(res.body.data.items).to.be.an('array')
    expect(res.body.data.items.length).to.be.greaterThan(0)
  })

  it('E1-S2: Should retrieve specific issue by ID', async () => {
    const res = await request(app)
      .get(`/api/issues/${issueId}`)

    expect(res.status).to.equal(200)
    expect(res.body).to.have.property('success', true)
    expect(res.body.data).to.have.property('id', issueId)
    expect(res.body.data).to.have.property('title', 'Graffiti on public wall')
  })

  // ============ E1-S3: Create and RSVP for event ============
  it('E1-S3: Should create an event for the issue', async () => {
    const startTime = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days from now
    
    const res = await request(app)
      .post(`/api/issues/${issueId}/events`)
      .set('Authorization', `Bearer ${organizerId}`)
      .send({
        startAt: startTime,
        volunteerGoal: 10,
        notes: 'Bring gloves and cleaning supplies'
      })

    expect(res.status).to.equal(201)
    expect(res.body).to.have.property('success', true)
    expect(res.body.data).to.have.property('id')
    expect(res.body.data).to.have.property('issueId', issueId)
    expect(res.body.data).to.have.property('organizerId', organizerId)
    expect(res.body.data).to.have.property('status', 'scheduled')
    expect(res.body.data).to.have.property('rsvpCount', 0)

    eventId = res.body.data.id
  })

  it('E1-S3: Should RSVP to event and increment participant count', async () => {
    const res = await request(app)
      .post(`/api/events/${eventId}/rsvp`)
      .set('Authorization', `Bearer ${userId}`)

    expect(res.status).to.equal(200)
    expect(res.body).to.have.property('success', true)
    expect(res.body.data).to.have.property('rsvpCount', 1)
    expect(res.body.data.rsvpList).to.include(userId)
  })

  it('E1-S3: Should handle multiple RSVPs', async () => {
    const additionalUser = 'test-hero-002'
    
    const res = await request(app)
      .post(`/api/events/${eventId}/rsvp`)
      .set('Authorization', `Bearer ${additionalUser}`)

    expect(res.status).to.equal(200)
    expect(res.body.data).to.have.property('rsvpCount', 2)
    expect(res.body.data.rsvpList).to.include(additionalUser)
  })

  // ============ E1-S4: Complete event and award points ============
  it('E1-S4: Should complete event with after-photo and award SP to participants', async () => {
    const res = await request(app)
      .post(`/api/events/${eventId}/complete`)
      .set('Authorization', `Bearer ${organizerId}`)
      .set('Idempotency-Key', `complete-event-${eventId}-001`)
      .send({
        afterPhoto: 'after-cleanup-photo.jpg',
        notes: 'Successfully cleaned the wall. Thank you all!'
      })

    expect(res.status).to.equal(200)
    expect(res.body).to.have.property('success', true)
    expect(res.body.data).to.have.property('event')
    expect(res.body.data.event).to.have.property('status', 'completed')
    expect(res.body.data.event).to.have.property('afterPhoto', 'after-cleanup-photo.jpg')
    
    // Check awards
    expect(res.body.data).to.have.property('awards')
    expect(res.body.data.awards).to.be.an('array')
    expect(res.body.data.awards.length).to.equal(2) // 2 participants RSVPed
    
    res.body.data.awards.forEach((award: any) => {
      expect(award).to.have.property('userId')
      expect(award).to.have.property('points', 50)
      expect(award).to.have.property('txId')
    })
  })

  it('E1-S4: Should be idempotent - replaying with same key returns same result', async () => {
    const res1 = await request(app)
      .post(`/api/events/${eventId}/complete`)
      .set('Authorization', `Bearer ${organizerId}`)
      .set('Idempotency-Key', `complete-event-${eventId}-002`)
      .send({
        afterPhoto: 'after-cleanup-photo.jpg'
      })

    expect(res1.status).to.equal(200)
    const awards1 = res1.body.data.awards

    const res2 = await request(app)
      .post(`/api/events/${eventId}/complete`)
      .set('Authorization', `Bearer ${organizerId}`)
      .set('Idempotency-Key', `complete-event-${eventId}-002`)
      .send({
        afterPhoto: 'after-cleanup-photo.jpg'
      })

    expect(res2.status).to.equal(200)
    expect(res2.body.data.awards).to.deep.equal(awards1)
  })

  // ============ E1-S5: Points ledger & profile display ============
  it('E1-S5: Should retrieve user profile with total SP', async () => {
    const res = await request(app)
      .get(`/api/users/${userId}`)

    expect(res.status).to.equal(200)
    expect(res.body).to.have.property('success', true)
    expect(res.body.data).to.have.property('id', userId)
    expect(res.body.data).to.have.property('displayName')
    expect(res.body.data).to.have.property('totalSP')
    expect(res.body.data).to.have.property('profileVisibility')
    expect(res.body.data).to.have.property('createdAt')
  })

  it('E1-S5: Should retrieve user points balance and transaction history', async () => {
    const res = await request(app)
      .get(`/api/users/${userId}/points`)

    expect(res.status).to.equal(200)
    expect(res.body).to.have.property('success', true)
    expect(res.body.data).to.have.property('userId', userId)
    expect(res.body.data).to.have.property('balance')
    expect(res.body.data.balance).to.equal(50) // 50 SP awarded for event completion
    expect(res.body.data).to.have.property('transactions')
    expect(res.body.data.transactions).to.be.an('array')
    expect(res.body.data.transactions.length).to.be.greaterThan(0)

    // Verify transaction details
    res.body.data.transactions.forEach((tx: any) => {
      expect(tx).to.have.property('txId')
      expect(tx).to.have.property('userId', userId)
      expect(tx).to.have.property('amount')
      expect(tx).to.have.property('type')
      expect(tx).to.have.property('status')
      expect(tx).to.have.property('createdAt')
      expect(tx).to.have.property('metadata')
    })
  })

  it('E1-S5: Should update user profile', async () => {
    const res = await request(app)
      .put(`/api/users/${userId}`)
      .send({
        displayName: 'Safa Hero 001',
        bio: 'Environmental enthusiast',
        ward: 'Ward-5'
      })

    expect(res.status).to.equal(200)
    expect(res.body).to.have.property('success', true)
    expect(res.body.data).to.have.property('displayName', 'Safa Hero 001')
    expect(res.body.data).to.have.property('bio', 'Environmental enthusiast')
  })

  // ============ Rewards Redemption ============
  it('E1-S5: Should list available rewards', async () => {
    const res = await request(app)
      .get('/api/rewards')

    expect(res.status).to.equal(200)
    expect(res.body).to.have.property('success', true)
    expect(res.body.data).to.be.an('array')
    expect(res.body.data.length).to.be.greaterThan(0)
  })

  it('Should redeem reward with sufficient points', async () => {
    // First get the reward
    const rewardsRes = await request(app).get('/api/rewards')
    const reward = rewardsRes.body.data[0]

    // Make sure user has enough points
    expect(50).to.be.greaterThanOrEqual(reward.costSP) // User has 50 SP

    const res = await request(app)
      .post(`/api/rewards/${reward.id}/redeem`)
      .set('Authorization', `Bearer ${userId}`)
      .set('Idempotency-Key', `redeem-${reward.id}-${userId}-001`)

    expect(res.status).to.equal(200)
    expect(res.body).to.have.property('success', true)
    expect(res.body.data).to.have.property('receipt')
    expect(res.body.data.receipt).to.have.property('id')
    expect(res.body.data.receipt).to.have.property('status', 'completed')
    expect(res.body.data.receipt).to.have.property('receiptUrl')
  })

  it('Should reject redemption with insufficient points', async () => {
    const insufficientUser = 'test-hero-no-points'
    
    // This user has no points
    const res = await request(app)
      .post('/api/rewards/reward-1/redeem')
      .set('Authorization', `Bearer ${insufficientUser}`)

    expect(res.status).to.equal(400)
    expect(res.body).to.have.property('success', false)
    expect(res.body.error).to.have.property('code', 'INSUFFICIENT_POINTS')
    expect(res.body.error.details).to.have.property('balance', 0)
  })
})
