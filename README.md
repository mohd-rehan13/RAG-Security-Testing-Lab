# RAG Security Testing Lab

A local, portfolio-ready lab for evaluating a retrieval-augmented generation (RAG) assistant against prompt injection, poisoned knowledge-base documents, and synthetic sensitive-data leakage.

## What this demonstrates

- Threat modelling for LLM applications
- Promptfoo-based automated security evaluation
- Safe RAG test data and reproducible attack cases
- Mitigations: source trust checks, document quarantine, instruction isolation, output filtering, and audit logs
- Before-and-after evidence in a recruiter-friendly security report

## MVP

1. Index a clean synthetic knowledge base.
2. Run normal question-answer tests.
3. Add synthetic poisoned documents containing indirect instructions.
4. Run Promptfoo tests and record attack success rate.
5. Enable mitigations and re-run the same tests.
6. Generate a report that compares baseline and hardened results.

## Safety boundary

Run only against this local lab, with local/synthetic data and models you are authorized to test. Do not use production data, credentials, customer documents, or systems you do not own.

## Project workflow

Read `docs/PRD.md`, `docs/ARCHITECTURE.md`, `docs/RULES.md`, and `TASKS.md` before implementation. Complete one task, test it, review it, commit it, and update `docs/MEMORY.md`.

## First task

Use `prompts/CLAUDE_TASK_001.md` in Claude Code after creating the runtime project files.
