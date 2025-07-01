import { epsilonEquals } from './epsilon-equals';

describe('epsilonEquals', () => {
  it('returns true for numbers that are exactly equal', () => {
    expect(epsilonEquals(1, 1)).toBe(true);
    expect(epsilonEquals(0, 0)).toBe(true);
    expect(epsilonEquals(-5, -5)).toBe(true);
  });

  it('returns true for numbers within epsilon', () => {
    expect(epsilonEquals(1, 1 + 1e-9)).toBe(true);
    expect(epsilonEquals(100, 100.000000005)).toBe(true);
    expect(epsilonEquals(-2, -2.000000009)).toBe(true);
  });

  it('returns false for numbers outside epsilon', () => {
    expect(epsilonEquals(1, 1.00001)).toBe(false);
    expect(epsilonEquals(0, 1e-7)).toBe(false);
    expect(epsilonEquals(-5, -5.0001)).toBe(false);
  });

  it('handles edge cases with NaN and Infinity', () => {
    expect(epsilonEquals(NaN, NaN)).toBe(false);
    expect(epsilonEquals(Infinity, Infinity)).toBe(false);
    expect(epsilonEquals(-Infinity, -Infinity)).toBe(false);
    expect(epsilonEquals(Infinity, -Infinity)).toBe(false);
    expect(epsilonEquals(1, NaN)).toBe(false);
    expect(epsilonEquals(NaN, 1)).toBe(false);
  });
});
