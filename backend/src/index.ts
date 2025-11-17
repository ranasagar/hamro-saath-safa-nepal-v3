import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import issuesRouter from './routes/issues.ts'
import eventsRouter from './routes/events.ts'
import rewardsRouter from './routes/rewards.ts'
import usersRouter from './routes/users.ts'
import { devAuth } from './middleware/auth.ts'

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(devAuth)

app.use('/api/issues', issuesRouter)
app.use('/api', eventsRouter)
app.use('/api/rewards', rewardsRouter)
app.use('/api/users', usersRouter)

app.get('/', (req, res) => res.json({ status: 'ok', service: 'hamro-saath-backend', version: '1.0.0' }))
app.get('/_health', (req, res) => res.json({ status: 'ok', now: new Date().toISOString() }))
app.get('/health', (req, res) => res.json({ status: 'ok', now: new Date().toISOString() }))

// Export app for tests and for programmatic use. When not running tests, start the server.
export default app

if (process.env.NODE_ENV !== 'test') {
	const port = parseInt(process.env.PORT || '4000', 10)
	const host = process.env.HOST || '0.0.0.0'
	app.listen(port, host, () => {
		console.log(`Backend server listening on http://${host}:${port}`)
		console.log(`Environment: ${process.env.NODE_ENV || 'development'}`)
		console.log(`Database mode: ${process.env.USE_DB || 'in-memory'}`)
	})
}
