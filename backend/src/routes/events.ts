import express, { Request, Response } from 'express'
import multer from 'multer'
import { 
  createEventForIssue, 
  getEvent, 
  rsvpEvent, 
  completeEvent, 
  getIssue,
  getOrCreateUser,
  listEvents 
} from '../models/inMemoryStore.ts'
import idempotencyMiddleware from '../middleware/idempotency.ts'
import type { Event } from '../types/index.ts'

const router = express.Router()
const upload = multer()

/**
 * POST /api/issues/:issueId/events
 * Create an event for an issue
 * 
 * Request body:
 * - startAt: RFC3339 timestamp (required)
 * - endAt?: RFC3339 timestamp
 * - volunteerGoal: number (required)
 * - notes?: string
 * 
 * Response: 201 Created with Event object
 */
router.post('/issues/:issueId/events', (req: Request, res: Response) => {
  try {
    const { issueId } = req.params
    const { startAt, endAt, volunteerGoal, notes } = req.body
    const organizerId = (req as any).user?.id || 'anonymous'

    // Validate issue exists
    const issue = getIssue(issueId)
    if (!issue) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'ISSUE_NOT_FOUND',
          message: 'Issue not found'
        }
      })
    }

    if (!startAt || typeof volunteerGoal !== 'number') {
      return res.status(400).json({
        success: false,
        error: {
          code: 'MISSING_REQUIRED_FIELDS',
          message: 'startAt and volunteerGoal are required'
        }
      })
    }

    // Ensure user exists
    getOrCreateUser(organizerId)

    const event: Event = createEventForIssue(issueId, {
      organizerId,
      startAt,
      endAt,
      volunteerGoal,
      notes
    })

    res.status(201).json({
      success: true,
      data: event,
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
 * GET /api/events/:eventId
 * Get event details
 * 
 * Response: 200 OK with Event, or 404 Not Found
 */
router.get('/events/:eventId', (req: Request, res: Response) => {
  try {
    const { eventId } = req.params
    const event = getEvent(eventId)

    if (!event) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Event not found'
        }
      })
    }

    res.json({
      success: true,
      data: event,
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
 * POST /api/events/:eventId/rsvp
 * RSVP to an event
 * 
 * Response: 200 OK with updated Event
 */
router.post('/events/:eventId/rsvp', (req: Request, res: Response) => {
  try {
    const { eventId } = req.params
    const userId = (req as any).user?.id || 'anonymous'

    const event = rsvpEvent(eventId, userId)
    if (!event) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Event not found'
        }
      })
    }

    res.json({
      success: true,
      data: event,
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
 * POST /api/events/:eventId/complete
 * Mark event as completed and award SP to participants
 * 
 * Headers:
 * - Idempotency-Key: unique key for idempotent replay (optional)
 * 
 * Request body:
 * - afterPhoto: string (file path or URL)
 * - notes?: string
 * 
 * Response: 200 OK with event completion data and awards
 */
router.post(
  '/events/:eventId/complete',
  idempotencyMiddleware(),
  upload.single('afterPhoto'),
  (req: Request, res: Response) => {
    try {
      const { eventId } = req.params
      const { afterPhoto: photoFromBody, notes } = req.body
      const organizerId = (req as any).user?.id || 'anonymous'

      const afterPhoto = photoFromBody || (req.file?.originalname || 'after-photo')

      if (!afterPhoto) {
        return res.status(400).json({
          success: false,
          error: {
            code: 'MISSING_REQUIRED_FIELDS',
            message: 'afterPhoto is required'
          }
        })
      }

      const result = completeEvent(eventId, afterPhoto, organizerId, (req as any).idempotencyKey)

      // Update event notes if provided
      if (notes) {
        result.event.notes = notes
        result.event.updatedAt = new Date().toISOString()
      }

      res.json({
        success: true,
        data: {
          event: result.event,
          awards: result.awards
        },
        timestamp: new Date().toISOString()
      })
    } catch (error: any) {
      if (error.message === 'event not found') {
        return res.status(404).json({
          success: false,
          error: {
            code: 'NOT_FOUND',
            message: 'Event not found'
          }
        })
      }

      res.status(500).json({
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: error.message
        }
      })
    }
  }
)

export default router
