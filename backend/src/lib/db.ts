// Use createRequire to load optional native dependency in ESM environments
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
let Database: any
try {
  Database = require('better-sqlite3')
} catch (e) {
  // will throw later if DB is actually used
  Database = null
}
const filename = process.env.SQLITE_FILE || (process.env.NODE_ENV === 'test' ? ':memory:' : 'dev.sqlite')
if (!Database) {
  throw new Error('better-sqlite3 is required when USE_DB=true; set USE_DB=false or install better-sqlite3')
}
const db = new Database(filename)

// run simple migrations
db.exec(`
CREATE TABLE IF NOT EXISTS ledger_transactions (
  txId TEXT PRIMARY KEY,
  userId TEXT NOT NULL,
  amount INTEGER NOT NULL,
  type TEXT NOT NULL,
  status TEXT NOT NULL,
  createdAt TEXT NOT NULL,
  metadata TEXT
);

CREATE TABLE IF NOT EXISTS idempotency_keys (
  key TEXT PRIMARY KEY,
  status INTEGER,
  body TEXT,
  createdAt TEXT
);
`)

export default db

export function withTransaction<T>(fn: () => T): T {
  const tran = db.transaction(fn)
  return tran()
}
