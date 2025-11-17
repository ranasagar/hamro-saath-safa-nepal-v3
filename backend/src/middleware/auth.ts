import { Request, Response, NextFunction } from 'express'

// Simple dev auth middleware: if Authorization header present, attach dummy user.
export function devAuth(req: Request, res: Response, next: NextFunction) {
  const auth = req.header('authorization') || req.header('Authorization')
  if (!auth) {
    // For now allow anonymous in dev but set user to guest
    ;(req as any).user = { id: 'guest', role: 'anonymous' }
    return next()
  }
  // In a real app validate JWT; for dev/test, extract userId from "Bearer userId" format
  const token = auth.replace(/^Bearer\s+/i, '').trim()
  const userId = token || 'user-1'
  ;(req as any).user = { id: userId, role: 'user' }
  return next()
}
