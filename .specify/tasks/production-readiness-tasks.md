---
description: "Concrete tasks for Production Readiness (Epic E6)"
---

# Tasks: Production Readiness

Input: `.specify/plans/backlog.json` (Epic E6), `.specify/ops/production-ops.md`, CI templates

## Phase 1: IaC & Environment Provisioning

- [ ] T100 [P] [E6-S1] Create Terraform skeleton for environments (dev/staging/prod) (`infra/terraform/`)
- [ ] T101 [E6-S1] Define VPC, networking, and IAM roles for cloud provider (`infra/terraform/networking.tf`)
- [ ] T102 [E6-S1] Define managed DB module and object storage module (`infra/terraform/database.tf`, `infra/terraform/storage.tf`)

## Phase 2: CI/CD & Release Process

- [ ] T103 [E6-S2] Create GitHub Actions workflow for CI (build, test, lint) (`.github/workflows/ci.yml`) - placeholder exists, expand
- [ ] T104 [E6-S2] Implement CD workflow to deploy to staging on merge to develop (`.github/workflows/deploy-staging.yml`)
- [ ] T105 [E6-S2] Add protected release workflow for production with approvals (`.github/workflows/release-prod.yml`)

## Phase 3: Observability & Monitoring

- [ ] T106 [E6-S3] Instrument backend services for metrics (Prometheus client) (`backend/src/lib/metrics.ts`)
- [ ] T107 [E6-S3] Add structured logging and correlation IDs (`backend/src/lib/logging.ts`)
- [ ] T108 [E6-S3] Create Grafana dashboards and alert rules (or document for managed service) (`infra/monitoring/`)

## Phase 4: Backups & DR

- [ ] T109 [E6-S4] Add automated DB backup job & retention policy (`infra/backup/`)
- [ ] T110 [E6-S4] Document restore procedure and run a restore drill (`docs/restore-drill.md`)

## Phase 5: Secrets & Config

- [ ] T111 [E6-S5] Integrate secrets manager (Vault/Secrets Manager) and update deploy pipelines to read secrets at runtime (`infra/secrets/`)

## Phase 6: Security & Compliance

- [ ] T112 [E6-S6] Add dependency scanning to CI and automated SCA reports (`.github/workflows/safety.yml`)
- [ ] T113 [E6-S6] Draft a threat model and privacy/data-retention policy (`.specify/security/threat-model.md`)

## Phase 7: Load Testing & Perf

- [ ] T114 [E6-S7] Create a lightweight k6/Gatling script for baseline load tests (`infra/load/`)
- [ ] T115 [E6-S7] Run tests against staging and document results (`reports/load-test-YYYYMMDD.md`)

## Phase 8: Ops Runbooks & Playbooks

- [ ] T116 [E6-S8] Produce incident runbooks for common alerts (`.specify/ops/runbooks/`)

## Phase 9: Feature Flagging

- [ ] T117 [E6-S9] Integrate feature flagging (LaunchDarkly/Flagsmith) and add a sample flag for a new feature (`backend/src/flags.ts`)

## Phase 10: Partner Onboarding

- [ ] T118 [E6-S10] Draft partner onboarding playbook and sample API keys and sandbox steps (`.specify/partners/onboarding.md`)

---

Execution notes:
- Task IDs use T100+ to avoid clash with feature tasks. Mark tasks as [P] when parallelizable.
- Link each task to a GitHub issue and PR when implemented.
