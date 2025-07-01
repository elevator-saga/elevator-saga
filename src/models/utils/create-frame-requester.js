/**
 * Fake frame requester helper used for testing and fitness simulations
 * Creates a frame requester that triggers a callback at specified time intervals.
 * @param {number} timeStep - The time step for each frame in milliseconds.
 * @returns {Object} - An object with methods to register a callback and trigger it.
 */
export function createFrameRequester(timeStep) {
  let currentCb = null;
  let requester = {};
  requester.currentT = 0.0;
  requester.register = function (cb) {
    currentCb = cb;
  };
  requester.trigger = function () {
    requester.currentT += timeStep;
    if (currentCb !== null) {
      currentCb(requester.currentT);
    }
  };
  return requester;
}
