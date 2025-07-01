/**
 * Returns the sign of a number, indicating whether it is positive, negative, or zero.
 * @param {number} x - The number to evaluate.
 * @returns {number} - Returns 1 if x is positive, -1 if x is negative, and 0 if x is zero or NaN.
 * @example
 * Math.sign(10); // returns 1
 * Math.sign(-5); // returns -1
 * Math.sign(0); // returns 0
 * Math.sign(NaN); // returns NaN
 */
function sign(x) {
  x = +x; // convert to a number
  if (x === 0 || isNaN(x)) {
    return x;
  }
  return x > 0 ? 1 : -1;
}

if (typeof Math.sign === 'undefined') {
  Math.sign = sign;
}

export { sign };
