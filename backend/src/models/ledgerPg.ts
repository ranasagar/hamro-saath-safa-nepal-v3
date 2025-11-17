import { withTransaction } from '../lib/pgdb'
import { Client } from 'pg'

export interface LedgerRow {
  txId: string
  userId: string
  amount: number
  type: string
  status: string
  createdAt: string
  metadata?: any
}

export async function createTransactionsWithIdempotency(rows: LedgerRow[], idempotencyKey?: string, responseBody?: any) {
  return withTransaction(async (client: Client) => {
    if (idempotencyKey) {
      const { rows: existing } = await client.query('SELECT body FROM idempotency_keys WHERE key = $1', [idempotencyKey])
      if (existing && existing.length) {
        return existing[0].body
      }
    }

    const insertTxText = 'INSERT INTO ledger_transactions (txId, userId, amount, type, status, createdAt, metadata) VALUES ($1,$2,$3,$4,$5,$6,$7)'
    for (const r of rows) {
      await client.query(insertTxText, [r.txId, r.userId, r.amount, r.type, r.status, r.createdAt, r.metadata ? JSON.stringify(r.metadata) : null])
    }

    if (idempotencyKey) {
      const bodyVal = responseBody ?? { ok: true }
      await client.query('INSERT INTO idempotency_keys (key, status, body, createdAt) VALUES ($1,$2,$3,$4)', [idempotencyKey, 200, bodyVal, new Date().toISOString()])
      return bodyVal
    }

    return null
  })
}

export async function getAllLedgerRows() {
  // for debugging only
  return await withTransaction(async (client: Client) => {
    const res = await client.query('SELECT * FROM ledger_transactions ORDER BY createdAt')
    return res.rows
  })
}

export async function resetLedgerDb() {
  await withTransaction(async (client: Client) => {
    await client.query('DELETE FROM ledger_transactions')
    await client.query('DELETE FROM idempotency_keys')
  })
}
