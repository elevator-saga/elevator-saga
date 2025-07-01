import { requireDemo } from './require-demo';

describe('requireDemo', () => {
  it('should return an object with the correct description', () => {
    const result = requireDemo();
    expect(result).toHaveProperty('description', 'Perpetual demo');
  });

  it('should return an object with an evaluate function', () => {
    const result = requireDemo();
    expect(typeof result.evaluate).toBe('function');
  });

  it('evaluate function should always return null', () => {
    const result = requireDemo();
    expect(result.evaluate()).toBeNull();
  });
});
