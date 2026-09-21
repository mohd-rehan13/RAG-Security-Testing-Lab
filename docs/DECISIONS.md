# Architecture Decisions

## ADR-001: Use local Ollama in the MVP

**Decision:** The lab runs against a local Ollama endpoint.

**Reason:** It avoids sending test prompts or fixture content to a third-party provider and makes the project easier to reproduce.

## ADR-002: Use Promptfoo for evaluation

**Decision:** Promptfoo is the test harness and report source.

**Reason:** It supports declarative LLM evaluations, red-team style scenarios, and repeatable output reports.

## ADR-003: Use synthetic fixtures only

**Decision:** No real customer, employer, or credential data is allowed.

**Reason:** The portfolio objective is evidence of secure engineering, not access to sensitive data.

## ADR-004: Build CLI/evaluation evidence before a dashboard

**Decision:** Complete the core RAG and security testing flow before building a UI.

**Reason:** A trustworthy report and repeatable tests matter more than a visually complex dashboard.
