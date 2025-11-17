# Quickstart — Run the project locally (developer guide)

This guide helps developers get a working local environment to implement and test the Core Action Loop.

Prerequisites
- Node 18+ and npm
- Git
- PowerShell on Windows (instructions below)

Backend (dev stub)
1. Open a terminal and run:

```powershell
cd backend
npm install
npm run dev
```

2. The backend runs on http://localhost:4000 by default. Health: `GET /_health`.

Frontend (project root)
1. The repository contains a Vite React app. From the repo root:

```powershell
npm install
npm run dev
```

2. The frontend will run on http://localhost:5173 by default and expects backend APIs at `/api/*` (use a proxy or set `VITE_API_BASE` env).

Creating test data
- Use the backend stub endpoints to create issues and events. See `.specify/tasks/core-action-loop-tasks.md` for scenarios.

Running tests
- Unit and contract tests run via the CI pipeline (see `.github/workflows/ci.yml`); run locally with `npm test` once test harness is added.

Notes
- This quickstart favors a fast feedback loop. For integration with production services (storage, DB, payments) see `.specify/ops/production-ops.md`.
