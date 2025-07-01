import { each } from 'lodash';

/**
 * Removes all child elements from each element in the provided collection.
 *
 * @param {jQuery[]} $elems - An array or collection of jQuery elements to be cleared.
 */
export function clearAll($elems) {
  each($elems, function ($elem) {
    $elem.empty();
  });
}
