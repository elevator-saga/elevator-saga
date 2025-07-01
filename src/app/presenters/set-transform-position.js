/**
 * Sets the CSS transform property of an element to position it at the specified (x, y) coordinates,
 * including a translateZ(0) for hardware acceleration. Applies vendor prefixes for compatibility.
 *
 * @param {HTMLElement} elem - The DOM element to transform.
 * @param {number} x - The x-coordinate in pixels to translate the element to.
 * @param {number} y - The y-coordinate in pixels to translate the element to.
 */
export function setTransformPosition(elem, x, y) {
  const style = 'translate(' + x + 'px,' + y + 'px) translateZ(0)';
  elem.style.transform = style;
  elem.style['-ms-transform'] = style;
  elem.style['-webkit-transform'] = style;
}
