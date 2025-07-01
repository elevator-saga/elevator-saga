/**
 * An array of fitness challenge configurations for the elevator simulation.
 * Each challenge defines scenario options and a condition function.
 *
 * @type {Array<{
 *   options: {
 *     description: string,
 *     floorCount: number,
 *     elevatorCount: number,
 *     spawnRate: number,
 *     elevatorCapacities?: number[]
 *   },
 *   condition: Function
 * }>}
 */
const fitnessChallenges = [
  {
    options: { description: 'Small scenario', floorCount: 4, elevatorCount: 2, spawnRate: 0.6 },
    condition: requireNothing(),
  },
  {
    options: {
      description: 'Medium scenario',
      floorCount: 6,
      elevatorCount: 3,
      spawnRate: 1.5,
      elevatorCapacities: [5],
    },
    condition: requireNothing(),
  },
  {
    options: {
      description: 'Large scenario',
      floorCount: 18,
      elevatorCount: 6,
      spawnRate: 1.9,
      elevatorCapacities: [8],
    },
    condition: requireNothing(),
  },
];

/**
 * Runs a fitness suite on the provided code string, optionally using a Web Worker for asynchronous execution.
 *
 * @param {string} codeStr - The code to be evaluated for fitness.
 * @param {boolean} preferWorker - Whether to prefer using a Web Worker if available.
 * @param {function(Object):void} callback - Callback function to receive the fitness results.
 */
export function fitnessSuite(codeStr, preferWorker, callback) {
  if (!!Worker && preferWorker) {
    // Web workers are available, neat.
    try {
      const w = new Worker('fitnessworker.js');
      w.postMessage(codeStr);
      w.onmessage = function (msg) {
        console.log('Got message from fitness worker', msg);
        const results = msg.data;
        callback(results);
      };
      return;
    } catch (e) {
      console.log('Fitness worker creation failed, falling back to normal', e);
    }
  }
  // Fall back do synch calculation without web worker
  const results = doFitnessSuite(codeStr, 2);
  callback(results);
}
