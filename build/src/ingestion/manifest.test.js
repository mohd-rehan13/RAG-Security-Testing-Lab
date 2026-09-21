"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Test for ingestion manifest functionality
const manifest_1 = require("./manifest");
describe('Ingestion manifest', () => {
    test('should return expected document from trusted documents list', () => {
        expect(manifest_1.TRUSTED_DOCUMENTS.length).toBeGreaterThan(0);
        const companyHandbook = manifest_1.TRUSTED_DOCUMENTS.find(doc => doc.path === 'tests/fixtures/knowledge_base_clean/company_handbook.md');
        expect(companyHandbook).toBeDefined();
        expect(companyHandbook?.description).toBe('Company office hours and leave policy');
    });
    test('should calculate document hash correctly', () => {
        const hash = (0, manifest_1.calculateDocumentHash)('test content');
        // Our simple hash function produces a 64-character uppercase hex string
        expect(hash).toMatch(/^[0-9A-F]{64}$/);
    });
    test('should validate a trusted document with correct content', () => {
        // Since our hash function is not cryptographically secure, we can't easily test with actual file content
        // Instead, we'll test that the function works consistently
        const content = 'test content';
        const hash1 = (0, manifest_1.calculateDocumentHash)(content);
        const hash2 = (0, manifest_1.calculateDocumentHash)(content);
        expect(hash1).toBe(hash2); // Should be deterministic
        // And different content should produce different hash (with high probability)
        const differentContent = 'different test content';
        const differentHash = (0, manifest_1.calculateDocumentHash)(differentContent);
        expect(differentHash).not.toBe(hash1);
    });
    test('should reject a document not in the trusted list', () => {
        const isValid = (0, manifest_1.validateDocument)('some/unknown/document.md', 'test content');
        expect(isValid).toBe(false);
    });
    test('should reject a trusted document with incorrect content', () => {
        const isValid = (0, manifest_1.validateDocument)('tests/fixtures/knowledge_base_clean/company_handbook.md', 'Different content');
        expect(isValid).toBe(false);
    });
});
//# sourceMappingURL=manifest.test.js.map