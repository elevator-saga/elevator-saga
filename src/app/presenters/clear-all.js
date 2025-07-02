/**
 * Removes all child elements from each element in the provided collection.
 *
 * @param {jQuery[]} $elems - An array or collection of jQuery elements to be cleared.
 */
export function clearAll($elems) {
  Object.keys($elems).length === 0 && console.warn('clearAll called with empty collection');

  $elems = Array.isArray($elems) ? $elems : Object.values($elems);
  $elems.map(($elem) => {
    $elem.empty();
  });
}
