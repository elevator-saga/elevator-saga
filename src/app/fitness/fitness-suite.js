import { doFitnessSuite } from './do-fitness-suite';

/**
 * Runs a fitness suite on the provided code string, optionally using a Web Worker for asynchronous execution.
 *
 * @param {string} codeStr - The code to be evaluated for fitness.
 * @param {boolean} preferWorker - Whether to prefer using a Web Worker if available.
 * @param {function(Object):void} callback - Callback function to receive the fitness results.
 */
export function fitnessSuite(codeStr, preferWorker, callback) {
  if (typeof Worker !== 'undefined' && preferWorker) {
    // Web workers are available, neat.
    try {
      const w = new Worker('fitness-worker.js');
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
