# Data Model — Core Entities

This file describes the main entities, their fields, and relationships for the MVP Core Action Loop and supporting features.

User
- id: uuid
- name: string
- email: string (nullable if social login)
- avatarUrl: string
- wardId: uuid
- role: enum (user, organizer, admin)
- createdAt, updatedAt

Ward
- id: uuid
- name: string
- cityId: uuid

Issue
- id: uuid
- reporterId: uuid -> User
- title: string
- description: text
- category: enum (litter, broken, signage, disturbance, other)
- imageUrls: array[string]
- location: { lat: number, lng: number }
- wardId: uuid
- status: enum (reported, in_progress, solved)
- createdAt, updatedAt

Event
- id: uuid
- issueId: uuid -> Issue
- organizerId: uuid -> User
- startAt: datetime
- endAt: datetime (optional)
- volunteerGoal: integer
- rsvpCount: integer
- afterPhotoUrls: array[string]
- status: enum (scheduled, completed, cancelled)
- createdAt, updatedAt

PointsLedger (SP transactions)
- id: uuid
- userId: uuid
- amount: integer (positive for credit, negative for debit)
- reason: enum (report_reward, event_participation, micro_action, redemption, admin_adjustment)
- referenceId: uuid (optional: eventId, issueId, rewardId)
- createdAt

Reward
- id: uuid
- partnerId: uuid
- title: string
- description: text
- costSP: integer
- cashPrice: decimal (nullable)
- availableQuantity: integer
- createdAt, updatedAt

Transaction / Redemption
- id: uuid
- userId: uuid
- rewardId: uuid
- spUsed: integer
- cashPaid: decimal
- status: enum (pending, approved, rejected, completed)
- receiptUrl: string
- createdAt, updatedAt

Badge
- id: uuid
- key: string
- title: string
- description: text
- iconUrl: string

MicroAction
- id: uuid
- userId: uuid
- type: enum (pick_litter, recycle, report_small_issue)
- points: integer
- createdAt

ForumPost
- id: uuid
- authorId: uuid
- title: string
- body: text (supports markdown)
- mediaUrls: array[string]
- upvotes: integer
- downvotes: integer
- createdAt, updatedAt

Indexes & Constraints (suggested)
- Index Issue.location (geospatial) for map queries.
- Unique constraint on Transaction.receiptUrl or transaction reference for audit.
- Foreign key constraints for all relationships.

Storage
- Use object storage (S3/MinIO) for images with signed URLs and CDN fronting.
