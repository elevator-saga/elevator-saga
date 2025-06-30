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

/**
 * Requires a certain number of users to be transported within a time limit and with a maximum wait time.
 * @param {number} userCount - The number of users to transport.
 * @param {number} timeLimit - The time limit in seconds.
 * @param {number} maxWaitTime - The maximum wait time in seconds.
 * @returns {Object} - An object containing the challenge description and evaluation function.
 */
export function requireUserCountWithMaxWaitTime(userCount, maxWaitTime) {
  return {
    description:
      "Transport <span class='emphasis-color'>" +
      userCount +
      "</span> people and let no one wait more than <span class='emphasis-color'>" +
      maxWaitTime.toFixed(1) +
      '</span> seconds',
    evaluate: function (world) {
      if (world.maxWaitTime >= maxWaitTime || world.transportedCounter >= userCount) {
        return world.maxWaitTime <= maxWaitTime && world.transportedCounter >= userCount;
      } else {
        return null;
      }
    },
  };
}

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

/**
 * Returns a perpetual demo challenge that does not require any specific conditions.
 * @returns {Object} - An object containing the challenge description and an evaluation function that always returns null.
 */
function requireDemo() {
  return {
    description: 'Perpetual demo',
    evaluate: function () {
      return null;
    },
  };
}

/**
 * An array of challenge configurations for the elevator saga game.
 * Each challenge specifies elevator and building options, as well as a condition function
 * that determines the win criteria for the challenge.
 *
 * @typedef {Object} Challenge
 * @property {Object} options - Configuration options for the challenge.
 * @property {number} options.floorCount - The number of floors in the building.
 * @property {number} options.elevatorCount - The number of elevators available.
 * @property {number} options.spawnRate - The rate at which new users appear.
 * @property {number[]} [options.elevatorCapacities] - Optional array specifying the capacity of each elevator.
 * @property {Function} condition - A function that defines the win condition for the challenge.
 *
 * @type {Challenge[]}
 */
export const challenges = [
  {
    options: { floorCount: 3, elevatorCount: 1, spawnRate: 0.3 },
    condition: requireUserCountWithinTime(15, 60),
  },
  {
    options: { floorCount: 5, elevatorCount: 1, spawnRate: 0.4 },
    condition: requireUserCountWithinTime(20, 60),
  },
  {
    options: { floorCount: 5, elevatorCount: 1, spawnRate: 0.5, elevatorCapacities: [6] },
    condition: requireUserCountWithinTime(23, 60),
  },
  {
    options: { floorCount: 8, elevatorCount: 2, spawnRate: 0.6 },
    condition: requireUserCountWithinTime(28, 60),
  },
  {
    options: { floorCount: 6, elevatorCount: 4, spawnRate: 1.7 },
    condition: requireUserCountWithinTime(100, 68),
  },
  {
    options: { floorCount: 4, elevatorCount: 2, spawnRate: 0.8 },
    condition: requireUserCountWithinMoves(40, 60),
  },
  {
    options: { floorCount: 3, elevatorCount: 3, spawnRate: 3.0 },
    condition: requireUserCountWithinMoves(100, 63),
  },
  {
    options: { floorCount: 6, elevatorCount: 2, spawnRate: 0.4, elevatorCapacities: [5] },
    condition: requireUserCountWithMaxWaitTime(50, 21),
  },
  {
    options: { floorCount: 7, elevatorCount: 3, spawnRate: 0.6 },
    condition: requireUserCountWithMaxWaitTime(50, 20),
  },
  {
    options: { floorCount: 13, elevatorCount: 2, spawnRate: 1.1, elevatorCapacities: [4, 10] },
    condition: requireUserCountWithinTime(50, 70),
  },
  {
    options: { floorCount: 9, elevatorCount: 5, spawnRate: 1.1 },
    condition: requireUserCountWithMaxWaitTime(60, 19),
  },
  {
    options: { floorCount: 9, elevatorCount: 5, spawnRate: 1.1 },
    condition: requireUserCountWithMaxWaitTime(80, 17),
  },
  {
    options: { floorCount: 9, elevatorCount: 5, spawnRate: 1.1, elevatorCapacities: [5] },
    condition: requireUserCountWithMaxWaitTime(100, 15),
  },
  {
    options: { floorCount: 9, elevatorCount: 5, spawnRate: 1.0, elevatorCapacities: [6] },
    condition: requireUserCountWithMaxWaitTime(110, 15),
  },
  {
    options: { floorCount: 8, elevatorCount: 6, spawnRate: 0.9 },
    condition: requireUserCountWithMaxWaitTime(120, 14),
  },
  {
    options: { floorCount: 12, elevatorCount: 4, spawnRate: 1.4, elevatorCapacities: [5, 10] },
    condition: requireUserCountWithinTime(70, 80),
  },
  {
    options: { floorCount: 21, elevatorCount: 5, spawnRate: 1.9, elevatorCapacities: [10] },
    condition: requireUserCountWithinTime(110, 80),
  },
  {
    options: { floorCount: 21, elevatorCount: 8, spawnRate: 1.5, elevatorCapacities: [6, 8] },
    condition: requireUserCountWithinTimeWithMaxWaitTime(2675, 1800, 45),
  },
  {
    options: { floorCount: 21, elevatorCount: 8, spawnRate: 1.5, elevatorCapacities: [6, 8] },
    condition: requireDemo(),
  },
];
