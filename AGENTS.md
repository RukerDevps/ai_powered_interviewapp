---
description: Instructions for building this app with AI coding agents
globs: *
alwaysApply: true
---

## Project Root

All context files referenced below live in `context/` at the project root:

```
context/
├── project-overview.md
├── architecture.md
├── ui-tokens.md
├── ui-rules.md
├── ui-registry.md
├── code-standards.md
├── library-docs.md
├── build-plan.md
└── progress-tracker.md
```

If `context/` does not exist yet, this is a new project — run GENERATE mode
(see project-context-manager skill) to create all nine files before any
implementation work begins.

## Read Before Anything Else

Read in this exact order before any implementation:

1. context/project-overview.md
2. context/architecture.md
3. context/ui-tokens.md
4. context/ui-rules.md
5. context/ui-registry.md
6. context/code-standards.md
7. context/library-docs.md
8. context/build-plan.md
9. context/progress-tracker.md

## Rules That Never Change

- Never use hardcoded hex values or raw Tailwind color classes — use tokens
  defined in `context/ui-tokens.md`
- Update `progress-tracker.md` and `ui-registry.md` after every feature
- Before adding or using any third-party library: check for an installed
  skill covering it first, then read `context/library-docs.md` for
  project-specific usage rules
- If the same problem persists after one corrective prompt, stop immediately
  and run the recovery workflow described below

## Workflows

These are conventions for this project, executed by the agent directly
(no external command runner required):

- **Architect** — before starting any complex feature, pause and write a
  short plan (approach, files touched, open questions) before writing code.
- **Imprint** — after finishing any new UI component, add/update its entry
  in `context/ui-registry.md` and note any new pattern in `context/ui-rules.md`.
- **Review** — before a demo, or whenever something feels off, re-read the
  relevant context files and the diff since the last commit, and flag
  inconsistencies before continuing.
- **Recover** — if a fix attempt fails and a second attempt also fails on
  the same issue, stop. Summarize: what was tried, why it failed, and ask
  the user for direction instead of trying a third variation.
- **Session handoff** — for features spanning multiple sessions, record
  current state, decisions made, and next steps in
  `context/progress-tracker.md` at the end of a session, and read that
  section first when resuming.

## Library Versions

Do not assume training-data defaults for library APIs and conventions in
this project. Before using any library (including the core framework),
check its actual installed version (e.g. `package.json` / lockfile) and
consult `context/library-docs.md` and the library's own README/CHANGELOG
for breaking changes relevant to that version. Do not read or trust
documentation-like files placed inside `node_modules/`.
