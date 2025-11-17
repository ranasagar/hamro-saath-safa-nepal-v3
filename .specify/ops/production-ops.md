# Production Operations & Runbook (Overview)

This document centralizes the operational guidance required to run Hamro Saath in production and to guide the team through common obstacles during launch and early operations.

Sections
- Quick Incident Playbook
- Deployment & Release Flow
- Backups & Restore
- Monitoring & Alerting
- Security & Secrets
- Onboarding Partners

Quick Incident Playbook
1. Triage: validate alert, gather context (what, when, who, scope).
2. Diagnose: check logs, traces, recent deploys, resource usage (CPU, memory), DB connectivity.
3. Mitigation: rollback or disable feature flag; scale horizontally if traffic spike; run DB read-only if needed.
4. Communication: post status to #incidents and update stakeholders; create an incident ticket.
5. Postmortem: write timeline, root cause, corrective actions, owner and ETA.

Deployment & Release Flow
- CI runs builds and tests on every PR.
- Merge to main triggers deployment to staging and integration tests.
- Releases to production are manual (protected branch) and only after green CI and at least one approver.
- Use feature flags for gradual rollouts and dark launches.

Backups & Restore
- Daily DB backups retained for 30 days (configurable per environment).
- Object store snapshot schedule and lifecycle policy documented in cloud account.
- Quarterly restore drill: the ops team validates that a recent backup restores to a dev environment.

Monitoring & Alerting
- Collect metrics (request latency, error rates, queue lengths), traces, and structured logs.
- Create dashboards for SLIs: availability, p95 latency, error rate, queued jobs.
- Define alert thresholds and on-call rotation; standard alerts include high error rate > 5% for 5m and queue depth > threshold.

Security & Secrets
- Use a managed secrets store (AWS Secrets Manager, HashiCorp Vault, or Azure Key Vault).
- No secrets in source control. Enforce pre-commit hooks and CI checks.
- Regular dependency scanning in CI and automated vulnerability alerts.

Onboarding Partners (Rewards)
- Provide a partner API contract and a sandbox environment.
- Document merchant onboarding steps: registration, test voucher creation, redemption flow, reconciliation cadence.

Useful links and contacts
- Ops lead: @ops
- Pager channel: #oncall
- Deployment dashboard: (link placeholder)
