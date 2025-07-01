/**
 * Returns a perpetual demo challenge that does not require any specific conditions.
 * @returns {Object} - An object containing the challenge description and an evaluation function that always returns null.
 */
export function requireDemo() {
  return {
    description: 'Perpetual demo',
    evaluate: function () {
      return null;
    },
  };
}
