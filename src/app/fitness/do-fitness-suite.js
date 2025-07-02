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
  try {
    const codeObj = getCodeObjFromCode(codeStr);
    console.log('Fitness testing code', codeObj);

    const testruns = [];
    for (let i = 0; i < runCount; i++) {
      const results = fitnessChallenges.map(function (challenge) {
        const fitness = calculateFitness(challenge, codeObj, 1000.0 / 60.0, 12000);
        if (!fitness || fitness.error) {
          // Return error object immediately if fitness is falsy or has error
          throw { error: fitness ? fitness.error : 'fitness error' };
        }
        return { options: challenge.options, result: fitness };
      });
      testruns.push(results);
    }

    // Now do averaging over all properties for each challenge's test runs
    const averagedResults = Array.from({ length: testruns[0].length }, (_, n) => {
      return makeAverageResult(testruns.map((run) => run[n]));
    });

    return averagedResults;
  } catch (e) {
    // Return the full error string (e.g., 'Error: bad code')
    if (e && e.error) return e;
    return { error: String(e) };
  }
}
