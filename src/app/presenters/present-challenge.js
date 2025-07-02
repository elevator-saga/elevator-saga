import render from '@riotjs/ssr';
import World from '../../models/world';

/**
 * Renders and initializes the challenge UI in the given parent element.
 *
 * @param {jQuery} $parent - The parent jQuery element where the challenge UI will be rendered.
 * @param {Object} challenge - The challenge data object.
 * @param {Object} options - Additional options for rendering the challenge.
 * @param {Object} options.app - The main application instance.
 * @param {World} options.world - The current world instance.
 * @param {WorldController} options.worldController - The controller managing the world state.
 * @param {number} options.challengeNum - The current challenge number.
 * @param {Object} options.challengeTempl - The template used for rendering the challenge
 */
export function presentChallenge($parent, challenge, options) {
  console.log('presentChallenge: Rendering challenge UI');
  if (!$parent || !$parent.length) {
    console.warn('presentChallenge called with empty parent element');
    return;
  }
  console.log('presentChallenge with options:', options);
  const { app, world, worldController, challengeNum, challengeTempl } = options;

  const $challenge = $(
    render(challengeTempl, {
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
