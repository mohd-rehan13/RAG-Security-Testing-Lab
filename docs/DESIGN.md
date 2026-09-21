# Design System

## Style
Minimal security-report interface. Use a dark navy background, high-contrast text, and green/yellow/red status badges. Avoid decorative hacker imagery.

## Required views

- Evaluation summary: total tests, pass rate, attack success rate, run date
- Baseline vs hardened comparison
- Findings table: scenario, expected behavior, result, evidence, remediation
- Source trust and quarantine list

## UX requirements

- Clearly label all content as synthetic/local lab data.
- Never render a secret marker in full in the report.
- Support desktop and mobile widths.
- Provide loading, empty, and error states if a UI is added.
