# Hamro Saath — Project Plan (derived from Constitution)

This document translates the constitution into an actionable plan: epics, milestones, an initial 3-sprint roadmap, acceptance criteria, metrics, and risks.

## Summary
- Mission: Empower Nepali citizens to improve public spaces via a gamified civic app.
- Focus for MVP: Core Action Loop — report → map → organize event → verify/resolve → reward.

## Epics (from constitution)
1. Core Action Loop (Gamification Engine)
2. Community & Social Engagement
3. Rewards Economy
4. Micro-Engagements & Education
5. Administration & Governance

## Milestones
- Milestone A (MVP): Core Action Loop end-to-end (report, map, event organization, mark solved, reward credits).
- Milestone B: Community features (leaderboards, feed, forum)
- Milestone C: Rewards marketplace & redemptions
- Milestone D: Micro-engagements, Civic Hub, quizzes
- Milestone E: Admin dashboard, moderation tools, feature flags

## Initial Roadmap (3-week sprints assumed)

Sprint 0 — Project setup (1 week)
- Tasks: repo scaffolding, CI, linting, basic auth scaffolding, API contract (OpenAPI stub), DB schema sketch, analytics plan, test harness.
- Success: CI passes, dev env documented, basic auth flows functioning.

Sprint 1 — MVP Core Action Loop (2 weeks)
- Tasks:
  - Report issue UI (photo upload, description, category) — S
  - Issue model + API endpoints (create/list/detail) — M
  - Interactive map integration (clustered markers, filters) — M
  - Event creation UI + backend (date/time, goal, RSVP) — M
  - Mark event solved flow (upload 'after' photo, award points) — M
  - Basic points ledger + profile points display — S
  - Acceptance & manual QA of end-to-end flow — S
- Success criteria: user can report, view on map, organize an event, complete it, and receive points; E2E tests for core flow.

Sprint 2 — Community & Live Feed (2 weeks)
- Tasks:
  - Live activity feed (recent reports, events, completions) — S
  - Individual & ward leaderboards — M
  - Forum basics (threads, comments) — M
  - Push/notification stub for event invites and reminders — S
- Success criteria: feed shows live activity, leaderboards update within acceptable latency, forum exists with moderation flags.

Sprint 3 — Rewards & Micro-engagements (2 weeks)
- Tasks:
  - Rewards marketplace UI + redemption API — M
  - Digital receipt generation + transaction history — S
  - Micro-actions logging + daily cap enforcement — S
  - Civic Sense Hub + short quiz flow — S
- Success criteria: users can redeem points, see receipts, log micro-actions; basic Hub content and quiz awarding bonus points.

## Acceptance Criteria & Observability (per Epic)
- Core Action Loop:
  - Report submit latency < 5s in normal conditions.
  - Images stored and served; before/after images linked to events.
  - Points awarded idempotently (replay-safe transactions).
  - E2E tests for: report → event → completion → reward.
- Community:
  - Leaderboard updates within 1 minute of a points change.
  - Feed shows items with timestamp, author, and linked objects.
- Rewards:
  - Redemption transactions atomic and auditable.
  - Digital receipts available in profile history.

## Metrics to Track
- Total reports created / day
- Events organized / completed
- Active users (7d, 30d)
- SP (Safa Points) issued vs redeemed
- Fraud indicators (unusual redemption patterns)
- Reporting to resolution median time

## Production Readiness (Operational Checklist)
Goal: Make Hamro Saath production-capable with repeatable provisioning, robust observability, recoverability, and secure operations.

Checklist (recommended work items to schedule):

- [ ] IaC templates and environment provisioning (dev/staging/prod). Accept: Terraform/CloudFormation templates or equivalent + docs.
- [ ] CI/CD pipelines for frontend and backend with automated tests and gated deploys. Accept: builds in pipeline, deploy to staging on merge, protected releases to prod.
- [ ] Observability: metrics, traces, structured logs, and dashboards for SLIs/alerts (error rate, latency, saturation). Accept: dashboards + at-least one alert rule.
- [ ] Backups & DR: scheduled DB backups, object store snapshotting, and documented restore procedure. Accept: recovery runbook and verified restore test.
- [ ] Secrets management: use a vault (Vault/Secrets Manager) and remove secrets from source. Accept: secrets stored in vault and referenced in deploy.
- [ ] Security baseline: dependency scanning, SAST/DAST integration, threat model and privacy/data retention policy. Accept: scans in CI and a short threat-model doc.
- [ ] Load testing and perf budgets: baseline load tests and performance targets. Accept: test results and remediation plan for top bottleneck.
- [ ] Ops runbooks and incident playbooks: incident triage, on-call rotation guidance, and postmortem templates. Accept: runbook repo and escalation flow.
- [ ] Feature flagging: integrate a feature flag system and document rollout strategy. Accept: toggle a sample feature in staging and prod safely.
- [ ] Partner onboarding: merchant/reward partner onboarding playbook, contracts, and API samples. Accept: sample onboarding flow and test partner configured.

Milestones:
- M1: CI + Dev environment + IaC (2 sprints)
- M2: Observability + Backups + Secrets (2 sprints)
- M3: Security baseline + Load testing (1-2 sprints)
- M4: Runbooks + Feature flags + Partner onboarding (1 sprint)

Notes:
- Each item above should become backlog stories (see backlog.json Epic E6). Prioritize CI, IaC, and secrets first — they unblock safe deployments.
- For audits and compliance, keep a single source of truth for privacy/data-retention and partner agreements.


## Risks & Mitigations
- Photo spam / fake completions
  - Mitigation: require organizer verification, manual approvals for high-value redemptions, image similarity checks, crowdsourced validation.
- Fraudulent micro-actions
  - Mitigation: daily caps, sampling audits, cross-check with geotag data.
- Low adoption
  - Mitigation: focus on local partners for rewards, Ward-level competitions, early adopter incentives.

## Governance & Amendment Process
- Amendments must include: rationale, migration impact, implementation plan, and at least one reviewer approval before merging.

## Next steps (recommended immediate work)
1. Convert Epics into a prioritized backlog with acceptance criteria and story point estimates (I can generate a backlog JSON next).
2. Create the initial CI + dev.env doc and a minimal API contract for the reporting and events endpoints.
3. Identify 3 local partners for rewards pilot and add their items to a test marketplace.


Recent progress (updates)
------------------------
- Contract tests added for core API flows (POST /api/issues and end-to-end event flow). CI updated to run them.
- Coverage tooling (c8) and a Coverage workflow added; coverage script available in `backend/package.json`.
- Spec improvements: sample request/response payloads for US1–US4 were added to the core spec and clarifying issues were generated for blockers (auth, ledger, rewards atomicity, moderation).
- Developer prompts added: `speckit.implement`, `speckit.clarify`, and `speckit.specify` templates to standardize implementation, clarification, and backlog generation.

Files created/updated in this repo recently that support the plan:
- `.specify/tasks/specify-core-action-backlog.json` — machine-readable backlog for Core Action Loop.
- `.specify/tasks/clarify-issues-payload.json` — importable GitHub issue payloads for spec clarifications.
- `.github/workflows/coverage.yml` — workflow to run coverage and upload reports.

Next immediate priorities (delta)
--------------------------------
1. Complete OpenAPI schemas for issues/events/rewards and generate TypeScript client types (high priority for frontend/backwards compatibility).
2. Implement SP ledger model and tests (blocker for reward flows).
3. Import clarification issues and assign owners; schedule a short triage to resolve blockers.

---
Version: 1.0.0
