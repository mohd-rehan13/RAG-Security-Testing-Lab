"use strict";
// Simple math functions
function add(a, b) {
    return a + b;
}
function subtract(a, b) {
    return a - b;
}
// Export for Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { add, subtract };
}
// Test suite
describe('math functions', () => {
    test('adds 1 + 2 to equal 3', () => {
        expect(add(1, 2)).toBe(3);
    });
    test('subtracts 2 from 5 to equal 3', () => {
        expect(subtract(5, 2)).toBe(3);
    });
});
//# sourceMappingURL=math.test.js.map