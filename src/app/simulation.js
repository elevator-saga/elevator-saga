import observable from '@riotjs/observable';
import World from '../models/world';
import WorldController from '../models/world-controller';

/**
 * Main simulation application controller.
 * Handles challenge lifecycle, world setup, and UI integration.
 */
export default class Simulation {
  /**
   * @param {Object} deps - Dependency injection for UI and editor.
   * @param {Object} deps.editor - Code editor interface.
   * @param {Array} deps.challenges - Array of challenge definitions.
   * @param {Function} deps.clearAll - UI clear function.
   * @param {Function} deps.presentStats - UI stats presenter.
   * @param {Function} deps.presentChallenge - UI challenge presenter.
   * @param {Function} deps.presentWorld - UI world presenter.
   * @param {Function} deps.presentFeedback - UI feedback presenter.
   * @param {Object} deps.templates - UI templates.
   * @param {Object} deps.params - URL params.
   * @param {Function} deps.createParamsUrl - URL param creator.
   * @param {string} deps.tsKey - LocalStorage key for timescale.
   * @param {Object} deps.$world - World DOM element.
   * @param {Object} deps.$feedback - Feedback DOM element.
   * @param {Object} deps.$stats - Stats DOM element.
   * @param {Object} deps.$challenge - Challenge DOM element.
   */
  constructor({
    editor,
    challenges,
    clearAll,
    presentStats,
    presentChallenge,
    presentWorld,
    presentFeedback,
    templates,
    params,
    createParamsUrl,
    tsKey,
    $world,
    $feedback,
    $stats,
    $challenge,
  }) {
    observable(this);
    this.editor = editor;
    this.challenges = challenges;
    this.clearAll = clearAll;
    this.presentStats = presentStats;
    this.presentChallenge = presentChallenge;
    this.presentWorld = presentWorld;
    this.presentFeedback = presentFeedback;
    this.templates = templates;
    this.params = params;
    this.createParamsUrl = createParamsUrl;
    this.tsKey = tsKey;
    this.$world = $world;
    this.$feedback = $feedback;
    this.$stats = $stats;
    this.$challenge = $challenge;

    this.currentChallengeIndex = 0;
    this.worldController = new WorldController(1.0 / 60.0);
    this.worldController.on('usercode_error', (e) => {
      console.log('World raised code error', e);
      this.editor.trigger('usercode_error', e);
    });
  }

  /**
   * Start, stop, or restart the simulation.
   */
  startStopOrRestart() {
    if (this.world && this.world.challengeEnded) {
      this.startChallenge(this.currentChallengeIndex);
    } else {
      this.worldController.setPaused(!this.worldController.isPaused);
    }
  }

  /**
   * Start a challenge by index.
   * @param {number} challengeIndex
   * @param {boolean} [autoStart]
   */
  startChallenge(challengeIndex, autoStart) {
    if (typeof this.world !== 'undefined') {
      this.world.unWind();
      // TODO: Investigate if memory leaks happen here
    }
    this.currentChallengeIndex = challengeIndex;
    this.world = new World(this.challenges[challengeIndex].options);
    window.world = this.world;

    this.clearAll([this.$world, this.$feedback]);
    this.presentStats(this.$stats, this.world);
    this.presentChallenge(
      this.$challenge,
      this.challenges[challengeIndex],
      this,
      this.world,
      this.worldController,
      challengeIndex + 1,
      this.templates.challengeTempl
    );
    this.presentWorld(
      this.$world,
      this.world,
      this.templates.floorTempl,
      this.templates.elevatorTempl,
      this.templates.elevatorButtonTempl,
      this.templates.userTempl
    );

    this.worldController.on('timescale_changed', () => {
      localStorage.setItem(this.tsKey, this.worldController.timeScale);
      this.presentChallenge(
        this.$challenge,
        this.challenges[challengeIndex],
        this,
        this.world,
        this.worldController,
        challengeIndex + 1,
        this.templates.challengeTempl
      );
    });

    this.world.on('stats_changed', () => {
      const challengeStatus = this.challenges[challengeIndex].condition.evaluate(this.world);
      if (challengeStatus !== null) {
        this.world.challengeEnded = true;
        this.worldController.setPaused(true);
        if (challengeStatus) {
          this.presentFeedback(
            this.$feedback,
            this.templates.feedbackTempl,
            this.world,
            'Success!',
            'Challenge completed',
            this.createParamsUrl(this.params, { challenge: challengeIndex + 2 })
          );
        } else {
          this.presentFeedback(
            this.$feedback,
            this.templates.feedbackTempl,
            this.world,
            'Challenge failed',
            'Maybe your program needs an improvement?',
            ''
          );
        }
      }
    });

    const codeObj = this.editor.getCodeObj();
    this.worldController.start(this.world, codeObj, window.requestAnimationFrame, autoStart);
  }
}
