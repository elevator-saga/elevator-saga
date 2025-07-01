import render from '@riotjs/ssr';
import { map } from 'lodash';

import { renderElevatorButtons } from './render-elevator-buttons';
import { setTransformPosition } from './set-transform-position';

/**
 * Sets up the DOM representation and event bindings for an elevator.
 *
 * @param {Object} elevator - The elevator object containing state and event methods.
 * @param {string} elevatorTempl - The Riot.js template string for rendering the elevator.
 *                                 It should accept an object with an `e` property representing the elevator.
 * @param {string} elevatorButtonTempl - The Riot.js template string for rendering elevator buttons.
 *                                       It should accept an object with a `floorNum` property.
 * @returns {jQuery} The jQuery-wrapped DOM element representing the elevator.
 *
 * @fires elevator#new_display_state - Updates the elevator's position in the DOM.
 * @fires elevator#new_current_floor - Updates the displayed current floor.
 * @fires elevator#floor_buttons_changed - Updates the state of floor buttons.
 * @fires elevator#indicatorstate_change - Updates the up/down indicator lights.
 * @fires elevator#new_state - Triggers initial state rendering.
 */
export function setUpElevator(elevator, elevatorTempl, elevatorButtonTempl) {
  const $elevator = $(render(elevatorTempl, { e: elevator }));
  const elem_elevator = $elevator.get(0);
  $elevator.find('.buttonindicator').html(renderElevatorButtons(elevator.buttonStates, elevatorButtonTempl));
  const $buttons = map($elevator.find('.buttonindicator').children(), function (c) {
    return $(c);
  });
  const elem_floorindicator = $elevator.find('.floorindicator > span').get(0);

  $elevator.on('click', '.buttonpress', function () {
    elevator.pressFloorButton(parseInt($(this).text()));
  });
  elevator.on('new_display_state', function updateElevatorPosition() {
    setTransformPosition(elem_elevator, elevator.worldX, elevator.worldY);
  });
  elevator.on('new_current_floor', function update_current_floor(floor) {
    elem_floorindicator.textContent = floor;
  });
  elevator.on('floor_buttons_changed', function update_floor_buttons(states, indexChanged) {
    $buttons[indexChanged].toggleClass('activated', states[indexChanged]);
  });
  elevator.on('indicatorstate_change', function indicatorstate_change(indicatorStates) {
    $elevator.find('.up').toggleClass('activated', indicatorStates.up);
    $elevator.find('.down').toggleClass('activated', indicatorStates.down);
  });
  elevator.trigger('new_state', elevator);
  elevator.trigger('new_display_state', elevator);
  elevator.trigger('new_current_floor', elevator.currentFloor);

  return $elevator;
}
