import { requireUserCountWithinTime } from './require-user-count-within-time';

describe('requireUserCountWithinTime', () => {
  const userCount = 10;
  const timeLimit = 60;

  it('should return correct description', () => {
    const challenge = requireUserCountWithinTime(userCount, timeLimit);
    expect(challenge.description).toBe(
      "Transport <span class='emphasis-color'>10</span> people in <span class='emphasis-color'>60</span> seconds or less"
    );
  });

  describe('evaluate', () => {
    let challenge;
    beforeEach(() => {
      challenge = requireUserCountWithinTime(userCount, timeLimit);
    });

    it('should return null if neither time nor user count reached', () => {
      const world = { elapsedTime: 30, transportedCounter: 5 };
      expect(challenge.evaluate(world)).toBeNull();
    });

    it('should return true if user count reached within time', () => {
      const world = { elapsedTime: 50, transportedCounter: 10 };
      expect(challenge.evaluate(world)).toBe(true);
    });

    it('should return false if user count not reached but time limit reached', () => {
      const world = { elapsedTime: 60, transportedCounter: 8 };
      expect(challenge.evaluate(world)).toBe(false);
    });

    it('should return false if time exceeded even if user count reached', () => {
      const world = { elapsedTime: 61, transportedCounter: 10 };
      expect(challenge.evaluate(world)).toBe(false);
    });

    it('should return true if both time and user count exactly met', () => {
      const world = { elapsedTime: 60, transportedCounter: 10 };
      expect(challenge.evaluate(world)).toBe(true);
    });

    it('should return true if user count exceeded within time', () => {
      const world = { elapsedTime: 40, transportedCounter: 15 };
      expect(challenge.evaluate(world)).toBe(true);
    });

    it('should return false if time exceeded and user count not reached', () => {
      const world = { elapsedTime: 70, transportedCounter: 5 };
      expect(challenge.evaluate(world)).toBe(false);
    });
  });
});
