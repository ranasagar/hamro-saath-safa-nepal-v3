Purpose
--
This template helps contributors or automation generate concise, prioritized clarifying questions for a "speck" (spec + ticket). Use it before implementation to remove ambiguity, identify blockers, and create small follow-up tasks.

How to use
--
- Copy the speck text (or a link to the spec file) into the prompt input.
- The generator should return a short list of clarifying questions grouped by priority: Blocker / High / Low.
- For each question include: one-line question, short rationale (why it matters), suggested owner (team/role), and a suggested acceptance test or artifact that will close the question.

Question categories
--
- Blocker — Must answer before development begins. Examples: API shape, auth rules, financial behavior.
- High — Important to resolve early during implementation or design. Examples: pagination, error semantics, edge cases.
- Low — Nice-to-have clarifications that can be deferred or addressed during review. Examples: i18n details, UI copy variants.

Desired output format (JSON array)
--
Return a JSON array where each element contains the fields below. This makes it easy to transform questions into GitHub issues or backlog tasks.

Example element schema:
```
{
  "priority": "Blocker",           // Blocker | High | Low
  "question": "What is the POST /api/issues payload?",
  "rationale": "API shape required for client + storage design.",
  "owner": "backend/product",
  "acceptance": "OpenAPI path POST /api/issues added with example request/response; test: POST multipart -> 201 with image URL",
  "blocking": true
}
```

Prompt guidance for the generator
--
When producing questions, prefer brevity. For each speck, scan for these ambiguity hotspots and ask targeted questions if missing:

- API & data shape: request/response examples, required/optional fields, idempotency keys.
- Auth & permissions: which endpoints require auth, anonymous flows, roles and ownership.
- Media handling: upload method (multipart vs URL), CDN behavior, retention/moderation.
- Financial semantics: points ledger, reversals, atomicity, hybrid payments.
- Operational needs: rate limits, pagination, timezone rules.
- Tests & observability: what unit/contract/integration tests close the question; required logs/metrics for auditing.

Output length and ordering
--
- Keep the full output ≤ 20 items; prefer 3–8 items with at most 5 blockers.
- Order by priority (Blocker first), then by impact (highest impact first).

Post-processing suggestions
--
- Convert the JSON output into GitHub issues using the repo's existing import script. Place the JSON in `.specify/tasks/clarify-issues-payload.json` (see existing examples).
- When a question is resolved, update the speck's `Execution Status` section (owner, last updated, links to PR/issues) to keep traceability.

Example usage (human-friendly)
--
Input: link or content of `spec.md` for Core Action Loop.
Output: JSON array containing prioritized clarifying questions as shown in the schema above.

Notes
--
- This file is a template for asking clarifying questions — it's intentionally implementation-agnostic. Adjust owners and acceptance criteria to match your team's conventions.
---
agent: speckit.clarify
---
