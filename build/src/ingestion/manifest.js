"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDocument = exports.calculateDocumentHash = exports.DISALLOWED_PATTERNS = exports.TRUSTED_DOCUMENTS = void 0;
// List of trusted documents for the knowledge base
exports.TRUSTED_DOCUMENTS = [
    {
        path: 'tests/fixtures/knowledge_base_clean/company_handbook.md',
        expectedHash: '0000000000000000000000000000000000000000000000000000000034E473DC',
        description: 'Company office hours and leave policy'
    }
];
// Disallowed patterns that indicate potentially malicious content
exports.DISALLOWED_PATTERNS = [
    /ignore\s+previous\s+instructions/i,
    /system\s*override/i,
    /reveal\s+.*secret/i,
    /api\s*key\s*[:=]/i,
    /password\s*[:=]/i,
    /secret\s*[:=]/i,
    /\$\{[^}]+\}/g, // Template literals
    /<script>/i,
    /javascript:/i,
    /vbscript:/i,
    /onload\s*=/
];
// Function to calculate the hash for a document
function calculateDocumentHash(content) {
    // Using the SubtleCrypto API would be ideal but not available in Node.js without webcrypto
    // For now, we'll use a simple hash function for demonstration
    // In a real implementation, you'd use Node.js crypto module properly imported
    let hash = 0;
    for (let i = 0; i < content.length; i++) {
        const char = content.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    // Convert to hex string (not cryptographically secure but fine for demo)
    return Math.abs(hash).toString(16).padStart(64, '0').toUpperCase();
}
exports.calculateDocumentHash = calculateDocumentHash;
// Function to validate a document against the manifest
// Returns null if valid, or QuarantineReason if invalid
function validateDocument(documentPath, content) {
    // Check if document is in trusted manifest
    const trustedDoc = exports.TRUSTED_DOCUMENTS.find(doc => doc.path === documentPath);
    if (!trustedDoc) {
        // Document not in the trusted list
        return {
            reason: 'NOT_IN_MANIFEST',
            details: `Document ${documentPath} is not in the trusted source manifest`
        };
    }
    // Check for disallowed metadata/content patterns
    for (const pattern of exports.DISALLOWED_PATTERNS) {
        if (pattern.test(content)) {
            return {
                reason: 'DISALLOWED_METADATA',
                details: `Content matched disallowed pattern: ${pattern}`
            };
        }
    }
    // Check content integrity via hash verification
    const actualHash = calculateDocumentHash(content);
    if (actualHash !== trustedDoc.expectedHash) {
        return {
            reason: 'HASH_MISMATCH',
            details: `Expected hash: ${trustedDoc.expectedHash}, Actual hash: ${actualHash}`
        };
    }
    // Document passed all validation checks
    return null;
}
exports.validateDocument = validateDocument;
//# sourceMappingURL=manifest.js.map