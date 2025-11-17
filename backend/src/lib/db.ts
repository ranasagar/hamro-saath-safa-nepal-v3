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

export { getDb }

function getDb() {
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

  return db
}

// Lazy initialization - only create DB when actually accessed
let dbInstance: any = null
const db: any = new Proxy({}, {
  get(target, prop) {
    if (!dbInstance) {
      dbInstance = getDb()
    }
    return dbInstance[prop]
  }
})

export default db

export function withTransaction<T>(fn: () => T): T {
  if (!dbInstance) {
    dbInstance = getDb()
  }
  const tran = dbInstance.transaction(fn)
  return tran()
}
