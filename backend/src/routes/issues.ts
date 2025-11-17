import express, { Request, Response } from 'express'
import multer from 'multer'
import { createIssue, listIssues, getIssue, getOrCreateUser } from '../models/inMemoryStore.ts'
import type { Issue } from '../types/index.ts'

const router = express.Router()
const upload = multer()

/**
 * POST /api/issues
 * Create a new issue with optional image uploads
 * 
 * Request (multipart/form-data):
 * - title: string
 * - description: string
 * - category: string (litter, blocked_drainage, graffiti, broken_bench, construction_debris, other)
 * - location: JSON string { lat, lng }
 * - ward?: string
 * - images: File[] (optional)
 * 
 * Response: 201 Created with Issue object
 */
router.post('/', upload.array('images'), (req: Request, res: Response) => {
  try {
    const { title, description, category, location, ward } = req.body
    const userId = (req as any).user?.id || 'anonymous'
    
    if (!title || !description || !category) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'MISSING_REQUIRED_FIELDS',
          message: 'title, description, and category are required'
        }
      })
    }

    const files = (req.files as any[]) || []
    const imageUrls = files.map((f: any) => f.originalname || f.filename)
    
    let loc: { lat: number; lng: number } | undefined
    try {
      loc = location ? (typeof location === 'string' ? JSON.parse(location) : location) : undefined
    } catch (e) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'INVALID_LOCATION',
          message: 'location must be valid JSON with lat and lng'
        }
      })
    }

    // Ensure user exists
    getOrCreateUser(userId)

    const issue: Issue = createIssue({
      title,
      description,
      category,
      imageUrls,
      location: loc || { lat: 0, lng: 0 },
      ward,
      authorId: userId
    })

    res.status(201).json({
      success: true,
      data: issue,
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
 * GET /api/issues
 * List issues with optional filtering and pagination
 * 
 * Query params:
 * - ward?: string (filter by ward)
 * - status?: string (filter by status: open, in_progress, resolved)
 * - category?: string (filter by category)
 * - limit?: number (default 50)
 * - cursor?: string (for pagination)
 * 
 * Response: 200 OK with paginated list
 */
router.get('/', (req: Request, res: Response) => {
  try {
    const { ward, status, category, limit, cursor } = req.query
    
    const result = listIssues({
      ward: ward as string,
      status: status as string,
      category: category as string,
      limit: limit ? parseInt(limit as string) : 50,
      cursor: cursor as string
    })

    res.json({
      success: true,
      data: result,
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
 * GET /api/issues/:id
 * Get a specific issue by ID
 * 
 * Response: 200 OK with Issue, or 404 Not Found
 */
router.get('/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const issue = getIssue(id)
    
    if (!issue) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Issue not found'
        }
      })
    }

    res.json({
      success: true,
      data: issue,
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
