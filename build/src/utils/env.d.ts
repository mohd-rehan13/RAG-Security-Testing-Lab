/**
 * Validates that required environment variables are set
 * @throws {Error} If any required environment variable is missing
 */
export declare function validateEnvironment(): void;
/**
 * Gets the Ollama base URL from environment variables
 * @returns {string} Ollama base URL
 */
export declare function getOllamaBaseUrl(): string;
/**
 * Gets the Ollama model from environment variables
 * @returns {string} Ollama model name
 */
export declare function getOllamaModel(): string;
/**
 * Gets the API port from environment variables
 * @returns {number} API port
 */
export declare function getApiPort(): number;
/**
 * Gets the report output directory from environment variables
 * @returns {string} Report output directory
 */
export declare function getReportOutputDir(): string;
//# sourceMappingURL=env.d.ts.map