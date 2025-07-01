import { map, pluck, range, times } from 'lodash';
import { getCodeObjFromCode } from '../../models/utils';
import { calculateFitness } from './calculate-fitness';
import { fitnessChallenges } from './index';
import { makeAverageResult } from './make-average-result';

/**
 * Runs a suite of fitness tests on the provided code string for a specified number of times.
 *
 * @param {string} codeStr - The source code as a string to be tested for fitness.
 * @param {number} runCount - The number of times to run the fitness suite.
 * @returns {Array<Object>|Object} An array of averaged fitness results for each challenge, or an error object if an error occurs.
 */
export function doFitnessSuite(codeStr, runCount) {
  let codeObj;

  try {
    codeObj = getCodeObjFromCode(codeStr);
  } catch (e) {
    return { error: '' + e };
  }

  console.log('Fitness testing code', codeObj);
  let error = null;

  const testruns = [];
  times(runCount, function () {
    const results = map(fitnessChallenges, function (challenge) {
      const fitness = calculateFitness(challenge, codeObj, 1000.0 / 60.0, 12000);
      if (!fitness || fitness.error) {
        error = fitness ? fitness.error : 'fitness error';
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
