```prompt
---
agent: speckit.plan
---

This prompt instructs the `speckit.plan` agent to produce a human-readable project plan and a machine-readable backlog derived from the repository's constitution and available artifacts.

Primary sources (in order):
- `.specify/memory/constitution.md` — mission, vision, core principles, epics
- `.specify/plans/backlog.json` — existing backlog (if present)
- `.specify/plans/project-plan.md` — previous plan drafts (if present)

Required outputs when run for a repository or epic:
- `./.specify/plans/project-plan.md` — epics, milestones, sprint roadmap, acceptance criteria, metrics, risks.
- `./.specify/plans/backlog.json` — JSON backlog with epics, user stories, estimates, and acceptance criteria.

Guidance:
- Aim for a minimal 3-sprint roadmap focused on delivering the Core Action Loop as MVP.
- Include acceptance criteria and measurable metrics for each epic.
- Produce a short list of next steps and immediate priorities for the next sprint.

If files already exist, update them conservatively: preserve existing structure and only add new content derived from the constitution or backlog.

Return the paths to the files created or updated and a 3-line summary of the changes.

```
---
agent: speckit.plan
---
