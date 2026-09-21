"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReportOutputDir = exports.getApiPort = exports.getOllamaModel = exports.getOllamaBaseUrl = exports.validateEnvironment = void 0;
// Environment validation utility
const dotenv_1 = require("dotenv");
// Load environment variables from .env file
(0, dotenv_1.config)();
/**
 * Validates that required environment variables are set
 * @throws {Error} If any required environment variable is missing
 */
function validateEnvironment() {
    const requiredVars = [
        'OLLAMA_BASE_URL',
        'OLLAMA_MODEL',
        'RAG_API_PORT',
        'REPORT_OUTPUT_DIR'
    ];
    const missingVars = requiredVars.filter(varName => !process.env[varName]);
    if (missingVars.length > 0) {
        throw new Error('Missing required environment variables: ' + missingVars.join(', ') + '. ' +
            'Please check your .env file.');
    }
}
exports.validateEnvironment = validateEnvironment;
/**
 * Gets the Ollama base URL from environment variables
 * @returns {string} Ollama base URL
 */
function getOllamaBaseUrl() {
    return process.env['OLLAMA_BASE_URL'] || 'http://localhost:11434';
}
exports.getOllamaBaseUrl = getOllamaBaseUrl;
/**
 * Gets the Ollama model from environment variables
 * @returns {string} Ollama model name
 */
function getOllamaModel() {
    return process.env['OLLAMA_MODEL'] || 'llama3.2:3b';
}
exports.getOllamaModel = getOllamaModel;
/**
 * Gets the API port from environment variables
 * @returns {number} API port
 */
function getApiPort() {
    return parseInt(process.env['RAG_API_PORT'] || '3001', 10);
}
exports.getApiPort = getApiPort;
/**
 * Gets the report output directory from environment variables
 * @returns {string} Report output directory
 */
function getReportOutputDir() {
    return process.env['REPORT_OUTPUT_DIR'] || 'reports';
}
exports.getReportOutputDir = getReportOutputDir;
//# sourceMappingURL=env.js.map