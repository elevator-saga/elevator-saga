import { accelerationNeededToAchieveChangeDistance } from './acceleration-needed-to-achieve-change-distance';

describe('accelerationNeededToAchieveChangeDistance', () => {
  it('calculates acceleration needed to increase speed over a distance', () => {
    const currentSpeed = 0; // Initial speed
    const targetSpeed = 10; // Target speed
    const distance = 20; // Distance over which to achieve the speed change
    const expectedAcceleration = 2.5; // Expected acceleration

    const actualAcceleration = accelerationNeededToAchieveChangeDistance(currentSpeed, targetSpeed, distance);
    // u = 0, v = 10, d = 20
    // a = 0.5 * ((100 - 0) / 20) = 0.5 * 5 = 2.5
    expect(actualAcceleration).toBeCloseTo(expectedAcceleration);
  });

  it('calculates acceleration needed to decrease speed over a distance', () => {
    const currentSpeed = 10; // Initial speed
    const targetSpeed = 0; // Target speed
    const distance = 20; // Distance over which to achieve the speed change
    const expectedAcceleration = -2.5; // Expected acceleration

    const actualAcceleration = accelerationNeededToAchieveChangeDistance(currentSpeed, targetSpeed, distance);
    // u = 10, v = 0, d = 20
    // a = 0.5 * ((0 - 100) / 20) = 0.5 * (-5) = -2.5
    expect(actualAcceleration).toBeCloseTo(expectedAcceleration);
  });

  it('returns 0 when currentSpeed equals targetSpeed', () => {
    const currentSpeed = 5; // Initial speed
    const targetSpeed = 5; // Target speed
    const distance = 10; // Distance over which to achieve the speed change
    const expectedAcceleration = 0; // Expected acceleration

    const actualAcceleration = accelerationNeededToAchieveChangeDistance(currentSpeed, targetSpeed, distance);
    // u = 5, v = 5, d = 10
    // a = 0.5 * ((25 - 25) / 10) = 0.5 * (0 / 10) = 0
    expect(actualAcceleration).toBeCloseTo(expectedAcceleration);
  });

  it('handles negative speeds (reverse direction)', () => {
    const currentSpeed = -5; // Initial speed
    const targetSpeed = 5; // Target speed
    const distance = 10; // Distance over which to achieve the speed change
    const expectedAcceleration = 0; // Expected acceleration

    const actualAcceleration = accelerationNeededToAchieveChangeDistance(currentSpeed, targetSpeed, distance);
    // u = -5, v = 5, d = 10
    // a = 0.5 * ((25 - 25) / 10) = 0
    expect(actualAcceleration).toBeCloseTo(expectedAcceleration);
  });

  it('throws or returns Infinity when distance is zero', () => {
    const currentSpeed = 0; // Initial speed
    const targetSpeed = 10; // Target speed
    const distance = 0; // Distance over which to achieve the speed change
    const expectedAcceleration = Infinity; // Expected acceleration

    const actualAcceleration = accelerationNeededToAchieveChangeDistance(currentSpeed, targetSpeed, distance);
    // u = 0, v = 10, d = 0
    // a = 0.5 * ((100 - 0) / 0)
    // This should return Infinity or throw an error
    expect(actualAcceleration).toBe(expectedAcceleration);
  });
});
