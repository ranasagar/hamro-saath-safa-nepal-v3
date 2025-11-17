import db, { withTransaction } from '../lib/db.ts'

export interface LedgerRow {
  txId: string
  userId: string
  amount: number
  type: string
  status: string
  createdAt: string
  metadata?: any
}

export function createTransactionsWithIdempotency(rows: LedgerRow[], idempotencyKey?: string, responseBody?: any) {
  return withTransaction(() => {
    if (idempotencyKey) {
      const existing = db.prepare('SELECT body FROM idempotency_keys WHERE key = ?').get(idempotencyKey)
      if (existing && existing.body) {
        try { return JSON.parse(existing.body) } catch { return existing.body }
      }
    }

    const insertStmt = db.prepare('INSERT INTO ledger_transactions (txId, userId, amount, type, status, createdAt, metadata) VALUES (?, ?, ?, ?, ?, ?, ?)')
    for (const r of rows) {
      insertStmt.run(r.txId, r.userId, r.amount, r.type, r.status, r.createdAt, r.metadata ? JSON.stringify(r.metadata) : null)
    }

    if (idempotencyKey) {
      const bodyStr = responseBody ? JSON.stringify(responseBody) : JSON.stringify({ ok: true })
      db.prepare('INSERT INTO idempotency_keys (key, status, body, createdAt) VALUES (?, ?, ?, ?)').run(idempotencyKey, 200, bodyStr, new Date().toISOString())
      try { return JSON.parse(bodyStr) } catch { return bodyStr }
    }

    return null
  })()
}

export function getAllLedgerRows() {
  return db.prepare('SELECT * FROM ledger_transactions ORDER BY createdAt').all()
}

export function resetLedgerDb() {
  db.prepare('DELETE FROM ledger_transactions').run()
  db.prepare('DELETE FROM idempotency_keys').run()
}
