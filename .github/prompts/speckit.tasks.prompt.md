```prompt
---
agent: speckit.tasks
---

This prompt instructs the `speckit.tasks` agent how to generate an actionable, dependency-ordered `tasks.md` for a feature or epic in this repository.


Primary sources (in order):
- `.specify/memory/constitution.md` — project mission, vision, core principles, epics.
- `.specify/plans/project-plan.md` — human-readable project plan and sprint roadmap.
- `.specify/plans/backlog.json` — machine-readable backlog (epics, stories, estimates).
- `.specify/templates/tasks-template.md` — tasks.md template and checklist rules.

Requirements:
- Generate `./.specify/tasks/(FEATURE_NAME)-tasks.md` (create `.specify/tasks/` if missing).
- Tasks must follow the strict checklist format defined in the template: each task must include a markdown checkbox, a unique Task ID (for example: T001), an optional P-marker for parallelizable tasks (use the text "P"), an optional story label (use the text "US1", "US2", etc.), and a clear description including a file path. Avoid using square-bracket notation in this prompt to prevent tooling parse errors.
- Group tasks by user story and phase (Setup, Foundational, User Stories, Polish).
- Include an execution dependency graph and a short parallelization plan.
- Output a short JSON summary alongside the file with counts: total tasks, tasks per story, parallelizable tasks.

Expected outputs:
- `./.specify/tasks/[FEATURE_NAME]-tasks.md` — fully populated tasks file, ready to hand to implementers.
- `./.specify/tasks/[FEATURE_NAME]-tasks.summary.json` — simple summary: { totalTasks, byStory: { US1: n, ... }, parallelCount }

If `FEATURE_NAME` is not supplied via arguments, infer it from `plan.md` (look for `# [FEATURE NAME]` or `Feature:` header in `.specify/plans/project-plan.md`) or prompt the user.

Do not include placeholder/sample tasks from the template; produce real, actionable tasks derived from the backlog and plan. Ensure file paths in descriptions are valid for this repository.

Always validate generated task IDs are unique and sequential starting at T001 for each generated file.

Return only the path to the generated files and the JSON summary in the agent response.

```
---
agent: speckit.tasks
---
