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
