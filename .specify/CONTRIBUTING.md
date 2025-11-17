# Contributing & Governance

This document explains how to contribute, propose changes to the constitution/spec, and the review/approval process.

Branching & PRs
- Create feature branches named `feat/<short-name>` or `chore/<short-name>`.
- Open a PR against `develop` (or `main` if no develop branch). Include a clear description, linked issues, and screenshots where applicable.

Code Review
- At least one code reviewer required for non-trivial changes; two reviewers for production-impacting changes (infra, security, payments).
- All PRs must pass CI (lint, unit tests, contract tests) before merging.

Changing the Constitution or Spec
- To amend the constitution (`.specify/memory/constitution.md`) or spec (`.specify/specs/*`): open a PR that includes:
  - Rationale for change
  - Migration plan if the change impacts data/schema
  - Tests or validation plan (if applicable)
- At least one reviewer from project leadership must approve for ratification.

Backlog & Issues
- Use the `.specify/plans/backlog.json` as the canonical backlog; convert stories into GitHub issues for execution.

Security & Secrets
- Do not commit secrets. Use the secrets management guide and CI checks.

Onboarding
- New contributors should run `./.specify/quickstart.md` (generated) and read `CONTRIBUTING.md`.
