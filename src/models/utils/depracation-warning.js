/** Logs a deprecation warning to the console.
 * @param {string} name - The name of the deprecated feature.
 */
export function deprecationWarning(name) {
  console.warn('You are using a deprecated feature scheduled for removal: ' + name);
}
