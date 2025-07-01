/**
 * Compares two numbers for equality within a small epsilon value.
 * This is useful for floating-point comparisons to avoid precision issues.
 * @param {number} a - The first number to compare.
 * @param {number} b - The second number to compare.
 * @returns {boolean} - Returns true if the numbers are equal within the epsilon range, false otherwise.
 */
export function epsilonEquals(a, b) {
  return Math.abs(a - b) < 0.00000001;
}
