import render from '@riotjs/ssr';
import { map } from 'lodash';

import World from '../../models/world';
import { setUpElevator } from './set-up-elevator';
import { updateUserState } from './update-user-state';

/**
 * Renders and manages the interactive world view for the elevator simulation.
 *
 * @param {jQuery} $world - The jQuery element representing the world container.
 * @param {World} world - The world model containing floors, elevators, and related state.
 * @param {string} floorTempl - Riot.js template string for rendering a floor.
 * @param {string} elevatorTempl - Riot.js template string for rendering an elevator.
 * @param {string} elevatorButtonTempl - Riot.js template string for rendering elevator buttons.
 * @param {string} userTempl - Riot.js template string for rendering a user.
 *
 * @fires floor#buttonstate_change - When a floor's up/down button state changes.
 * @fires elevator#new_display_state - When an elevator's position should be updated.
 * @fires elevator#new_current_floor - When an elevator's current floor changes.
 * @fires elevator#floor_buttons_changed - When an elevator's floor button states change.
 * @fires elevator#indicatorstate_change - When an elevator's up/down indicator state changes.
 * @fires world#new_user - When a new user is added to the world.
 * @fires user#new_display_state - When a user's display state should be updated.
 * @fires user#removed - When a user is removed from the world.
 */
export function presentWorld($world, world, floorTempl, elevatorTempl, elevatorButtonTempl, userTempl) {
  $world.css('height', world.floorHeight * world.floors.length);

  $world.append(
    map(world.floors, function (f) {
      const $floor = $(render(floorTempl, f));
      const $up = $floor.find('.up');
      const $down = $floor.find('.down');
      f.on('buttonstate_change', function (buttonStates) {
        $up.toggleClass('activated', buttonStates.up !== '');
        $down.toggleClass('activated', buttonStates.down !== '');
      });
      $up.on('click', function () {
        f.pressUpButton();
      });
      $down.on('click', function () {
        f.pressDownButton();
      });
      return $floor;
    })
  );
  $world.find('.floor').first().find('.down').addClass('invisible');
  $world.find('.floor').last().find('.up').addClass('invisible');

  $world.append(
    map(world.elevators, function (e) {
      return setUpElevator(e, elevatorTempl, elevatorButtonTempl);
    })
  );

  world.on('new_user', function (user) {
    const $user = $(render(userTempl, { u: user, state: user.done ? 'leaving' : '' }));
    const elem_user = $user.get(0);

    user.on('new_display_state', function () {
      updateUserState($user, elem_user, user);
    });
    user.on('removed', function () {
      $user.remove();
    });
    $world.append($user);
  });
}
