# Backlog → GitHub Issues export (Core Action Loop)

Files created:
- `backlog-issues-payload.json` — JSON array of issue payloads (title, body, labels).

How to use
- Option A: Use the GitHub REST API to create issues programmatically. POST each object in `backlog-issues-payload.json` to `https://api.github.com/repos/:owner/:repo/issues` with an Authorization token.
- Option B: Use a local script or the GitHub CLI to create issues from the JSON file. Example script generation can be provided on request.

Notes
- Payloads include labels to help triage (epic, story, area). Adjust labels to match your repository's label set before import.
