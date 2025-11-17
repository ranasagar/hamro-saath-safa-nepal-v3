import request from 'supertest'
import { expect } from 'chai'
import app from '../../src/index.ts'
import { listLedger, createIssue, createEventForIssue } from '../../src/models/inMemoryStore.ts'
import { resetIdempotencyStore } from '../../src/middleware/idempotency.ts'

describe('Contract: Event complete idempotency', () => {
  beforeEach(() => {
    // clear idempotency store between tests
    resetIdempotencyStore()
  })

  it('returns same response and does not double-award when same Idempotency-Key is used twice', async () => {
    const issueRes = await request(app).post('/api/issues').send({ title: 'Idem test', description: 'desc', category: 'litter' })
    expect(issueRes.status).to.equal(201)
    const issueId = issueRes.body.id

    const eventRes = await request(app).post(`/api/issues/${issueId}/events`).send({ startAt: new Date().toISOString(), volunteerGoal: 3 })
    expect(eventRes.status).to.equal(201)
    const eventId = eventRes.body.id

    const beforeLedger = listLedger().length

    const key = 'test-idem-key-123'
    const res1 = await request(app).post(`/api/events/${eventId}/complete`).set('Idempotency-Key', key).send({ afterPhoto: 'after.jpg' })
    expect(res1.status).to.equal(200)
    expect(res1.body).to.have.property('status', 'completed')

    const midLedger = listLedger().length
    expect(midLedger).to.be.greaterThan(beforeLedger)

    const res2 = await request(app).post(`/api/events/${eventId}/complete`).set('Idempotency-Key', key).send({ afterPhoto: 'after.jpg' })
    expect(res2.status).to.equal(200)
    expect(res2.body).to.deep.equal(res1.body)

    const afterLedger = listLedger().length
    expect(afterLedger).to.equal(midLedger)
  })
})
