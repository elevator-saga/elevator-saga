/**
 * Creates a requirement object that imposes no constraints.
 *
 * @returns {{description: string, evaluate: function(): null}} An object with a description and an evaluate function that always returns null.
 */
export function requireNothing() {
  return {
    description: 'No requirement',
    evaluate: function () {
      return null;
    },
  };
}
