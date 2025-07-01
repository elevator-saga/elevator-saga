import { forOwn, sum } from 'lodash';

/**
 * Computes the average of each property in the `result` object across an array of result objects.
 *
 * @param {Array<Object>} results - An array of objects, each containing an `options` property and a `result` object with numeric properties to average.
 * @returns {{ options: any, result: Object }} An object containing the `options` from the first result and a `result` object with averaged properties.
 */
export function makeAverageResult(results) {
  const averagedResult = {};
  forOwn(results[0].result, function (value, resultProperty) {
    const values = results.map((r) => r.result[resultProperty]);
    if (values.some((v) => typeof v === 'undefined')) {
      averagedResult[resultProperty] = NaN;
    } else {
      averagedResult[resultProperty] = sum(values) / results.length;
    }
  });
  return { options: results[0].options, result: averagedResult };
}
