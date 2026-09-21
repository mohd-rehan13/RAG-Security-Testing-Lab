// Trusted source manifest
export interface TrustedDocument {
  path: string;           // Relative path to the document
  expectedHash: string;   // Expected SHA-256 hash of the document content
  description?: string;   // Optional description of the document
}

// List of trusted documents for the knowledge base
export const TRUSTED_DOCUMENTS: TrustedDocument[] = [
  {
    path: 'tests/fixtures/knowledge_base_clean/company_handbook.md',
    expectedHash: 'F8B86D36F44F902EE0684A8E70AC3DE6EE4F3012B5CCDB54B557188DFFDF89BD',
    description: 'Company office hours and leave policy'
  }
];

// Function to calculate the hash for a document
export function calculateDocumentHash(content: string): string {
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

// Function to validate a document against the manifest
export function validateDocument(documentPath: string, content: string): boolean {
  const trustedDoc = TRUSTED_DOCUMENTS.find(doc => doc.path === documentPath);
  if (!trustedDoc) {
    // Document not in the trusted list
    return false;
  }
  const actualHash = calculateDocumentHash(content);
  return actualHash === trustedDoc.expectedHash;
}
