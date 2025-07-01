import { makeAverageResult } from './make-average-result';

describe('makeAverageResult', () => {
  it('should compute the average for each property in result objects', () => {
    const results = [
      { options: { foo: 1 }, result: { a: 2, b: 4 } },
      { options: { foo: 1 }, result: { a: 4, b: 6 } },
      { options: { foo: 1 }, result: { a: 6, b: 8 } },
    ];
    const averaged = makeAverageResult(results);
    expect(averaged).toEqual({
      options: { foo: 1 },
      result: { a: 4, b: 6 },
    });
  });

  it('should handle a single result object', () => {
    const results = [{ options: { bar: 2 }, result: { x: 10, y: 20 } }];
    const averaged = makeAverageResult(results);
    expect(averaged).toEqual({
      options: { bar: 2 },
      result: { x: 10, y: 20 },
    });
  });

  it('should handle properties with zero values', () => {
    const results = [
      { options: { baz: 3 }, result: { m: 0, n: 5 } },
      { options: { baz: 3 }, result: { m: 0, n: 15 } },
    ];
    const averaged = makeAverageResult(results);
    expect(averaged).toEqual({
      options: { baz: 3 },
      result: { m: 0, n: 10 },
    });
  });

  it('should return NaN for properties missing in some results', () => {
    const results = [
      { options: { foo: 1 }, result: { a: 2, b: 4 } },
      { options: { foo: 1 }, result: { a: 4 } },
      { options: { foo: 1 }, result: { a: 6, b: 8 } },
    ];
    const averaged = makeAverageResult(results);
    expect(averaged.result.a).toBe(4);
    expect(Number.isNaN(averaged.result.b)).toBe(true);
  });

  it('should throw if results array is empty', () => {
    expect(() => makeAverageResult([])).toThrow();
  });
});
