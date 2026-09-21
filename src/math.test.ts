import { add, subtract } from './math.test';

describe('math functions', () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(add(1, 2)).toBe(3);
  });

  test('subtracts 2 from 5 to equal 3', () => {
    expect(subtract(5, 2)).toBe(3);
  });
});
