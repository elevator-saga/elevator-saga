import observable from '@riotjs/observable';

/**
 * Controls the simulation loop and manages the state of the world.
 * Handles pausing, time scaling, and user code integration for the simulation.
 *
 * @class
 * @fires usercode_error - Triggered when an error occurs in user code.
 * @fires timescale_changed - Triggered when the simulation time scale changes.
 * @fires stats_display_changed - Triggered when the stats display should update.
 *
 * @param {number} dtMax - Maximum delta time per update.
 *
 * @property {number} dtMax - Maximum delta time for each update step.
 * @property {number} timeScale - Current time scale for the simulation.
 * @property {boolean} isPaused - Whether the simulation is currently paused.
 *
 * @example
 * const controller = new WorldController(0.1);
 * controller.start(world, userCode, requestAnimationFrame, true);
 */
export default class WorldController {
  /**
   * @param {number} dtMax - Maximum delta time per update.
   */
  constructor(dtMax) {
    observable(this);
    this.dtMax = dtMax;
    this.timeScale = 1.0;
    this.isPaused = true;
  }

  /**
   * Start the simulation loop.
   * @param {World} world
   * @param {Object} codeObj - User code object with init/update methods.
   * @param {Function} animationFrameRequester - Function to request animation frames.
   * @param {boolean} autoStart - Whether to start immediately.
   */
  start(world, codeObj, animationFrameRequester, autoStart) {
    this.isPaused = true;
    let lastT = null;
    let firstUpdate = true;
    world.on('usercode_error', this.handleUserCodeError.bind(this));
    const updater = (t) => {
      if (!this.isPaused && !world.challengeEnded && lastT !== null) {
        if (firstUpdate) {
          firstUpdate = false;
          try {
            codeObj.init(world.elevatorInterfaces, world.floors);
            world.init();
          } catch (e) {
            this.handleUserCodeError(e);
          }
        }
        let dt = t - lastT;
        let scaledDt = dt * 0.001 * this.timeScale;
        scaledDt = Math.min(scaledDt, this.dtMax * 3 * this.timeScale);
        try {
          codeObj.update(scaledDt, world.elevatorInterfaces, world.floors);
        } catch (e) {
          this.handleUserCodeError(e);
        }
        while (scaledDt > 0.0 && !world.challengeEnded) {
          const thisDt = Math.min(this.dtMax, scaledDt);
          world.update(thisDt);
          scaledDt -= this.dtMax;
        }
        world.updateDisplayPositions();
        world.trigger('stats_display_changed');
      }
      lastT = t;
      if (!world.challengeEnded) {
        animationFrameRequester(updater);
      }
    };
    if (autoStart) {
      this.setPaused(false);
    }
    animationFrameRequester(updater);
  }

  /**
   * Handle user code errors.
   * @param {Error} e
   */
  handleUserCodeError(e) {
    this.setPaused(true);
    console.log('Usercode error on update', e);
    this.trigger('usercode_error', e);
  }

  /**
   * Pause or resume the simulation.
   * @param {boolean} paused
   */
  setPaused(paused) {
    this.isPaused = paused;
    this.trigger('timescale_changed');
  }

  /**
   * Set the simulation time scale.
   * @param {number} timeScale
   */
  setTimeScale(timeScale) {
    this.timeScale = timeScale;
    this.trigger('timescale_changed');
  }
}
