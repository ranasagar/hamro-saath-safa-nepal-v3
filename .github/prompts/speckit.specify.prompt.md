Purpose
--
This template describes how to convert a speck (feature spec) into a set of actionable backlog items, OpenAPI updates, and implementation tasks. It's intended for humans or automation that need to standardize "spec → tasks" conversions.

How to use
--
- Provide the speck content (or link to the spec file) as input. The generator should output a JSON array of issue/ticket payloads that can be imported into the repository's backlog using existing scripts.
- Each generated item should be small, actionable, and scoped to ~1–2 days of work where possible.

Outputs (required)
--
Return a JSON array where each element has:
- title: Short descriptive title for the ticket
- body: Details, acceptance criteria, and suggested estimate
- labels: array of labels (e.g., spec, backend, frontend, infra, tests)
- assignees: array (empty by default)

Suggested steps the generator should perform
--
1. Parse the speck and extract prioritized user stories and acceptance criteria.
2. Identify dependencies and cross-cutting concerns (auth, media, payments, infra).
3. For each priority P1–P2 story, produce tasks for: OpenAPI, backend model, backend route, contract tests, frontend page/component, e2e test, and CI wiring (if applicable).
4. Group smaller housekeeping tasks (docs, runbook, privacy) as follow-ups.
5. Produce a short rollout note describing how to stage/deploy and how to roll back (if applicable).

Example output element
--
```
{
  "title": "Implement API: Create Issue (US1)",
  "body": "Create POST /api/issues endpoint to accept multipart form with images and location. Acceptance: returns 201 with issue id and image CDN URL; stores images in S3; unit + contract tests added.",
  "labels": ["spec","backend","api","tests"],
  "assignees": []
}
```

Post-processing
--
- Save the JSON to `.specify/tasks/<speck>-backlog.json` for audit and import.
- Use the repository's PowerShell import script to create GitHub issues from the JSON.
- Update the speck's `Execution Status` section with links to created issues and owners.

Notes
--
- Keep ticket sizes small and independent where possible. If a task needs more than 3 days, break it into subtasks.
- Include test definitions and OpenAPI hook tasks to ensure code + contract are maintained.
---
agent: speckit.specify
---
