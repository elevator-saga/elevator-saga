import { limitNumber } from './limit-number';

describe('limitNumber', () => {
  it('returns the number itself when within the range', () => {
    expect(limitNumber(5, 1, 10)).toBe(5);
    expect(limitNumber(1, 1, 10)).toBe(1);
    expect(limitNumber(10, 1, 10)).toBe(10);
    expect(limitNumber(7.5, 1, 10)).toBe(7.5);
  });

  it('returns the min when the number is less than min', () => {
    expect(limitNumber(0, 1, 10)).toBe(1);
    expect(limitNumber(-5, 1, 10)).toBe(1);
    expect(limitNumber(-100, 0, 0)).toBe(0);
  });

  it('returns the max when the number is greater than max', () => {
    expect(limitNumber(15, 1, 10)).toBe(10);
    expect(limitNumber(100, 1, 10)).toBe(10);
    expect(limitNumber(1, -10, 0)).toBe(0);
  });

  it('works when min and max are equal', () => {
    expect(limitNumber(5, 3, 3)).toBe(3);
    expect(limitNumber(3, 3, 3)).toBe(3);
    expect(limitNumber(-1, -1, -1)).toBe(-1);
  });

  it('works with negative ranges', () => {
    expect(limitNumber(-5, -10, -1)).toBe(-5);
    expect(limitNumber(-15, -10, -1)).toBe(-10);
    expect(limitNumber(0, -10, -1)).toBe(-1);
  });

  it('works with floating point numbers', () => {
    expect(limitNumber(2.5, 1.1, 3.3)).toBe(2.5);
    expect(limitNumber(0.5, 1.1, 3.3)).toBe(1.1);
    expect(limitNumber(4.4, 1.1, 3.3)).toBe(3.3);
  });
});
