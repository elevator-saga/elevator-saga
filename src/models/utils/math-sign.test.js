import { sign } from './math-sign';

describe('sign', () => {
  it('returns 1 for positive numbers', () => {
    expect(sign(10)).toBe(1);
    expect(sign(0.5)).toBe(1);
    expect(sign(Number.POSITIVE_INFINITY)).toBe(1);
  });

  it('returns -1 for negative numbers', () => {
    expect(sign(-5)).toBe(-1);
    expect(sign(-0.5)).toBe(-1);
    expect(sign(Number.NEGATIVE_INFINITY)).toBe(-1);
  });

  it('returns 0 for 0', () => {
    expect(sign(0)).toBe(0);
  });

  it('returns 0 for -0', () => {
    expect(Object.is(sign(-0), -0)).toBe(true);
  });

  it('returns NaN for NaN', () => {
    expect(Number.isNaN(sign(NaN))).toBe(true);
  });

  it('converts string numbers correctly', () => {
    expect(sign('8')).toBe(1);
    expect(sign('-3')).toBe(-1);
    expect(sign('0')).toBe(0);
  });

  it('returns NaN for non-numeric strings', () => {
    expect(Number.isNaN(sign('foo'))).toBe(true);
  });

  it('returns NaN for undefined and null', () => {
    expect(Number.isNaN(sign(undefined))).toBe(true);
    expect(sign(null)).toBe(0); // +null is 0
  });
});
