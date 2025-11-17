import request from 'supertest'
import { expect } from 'chai'
import app from '../../src/index.ts'
import { listLedger } from '../../src/models/inMemoryStore.ts'
import { resetIdempotencyStore } from '../../src/middleware/idempotency.ts'

describe('Contract: Reward redeem idempotency', () => {
  beforeEach(() => resetIdempotencyStore())

  it('does not double-debit ledger when same Idempotency-Key used twice', async () => {
    const userId = 'user-10'
    
    // First, create an event and complete it so user has points
    const issueRes = await request(app).post('/api/issues')
      .set('Authorization', `Bearer ${userId}`)
      .send({ title: 'Test issue', description: 'desc', category: 'litter' })
    expect(issueRes.status).to.equal(201)
    const issueId = issueRes.body.data.id

    const eventRes = await request(app).post(`/api/issues/${issueId}/events`)
      .set('Authorization', `Bearer ${userId}`)
      .send({ startAt: new Date().toISOString(), volunteerGoal: 2 })
    expect(eventRes.status).to.equal(201)
    const eventId = eventRes.body.data.id

    await request(app).post(`/api/events/${eventId}/rsvp`)
      .set('Authorization', `Bearer ${userId}`)
      .send()

    await request(app).post(`/api/events/${eventId}/complete`)
      .set('Authorization', `Bearer ${userId}`)
      .send({ afterPhoto: 'after.jpg' })

    // Now test idempotency
    const before = listLedger().length
    const key = 'redeem-idem-xyz'
    const res1 = await request(app).post('/api/rewards/reward-2/redeem')
      .set('Authorization', `Bearer ${userId}`)
      .set('Idempotency-Key', key)
      .send()
    expect(res1.status).to.equal(200)

    const mid = listLedger().length
    expect(mid).to.be.greaterThan(before)

    const res2 = await request(app).post('/api/rewards/reward-2/redeem')
      .set('Authorization', `Bearer ${userId}`)
      .set('Idempotency-Key', key)
      .send()
    expect(res2.status).to.equal(200)
    expect(res2.body).to.deep.equal(res1.body)

    const after = listLedger().length
    expect(after).to.equal(mid)
  })
})
