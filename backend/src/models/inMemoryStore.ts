import { v4 as uuidv4 } from 'uuid'
import { getLedgerInstance, getAllTransactions } from './ledger.ts'
import { createTransactionsWithIdempotency as fileCreate, getAllLedgerRows as getAllLedgerRowsFile } from './ledgerFile.ts'
import { createTransactionsWithIdempotency as sqliteCreate, getAllLedgerRows as getAllLedgerRowsSqlite } from './ledgerDb.ts'
import * as ledgerPg from './ledgerPg.ts'
import type { Issue, Event, Reward, LedgerTransaction, UserProfile } from '../types/index.ts'

const issues: Issue[] = []
const events: Event[] = []
const users: Map<string, UserProfile> = new Map()
const ledgerInstance = getLedgerInstance()
const rewards: Reward[] = [
  { 
    id: 'reward-1', 
    title: '10 NPR Mobile Topup', 
    costSP: 100, 
    cashPrice: 0.5,
    partner: 'NTC',
    createdAt: new Date().toISOString()
  },
  { 
    id: 'reward-2', 
    title: '5 NPR Mobile Topup', 
    costSP: 50, 
    cashPrice: 0.25,
    partner: 'NTC',
    createdAt: new Date().toISOString()
  }
]

export function createIssue(payload: {
  title: string
  description: string
  category: string
  imageUrls: string[]
  location: { lat: number; lng: number }
  ward?: string
  authorId: string
}): Issue {
  const item: Issue = {
    id: uuidv4(),
    status: 'open',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    title: payload.title,
    description: payload.description,
    category: payload.category as any,
    imageUrls: payload.imageUrls,
    location: payload.location,
    ward: payload.ward,
    authorId: payload.authorId
  }
  issues.push(item)
  return item
}

export function listIssues(filters?: { 
  ward?: string
  status?: string
  category?: string
  limit?: number
  cursor?: string
}): { items: Issue[]; nextCursor?: string } {
  let filtered = [...issues]
  
  if (filters?.ward) filtered = filtered.filter(i => i.ward === filters.ward)
  if (filters?.status) filtered = filtered.filter(i => i.status === filters.status)
  if (filters?.category) filtered = filtered.filter(i => i.category === filters.category)
  
  // Sort by createdAt descending
  filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  
  const limit = filters?.limit || 50
  const items = filtered.slice(0, limit)
  
  return {
    items,
    nextCursor: filtered.length > limit ? Buffer.from(JSON.stringify({ offset: limit })).toString('base64') : undefined
  }
}

export function getIssue(id: string): Issue | undefined {
  return issues.find(i => i.id === id)
}

export function updateIssue(id: string, updates: Partial<Issue>): Issue | undefined {
  const issue = getIssue(id)
  if (!issue) return undefined
  const updated = { ...issue, ...updates, updatedAt: new Date().toISOString() }
  const idx = issues.indexOf(issue)
  issues[idx] = updated
  return updated
}

export function createEventForIssue(issueId: string, payload: {
  organizerId: string
  startAt: string
  endAt?: string
  volunteerGoal: number
  notes?: string
}): Event {
  const ev: Event = {
    id: uuidv4(),
    issueId,
    organizerId: payload.organizerId,
    startAt: payload.startAt,
    endAt: payload.endAt,
    volunteerGoal: payload.volunteerGoal,
    notes: payload.notes,
    rsvpCount: 0,
    rsvpList: [],
    status: 'scheduled',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
  events.push(ev)
  return ev
}

export function getEvent(id: string): Event | undefined {
  return events.find(e => e.id === id)
}

export function listEvents(filters?: { issueId?: string; status?: string }): Event[] {
  let filtered = [...events]
  if (filters?.issueId) filtered = filtered.filter(e => e.issueId === filters.issueId)
  if (filters?.status) filtered = filtered.filter(e => e.status === filters.status)
  return filtered
}

export function rsvpEvent(id: string, userId: string): Event | undefined {
  const e = getEvent(id)
  if (!e) return undefined
  if (!e.rsvpList.includes(userId)) {
    e.rsvpList.push(userId)
    e.rsvpCount = e.rsvpList.length
    e.updatedAt = new Date().toISOString()
  }
  return e
}

export function completeEvent(id: string, afterPhoto: string, organizerId: string, idempotencyKey?: string): { 
  event: Event
  awards: Array<{ userId: string; points: number; txId: string }>
} {
  const e = getEvent(id)
  if (!e) throw new Error('event not found')
  if (e.status === 'completed') {
    // Return cached awards for idempotency (in real app would look up by idempotency key)
    return {
      event: e,
      awards: e.rsvpList.map(userId => ({
        userId,
        points: 50,
        txId: `tx_${id}_${userId}`
      }))
    }
  }

  e.afterPhoto = afterPhoto
  e.status = 'completed'
  e.updatedAt = new Date().toISOString()

  // Award points to all RSVP participants
  const awards = e.rsvpList.map(userId => {
    const tx: LedgerTransaction = {
      txId: `${id}-${userId}-${Date.now()}`,
      userId,
      amount: 50,
      type: 'award',
      status: 'settled',
      createdAt: new Date().toISOString(),
      metadata: { 
        eventId: id,
        reason: 'event_completion',
        organizer: organizerId
      }
    }

    if (process.env.USE_DB === 'true') {
      if (process.env.USE_PG === 'true') {
        void ledgerPg.createTransactionsWithIdempotency([tx])
      } else {
        sqliteCreate([tx])
      }
    } else {
      ledgerInstance.createTransaction(tx)
    }

    return { userId, points: 50, txId: tx.txId }
  })

  return { event: e, awards }
}

// ============ User Profile ============
export function getOrCreateUser(userId: string): UserProfile {
  let user = users.get(userId)
  if (!user) {
    user = {
      id: userId,
      displayName: `User ${userId.slice(0, 8)}`,
      profileVisibility: 'public',
      totalSP: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    users.set(userId, user)
  }
  return user
}

export function getUser(userId: string): UserProfile | undefined {
  return users.get(userId)
}

export function updateUserProfile(userId: string, updates: Partial<UserProfile>): UserProfile {
  const user = getOrCreateUser(userId)
  const updated = { ...user, ...updates, updatedAt: new Date().toISOString() }
  users.set(userId, updated)
  return updated
}

export function getUserBalance(userId: string): number {
  const txs = getAllTransactions().filter((t: LedgerTransaction) => t.userId === userId)
  return txs.reduce((sum: number, t: LedgerTransaction) => (t.status === 'settled' ? sum + t.amount : sum), 0)
}

// ============ Rewards & Redemption ============
export function listRewards(): Reward[] { 
  return [...rewards].sort((a, b) => a.costSP - b.costSP)
}

export function getReward(id: string): Reward | undefined { 
  return rewards.find(r => r.id === id) 
}

export function redeemReward(userId: string, rewardId: string, spUsed: number) {
  const reward = getReward(rewardId)
  if (!reward) throw new Error('reward not found')
  
  const balance = getUserBalance(userId)
  if (balance < spUsed) throw new Error('insufficient points')

  const redemptionId = uuidv4()
  const tx: LedgerTransaction = { 
    txId: redemptionId, 
    userId, 
    amount: -Math.abs(spUsed), 
    type: 'redeem', 
    status: 'settled', 
    createdAt: new Date().toISOString(), 
    metadata: { 
      reason: 'reward_redemption',
      rewardId,
      rewardTitle: reward.title
    } 
  }

  if (process.env.USE_DB === 'true') {
    if (process.env.USE_PG === 'true') {
      void ledgerPg.createTransactionsWithIdempotency([tx])
    } else {
      sqliteCreate([tx])
    }
  } else {
    ledgerInstance.createTransaction(tx)
  }

  return {
    id: redemptionId,
    userId,
    rewardId,
    spUsed,
    cashPaid: 0,
    status: 'completed',
    receiptUrl: `receipt:///${redemptionId}`,
    createdAt: new Date().toISOString()
  }
}

export function listLedger() {
  if (process.env.USE_DB === 'true') {
    if (process.env.USE_PG === 'true') {
      // Postgres path returns a promise; callers should use ledgerPg.getAllLedgerRows directly in async contexts
      throw new Error('listLedger(): Postgres-backed ledger returns async results. Call ledgerPg.getAllLedgerRows() directly.')
    }
    return getAllLedgerRowsSqlite()
  }
  return getAllTransactions()
}
