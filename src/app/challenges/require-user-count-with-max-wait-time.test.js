import { requireUserCountWithMaxWaitTime } from './require-user-count-with-max-wait-time';

describe('requireUserCountWithMaxWaitTime', () => {
  const userCount = 10;
  const maxWaitTime = 5.5;

  it('should generate the correct description', () => {
    const challenge = requireUserCountWithMaxWaitTime(userCount, maxWaitTime);
    expect(challenge.description).toBe(
      "Transport <span class='emphasis-color'>10</span> people and let no one wait more than <span class='emphasis-color'>5.5</span> seconds"
    );
  });

  describe('evaluate', () => {
    let challenge;
    beforeEach(() => {
      challenge = requireUserCountWithMaxWaitTime(userCount, maxWaitTime);
    });

    it('should return null if neither maxWaitTime nor transportedCounter reached', () => {
      const world = { maxWaitTime: 2, transportedCounter: 5 };
      expect(challenge.evaluate(world)).toBeNull();
    });

    it('should return true if both conditions are met (exact values)', () => {
      const world = { maxWaitTime: 5.5, transportedCounter: 10 };
      expect(challenge.evaluate(world)).toBe(true);
    });

    it('should return true if both conditions are met (over values)', () => {
      const world = { maxWaitTime: 5.0, transportedCounter: 12 };
      expect(challenge.evaluate(world)).toBe(true);
    });

    it('should return false if maxWaitTime exceeded but userCount met', () => {
      const world = { maxWaitTime: 6.0, transportedCounter: 10 };
      expect(challenge.evaluate(world)).toBe(false);
    });

    it('should return false if userCount not met but maxWaitTime reached', () => {
      const world = { maxWaitTime: 5.5, transportedCounter: 8 };
      expect(challenge.evaluate(world)).toBe(false);
    });

    it('should return false if both conditions are not met but one threshold is reached', () => {
      const world = { maxWaitTime: 6.0, transportedCounter: 8 };
      expect(challenge.evaluate(world)).toBe(false);
    });
  });
});
