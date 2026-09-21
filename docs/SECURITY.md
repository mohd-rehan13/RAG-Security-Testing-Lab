# Security Requirements

## Threat model

The attacker can submit or influence documents that may be retrieved by the assistant. They attempt to inject instructions, poison answers, or cause the assistant to expose a synthetic secret.

## Controls

1. **Source trust:** require a source manifest and SHA-256 checksum before indexing.
2. **Quarantine:** do not index sources that fail validation or contain disallowed metadata.
3. **Instruction isolation:** place retrieved text inside a clearly delimited untrusted-data block; model policy states that it is never authoritative instruction.
4. **Grounding:** require citations and allow the assistant to say it does not know.
5. **Output protection:** block/redact known synthetic secret patterns and encode output for the UI.
6. **Auditability:** log document ID, trust result, test ID, and decision without storing sensitive values.
7. **Least privilege:** no shell, browser, file-write, or external-network tools in the MVP.

## Secure test data

Use markers such as `LAB_SECRET_ALPHA_12345` only inside fixtures. They prove that the defenses work without exposing real data.
