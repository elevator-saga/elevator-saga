import { setTransformPosition } from './set-transform-position';

/**
 * Updates the visual state of a user element based on the user's current state.
 *
 * @param {jQuery} $user - The jQuery-wrapped DOM element representing the user.
 * @param {HTMLElement} elem_user - The raw DOM element for the user.
 * @param {User} user - The user object containing state and position.
 * @param {number} user.worldX - The X coordinate of the user in the world.
 * @param {number} user.worldY - The Y coordinate of the user in the world.
 * @param {boolean} user.done - Whether the user has completed their action.
 */
export function updateUserState($user, elem_user, user) {
  setTransformPosition(elem_user, user.worldX, user.worldY);
  if (user.done) {
    $user.addClass('leaving');
  }
}
