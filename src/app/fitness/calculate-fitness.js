import { createFrameRequester } from '../../models/utils';
import World from '../../models/world';
import WorldController from '../../models/world-controller';

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
  const controller = new WorldController(stepSize);
  const result = {};

  const world = new World(challenge.options);
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
