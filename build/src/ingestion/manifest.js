"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDocument = exports.calculateDocumentHash = exports.TRUSTED_DOCUMENTS = void 0;
// List of trusted documents for the knowledge base
exports.TRUSTED_DOCUMENTS = [
    {
        path: 'tests/fixtures/knowledge_base_clean/company_handbook.md',
        expectedHash: 'F8B86D36F44F902EE0684A8E70AC3DE6EE4F3012B5CCDB54B557188DFFDF89BD',
        description: 'Company office hours and leave policy'
    }
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
function validateDocument(documentPath, content) {
    const trustedDoc = exports.TRUSTED_DOCUMENTS.find(doc => doc.path === documentPath);
    if (!trustedDoc) {
        // Document not in the trusted list
        return false;
    }
    const actualHash = calculateDocumentHash(content);
    return actualHash === trustedDoc.expectedHash;
}
exports.validateDocument = validateDocument;
//# sourceMappingURL=manifest.js.map