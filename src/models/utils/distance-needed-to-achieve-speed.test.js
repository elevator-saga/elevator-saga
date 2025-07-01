import { distanceNeededToAchieveSpeed } from './distance-needed-to-achieve-speed';

describe('distanceNeededToAchieveSpeed', () => {
  it('calculates distance needed to accelerate from 0 to 10 with acceleration 2', () => {
    // v^2 = u^2 + 2ad => d = (v^2 - u^2) / (2a)
    // (10^2 - 0^2) / (2*2) = 100 / 4 = 25
    expect(distanceNeededToAchieveSpeed(0, 10, 2)).toBe(25);
  });

  it('calculates distance needed to accelerate from 5 to 15 with acceleration 2', () => {
    // (15^2 - 5^2) / (2*2) = (225 - 25) / 4 = 200 / 4 = 50
    expect(distanceNeededToAchieveSpeed(5, 15, 2)).toBe(50);
  });

  it('returns 0 if currentSpeed equals targetSpeed', () => {
    expect(distanceNeededToAchieveSpeed(10, 10, 2)).toBe(0);
  });

  it('calculates negative distance if decelerating', () => {
    // (5^2 - 10^2) / (2*2) = (25 - 100) / 4 = -75 / 4 = -18.75
    expect(distanceNeededToAchieveSpeed(10, 5, 2)).toBe(-18.75);
  });

  it('handles negative acceleration (deceleration)', () => {
    // (0^2 - 10^2) / (2*-2) = (-100) / -4 = 25
    expect(distanceNeededToAchieveSpeed(10, 0, -2)).toBe(25);
  });

  it('returns Infinity if acceleration is zero', () => {
    expect(distanceNeededToAchieveSpeed(0, 10, 0)).toBe(Infinity);
  });

  it('returns NaN if any argument is NaN', () => {
    expect(distanceNeededToAchieveSpeed(NaN, 10, 2)).toBeNaN();
    expect(distanceNeededToAchieveSpeed(0, NaN, 2)).toBeNaN();
    expect(distanceNeededToAchieveSpeed(0, 10, NaN)).toBeNaN();
  });
});
