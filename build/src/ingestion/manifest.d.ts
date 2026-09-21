export interface TrustedDocument {
    path: string;
    expectedHash: string;
    description?: string;
}
export declare const TRUSTED_DOCUMENTS: TrustedDocument[];
export declare function calculateDocumentHash(content: string): string;
export declare function validateDocument(documentPath: string, content: string): boolean;
//# sourceMappingURL=manifest.d.ts.map