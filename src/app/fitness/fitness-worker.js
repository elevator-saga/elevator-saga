importScripts(
  '../../models/base.js',
  '../../models/movable.js',
  '../../models/floor.js',
  '../../models/user.js',
  '../../models/elevator.js',
  '../../models/interfaces.js',
  '../../models/world.js',
  './calculate-fitness.js',
  './do-fitness-suite.js',
  './fitness-suite.js',
  './make-average-result.js',
  './require-nothing.js'
);

export const onmessage = function (msg) {
  // Assume it is a code object that should be fitness-tested
  const codeStr = msg.data;
  const results = doFitnessSuite(codeStr, 6);
  console.log('Posting message back', results);
  postMessage(results);
};
