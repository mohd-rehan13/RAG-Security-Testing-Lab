export interface TrustedDocument {
    path: string;
    expectedHash: string;
    description?: string;
}
export interface QuarantineReason {
    reason: 'HASH_MISMATCH' | 'DISALLOWED_METADATA' | 'NOT_IN_MANIFEST';
    details: string;
}
export declare const TRUSTED_DOCUMENTS: TrustedDocument[];
export declare const DISALLOWED_PATTERNS: RegExp[];
export declare function calculateDocumentHash(content: string): string;
export declare function validateDocument(documentPath: string, content: string): QuarantineReason | null;
//# sourceMappingURL=manifest.d.ts.map