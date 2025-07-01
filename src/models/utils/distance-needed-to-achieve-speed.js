/**
 * Calculates the distance needed to achieve a target speed from a current speed with a given acceleration.
 * @param {number} currentSpeed - The current speed of the object.
 * @param {number} targetSpeed - The target speed to achieve.
 * @param {number} acceleration - The acceleration applied to the object.
 * @returns {number} - The distance required to reach the target speed.
 */
export function distanceNeededToAchieveSpeed(currentSpeed, targetSpeed, acceleration) {
  // v² = u² + 2a * d
  const requiredDistance = (Math.pow(targetSpeed, 2) - Math.pow(currentSpeed, 2)) / (2 * acceleration);
  return requiredDistance;
}
