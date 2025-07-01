import * as riot from 'riot';
import World from '../../models/world';

/**
 * Renders and initializes the challenge UI in the given parent element.
 *
 * @param {jQuery} $parent - The parent jQuery element where the challenge UI will be rendered.
 * @param {Object} challenge - The challenge data object.
 * @param {Object} app - The main application object, providing control methods.
 * @param {World} world - The current world state object.
 * @param {Object} worldController - Controller for managing world state and time scale.
 * @param {number} challengeNum - The current challenge number.
 * @param {string} challengeTempl - The Riot.js template string for rendering the challenge UI.
 */
export function presentChallenge($parent, challenge, app, world, worldController, challengeNum, challengeTempl) {
  const $challenge = $(
    riot.render(challengeTempl, {
      challenge: challenge,
      num: challengeNum,
      timeScale: worldController.timeScale.toFixed(0) + 'x',
      startButtonText: world.challengeEnded
        ? "<i class='fa fa-repeat'></i> Restart"
        : worldController.isPaused
          ? 'Start'
          : 'Pause',
    })
  );
  $parent.html($challenge);

  $parent.find('.startstop').on('click', function () {
    app.startStopOrRestart();
  });
  $parent.find('.timescale_increase').on('click', function (e) {
    e.preventDefault();
    if (worldController.timeScale < 40) {
      const timeScale = Math.round(worldController.timeScale * 1.618);
      worldController.setTimeScale(timeScale);
    }
  });
  $parent.find('.timescale_decrease').on('click', function (e) {
    e.preventDefault();
    const timeScale = Math.round(worldController.timeScale / 1.618);
    worldController.setTimeScale(timeScale);
  });
}
