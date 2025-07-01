import { map } from 'lodash';
import * as riot from 'riot';

/**
 * Renders the HTML for elevator buttons based on the provided states.
 *
 * @param {Array} states - An array representing the state of each elevator button.
 *                         Each element can be a boolean or any value that indicates the button's state.
 * @param {string} elevatorButtonTempl - The Riot.js template string for rendering an elevator button.
 *                                       It should accept an object with a `floorNum` property.
 *                                       This template is used to generate the HTML for each button.
 *
 * @returns {string} The concatenated HTML string for all elevator buttons.
 */
export function renderElevatorButtons(states, elevatorButtonTempl) {
  // This is a rarely executed inner-inner loop, does not need efficiency
  return map(states, function (b, i) {
    return riot.render(elevatorButtonTempl, { floorNum: i });
  }).join('');
}
