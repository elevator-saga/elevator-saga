import { requireUserCountWithinMoves } from './require-user-count-within-moves';

describe('requireUserCountWithinMoves', () => {
  const userCount = 5;
  const moveLimit = 10;
  let challenge;

  beforeEach(() => {
    challenge = requireUserCountWithinMoves(userCount, moveLimit);
  });

  it('should return the correct description', () => {
    expect(challenge.description).toContain(`${userCount}`);
    expect(challenge.description).toContain(`${moveLimit}`);
    expect(challenge.description).toMatch(/Transport.*people.*elevator moves or less/);
  });

  it('should return null if neither moveLimit nor userCount reached', () => {
    const world = { moveCount: 3, transportedCounter: 2 };
    expect(challenge.evaluate(world)).toBeNull();
  });

  it('should return true if both userCount and moveLimit are exactly met', () => {
    const world = { moveCount: 10, transportedCounter: 5 };
    expect(challenge.evaluate(world)).toBe(true);
  });

  it('should return true if userCount is exceeded but moveLimit is not', () => {
    const world = { moveCount: 8, transportedCounter: 6 };
    expect(challenge.evaluate(world)).toBe(true);
  });

  it('should return true if moveLimit is not exceeded but userCount is exactly met', () => {
    const world = { moveCount: 7, transportedCounter: 5 };
    expect(challenge.evaluate(world)).toBe(true);
  });

  it('should return false if moveLimit is exceeded even if userCount is met', () => {
    const world = { moveCount: 11, transportedCounter: 5 };
    expect(challenge.evaluate(world)).toBe(false);
  });

  it('should return false if userCount is not met but moveLimit is reached', () => {
    const world = { moveCount: 10, transportedCounter: 4 };
    expect(challenge.evaluate(world)).toBe(false);
  });

  it('should return false if both moveLimit and userCount are not met but moveLimit is exceeded', () => {
    const world = { moveCount: 12, transportedCounter: 3 };
    expect(challenge.evaluate(world)).toBe(false);
  });
});
