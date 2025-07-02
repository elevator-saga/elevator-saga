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
      obj.emit('change:' + objPropertyName, obj[objPropertyName]);
      return owner;
    } else {
      return obj[objPropertyName];
    }
  };
}
