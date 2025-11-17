# Acceptance & Test Scenarios — Core Action Loop

E2E Smoke: Report → Event → Complete → Reward
1. User A submits a report with photo and location (POST /api/issues). Expect 201 and stored image.
2. User B views issue on map/list (GET /api/issues) and creates an event for that issue (POST /api/issues/{id}/events).
3. Users RSVP to the event (POST /api/events/{id}/rsvp).
4. Organizer marks event complete with after-photo (POST /api/events/{id}/complete). Verify points distributed and ledger entries created.
5. User redeems a low-cost reward (POST /api/rewards/{id}/redeem) using SP. Verify transaction status completed and receipt available in profile.

Contract Tests
- POST /api/issues: validate required fields, image upload handling, response codes (400 for invalid, 201 for success).
- GET /api/issues: validate pagination, filters, and consistent canonical IDs.
- POST /api/events/{id}/complete: idempotency test (re-submit same completion should not double-credit).

Unit Tests (samples)
- pointsService.creditUser should create a ledger entry and update user balance.
- issue model validation for geolocation and required fields.

Performance/Load
- Map endpoint should return 5000 nearby markers within 1s under normal load.

Security Tests
- Ensure JWT auth required for write endpoints.
- Verify input sanitization on forum posts and report descriptions.
