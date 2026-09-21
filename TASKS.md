# Tasks

## Phase 1 - Foundation

- [ ] TASK-001: Initialize the Node.js TypeScript project, Git, linting, and test runner.
- [ ] TASK-002: Add the required directory structure and environment validation.
- [ ] TASK-003: Add clean and poisoned synthetic knowledge-base fixtures.

## Phase 2 - Local RAG application

- [ ] TASK-004: Build document ingestion with a trusted-source manifest and content hashes.
- [ ] TASK-005: Build a local retrieval endpoint with citations.
- [ ] TASK-006: Build a minimal chat/API interface that uses Ollama only.

## Phase 3 - Security evaluations

- [ ] TASK-007: Add Promptfoo baseline tests for normal answers and direct prompt injection.
- [ ] TASK-008: Add indirect prompt-injection and RAG-poisoning scenarios.
- [ ] TASK-009: Add synthetic secret-leakage tests and report the baseline metrics.

## Phase 4 - Defenses

- [ ] TASK-010: Add document trust validation and quarantine untrusted files.
- [ ] TASK-011: Add retrieval instruction isolation and least-privilege tool rules.
- [ ] TASK-012: Add output filtering for synthetic secret patterns and source citations.
- [ ] TASK-013: Re-run tests and produce before-and-after results.

## Phase 5 - Portfolio evidence

- [ ] TASK-014: Generate an HTML/Markdown security report with methodology, results, limitations, and remediation.
- [ ] TASK-015: Add screenshots, architecture diagram, and demo steps to README.
- [ ] TASK-016: Complete final security review and prepare a clean GitHub release.
