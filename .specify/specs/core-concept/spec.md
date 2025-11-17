# Hamro Saath — Feature Specification (Core Concept)

Overview
--------
"Hamro Saath, Safa Nepal" is a gamified civic engagement platform that turns everyday civic actions into a rewarding, social experience. Users report issues, organize clean-ups, log micro-actions, earn "Safa Points" (SP), and redeem SP at a marketplace. The platform emphasizes community (ward) competition, visible impact (maps, before/after photos), and easy participation.

This specification targets building a full‑fledged, production-ready application (mobile-first web app with native-ready architecture and long-term maintainability). The documents in `.specify/` and the project plan assume the product will be developed for real-world usage, partner integrations, and operational support.

Goals
-----
- Deliver a minimal viable Core Action Loop: report → map → organize event → complete → reward.
- Drive repeat engagement through micro-actions, leaderboards, badges, and local rewards.
- Provide admin tooling for moderation, approvals, and feature flags.

Personas
--------
- Citizen (Safa Hero): Reports issues, joins events, logs micro-actions, redeems rewards.
- Organizer: Creates and runs clean-up events tied to reported issues.
- Local Business Partner: Offers rewards and vouchers in the marketplace.
- Admin/Moderator: Reviews submissions, approves transactions, manages content.

Top-Level Epics (already in constitution)
----------------------------------------
1. Core Action Loop (Gamification Engine)
2. Community & Social Engagement
3. Rewards Economy
4. Micro-Engagements & Education
5. Administration & Governance

User Stories (prioritized for MVP)
---------------------------------

Epic: Core Action Loop (Priority: P1)
- US1: Report an issue (photo, category, auto geolocation) — acceptance: issue created, image stored, appears in list and on map.
- US2: View issues on interactive map & list — acceptance: filters by ward/status, clustered markers, canonical IDs match list.
- US3: Create event for issue (date/time, volunteer goal) — acceptance: event created and linked to issue, RSVPs tracked.
- US4: Mark event solved with after-photo and award SP to participants — acceptance: after-photo stored, points distributed idempotently, ledger entry created.

Example request/response payloads
---------------------------------
These examples are intentionally minimal; include them in the OpenAPI contract when creating schemas.

US1 — Create Issue (multipart form with image)
Request (multipart/form-data):
```
{ 
	title: "Overflowing trash bin on Main St",
	description: "Large pile of garbage near the market",
	category: "litter",
	location: "{ \"lat\":27.7000, \"lng\":85.3333 }",
	images: [file1.jpg]
}
```
Response 201:
```
{
	"id": "issue_abc123",
	"title": "Overflowing trash bin on Main St",
	"status": "open",
	"images": ["https://cdn.example.com/images/issue_abc123/1.jpg"],
	"location": { "lat": 27.7, "lng": 85.3333 }
}
```

US2 — List / Map Issues
Request (GET query):
```
GET /api/issues?ward=Ward-5&status=open&limit=50
```
Response 200 (paginated):
```
{
	"items": [ { "id":"issue_abc123", "title":"...", "location":{...} } ],
	"nextCursor": "eyJjdXJzb3IiOiIxMjMifQ=="
}
```

US3 — Create Event for Issue
Request (JSON):
```
POST /api/issues/issue_abc123/events
{
	"startAt": "2025-12-01T09:00:00+05:45",
	"volunteerGoal": 10,
	"notes": "Bring gloves and bags"
}
```
Response 201:
```
{
	"id": "event_evt987",
	"issueId": "issue_abc123",
	"startAt": "2025-12-01T09:00:00+05:45",
	"volunteerGoal": 10,
	"rsvps": 0
}
```

US4 — Complete Event and Award SP
Request (JSON) — event completion by organizer or moderator:
```
POST /api/events/event_evt987/complete
{
	"afterPhoto": "file_after.jpg",
	"notes": "Area cleared"
}
```
Response 200 (award snapshot):
```
{
	"eventId": "event_evt987",
	"status": "completed",
	"awards": [ { "userId": "user_42", "points": 50, "txId": "tx_001" } ]
}
```

Notes on example payloads:
- Use RFC3339 timestamps with timezone offsets for all datetimes.
- Images may be uploaded as multipart/form-data for create/complete endpoints; the API should return canonical CDN URLs.
- Include an idempotency key header or allow client-supplied request id when needed for critical operations (event complete, reward redeem).

Epic: Community & Social Engagement (Priority: P2)
- US5: Live activity feed — acceptance: real-time ordered feed with timestamps and links.
- US6: Leaderboards (individual and ward) — acceptance: ranks updated within 60s of SP changes, top 3 highlighted.
- US7: Forum basics — acceptance: threads, comments, up/downvotes, images/video embedding.

Epic: Rewards Economy (Priority: P2)
- US8: Rewards marketplace listing and redemption — acceptance: atomic redemption, digital receipt stored.
- US9: Combined payments via QR when SP insufficient — acceptance: hybrid payment recorded and receipt generated.

Epic: Micro-Engagements & Education (Priority: P3)
- US10: Log micro-actions (daily cap) — acceptance: cap enforced, micro-actions grant small SP.
- US11: Civic Sense Hub + quiz — acceptance: quiz grades and awards bonus SP.

Epic: Administration & Governance (Priority: P3)
- US12: Admin dashboard with metrics — acceptance: key metrics visible, filters for date/ward.
- US13: Approval workflows for cash/redemptions — acceptance: admin can approve/reject and trigger point issuance or refunds.

Non-functional Requirements
---------------------------
- Mobile-first, responsive UI. Prioritize low-bandwidth behavior (image compression, progressive upload).
- Image storage and CDN for serving before/after photos.
- Idempotent financial operations and ledger for auditability.
- Privacy: store only necessary personal data; enable users to choose public/private for profile fields.

Success Metrics
---------------
- Daily active users (DAU) and 7d retention.
- Reports resolved per week.
- SP issued vs redeemed ratio.
- Partner redemptions and merchant participation growth.

MVP Scope & Acceptance
----------------------
MVP focuses on Core Action Loop: US1–US4 plus basic SP ledger and profile display. Acceptance defined per story above; E2E smoke test must cover full loop.

Security & Moderation
---------------------
- Image verification policies for high-value redemptions; manual review queue.
- Rate limits on micro-action logs and report submissions.

Accessibility
-------------
- Follow WCAG AA for core flows (report, event create, redemption). Simple ARIA labels and keyboard navigation.

Delivery Plan (next steps)
-------------------------
1. Convert prioritized user stories into tasks (done for Core Action Loop).
2. Create OpenAPI contract for reporting/events/rewards (see openapi.yaml).
3. Scaffold backend models and frontend pages for MVP stories.
4. Setup CI and a demo environment for user testing.


Content Quality Checklist
-------------------------
Use this checklist to validate the written spec before work begins:

- [ ] Clear goal statement and scope (who, what, why).
- [ ] Per-user-story acceptance criteria (pass/fail binary and data assertions).
- [ ] API surface sketched (OpenAPI path present or noted as TODO).
- [ ] Data models listed (entities and key fields) and mapping to storage needs.
- [ ] Security/privacy constraints documented for PII and media.
- [ ] Testable examples included where behavior may be ambiguous (example payloads or edge cases).


Execution Status
----------------
Use this section to record current implementation progress and impediments. Update on every planning sync.

- Implementation status: (Not started / In progress / Done)
- Last updated: YYYY-MM-DD
- Owner(s): @handle(s) or team name
- Related branches / PRs: (link/refs)
- CI status: (passing / failing / not configured) — include link to latest run
- Tests status: (unit/contract/integration) — counts or links
- Infra status: (IaC staged / IaC ready / Manual infra) — notes
- Blockers / Risks: short bullet list


Requirement Completeness Checkpoint
----------------------------------
Before moving a speck to development, run through the following table and mark each story's readiness.

| Story | Spec Clear? | OpenAPI? | Tests Defined? | Implementation Ready? | Notes |
|-------|:-----------:|:-------:|:--------------:|:---------------------:|-------|
| US1 Report an issue | [ ] | [ ] | [ ] | [ ] | |
| US2 View issues on map | [ ] | [ ] | [ ] | [ ] | |
| US3 Create event for issue | [ ] | [ ] | [ ] | [ ] | |
| US4 Mark event solved & award SP | [ ] | [ ] | [ ] | [ ] | |

-
SP Ledger Model
----------------
We model Safa Points (SP) as an append-only ledger of transactions. The ledger must be auditable, idempotent for issuance/redemption operations, and support pending vs settled semantics for reversible operations.

Transaction shape (LedgerTransaction):
- txId (string): globally unique transaction id (recommend prefix tx_ and UUIDv4). Provided by the server or client when desired for idempotency.
- userId (string): owner of the transaction.
- amount (integer): positive for awards, negative for redemptions.
- type (award|redeem|adjust): semantic type of transaction.
- status (pending|settled|reversed): pending for operations awaiting confirmation, settled when final, reversed for rollbacks.
- createdAt (RFC3339 string): when transaction was created.
- metadata (object): optional free-form data (sourceEventId, rewardId, note).

Behavioral rules
- Idempotency: Mutating operations that affect SP (event completion awarding, reward redemption) MUST accept an Idempotency-Key header and persist the mapping from idempotency key to resulting txId. Replays with the same Idempotency-Key must return the same result without creating duplicate ledger entries.
- Atomicity: Awarding SP to multiple users as part of a single event should be executed in a transaction; if any sub-operation fails, the system should record a reversal transaction and surface the failure for manual reconciliation.
- Pending vs Settled: External interactions (e.g., partner redemption via QR/cash) may create pending transactions until external confirmation. Pending amounts do not count toward available balance until settled.
- Reversals: To reverse an issued transaction, create a reversal transaction with type 'adjust' and negative amount and set the original transaction status to 'reversed' with a link to the reversal txId in metadata.

APIs & examples
- Example award transaction (server-generated txId):

```
POST /api/events/event_evt987/complete
Headers: { Idempotency-Key: "complete-event-event_evt987-20251117-xyz" }
Response 200:
{
	"eventId": "event_evt987",
	"status": "completed",
	"awards": [ { "userId": "user_42", "points": 50, "txId": "tx_001" } ]
}
```

- Example ledger entry (in spec):
```
{
	"txId": "tx_001",
	"userId": "user_42",
	"amount": 50,
	"type": "award",
	"status": "settled",
	"createdAt": "2025-11-17T12:34:56+05:45",
	"metadata": { "eventId": "event_evt987" }
}
```

- Acceptance criteria for ledger spec:
- A documented transaction shape in the spec (`LedgerTransaction`).
- Examples for award and reversal flows.
- Unit tests that validate balance computation, pending/settled behavior, and idempotent create semantics.

Checklist meaning:
- Spec Clear? — Acceptance criteria and edge cases written.
- OpenAPI? — API contract path and schemas exist or are scoped as a task.
- Tests Defined? — Unit/contract tests have been listed or a test ticket created.
- Implementation Ready? — No infra or design blockers; estimated and assigned.

