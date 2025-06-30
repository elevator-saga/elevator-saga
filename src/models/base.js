// Console shim
(function () {
  const f = function () {};
  if (!console) {
    console = {
      log: f,
      info: f,
      warn: f,
      debug: f,
      error: f,
    };
  }
})();

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

// Polyfill from MDN

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

/** Logs a deprecation warning to the console.
 * @param {string} name - The name of the deprecated feature.
 */
function deprecationWarning(name) {
  console.warn('You are using a deprecated feature scheduled for removal: ' + name);
}

/** * Throws an error if the object is not an instance of the specified type.
 * @param {Object} obj - The object to check.
 * @param {Function} type - The constructor function of the expected type.
 * @throws Will throw an error if obj is not an instance of type.
 * @example
 * newGuard(new MyClass(), MyClass); // No error
 * newGuard({}, MyClass); // Throws an error
 */
export function newGuard(obj, type) {
  if (!(obj instanceof type)) {
    throw 'Incorrect instantiation, got ' + typeof obj + ' but expected ' + type;
  }
}

/**
 * Creates a boolean passthrough function that sets a property on an object and triggers a change event.
 * @param {Object} owner - The owner of the function, typically the context in which it is used.
 * @param {Object} obj - The object on which the property will be set.
 * @param {string} objPropertyName - The name of the property to set on the object.
 * @returns {Function} - A function that takes a value, sets the property, and triggers a change event.
 */
export function createBoolPassthroughFunction(owner, obj, objPropertyName) {
  return function (val) {
    if (typeof val !== 'undefined') {
      obj[objPropertyName] = val ? true : false;
      obj.trigger('change:' + objPropertyName, obj[objPropertyName]);
      return owner;
    } else {
      return obj[objPropertyName];
    }
  };
}

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

// Fake frame requester helper used for testing and fitness simulations

/**
 * Creates a frame requester that triggers a callback at specified time intervals.
 * @param {number} timeStep - The time step for each frame in milliseconds.
 * @returns {Object} - An object with methods to register a callback and trigger it.
 */
export function createFrameRequester(timeStep) {
  let currentCb = null;
  let requester = {};
  requester.currentT = 0.0;
  requester.register = function (cb) {
    currentCb = cb;
  };
  requester.trigger = function () {
    requester.currentT += timeStep;
    if (currentCb !== null) {
      currentCb(requester.currentT);
    }
  };
  return requester;
}

/**
 * Parses a string of code into an object with `init` and `update` methods.
 * The code should be a valid JavaScript object literal or function.
 * @param {string} code - The code string to parse.
 * @returns {Object} - An object containing the parsed code with `init` and `update` methods.
 * @throws Will throw an error if the code does not contain `init` or `update` functions.
 */
export function getCodeObjFromCode(code) {
  if (code.trim().substr(0, 1) == '{' && code.trim().substr(-1, 1) == '}') {
    code = '(' + code + ')';
  }
  /* jslint evil:true */
  let obj = eval(code);
  /* jshint evil:false */
  if (typeof obj.init !== 'function') {
    throw 'Code must contain an init function';
  }
  if (typeof obj.update !== 'function') {
    throw 'Code must contain an update function';
  }
  return obj;
}
