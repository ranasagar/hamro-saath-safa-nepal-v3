import request from 'supertest'
import { expect } from 'chai'
import app from '../../src/index.ts'
import { listLedger } from '../../src/models/inMemoryStore.ts'
import { resetIdempotencyStore } from '../../src/middleware/idempotency.ts'

describe('Contract: Reward redeem idempotency', () => {
  beforeEach(() => resetIdempotencyStore())

  it('does not double-debit ledger when same Idempotency-Key used twice', async () => {
    const before = listLedger().length
    // redeem existing reward id reward-1
    const key = 'redeem-idem-xyz'
    const res1 = await request(app).post('/api/rewards/reward-1/redeem').set('Idempotency-Key', key).send({ userId: 'user-10', spUsed: 50 })
    expect(res1.status).to.equal(200)

    const mid = listLedger().length
    expect(mid).to.be.greaterThan(before)

    const res2 = await request(app).post('/api/rewards/reward-1/redeem').set('Idempotency-Key', key).send({ userId: 'user-10', spUsed: 50 })
    expect(res2.status).to.equal(200)
    expect(res2.body).to.deep.equal(res1.body)

    const after = listLedger().length
    expect(after).to.equal(mid)
  })
})
