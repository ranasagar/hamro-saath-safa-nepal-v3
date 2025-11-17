---
---
---

Purpose
--
This prompt is a developer-facing implementation template used when converting a "speck" (spec + ticket) into code. It tells the implementer what inputs are available, what outputs are expected, and a short, ordered checklist to complete the work.

How to use
--
- Place this file in `.github/prompts/` so task automation or humans can copy/paste the guidance into a PR description or issue comment.
- Follow the steps below when implementing a speck: treat the spec as authoritative, implement code and tests, run the local validations, and open a PR with the deliverables.

Inputs (what the implementer has)
--
- The speck definition (spec.md or issue) describing feature intent, acceptance criteria, and data model.
- Project repository with existing code, tests, CI workflows, and infra skeleton.
- Access to the project's todo/backlog items (if present) in `.specify/`.

Outputs (what the implementer must produce)
--
- Code changes implementing the requested behavior (one or more source files). Keep changes minimal and focused.
- Unit tests for new logic (happy path + 1-2 edge cases).
- Contract/integration tests if the change affects an API surface (add to `backend/tests/contract/`).
- A short README or README section if new developer-facing commands or env vars are required.
- Update to the todo/backlog items or creation of new tasks if follow-ups are needed.

Acceptance criteria
--
1. All new and existing tests pass locally (run test command shown below).
2. Changes are linted/typed (no new TypeScript errors) and build succeeds: `npm run build` where applicable.
3. Commit history is tidy (related changes grouped, descriptive commit messages).
4. PR includes a brief summary of changes, testing steps, and any follow-ups (migration, infra, secrets).

Implementation checklist (ordered)
--
1. Read the speck and open or update the relevant issue in the backlog.
2. Create a small branch named `feat/<short-description>`.
3. Implement the feature in focused commits.
4. Add unit tests and/or contract tests. Run the test suite locally.
5. Run build and typecheck (TypeScript) locally.
6. Run contract tests (if backend changes) using the repository's test invocation.
7. Update documentation and add short run instructions if needed.
8. Update the todo/backlog artifacts in `.specify/` if the speck spawns follow-up tasks.
9. Push the branch and open a PR with a summary, test evidence (test run output or CI link), and list of follow-ups.

Local test and validation commands (common)
--
From repository root or the package folder as appropriate:

```
# Install deps (if needed)
npm install

# Run backend contract tests (worked cross-platform in this repo):
node --loader ts-node/esm ./backend/node_modules/mocha/bin/mocha --exit "backend/tests/**/*.spec.ts"

# Or use workspace npm script in backend
cd backend; npm run test

# Run coverage for backend (if applicable)
cd backend; npm run coverage

# Build and typecheck
npm run build
```

PR checklist (copy into PR description)
--
- [ ] Implementation matches the speck acceptance criteria.
- [ ] Tests added: unit + contract/integration where relevant.
- [ ] Local test run output included or CI link to passing workflow.
- [ ] No new TypeScript errors; build passes.
- [ ] Backlog/todo items updated if follow-ups required.

Tips and conventions
--
- Keep changes small and incremental. Prefer additional PRs for larger refactors.
- When adding tests that require environment variables or tokens, add a `TEST_` prefixed env var and document how to run locally.
- For backend API contract changes, update `openapi.yaml` where appropriate and add a client-generation task as follow-up.

If this file needs to be specialized for a specific speck, copy it into the PR body and edit the "Inputs" and "Acceptance criteria" sections to be speck-specific.

