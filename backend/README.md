Hamro Saath — Minimal backend stub

This folder contains a minimal TypeScript + Express stub implementing core endpoints used by the frontend during early development.

Quick start (from repository root, Windows PowerShell):

```powershell
cd backend
npm install
npm run dev
```

The dev server listens on port 4000 by default and exposes:
- GET  /_health
- POST /api/issues
- GET  /api/issues
- POST /api/issues/:issueId/events
- POST /api/events/:eventId/rsvp
- POST /api/events/:eventId/complete
- GET  /api/rewards
- POST /api/rewards/:rewardId/redeem

Notes:
- This is an in-memory implementation intended for local development and demo only. Data is not persisted.
- To integrate with production services, replace the in-memory store with a DB and implement real auth.
