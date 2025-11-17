## Core Action Loop — Tasks

This file breaks down the Core Action Loop epic (report → map → event → complete → reward) into actionable, dependency-ordered tasks. Task IDs are sequential and unique. Tasks are grouped by phase: Setup, Foundational, User Stories, and Polish.

### Checklist legend
- [ ] = not started
- [x] = done
- Task ID format: T###
- P = Parallelizable
- Story labels: US1, US2, US3, US4

---

## Setup

- [ ] T001: Ensure backend test harness and CI are runnable locally and in CI (file: `backend/package.json`, `backend/tsconfig.json`, `.github/workflows/ci.yml`).
- [ ] T002 P US? : Expand OpenAPI schemas for issues/events/rewards and add example request/response in `.specify/specs/core-concept/openapi.yaml` (file: `.specify/specs/core-concept/openapi.yaml`).
- [ ] T003 P : Document the Safa Points (SP) ledger model with example transactions and unit-test skeleton (file: `.specify/specs/core-concept/spec.md`, new test file: `backend/tests/unit/ledger.spec.ts`).

## Foundational (backend core)

- [ ] T004 US1: Implement POST /api/issues to accept multipart/form-data, store images (dev stub), and return 201 with issue id and image URLs (files: `backend/src/routes/issues.ts`, `backend/src/models/inMemoryStore.ts`, tests: `backend/tests/contract/test_issues_post.spec.ts`).
- [ ] T005 US2: Implement GET /api/issues with pagination and filters (ward, status, category) and make response mapping-friendly (files: `backend/src/routes/issues.ts`, tests: `backend/tests/contract/test_issues_list.spec.ts`).
- [ ] T006 US3: Implement POST /api/issues/{id}/events to create events tied to an issue (files: `backend/src/routes/events.ts`, tests: `backend/tests/contract/test_create_event.spec.ts`).
- [ ] T007 US4: Implement POST /api/events/{id}/complete to accept after-photo, mark event completed, and award SP idempotently (files: `backend/src/routes/events.ts`, `backend/src/models/ledger.ts` (new), tests: `backend/tests/contract/test_event_complete.spec.ts`).

## User Stories (frontend + integration)

- [ ] T008 US1 US2: Frontend: Add Issue create form and image preview; wire submission to POST /api/issues (files: `components/CreateThreadModal.tsx`, `pages/PublicHomePage.tsx`).
- [ ] T009 US3: Frontend: Add Event creation UI and RSVP integration; wire to POST /api/issues/{id}/events and POST /api/events/{id}/rsvp (files: `components/OrganizeEventModal.tsx`, `pages/ThreadDetailPage.tsx`).
- [ ] T010 US4: Frontend: Add Complete Event UI (after-photo upload) and handle reward notification (files: `components/CompleteEventModal.tsx`, `pages/ProfilePage.tsx`).

## Polish, testing & ops

- [ ] T011 US1-US4: Add/extend contract tests to cover happy path and idempotency (create issue -> create event -> rsvp -> complete -> award SP) and include double-submit tests for idempotency (files: `backend/tests/contract/test_events_flow.spec.ts`, add `backend/tests/contract/test_event_idempotency.spec.ts`).
- [ ] T012 P : CI: Ensure contract tests run on PRs and coverage is measured/uploaded (files: `.github/workflows/ci.yml`, `.github/workflows/coverage.yml`).
- [ ] T013 P : Image moderation & privacy policy doc and moderation queue stub (files: `.specify/specs/core-concept/spec.md`, `backend/src/middleware/moderation.ts` (new), `backend/src/routes/moderation.ts` (new)).

---

## Execution dependency graph (high-level)

- T001 -> T004, T005, T006, T007, T011, T012
- T002 -> T004, T005, T006, T007, T008, T009, T010
- T003 -> T007, T011
- T004 -> T008
- T006 -> T009
- T007 -> T010, T011

Notes: arrows indicate "must be started/completed before". For example, implement API endpoints (T004-T007) rely on the setup tasks (T001-T003). Frontend tasks depend on the corresponding APIs being available.

## Parallelization plan

- Tasks marked with P are suitable to run in parallel by separate contributors with short syncs:
  - T002 (OpenAPI) can be done while foundational backend work begins — it informs client types.
  - T012 (CI/coverage) can be worked on in parallel with feature work to ensure tests gate merges.
  - T013 (moderation & policy) can proceed independently until integrated into completion flow.

## Notes & acceptance

- Each task above should include a PR with tests targeting the relevant files. Backend endpoints must include OpenAPI schema updates. Contract tests live under `backend/tests/contract/`. Ledger implementation must include unit tests showing balance computation, pending/settled states, and example txIds.

---

Generated: Core Action Loop tasks (13 tasks).
---
description: "Concrete task list for the Core Action Loop feature (report → map → event → resolve → reward)"
---

# Tasks: Core Action Loop

**Input**: `.specify/plans/backlog.json` (Epic E1 stories), `.specify/plans/project-plan.md`, UI mockups (if any)

## Phase 1: Setup (Shared Infrastructure)

- [ ] T001 Initialize project tasks folder and README (`.specify/tasks/README.md`)
- [ ] T002 [P] Add image storage configuration and reference implementation (`backend/src/config/imageStorage.tsx`)
- [ ] T003 [P] Create Points ledger schema and migration (`backend/migrations/0001_points_ledger.sql`)
- [ ] T004 [P] Configure CI job for lint/test (`.github/workflows/ci.yml`)

---

## Phase 2: Foundational (Blocking Prerequisites)

- [ ] T005 Setup database models for issues and events (`backend/src/models/issue.ts`, `backend/src/models/event.ts`)
- [ ] T006 [P] Implement authentication middleware (`backend/src/middleware/auth.ts`)
- [ ] T007 Implement base API routing and error handling (`backend/src/routes/index.ts`)
- [ ] T008 Add image upload API contract and validation (`backend/src/controllers/uploads.ts`)
- [ ] T009 [P] Add basic frontend routes and shells for Report, Map, Event pages (`frontend/src/pages/ReportPage.tsx`, `frontend/src/pages/MapPage.tsx`, `frontend/src/pages/EventCreatePage.tsx`)

---

## Phase 3: User Story US1 — Report issue with photo (Priority: P1) 🎯

Goal: Allow users to report issues with photo, short description, and category in under 30s.

Independent Test: Submit a report with photo and see it returned by the issues list API.

- [ ] T010 [US1] Create Issue model fields: id, authorId, title, description, category, imageUrls, location, createdAt (`backend/src/models/issue.ts`)
- [ ] T011 [US1] Implement `POST /api/issues` endpoint to create an issue with multipart image upload (`backend/src/routes/issues.ts`)
- [ ] T012 [US1] Add frontend Report form with camera/upload, category selector, and quick submit (`frontend/src/components/ReportForm.tsx`)
- [ ] T013 [US1] Add client-side validation and UX for <30s submit (`frontend/src/components/ReportForm.tsx`)
- [ ] T014 [US1] Add contract test for `POST /api/issues` (happy path) (`tests/contract/test_issues_post.spec.ts`)

---

## Phase 4: User Story US2 — List and view issues (Priority: P1)

Goal: Show reported issues on an interactive map and as a list with filters.

Independent Test: Issues created via API appear on map and list with same canonical IDs.

- [ ] T015 [US2] Implement `GET /api/issues` with location filtering and pagination (`backend/src/routes/issues.ts`)
- [ ] T016 [US2] Integrate map component and show clustered markers (`frontend/src/components/IssuesMap.tsx`)
- [ ] T017 [US2] Add issues list UI with link to details (`frontend/src/pages/IssuesListPage.tsx`)
- [ ] T018 [US2] Add integration test verifying issue created in US1 appears in list and on map (`tests/integration/test_issue_appears.spec.ts`)

---

## Phase 5: User Story US3 — Create/RSVP event for issue (Priority: P2)

Goal: Organizers can create events tied to issues, set date/time and volunteer goals; users can RSVP.

Independent Test: Event created with metadata; RSVPs increment counts.

- [ ] T019 [US3] Create Event model: id, issueId, organizerId, startAt, endAt, volunteerGoal, rsvpCount (`backend/src/models/event.ts`)
- [ ] T020 [US3] Implement `POST /api/issues/:id/events` to create an event (`backend/src/routes/events.ts`)
- [ ] T021 [US3] Implement `POST /api/events/:id/rsvp` to RSVP (`backend/src/routes/events.ts`)
- [ ] T022 [US3] Add frontend Event creation and RSVP UI (`frontend/src/components/EventCreate.tsx`, `frontend/src/components/EventCard.tsx`)

---

## Phase 6: User Story US4 — Mark event solved with after-photo and reward (Priority: P2)

Goal: Organizer can upload 'after' photo to mark an event solved and award points to participants.

Independent Test: After-photo stored and participants receive SP; transaction recorded in ledger.

- [ ] T023 [US4] Implement `POST /api/events/:id/complete` to attach after-photo and mark solved (`backend/src/routes/events.ts`)
- [ ] T024 [US4] Implement points distribution service (idempotent) (`backend/src/services/pointsService.ts`)
- [ ] T025 [US4] Update frontend to allow organizer to mark solved and upload after-photo (`frontend/src/components/EventCompleteForm.tsx`)
- [ ] T026 [US4] Add contract/integration test ensuring idempotent reward distribution (`tests/integration/test_event_complete.spec.ts`)

---

## Phase 7: User Story US5 — Points ledger & profile display (Priority: P3)

Goal: Maintain a ledger of SP and show current balance in profile.

Independent Test: Points awarded appear in user profile and ledger entries are queryable.

- [ ] T027 [US5] Design PointsLedger model and API (`backend/src/models/pointsLedger.ts`, `backend/src/routes/points.ts`)
- [ ] T028 [US5] Implement `GET /api/users/:id/points` for profile display (`backend/src/routes/users.ts`)
- [ ] T029 [US5] Add frontend Profile points display and history (`frontend/src/pages/ProfilePage.tsx`)

---

## Final Phase: Polish & Cross-Cutting

- [ ] T030 [P] Add logging & observability (structured logs for report/create/complete flows) (`backend/src/lib/observability.ts`)
- [ ] T031 [P] Add accessibility and UX polish to Report and Event flows (`frontend/src/components/*`)
- [ ] T032 [P] Create quickstart doc for QA and demo (`docs/quickstart-core-action-loop.md`)

---

## Execution notes
- Estimated story priorities: US1/US2 (MVP core), US3/US4 (organizer flows), US5 (profile/ledger)
- Parallelizable tasks are marked `[P]`.
