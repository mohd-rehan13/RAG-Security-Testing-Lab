# Tasks

## Phase 1 - Foundation

- [x] TASK-001: Initialize the Node.js TypeScript project, Git, linting, and test runner.
- [x] TASK-002: Add the required directory structure and environment validation.
- [x] TASK-003: Add clean and poisoned synthetic knowledge-base fixtures.

## Phase 2 - Local RAG application

- [x] TASK-004: Build document ingestion with a trusted-source manifest and content hashes.
- [x] TASK-005: Build a local retrieval endpoint with citations.
- [x] TASK-006: Build a minimal chat/API interface that uses Ollama only.

## Phase 3 - Security evaluations

- [x] TASK-007: Add Promptfoo baseline tests for normal answers and direct prompt injection.
- [x] TASK-008: Add indirect prompt-injection and RAG-poisoning scenarios.
- [x] TASK-009: Add synthetic secret-leakage tests and report the baseline metrics.

## Phase 4 - Defenses

- [x] TASK-010: Add document trust validation and quarantine untrusted files.
- [x] TASK-011: Add retrieval instruction isolation and least-privilege tool rules.
- [x] TASK-012: Add output filtering for synthetic secret patterns and source citations.
- [x] TASK-013: Re-run tests and produce before-and-after results.

## Phase 5 - Portfolio evidence

- [x] TASK-014: Generate an HTML/Markdown security report with methodology, results, limitations, and remediation.
- [x] TASK-015: Add screenshots, architecture diagram, and demo steps to README.
- [x] TASK-016: Complete final security review and prepare a clean GitHub release.
