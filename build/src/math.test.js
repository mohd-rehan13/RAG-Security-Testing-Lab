"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const math_1 = require("./math");
describe('math functions', () => {
    test('adds 1 + 2 to equal 3', () => {
        expect((0, math_1.add)(1, 2)).toBe(3);
    });
    test('subtracts 2 from 5 to equal 3', () => {
        expect((0, math_1.subtract)(5, 2)).toBe(3);
    });
});
//# sourceMappingURL=math.test.js.map