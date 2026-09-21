# Claude Code Prompt - TASK-001

Read these files before making any changes:

- README.md
- docs/PRD.md
- docs/ARCHITECTURE.md
- docs/RULES.md
- docs/TEST_PLAN.md
- docs/SECURITY.md
- TASKS.md
- docs/MEMORY.md

Do not write code yet. First explain your implementation plan for **TASK-001: Initialize the Node.js TypeScript project, Git, linting, and test runner**.

## Constraints

- Use Node.js 22+ and TypeScript.
- Prepare the project for Promptfoo but do not run paid cloud APIs.
- Do not add a frontend, database, authentication, Docker, or external deployment in this task.
- Keep all testing local.
- Preserve the existing documentation and do not modify unrelated files.
- Do not create or commit `.env`.

## Acceptance criteria

- `package.json` has scripts for lint, typecheck, test, and build.
- TypeScript configuration is strict.
- A lightweight test runner is configured.
- `.gitignore` protects dependencies, environment files, coverage, and generated reports.
- A simple unit test proves the test runner works.
- The repository is ready for TASK-002.

## Testing

After implementation, run the available lint, typecheck, test, and build commands. Report:

1. Files changed
2. What was implemented
3. Commands run and results
4. Remaining issues
5. Suggested commit message

After I approve the plan, implement only TASK-001.
