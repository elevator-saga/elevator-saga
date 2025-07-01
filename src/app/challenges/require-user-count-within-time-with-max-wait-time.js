/**
 * Requires a certain number of users to be transported within a time limit and with a maximum wait time.
 * @param {number} userCount - The number of users to transport.
 * @param {number} timeLimit - The time limit in seconds.
 * @param {number} maxWaitTime - The maximum wait time in seconds.
 * @returns {Object} - An object containing the challenge description and evaluation function.
 */
export function requireUserCountWithinTimeWithMaxWaitTime(userCount, timeLimit, maxWaitTime) {
  return {
    description:
      "Transport <span class='emphasis-color'>" +
      userCount +
      "</span> people in <span class='emphasis-color'>" +
      timeLimit.toFixed(0) +
      "</span> seconds or less and let no one wait more than <span class='emphasis-color'>" +
      maxWaitTime.toFixed(1) +
      '</span> seconds',
    evaluate: function (world) {
      if (world.elapsedTime >= timeLimit || world.maxWaitTime >= maxWaitTime || world.transportedCounter >= userCount) {
        return (
          world.elapsedTime <= timeLimit && world.maxWaitTime <= maxWaitTime && world.transportedCounter >= userCount
        );
      } else {
        return null;
      }
    },
  };
}
