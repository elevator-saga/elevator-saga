/**
 * Requires a certain number of users to be transported within a time limit.
 * @param {number} userCount - The number of users to transport.
 * @param {number} timeLimit - The time limit in seconds.
 * @returns {Object} - An object containing the challenge description and evaluation function.
 */
export function requireUserCountWithinTime(userCount, timeLimit) {
  return {
    description:
      "Transport <span class='emphasis-color'>" +
      userCount +
      "</span> people in <span class='emphasis-color'>" +
      timeLimit.toFixed(0) +
      '</span> seconds or less',
    evaluate: function (world) {
      if (world.elapsedTime >= timeLimit || world.transportedCounter >= userCount) {
        return world.elapsedTime <= timeLimit && world.transportedCounter >= userCount;
      } else {
        return null;
      }
    },
  };
}
