/**
 * Requires a certain number of users to be transported within a specified number of elevator moves.
 * @param {number} userCount - The number of users to transport.
 * @param {number} moveLimit - The maximum number of elevator moves allowed.
 * @returns {Object} - An object containing the challenge description and evaluation function.
 */
export function requireUserCountWithinMoves(userCount, moveLimit) {
  return {
    description:
      "Transport <span class='emphasis-color'>" +
      userCount +
      "</span> people using <span class='emphasis-color'>" +
      moveLimit +
      '</span> elevator moves or less',
    evaluate: function (world) {
      if (world.moveCount >= moveLimit || world.transportedCounter >= userCount) {
        return world.moveCount <= moveLimit && world.transportedCounter >= userCount;
      } else {
        return null;
      }
    },
  };
}
