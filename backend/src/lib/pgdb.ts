import { Client } from 'pg'
import fs from 'fs'
import path from 'path'

const connectionString = process.env.DATABASE_URL || process.env.PG_TEST_CONNECTION || 'postgres://postgres:postgres@localhost:5432/hamrosaath'

const client = new Client({ connectionString })
let connected = false

export async function connect() {
  if (connected) return
  await client.connect()
  connected = true
}

export async function runMigrationFiles() {
  const migrationsDir = path.join(process.cwd(), 'backend', 'migrations')
  if (!fs.existsSync(migrationsDir)) return
  const files = fs.readdirSync(migrationsDir).filter(f => f.endsWith('.sql')).sort()
  for (const f of files) {
    const sql = fs.readFileSync(path.join(migrationsDir, f), 'utf8')
    await client.query(sql)
  }
}

export async function withTransaction<T>(fn: (c: Client) => Promise<T>): Promise<T> {
  await connect()
  try {
    await client.query('BEGIN')
    const res = await fn(client)
    await client.query('COMMIT')
    return res
  } catch (err) {
    await client.query('ROLLBACK')
    throw err
  }
}

export default client
