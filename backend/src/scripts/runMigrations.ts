import { connect, runMigrationFiles } from '../lib/pgdb'

async function run() {
  try {
    await connect()
    await runMigrationFiles()
    console.log('Migrations applied')
    process.exit(0)
  } catch (err) {
    console.error('Migration failed', err)
    process.exit(1)
  }
}

run()
