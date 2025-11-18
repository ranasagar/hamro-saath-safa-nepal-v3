/**
 * API client hook for Core Action Loop
 * Handles all HTTP requests to backend API
 */

const API_BASE = (typeof import.meta.env !== 'undefined' && import.meta.env.VITE_API_URL) 
  ? import.meta.env.VITE_API_URL 
  : 'http://localhost:4000'

export interface APIOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  headers?: Record<string, string>
  body?: any
  userId?: string
  idempotencyKey?: string
}

export async function apiCall<T>(endpoint: string, options: APIOptions = {}): Promise<T> {
  const {
    method = 'GET',
    headers = {},
    body,
    userId,
    idempotencyKey
  } = options

  const finalHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    ...headers
  }

  if (userId) {
    finalHeaders['Authorization'] = `Bearer ${userId}`
  }

  if (idempotencyKey) {
    finalHeaders['Idempotency-Key'] = idempotencyKey
  }

  const config: RequestInit = {
    method,
    headers: finalHeaders
  }

  if (body && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
    config.body = JSON.stringify(body)
  }

  const response = await fetch(`${API_BASE}${endpoint}`, config)

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.error?.message || `API error: ${response.status}`)
  }

  return response.json() as Promise<T>
}

// ============ Issues API ============
export async function createIssue(data: {
  title: string
  description: string
  category: string
  location: { lat: number; lng: number }
  ward?: string
  userId: string
}) {
  return apiCall('/issues', {
    method: 'POST',
    body: data,
    userId: data.userId
  })
}

export async function listIssues(filters?: {
  ward?: string
  status?: string
  category?: string
  limit?: number
  cursor?: string
}) {
  const params = new URLSearchParams()
  if (filters?.ward) params.append('ward', filters.ward)
  if (filters?.status) params.append('status', filters.status)
  if (filters?.category) params.append('category', filters.category)
  if (filters?.limit) params.append('limit', filters.limit.toString())
  if (filters?.cursor) params.append('cursor', filters.cursor)

  return apiCall(`/issues?${params}`)
}

export async function getIssue(id: string) {
  return apiCall(`/issues/${id}`)
}

// ============ Events API ============
export async function createEvent(issueId: string, data: {
  startAt: string
  endAt?: string
  volunteerGoal: number
  notes?: string
  organizerId: string
}) {
  return apiCall(`/issues/${issueId}/events`, {
    method: 'POST',
    body: data,
    userId: data.organizerId
  })
}

export async function getEvent(id: string) {
  return apiCall(`/events/${id}`)
}

export async function rsvpEvent(eventId: string, userId: string) {
  return apiCall(`/events/${eventId}/rsvp`, {
    method: 'POST',
    userId,
    body: {}
  })
}

export async function completeEvent(eventId: string, data: {
  afterPhoto: string
  notes?: string
  organizerId: string
}, idempotencyKey?: string) {
  return apiCall(`/events/${eventId}/complete`, {
    method: 'POST',
    body: data,
    userId: data.organizerId,
    idempotencyKey
  })
}

// ============ Users API ============
export async function getUser(userId: string) {
  return apiCall(`/users/${userId}`)
}

export async function updateUserProfile(userId: string, data: any) {
  return apiCall(`/users/${userId}`, {
    method: 'PUT',
    body: data
  })
}

export async function getUserPoints(userId: string, limit?: number) {
  const endpoint = `/users/${userId}/points${limit ? `?limit=${limit}` : ''}`
  return apiCall(endpoint)
}

// ============ Rewards API ============
export async function listRewards() {
  return apiCall('/rewards')
}

export async function getReward(id: string) {
  return apiCall(`/rewards/${id}`)
}

export async function redeemReward(rewardId: string, userId: string, idempotencyKey?: string) {
  return apiCall(`/rewards/${rewardId}/redeem`, {
    method: 'POST',
    userId,
    body: {},
    idempotencyKey
  })
}
