import request from 'supertest'
import { expect } from 'chai'
import app from '../../src/index.ts'

describe('Contract: POST /api/issues - Report an issue (E1-S1)', () => {
  it('creates an issue with multipart form data and returns 201 with issue object', async () => {
    const res = await request(app)
      .post('/api/issues')
      .field('title', 'Overflowing trash bin on Main St')
      .field('description', 'Large pile of garbage near the market')
      .field('category', 'litter')
      .field('location', JSON.stringify({ lat: 27.7, lng: 85.3 }))
      .set('Accept', 'application/json')

    expect(res.status).to.equal(201)
    expect(res.body).to.have.property('success', true)
    expect(res.body.data).to.have.property('id')
    expect(res.body.data).to.have.property('title', 'Overflowing trash bin on Main St')
    expect(res.body.data).to.have.property('status', 'open')
    expect(res.body.data).to.have.property('category', 'litter')
    expect(res.body.data).to.have.property('location')
    expect(res.body.data.location).to.have.property('lat', 27.7)
    expect(res.body.data.location).to.have.property('lng', 85.3)
    expect(res.body.data).to.have.property('authorId')
    expect(res.body.data).to.have.property('createdAt')
    expect(res.body.data).to.have.property('imageUrls')
    expect(res.body).to.have.property('timestamp')
  })

  it('requires title, description, and category', async () => {
    const res = await request(app)
      .post('/api/issues')
      .send({
        description: 'Missing title and category',
        location: { lat: 27.7, lng: 85.3 }
      })
      .set('Accept', 'application/json')

    expect(res.status).to.equal(400)
    expect(res.body).to.have.property('success', false)
    expect(res.body.error).to.have.property('code', 'MISSING_REQUIRED_FIELDS')
  })

  it('accepts optional ward and location fields', async () => {
    const res = await request(app)
      .post('/api/issues')
      .send({
        title: 'Blocked drainage in Kathmandu',
        description: 'Water is not draining properly',
        category: 'blocked_drainage',
        location: { lat: 27.7059, lng: 85.3261 },
        ward: 'Ward-5'
      })
      .set('Accept', 'application/json')

    expect(res.status).to.equal(201)
    expect(res.body.data).to.have.property('ward', 'Ward-5')
    expect(res.body.data.location).to.have.property('lat', 27.7059)
  })

  it('validates location must be valid JSON', async () => {
    const res = await request(app)
      .post('/api/issues')
      .send({
        title: 'Test',
        description: 'Test',
        category: 'litter',
        location: 'invalid json'
      })
      .set('Accept', 'application/json')

    expect(res.status).to.equal(400)
    expect(res.body.error).to.have.property('code', 'INVALID_LOCATION')
  })
})

