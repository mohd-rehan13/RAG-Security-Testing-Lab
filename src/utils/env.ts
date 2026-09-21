// Environment validation utility
import { config } from 'dotenv';

// Load environment variables from .env file
config();

/**
 * Validates that required environment variables are set
 * @throws {Error} If any required environment variable is missing
 */
export function validateEnvironment(): void {
  const requiredVars = [
    'OLLAMA_BASE_URL',
    'OLLAMA_MODEL',
    'RAG_API_PORT',
    'REPORT_OUTPUT_DIR'
  ];
  
  const missingVars = requiredVars.filter(varName => !process.env[varName as keyof NodeJS.ProcessEnv]);

  if (missingVars.length > 0) {
    throw new Error(
      'Missing required environment variables: ' + missingVars.join(', ') + '. ' +
      'Please check your .env file.'
    );
  }
}

/**
 * Gets the Ollama base URL from environment variables
 * @returns {string} Ollama base URL
 */
export function getOllamaBaseUrl(): string {
  return process.env['OLLAMA_BASE_URL'] || 'http://localhost:11434';
}

/**
 * Gets the Ollama model from environment variables
 * @returns {string} Ollama model name
 */
export function getOllamaModel(): string {
  return process.env['OLLAMA_MODEL'] || 'llama3.2:3b';
}

/**
 * Gets the API port from environment variables
 * @returns {number} API port
 */
export function getApiPort(): number {
  return parseInt(process.env['RAG_API_PORT'] || '3001', 10);
}

/**
 * Gets the report output directory from environment variables
 * @returns {string} Report output directory
 */
export function getReportOutputDir(): string {
  return process.env['REPORT_OUTPUT_DIR'] || 'reports';
}
