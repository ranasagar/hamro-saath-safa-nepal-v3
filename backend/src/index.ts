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

app.get('/_health', (req, res) => res.json({ status: 'ok', now: new Date().toISOString() }))

// Export app for tests and for programmatic use. When not running tests, start the server.
export default app

if (process.env.NODE_ENV !== 'test') {
	const port = process.env.PORT || 4000
	app.listen(port, () => console.log(`Backend dev server listening on http://localhost:${port}`))
}
