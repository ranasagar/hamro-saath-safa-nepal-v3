# [PROJECT_NAME] Constitution
<!-- Example: Spec Constitution, TaskFlow Constitution, etc. -->

## Core Principles

### [PRINCIPLE_1_NAME]
<!-- Example: I. Library-First -->
[PRINCIPLE_1_DESCRIPTION]
<!-- Example: Every feature starts as a standalone library; Libraries must be self-contained, independently testable, documented; Clear purpose required - no organizational-only libraries -->

### [PRINCIPLE_2_NAME]
<!-- Example: II. CLI Interface -->
[PRINCIPLE_2_DESCRIPTION]
<!-- Example: Every library exposes functionality via CLI; Text in/out protocol: stdin/args → stdout, errors → stderr; Support JSON + human-readable formats -->

### [PRINCIPLE_3_NAME]
<!-- Example: III. Test-First (NON-NEGOTIABLE) -->
[PRINCIPLE_3_DESCRIPTION]
<!-- Example: TDD mandatory: Tests written → User approved → Tests fail → Then implement; Red-Green-Refactor cycle strictly enforced -->

### [PRINCIPLE_4_NAME]
<!-- Example: IV. Integration Testing -->
[PRINCIPLE_4_DESCRIPTION]
<!-- Example: Focus areas requiring integration tests: New library contract tests, Contract changes, Inter-service communication, Shared schemas -->

### [PRINCIPLE_5_NAME]
<!-- Example: V. Observability, VI. Versioning & Breaking Changes, VII. Simplicity -->
[PRINCIPLE_5_DESCRIPTION]
<!-- Example: Text I/O ensures debuggability; Structured logging required; Or: MAJOR.MINOR.BUILD format; Or: Start simple, YAGNI principles -->

## [SECTION_2_NAME]
<!-- Example: Additional Constraints, Security Requirements, Performance Standards, etc. -->

[SECTION_2_CONTENT]
<!-- Example: Technology stack requirements, compliance standards, deployment policies, etc. -->

## [SECTION_3_NAME]
<!-- Example: Development Workflow, Review Process, Quality Gates, etc. -->

[SECTION_3_CONTENT]
<!-- Example: Code review requirements, testing gates, deployment approval process, etc. -->

## Governance
<!-- Example: Constitution supersedes all other practices; Amendments require documentation, approval, migration plan -->

# Hamro Saath — Project Constitution

## Mission
To empower every Nepali citizen with the tools to create a cleaner, healthier, and more beautiful Nepal by transforming civic responsibility into a rewarding, collaborative, and gamified community experience.

## Vision
We envision a future where civic duty is a celebrated and integral part of daily life. A Nepal where communities are actively engaged, public spaces are pristine, and citizens are proud of their collective contribution to a "Safa Nepal." Our app will be the catalyst that makes this vision a reality.

This constitution and plan commit to developing Hamro Saath as a full‑fledged, production-capable application (mobile-first web and native-ready architecture). The specification and epics below assume long-term maintenance, scalability, and integration with partners and admin operations.

## Core Principles

- Empowerment Over Obligation
	- We give citizens the power to make a tangible impact. The app is a tool for action, not a chore. Every user is a "Safa Hero." 

- Community First (Hamro Saath)
	- We foster collaboration, healthy competition, and shared purpose. Leaderboards, forums, and events are designed to bring people together, not just to rank them.

- Reward & Recognition
	- Positive reinforcement drives sustainable change. We will always make civic duty fun and rewarding, celebrating every contribution, big or small.

- Actionable Transparency
	- We make the collective impact visible. Users must be able to see the direct results of their actions through stats, heatmaps, and before-and-after imagery.

- Simplicity & Accessibility
	- The platform must be intuitive and inclusive. Anyone, regardless of technical skill, should be able to report an issue or join an event with ease.

- Sustainable Habits
	- Our goal is not just to clean up a single mess but to foster long-term habits of cleanliness and civic pride. Features should encourage consistent, daily engagement.

## Project Plan — High-Level Specification
This plan outlines the primary epics (major feature areas) of the application. Each epic maps directly to our mission and can be broken into user stories for development sprints.

### Epic 1: The Core Action Loop (Gamification Engine)
Goal: Create a simple, satisfying, and rewarding cycle for identifying, organizing, and resolving civic issues.
Key user stories:
- As a user, I want to report a new issue with a photo and description in under 30 seconds so I can earn points and alert the community.
- As a user, I want to view reported issues on an interactive map and in a list so I can understand what's happening in my area.
- As a user, I want to organize a clean-up event for a reported issue, setting a date, time, and volunteer goal.
- As an organizer, I want to mark an event as "Solved" by uploading an 'after' photo, automatically rewarding all participants.

### Epic 2: Community & Social Engagement
Goal: Build a strong, competitive, and interactive community that encourages participation and retention.
Key user stories:
- As a user, I want to see my rank on an individual leaderboard to track my progress and compete with friends.
- As a user, I want to see my ward's rank to foster local pride and friendly competition between neighborhoods.
- As a user, I want to discuss ideas, ask questions, and share success stories in a community forum.
- As a user, I want to see a live feed of recent activities to feel connected to the community's efforts.

### Epic 3: The Rewards Economy
Goal: Create a compelling and sustainable incentive system that connects user actions to real-world value.
Key user stories:
- As a user, I want to browse a marketplace of rewards from local partners (e.g., coffee shops, mobile top-ups).
- As a user, I want to redeem my Safa Points (SP) for rewards, with clear options for using points, cash, or a combination of both.
- As a user, I want to receive a digital receipt for every transaction and view my purchase history in my profile.
- As a user, I want to purchase official merchandise to show my support for the movement.

### Epic 4: Micro-Engagements & Education
Goal: Encourage small, daily acts of civic duty and educate users on best practices.
Key user stories:
- As a user, I want to log 'micro-actions' (like picking up a single piece of litter) for a small SP reward, with a daily cap.
- As a user, I want to visit a 'Civic Sense Hub' to learn about topics like waste segregation.
- As a user, I want to take a short quiz in the Hub to test my knowledge and earn bonus points.

### Epic 5: Administration & Governance
Goal: Provide administrators with tools to manage, moderate, and grow the platform effectively.
Key user stories:
- As an admin, I want a dashboard to see key metrics like total users, open issues, and transactions.
- As an admin, I want to manage (CRUD) all core data: users, issues, rewards, mayor profiles, etc.
- As an admin, I want to approve or reject cash-related or reimbursement-based transactions to ensure system integrity.
- As an admin, I want to use feature flags to safely roll out or disable major application features in real-time.

## Governance
The constitution is the guiding artifact for project decisions. Amendments should be recorded here with a brief rationale and a migration plan when they affect implementation.

**Version**: 1.0.0 | **Ratified**: [RATIFICATION_DATE]

**Notes & Next Steps**:
- Convert each Epic into a backlog of user stories with acceptance criteria and estimates.
- Prioritize a minimal viable Core Action Loop for the first sprint (report → map → event → reward flow).
- Add metrics and observability acceptance criteria for each Epic (e.g., reporting latency, reward redemption flows, fraud detection boundaries).
