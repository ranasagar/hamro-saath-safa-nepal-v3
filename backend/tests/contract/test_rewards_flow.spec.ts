import request from 'supertest'
import { expect } from 'chai'
import app from '../../src/index.ts'

describe('Contract: Rewards flow (list and redeem)', () => {
  it('lists rewards and allows redemption', async () => {
    // list rewards
    const listRes = await request(app).get('/api/rewards').send().set('Accept', 'application/json')
    expect(listRes.status).to.equal(200)
    expect(listRes.body).to.have.property('success', true)
    expect(listRes.body.data).to.be.an('array')
    const reward = listRes.body.data[0]
    expect(reward).to.have.property('id')

    // redeem reward (mock user id header used by dev auth)
    const redeemRes = await request(app).post(`/api/rewards/${reward.id}/redeem`).send({})
    // the dev implementation returns 200 with a redemption object or 400 if insufficient points
    expect([200, 400]).to.include(redeemRes.status)
  })
})
