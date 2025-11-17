import express, { Request, Response } from 'express'
import { 
  getUser, 
  updateUserProfile, 
  getUserBalance, 
  getOrCreateUser,
  listLedger 
} from '../models/inMemoryStore.ts'
import type { UserProfile, LedgerTransaction } from '../types/index.ts'

const router = express.Router()

/**
 * GET /api/users/:userId
 * Get user profile
 * 
 * Response: 200 OK with UserProfile
 */
router.get('/:userId', (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const user = getOrCreateUser(userId)

    res.json({
      success: true,
      data: user,
      timestamp: new Date().toISOString()
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: error.message
      }
    })
  }
})

/**
 * PUT /api/users/:userId
 * Update user profile
 * 
 * Request body (all optional):
 * - displayName?: string
 * - avatar?: string
 * - ward?: string
 * - bio?: string
 * - profileVisibility?: 'public' | 'private'
 * 
 * Response: 200 OK with updated UserProfile
 */
router.put('/:userId', (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const updates = req.body

    const user = updateUserProfile(userId, updates)

    res.json({
      success: true,
      data: user,
      timestamp: new Date().toISOString()
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: error.message
      }
    })
  }
})

/**
 * GET /api/users/:userId/points
 * Get user points balance and transaction history
 * 
 * Query params:
 * - limit?: number (default 50, max 100)
 * 
 * Response: 200 OK with balance and ledger transactions
 */
router.get('/:userId/points', (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const { limit } = req.query

    const balance = getUserBalance(userId)
    
    // Get transaction history
    const maxLimit = Math.min(parseInt((limit as string) || '50'), 100)
    const allTxs = listLedger() as LedgerTransaction[]
    const userTxs = allTxs
      .filter(t => t.userId === userId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, maxLimit)

    res.json({
      success: true,
      data: {
        userId,
        balance,
        transactions: userTxs,
        transactionCount: userTxs.length
      },
      timestamp: new Date().toISOString()
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: error.message
      }
    })
  }
})

export default router
