/**
 * Calculates the acceleration needed to achieve a change in speed over a given distance.
 * @param {number} currentSpeed - The current speed of the object.
 * @param {number} targetSpeed - The target speed to achieve.
 * @param {number} distance - The distance over which the speed change should occur.
 * @returns {number} - The required acceleration to achieve the speed change.
 */
export function accelerationNeededToAchieveChangeDistance(currentSpeed, targetSpeed, distance) {
  // v² = u² + 2a * d
  const requiredAcceleration = 0.5 * ((Math.pow(targetSpeed, 2) - Math.pow(currentSpeed, 2)) / distance);
  return requiredAcceleration;
}
