/**
 * Core Action Loop Components
 * Implements E1-S1 through E1-S5 for Hamro Saath
 */

import React, { useState, useEffect, useRef } from 'react'
import { createIssue, listIssues, createEvent, rsvpEvent, completeEvent, listRewards, redeemReward, getUserPoints } from '../api'

// ============ E1-S1: Report Issue Form ============
interface ReportIssueFormProps {
  userId: string
  onSuccess?: (issue: any) => void
  onError?: (error: string) => void
}

export const ReportIssueForm: React.FC<ReportIssueFormProps> = ({ userId, onSuccess, onError }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('litter')
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [ward, setWard] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    // Get user's location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        })
      },
      (err) => {
        console.error('Geolocation error:', err)
        setError('Could not get your location. Please enable location permissions.')
      }
    )
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!location) {
      setError('Location is required')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await createIssue({
        title,
        description,
        category,
        location,
        ward: ward || undefined,
        userId
      })

      const data = response as any
      if (data.success) {
        onSuccess?.(data.data)
        setTitle('')
        setDescription('')
        setWard('')
      } else {
        throw new Error(data.error?.message || 'Failed to create issue')
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown error'
      setError(msg)
      onError?.(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-green-700">Report an Issue</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="e.g., Overflowing trash bin"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description *
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={3}
            placeholder="Describe the issue in detail"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category *
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="litter">Litter</option>
              <option value="blocked_drainage">Blocked Drainage</option>
              <option value="graffiti">Graffiti</option>
              <option value="broken_bench">Broken Bench</option>
              <option value="construction_debris">Construction Debris</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ward
            </label>
            <input
              type="text"
              value={ward}
              onChange={(e) => setWard(e.target.value)}
              placeholder="e.g., Ward-5"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        {location && (
          <div className="p-2 bg-blue-50 rounded-md text-sm text-blue-700">
            📍 Location: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
          </div>
        )}
      </div>

      <div className="mt-6 flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-green-600 text-white py-2 rounded-md hover:bg-green-700 disabled:bg-gray-400 transition"
        >
          {loading ? 'Submitting...' : 'Report Issue'}
        </button>
      </div>
    </form>
  )
}

// ============ E1-S2: Issues List View ============
interface IssuesListProps {
  userId: string
  onSelectIssue?: (issue: any) => void
}

export const IssuesList: React.FC<IssuesListProps> = ({ userId, onSelectIssue }) => {
  const [issues, setIssues] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filters, setFilters] = useState({ ward: '', status: 'open' })

  useEffect(() => {
    loadIssues()
  }, [filters])

  const loadIssues = async () => {
    setLoading(true)
    try {
      const response = await listIssues({
        ward: filters.ward || undefined,
        status: filters.status || undefined,
        limit: 50
      })
      const data = response as any
      if (data.success) {
        setIssues(data.data.items)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load issues')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-green-700">Issues</h2>

      {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">{error}</div>}

      <div className="mb-4 grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Ward</label>
          <input
            type="text"
            value={filters.ward}
            onChange={(e) => setFilters({ ...filters, ward: e.target.value })}
            placeholder="Filter by ward"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8 text-gray-500">Loading issues...</div>
      ) : issues.length === 0 ? (
        <div className="text-center py-8 text-gray-500">No issues found</div>
      ) : (
        <div className="space-y-3">
          {issues.map((issue: any) => (
            <div
              key={issue.id}
              onClick={() => onSelectIssue?.(issue)}
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900">{issue.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{issue.description}</p>
                  <div className="mt-2 flex gap-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full capitalize">
                      {issue.category}
                    </span>
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full capitalize">
                      {issue.status}
                    </span>
                  </div>
                </div>
                <div className="text-sm text-gray-500">{issue.ward}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ============ E1-S3: Event Creation & RSVP ============
interface EventCreationProps {
  issueId: string
  organizerId: string
  onSuccess?: (event: any) => void
  onError?: (error: string) => void
}

export const EventCreation: React.FC<EventCreationProps> = ({
  issueId,
  organizerId,
  onSuccess,
  onError
}) => {
  const [startAt, setStartAt] = useState('')
  const [endAt, setEndAt] = useState('')
  const [volunteerGoal, setVolunteerGoal] = useState('10')
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await createEvent(issueId, {
        startAt: new Date(startAt).toISOString(),
        endAt: endAt ? new Date(endAt).toISOString() : undefined,
        volunteerGoal: parseInt(volunteerGoal),
        notes: notes || undefined,
        organizerId
      })

      const data = response as any
      if (data.success) {
        onSuccess?.(data.data)
        setStartAt('')
        setEndAt('')
        setVolunteerGoal('10')
        setNotes('')
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to create event'
      setError(msg)
      onError?.(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-green-700">Create Event</h2>

      {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">{error}</div>}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Start Date & Time *
          </label>
          <input
            type="datetime-local"
            value={startAt}
            onChange={(e) => setStartAt(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            End Date & Time
          </label>
          <input
            type="datetime-local"
            value={endAt}
            onChange={(e) => setEndAt(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Volunteer Goal *
          </label>
          <input
            type="number"
            value={volunteerGoal}
            onChange={(e) => setVolunteerGoal(e.target.value)}
            min="1"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Notes
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={2}
            placeholder="Any additional details for participants"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-6 w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 disabled:bg-gray-400 transition"
      >
        {loading ? 'Creating...' : 'Create Event'}
      </button>
    </form>
  )
}

// ============ E1-S5: User Points Display ============
interface UserPointsDisplayProps {
  userId: string
}

export const UserPointsDisplay: React.FC<UserPointsDisplayProps> = ({ userId }) => {
  const [balance, setBalance] = useState(0)
  const [transactions, setTransactions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadPoints()
  }, [userId])

  const loadPoints = async () => {
    try {
      const response = await getUserPoints(userId, 10)
      const data = response as any
      if (data.success) {
        setBalance(data.data.balance)
        setTransactions(data.data.transactions)
      }
    } catch (err) {
      console.error('Failed to load points:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-green-700">Safa Points</h2>

      {loading ? (
        <div className="text-center py-8 text-gray-500">Loading...</div>
      ) : (
        <>
          <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border-2 border-green-300">
            <div className="text-4xl font-bold text-green-700">{balance}</div>
            <div className="text-gray-600">Available Points</div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-900">Recent Transactions</h3>
            {transactions.length === 0 ? (
              <div className="text-center py-8 text-gray-500">No transactions yet</div>
            ) : (
              <div className="space-y-2">
                {transactions.map((tx: any) => (
                  <div key={tx.txId} className="p-3 bg-gray-50 rounded-md flex justify-between items-center">
                    <div>
                      <div className="font-medium text-gray-900">
                        {tx.type === 'award' ? '🎉' : '💳'} {tx.metadata?.reason || tx.type}
                      </div>
                      <div className="text-sm text-gray-600">
                        {new Date(tx.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <div className={`font-bold ${tx.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {tx.amount > 0 ? '+' : ''}{tx.amount}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
