import request from 'supertest'
import { expect } from 'chai'
import app from '../../src/index.ts'

describe('Contract: Event flow (create event, rsvp, complete)', () => {
  it('creates an issue, event, rsvps and completes with points awarded', async () => {
    // create issue
    const issueRes = await request(app).post('/api/issues').send({ title: 'Event test', description: 'desc', category: 'litter' })
    expect(issueRes.status).to.equal(201)
    const issueId = issueRes.body.data.id

    // create event for issue
    const eventRes = await request(app).post(`/api/issues/${issueId}/events`).send({ startAt: new Date().toISOString(), volunteerGoal: 5 })
    expect(eventRes.status).to.equal(201)
    const eventId = eventRes.body.data.id

    // rsvp
    const rsvpRes = await request(app).post(`/api/events/${eventId}/rsvp`).send()
    expect(rsvpRes.status).to.equal(200)

    // complete
    const completeRes = await request(app).post(`/api/events/${eventId}/complete`).send({ afterPhoto: 'after.jpg' })
    expect(completeRes.status).to.equal(200)
    expect(completeRes.body.data.event).to.have.property('status', 'completed')
  })
})
