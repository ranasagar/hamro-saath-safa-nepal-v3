import { Request, Response, NextFunction } from 'express'

type StoredResponse = { status: number; body: any }

interface IdempotencyStore {
  get(key: string): Promise<StoredResponse | null>
  set(key: string, value: StoredResponse, ttlMs?: number): Promise<void>
  setIfNotExists(key: string, placeholder: StoredResponse, ttlMs?: number): Promise<boolean>
  reset?(): void
}

class InMemoryIdempotencyStore implements IdempotencyStore {
  private store = new Map<string, StoredResponse>()

  async get(key: string) {
    return this.store.get(key) || null
  }
  async set(key: string, value: StoredResponse) {
    this.store.set(key, value)
  }
  async setIfNotExists(key: string, placeholder: StoredResponse) {
    if (this.store.has(key)) return false
    this.store.set(key, placeholder)
    return true
  }
  reset() { this.store.clear() }
}

let storeInstance: IdempotencyStore | null = null

function getStore(): IdempotencyStore {
  if (storeInstance) return storeInstance
  // If REDIS_URL is provided, attempt to create a Redis-backed store dynamically.
  const redisUrl = process.env.REDIS_URL || process.env.REDIS_HOST
  if (redisUrl) {
    // Lazy-load a Redis-backed implementation to avoid requiring redis in dev if not used.
    try {
      // dynamic import to avoid failing when dependency missing
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const IORedis = require('ioredis')
      const client = new IORedis(redisUrl)

      const redisStore: IdempotencyStore = {
        async get(key: string) {
          const raw = await client.get(key)
          if (!raw) return null
          try { return JSON.parse(raw) } catch { return null }
        },
        async set(key: string, value: StoredResponse, ttlMs = 5 * 60 * 1000) {
          await client.set(key, JSON.stringify(value), 'PX', ttlMs)
        },
        async setIfNotExists(key: string, placeholder: StoredResponse, ttlMs = 2 * 60 * 1000) {
          const res = await client.set(key, JSON.stringify(placeholder), 'PX', ttlMs, 'NX')
          return res === 'OK'
        }
      }
      storeInstance = redisStore
      return storeInstance
    } catch (e) {
      // fallthrough to in-memory if redis client not available
    }
  }
  storeInstance = new InMemoryIdempotencyStore()
  return storeInstance
}

export function resetIdempotencyStore() {
  const s = getStore()
  if (s.reset) s.reset()
}

export default function idempotencyMiddleware(headerName = 'Idempotency-Key', ttlMs = 2 * 60 * 1000) {
  const store = getStore()
  return async (req: Request, res: Response, next: NextFunction) => {
    if (req.method !== 'POST' && req.method !== 'PUT' && req.method !== 'DELETE') return next()
    const key = req.header(headerName)
    if (!key) return next()

    const existing = await store.get(key)
    if (existing) {
      res.status(existing.status)
      return res.json(existing.body)
    }

    // Try to claim the idempotency key (set placeholder) to avoid concurrent processing
    const claimed = await store.setIfNotExists(key, { status: 102, body: { status: 'processing' } }, ttlMs)
    if (!claimed) {
      // Another process is handling or result has been set; try to fetch and return
      const maybe = await store.get(key)
      if (maybe) {
        res.status(maybe.status)
        return res.json(maybe.body)
      }
      // fallback: return 409 to indicate conflict
      return res.status(409).json({ message: 'Request is already being processed' })
    }

    // capture status and body when response is sent
    const origJson = res.json.bind(res)
    let capturedStatus = 200
    const origStatus = res.status.bind(res)
    res.status = (code: number) => {
      capturedStatus = code
      return origStatus(code)
    }
    res.json = (body: any) => {
      // store result but don't await to preserve sync signature
      store.set(key, { status: capturedStatus || res.statusCode || 200, body }, ttlMs).catch(() => {})
      return origJson(body)
    }
    return next()
  }
}
