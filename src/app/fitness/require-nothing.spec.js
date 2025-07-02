import { requireNothing } from './require-nothing';

describe('requireNothing', () => {
  it('should return an object with the correct description', () => {
    const req = requireNothing();
    expect(req).toHaveProperty('description', 'No requirement');
  });

  it('should return an object with an evaluate function', () => {
    const req = requireNothing();
    expect(typeof req.evaluate).toBe('function');
  });

  it('evaluate function should always return null', () => {
    const req = requireNothing();
    expect(req.evaluate()).toBeNull();
  });
});
