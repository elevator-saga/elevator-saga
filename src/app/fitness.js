import forOwn from 'lodash/forOwn';
import map from 'lodash/map';
import pluck from 'lodash/pluck';
import range from 'lodash/range';
import times from 'lodash/times';
import { createFrameRequester, getCodeObjFromCode } from '../models/utils';
import { createWorldController, createWorldCreator } from '../models/world';

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
 * Calculates the fitness of a given elevator challenge by simulating the world with the provided user code.
 *
 * @param {Object} challenge - The challenge configuration object containing options for the simulation.
 * @param {Object} codeObj - The user code object to be evaluated during the simulation.
 * @param {number} stepSize - The time step size for each simulation frame.
 * @param {number} stepsToSimulate - The total number of simulation steps to run.
 * @returns {Object} result - The result object containing simulation statistics:
 * @returns {number} [result.transportedPerSec] - The number of passengers transported per second.
 * @returns {number} [result.avgWaitTime] - The average wait time for passengers.
 * @returns {number} [result.transportedCount] - The total number of passengers transported.
 * @returns {Error} [result.error] - Any error encountered during user code execution.
 */
export function calculateFitness(challenge, codeObj, stepSize, stepsToSimulate) {
  const controller = createWorldController(stepSize);
  const result = {};

  const worldCreator = createWorldCreator();
  const world = worldCreator.createWorld(challenge.options);
  const frameRequester = createFrameRequester(stepSize);

  controller.on('usercode_error', function (e) {
    result.error = e;
  });
  world.on('stats_changed', function () {
    result.transportedPerSec = world.transportedPerSec;
    result.avgWaitTime = world.avgWaitTime;
    result.transportedCount = world.transportedCounter;
  });

  controller.start(world, codeObj, frameRequester.register, true);

  for (const stepCount = 0; stepCount < stepsToSimulate && !controller.isPaused; stepCount++) {
    frameRequester.trigger();
  }
  return result;
}

/**
 * Computes the average of each property in the `result` object across an array of result objects.
 *
 * @param {Array<Object>} results - An array of objects, each containing an `options` property and a `result` object with numeric properties to average.
 * @returns {{ options: any, result: Object }} An object containing the `options` from the first result and a `result` object with averaged properties.
 */
export function makeAverageResult(results) {
  const averagedResult = {};
  forOwn(results[0].result, function (value, resultProperty) {
    const sum = sum(pluck(pluck(results, 'result'), resultProperty));
    averagedResult[resultProperty] = sum / results.length;
  });
  return { options: results[0].options, result: averagedResult };
}

/**
 * Runs a suite of fitness tests on the provided code string for a specified number of times.
 *
 * @param {string} codeStr - The source code as a string to be tested for fitness.
 * @param {number} runCount - The number of times to run the fitness suite.
 * @returns {Array<Object>|Object} An array of averaged fitness results for each challenge, or an error object if an error occurs.
 */
export function doFitnessSuite(codeStr, runCount) {
  try {
    const codeObj = getCodeObjFromCode(codeStr);
  } catch (e) {
    return { error: '' + e };
  }
  console.log('Fitness testing code', codeObj);
  const error = null;

  const testruns = [];
  times(runCount, function () {
    const results = map(fitnessChallenges, function (challenge) {
      const fitness = calculateFitness(challenge, codeObj, 1000.0 / 60.0, 12000);
      if (fitness.error) {
        error = fitness.error;
        return;
      }
      return { options: challenge.options, result: fitness };
    });
    if (error) {
      return;
    }
    testruns.push(results);
  });
  if (error) {
    return { error: '' + error };
  }

  // Now do averaging over all properties for each challenge's test runs
  const averagedResults = map(range(testruns[0].length), function (n) {
    return makeAverageResult(pluck(testruns, n));
  });

  return averagedResults;
}

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
