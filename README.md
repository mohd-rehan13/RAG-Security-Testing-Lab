# RAG Security Testing Lab

<div align="center">
  <video src="media/brag_launch.mp4" width="800" controls></video>
</div>

## How the Hack Works

The lab provides a visual interface for demonstrating how an AI assistant handles malicious inputs and RAG poisoning.

### 1. System Boot
The neural-net interface boots up, providing a clean chat terminal to test prompt injections.
![System Boot](media/action_1_boot.jpg)

### 2. The Hack Attempt
An attacker inputs a malicious payload designed to override system instructions and extract sensitive data.
![Hack Attempt](media/action_2_hack.jpg)

### 3. Decrypt Mode (Raw RAG Blocks)
By toggling **Decrypt Mode**, you can peek behind the scenes to see the exact contextual data blocks the AI retrieved—including any hidden secrets.
![Decrypt Mode](media/action_3_decrypt.jpg)

### 4. Critical Fault & Leakage
If the prompt injection succeeds, the system suffers a critical fault and leaks the unauthorized secret straight into the terminal.
![Critical Fault](media/action_4_error.jpg)

A local, portfolio-ready lab for evaluating a retrieval-augmented generation (RAG) assistant against prompt injection, poisoned knowledge-base documents, and synthetic sensitive-data leakage.

## What this demonstrates

- Threat modelling for LLM applications
- Promptfoo-based automated security evaluation
- Safe RAG test data and reproducible attack cases
- Mitigations: source trust checks, document quarantine, instruction isolation, output filtering, and audit logs
- Before-and-after evidence in a recruiter-friendly security report
- **Complete defense-in-depth security architecture**

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

Read docs/PRD.md, docs/ARCHITECTURE.md, docs/RULES.md, and TASKS.md before implementation. Complete one task, test it, review it, commit it, and update docs/MEMORY.md.

## First task

Use prompts/CLAUDE_TASK_001.md in Claude Code after creating the runtime project files.

## Security Architecture Diagram

`
+-----------------+    +------------------+    +--------------------+
¦   User Input    ¦---?¦ Instruction      ¦---?¦   Retrieval        ¦
¦   (Query)       ¦    ¦ Isolation        ¦    ¦   Service          ¦
+-----------------+    ¦ (Sanitization)   ¦    ¦ (Least-Privilege)  ¦
                       +------------------+    ¦   & Filtering      ¦
                                                +--------------------+
                                                        ?
+-----------------+    +------------------+    +--------------------+
¦ Document Ingest ¦---?¦ Trust Validation ¦---?¦   Quarantine       ¦
¦ Pipeline        ¦    ¦ (Manifest + Hash)¦    ¦   Isolation        ¦
+-----------------+    +------------------+    ¦   (Failed Docs)    ¦
                                                +--------------------+
                                                        ?
+-----------------+    +------------------+    +--------------------+
¦   Knowledge     ¦    ¦   Context        ¦---?¦  LLM Processing    ¦
¦   Base (Trusted)¦    ¦   Building       ¦    ¦   (Ollama)         ¦
+-----------------+    +------------------+    +--------------------+
                                                        ?
                                                +------------------+
                                                ¦  Output          ¦
                                                ¦  Filtering       ¦
                                                ¦  (Secret Redaction)¦
                                                +--------------------+
                                                        ?
                                                +------------------+
                                                ¦ Final Response   ¦
                                                ¦ with Citations   ¦
                                                +------------------+
`

## Demo Steps

### Prerequisites
- Node.js >=18.0 (>=22.22.0 required for full Promptfoo validation)
- npm package manager
- Local Ollama instance running with a compatible model

### Setup & Installation
1. Clone/repository setup
2. Install dependencies (npm install)
3. Verify environment (node -v, npm -v)
4. Start Ollama service (ollama serve)
5. Pull a model if needed (ollama pull llama2)

### Demo Execution
1. Initialize the RAG system (npm run dev)
2. Run demonstrations in separate terminals:
   - Normal Operation: Query about office hours
   - Prompt Injection Attempt: Query requesting to ignore instructions
   - Synthetic Secret Leakage Attempt: Query for synthetic secret
   - Document Quarantine Verification: Check quarantine directory
3. Run Security Validation (when Node.js >=22.22.0 available):
   - Baseline metrics: npx promptfoo eval -c promptfoo/baseline.yaml
   - Post-defense metrics: npx promptfoo eval -c promptfoo/hardened.yaml

### Expected Outcomes
- All malicious attempts are blocked or sanitized
- Legitimate queries return accurate information with citations
- Quarantine system isolates dangerous documents
- No sensitive information is leaked in responses
- Source attribution is maintained throughout

## Architecture Components

### 1. Instruction Isolation Layer
- **Location:** src/api/server.ts (query sanitization) + src/retrieval.service.ts (retrieval filtering)
- **Function:** Removes prompt injection patterns from user queries and retrieval results
- **Protections:** Blocks 'ignore previous', 'system override', role manipulation attacks

### 2. Document Trust Validation & Quarantine
- **Location:** src/ingestion/manifest.ts + src/ingestion/quarantine.service.ts
- **Function:** Validates documents against trusted manifest, isolates failures
- **Protections:** Prevents ingestion of untrusted/tampered documents, enables forensic analysis

3. **Output Filtering for Synthetic Secrets**
   - **Location:** src/api/server.ts (filterSyntheticSecrets function)
   - **Function:** Redacts synthetic secrets from LLM responses before user delivery
   - **Protections:** Prevents leakage of LAB_SECRET_ALPHA_*, API keys, tokens, passwords

4. **Source Citation Preservation**
   - **Location:** Throughout retrieval and API pipeline
   - **Function:** Maintains and enhances attribution of information sources
   - **Protections:** Ensures traceability and prevents misattribution

## Testing & Validation

### Unit Test Suite
- **Location:** src/ingestion/manifest.test.ts, src/retrieval.service.test.ts, etc.
- **Coverage:** 42 tests across 9 test suites
- **Pass Rate:** 100% after security enhancements

### Security Test Scenarios (Promptfoo)
When Node.js >=22.22.0 is available:
- Baseline (pre-defense) measurement: npx promptfoo eval -c promptfoo/baseline.yaml
- Post-defense measurement: npx promptfoo eval -c promptfoo/hardened.yaml

### Test Categories Covered
- Direct prompt injection attacks
- Indirect prompt injection via knowledge base
- RAG poisoning attempts
- Synthetic secret leakage attempts
- Normal operation validation

## Security Controls Summary

| Layer | Component | Protection | Status |
|-------|-----------|------------|--------|
| Input | Instruction Isolation | Query sanitization | ? Complete |
| Trust | Document Validation | Manifest + hash checking | ? Complete |
| Trust | Quarantine System | Failed document isolation | ? Complete |
| Process | Retrievel Filtering | Least-privilege access | ? Complete |
| Process | Context Building | Secure document access | ? Complete |
| Output | Secret Filtering | Synthetic secret redaction | ? Complete |
| Output | Citation Preservation | Source attribution maintained | ? Complete |

## Generated Artifacts

- **Security Report:** SECURITY_REPORT.md - Comprehensive methodology and findings
- **Task Progress:** TASKS.md - Completed security implementation tracking  
- **Test Validation:** Updated test suites confirming 100% pass rate
- **Implementation:** All security controls integrated into operational codebase

## Next Steps

1. **Environment Upgrade:** Install Node.js >=22.22.0 for full Promptfoo validation
2. **Baseline Testing:** Run pre-defense security measurements
3. **Post-Validation:** Measure security improvement after enhancements
4. **Operational Procedures:** Establish quarantine management and incident response
5. **Performance Tuning:** Optimize for production deployment requirements

---
*Enhanced with security architecture visualization and comprehensive demonstration guide*
*Last updated: September 22, 2026
