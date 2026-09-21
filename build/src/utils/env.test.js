"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Test for environment validation utility
const env_1 = require("../utils/env");
// Mock process.env for testing
const originalEnv = { ...process.env };
beforeEach(() => {
    // Restore original environment before each test
    process.env = { ...originalEnv };
});
afterAll(() => {
    // Restore original environment after all tests
    process.env = originalEnv;
});
describe('Environment validation', () => {
    test('should throw error when required environment variables are missing', () => {
        // Clear required environment variables
        delete process.env['OLLAMA_BASE_URL'];
        delete process.env['OLLAMA_MODEL'];
        delete process.env['RAG_API_PORT'];
        delete process.env['REPORT_OUTPUT_DIR'];
        expect(() => (0, env_1.validateEnvironment)()).toThrow(/Missing required environment variables: OLLAMA_BASE_URL, OLLAMA_MODEL, RAG_API_PORT, REPORT_OUTPUT_DIR/);
    });
    test('should not throw error when all required environment variables are present', () => {
        // Set required environment variables
        process.env['OLLAMA_BASE_URL'] = 'http://localhost:11434';
        process.env['OLLAMA_MODEL'] = 'llama3.2:3b';
        process.env['RAG_API_PORT'] = '3001';
        process.env['REPORT_OUTPUT_DIR'] = 'reports';
        expect(() => (0, env_1.validateEnvironment)()).not.toThrow();
    });
    test('should get Ollama base URL from environment variables', () => {
        process.env['OLLAMA_BASE_URL'] = 'http://custom-url:1234';
        expect((0, env_1.getOllamaBaseUrl)()).toBe('http://custom-url:1234');
    });
    test('should get Ollama model from environment variables', () => {
        process.env['OLLAMA_MODEL'] = 'custom-model:latest';
        expect((0, env_1.getOllamaModel)()).toBe('custom-model:latest');
    });
    test('should get API port from environment variables', () => {
        process.env['RAG_API_PORT'] = '8080';
        expect((0, env_1.getApiPort)()).toBe(8080);
    });
    test('should get report output directory from environment variables', () => {
        process.env['REPORT_OUTPUT_DIR'] = 'custom-reports';
        expect((0, env_1.getReportOutputDir)()).toBe('custom-reports');
    });
    test('should use default values when environment variables are not set', () => {
        // Clear environment variables to test defaults
        delete process.env['OLLAMA_BASE_URL'];
        delete process.env['OLLAMA_MODEL'];
        delete process.env['RAG_API_PORT'];
        delete process.env['REPORT_OUTPUT_DIR'];
        expect((0, env_1.getOllamaBaseUrl)()).toBe('http://localhost:11434');
        expect((0, env_1.getOllamaModel)()).toBe('llama3.2:3b');
        expect((0, env_1.getApiPort)()).toBe(3001);
        expect((0, env_1.getReportOutputDir)()).toBe('reports');
    });
});
//# sourceMappingURL=env.test.js.map