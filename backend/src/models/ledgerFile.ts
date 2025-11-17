import fs from 'fs'
import path from 'path'

const dataDir = process.env.DATA_DIR || path.join(process.cwd(), '.data')
const filePath = path.join(dataDir, 'ledger_store.json')

function ensureFile() {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true })
  if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, JSON.stringify({ ledger: [], idempotency: {} }), 'utf8')
}

export interface LedgerRow {
  txId: string
  userId: string
  amount: number
  type: string
  status: string
  createdAt: string
  metadata?: any
}

function readStore(): { ledger: LedgerRow[]; idempotency: Record<string, { status: number; body: any; createdAt: string }> } {
  ensureFile()
  try {
    const raw = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(raw)
  } catch (e) {
    return { ledger: [], idempotency: {} }
  }
}

function writeStore(store: { ledger: LedgerRow[]; idempotency: Record<string, { status: number; body: any; createdAt: string }> }) {
  // atomic write: write to temp then rename
  const tmp = `${filePath}.tmp`
  fs.writeFileSync(tmp, JSON.stringify(store), 'utf8')
  fs.renameSync(tmp, filePath)
}

export function createTransactionsWithIdempotency(rows: LedgerRow[], idempotencyKey?: string, responseBody?: any) {
  const store = readStore()
  if (idempotencyKey) {
    const existing = store.idempotency[idempotencyKey]
    if (existing) {
      return existing.body
    }
  }

  // append ledger rows
  for (const r of rows) store.ledger.push(r)

  if (idempotencyKey) {
    store.idempotency[idempotencyKey] = { status: 200, body: responseBody ?? { ok: true }, createdAt: new Date().toISOString() }
  }

  writeStore(store)
  return responseBody
}

export function getAllLedgerRows() {
  const store = readStore()
  return store.ledger
}

export function resetLedgerFile() {
  ensureFile()
  writeStore({ ledger: [], idempotency: {} })
}
