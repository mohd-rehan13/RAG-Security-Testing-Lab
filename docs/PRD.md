# Product Requirements Document

## Product
RAG Security Testing Lab

## Problem
Teams often deploy RAG assistants without evidence that hostile instructions hidden in retrieved documents cannot change assistant behavior or expose sensitive information.

## Target users
Cybersecurity interns, junior application-security engineers, and developers learning to secure RAG applications.

## Goal
Provide a local, reproducible lab that measures how a RAG assistant behaves with clean and poisoned documents, then demonstrates measurable improvement after defenses are applied.

## MVP scope

- Local RAG assistant using Ollama.
- Clean and poisoned synthetic document collections.
- Promptfoo test suite for normal behavior, direct injection, indirect injection, RAG poisoning, and synthetic secret leakage.
- Baseline and hardened test reports.
- Document trust, instruction isolation, output filtering, and audit logging.

## Out of scope

- Production deployment
- Real customer data
- Autonomous tool execution
- User accounts and payments
- Testing systems or models without authorization

## Success criteria

- A clean knowledge-base question returns a cited answer.
- Poisoned documents are detected, quarantined, or treated as untrusted data.
- The assistant does not follow instructions retrieved from documents.
- The assistant does not reveal synthetic secret markers.
- The report shows the number of passed and failed security tests before and after mitigations.
