/**
 * Limits a number to a specified range.
 * @param {number} num - The number to limit.
 * @param {number} min - The minimum value of the range.
 * @param {number} max - The maximum value of the range.
 * @returns {number} - Returns the number limited to the specified range.
 * If the number is less than min, it returns min; if greater than max,
 * it returns max; otherwise, it returns the number itself.
 * @example
 * limitNumber(5, 1, 10); // returns 5
 * limitNumber(0, 1, 10); // returns 1
 * limitNumber(15, 1, 10); // returns 10
 */
export function limitNumber(num, min, max) {
  return Math.min(max, Math.max(num, min));
}
