import { requireUserCountWithinTimeWithMaxWaitTime } from './require-user-count-within-time-with-max-wait-time';

describe('requireUserCountWithinTimeWithMaxWaitTime', () => {
  const userCount = 10;
  const timeLimit = 60;
  const maxWaitTime = 8.5;

  it('should generate the correct description', () => {
    const challenge = requireUserCountWithinTimeWithMaxWaitTime(userCount, timeLimit, maxWaitTime);
    expect(challenge.description).toBe(
      "Transport <span class='emphasis-color'>10</span> people in <span class='emphasis-color'>60</span> seconds or less and let no one wait more than <span class='emphasis-color'>8.5</span> seconds"
    );
  });

  describe('evaluate', () => {
    let challenge;
    let world;
    beforeEach(() => {
      challenge = requireUserCountWithinTimeWithMaxWaitTime(userCount, timeLimit, maxWaitTime);
    });

    it('should return null if neither timeLimit nor userCount reached', () => {
      world = { elapsedTime: 30, maxWaitTime: 5, transportedCounter: 5 };
      expect(challenge.evaluate(world)).toBeNull();
    });

    it('should return true if all conditions are met (exact values)', () => {
      world = { elapsedTime: 60, maxWaitTime: 8.5, transportedCounter: 10 };
      expect(challenge.evaluate(world)).toBe(true);
    });

    it('should return true if all conditions are met (over values)', () => {
      world = { elapsedTime: 50, maxWaitTime: 7, transportedCounter: 12 };
      expect(challenge.evaluate(world)).toBe(true);
    });

    it('should return false if elapsedTime exceeds timeLimit', () => {
      world = { elapsedTime: 61, maxWaitTime: 8, transportedCounter: 10 };
      expect(challenge.evaluate(world)).toBe(false);
    });

    it('should return false if maxWaitTime exceeds limit', () => {
      world = { elapsedTime: 59, maxWaitTime: 9, transportedCounter: 10 };
      expect(challenge.evaluate(world)).toBe(false);
    });

    it('should return false if not enough users transported', () => {
      world = { elapsedTime: 61, maxWaitTime: 8, transportedCounter: 9 };
      expect(challenge.evaluate(world)).toBe(false);
    });

    it('should return true if all conditions are met exactly', () => {
      world = { elapsedTime: 60, maxWaitTime: 8.5, transportedCounter: 10 };
      expect(challenge.evaluate(world)).toBe(true);
    });

    it('should return true if all conditions are met and values are under the limits', () => {
      world = { elapsedTime: 50, maxWaitTime: 7, transportedCounter: 12 };
      expect(challenge.evaluate(world)).toBe(true);
    });

    it('should return true if transportedCounter exceeds userCount and other conditions are met', () => {
      world = { elapsedTime: 40, maxWaitTime: 6, transportedCounter: 15 };
      expect(challenge.evaluate(world)).toBe(true);
    });

    it('should return false if multiple conditions are not met', () => {
      world = { elapsedTime: 70, maxWaitTime: 10, transportedCounter: 8 };
      expect(challenge.evaluate(world)).toBe(false);
    });
  });
});
