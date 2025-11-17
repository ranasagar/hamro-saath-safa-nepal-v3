import express, { Request, Response } from 'express'
import { getReward, redeemReward, listRewards, getOrCreateUser, getUserBalance } from '../models/inMemoryStore.ts'
import idempotencyMiddleware from '../middleware/idempotency.ts'
import type { Reward } from '../types/index.ts'

const router = express.Router()

/**
 * GET /api/rewards
 * List all available rewards
 * 
 * Response: 200 OK with array of Reward objects
 */
router.get('/', (req: Request, res: Response) => {
  try {
    const rewards = listRewards()
    res.json({
      success: true,
      data: rewards,
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
 * GET /api/rewards/:rewardId
 * Get specific reward details
 * 
 * Response: 200 OK with Reward, or 404 Not Found
 */
router.get('/:rewardId', (req: Request, res: Response) => {
  try {
    const { rewardId } = req.params
    const reward = getReward(rewardId)

    if (!reward) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Reward not found'
        }
      })
    }

    res.json({
      success: true,
      data: reward,
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
 * POST /api/rewards/:rewardId/redeem
 * Redeem a reward for SP
 * 
 * Headers:
 * - Idempotency-Key: unique key for idempotent replay (optional)
 * 
 * Response: 200 OK with redemption receipt
 */
router.post('/:rewardId/redeem', idempotencyMiddleware(), (req: Request, res: Response) => {
  try {
    const { rewardId } = req.params
    const userId = (req as any).user?.id || 'anonymous'

    // Ensure user exists
    getOrCreateUser(userId)

    const reward = getReward(rewardId)
    if (!reward) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Reward not found'
        }
      })
    }

    const spUsed = reward.costSP
    const balance = getUserBalance(userId)

    if (balance < spUsed) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'INSUFFICIENT_POINTS',
          message: `Insufficient points. You have ${balance}SP, but need ${spUsed}SP`,
          details: { balance, required: spUsed, shortfall: spUsed - balance }
        }
      })
    }

    const receipt = redeemReward(userId, rewardId, spUsed)

    res.json({
      success: true,
      data: {
        receipt,
        reward
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
