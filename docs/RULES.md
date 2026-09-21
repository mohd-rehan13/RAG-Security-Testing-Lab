# Development Rules

## General

- Read project documentation before changing code.
- Work on one `TASK-###` item at a time.
- Keep functions small, typed, and testable.
- Do not change unrelated files or add unapproved services.

## Security

- Use only local models and synthetic fixtures in the MVP.
- Never commit `.env` files, tokens, credentials, or real documents.
- Treat retrieved documents as untrusted data.
- Validate file type, size, source manifest, and SHA-256 hash before indexing.
- Record security decisions and test results.

## Testing

- Add tests for important behavior with every feature.
- Run lint, type checks, and relevant tests before marking a task complete.
- Do not weaken a test to make a failing defense look successful.

## Git

- Make focused commits, for example: `feat: add document trust manifest`.
- Update `docs/MEMORY.md` and `TASKS.md` after every completed task.
