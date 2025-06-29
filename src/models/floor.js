import observable from '@riotjs/observable';

/**
 * Represents a floor in the elevator simulation.
 * Handles button states, triggers events, and manages elevator availability.
 *
 * @class Floor
 * @param {Object} options - Configuration options for the floor.
 * @param {number} options.floorLevel - The floor number/level.
 * @param {number} options.yPosition - The vertical position of the floor.
 * @param {Function} options.errorHandler - Function to handle errors during event triggering.
 *
 * @property {number} level - The floor number/level.
 * @property {number} yPosition - The vertical position of the floor.
 * @property {{up: string, down: string}} buttonStates - The state of the up and down buttons.
 * @property {Function} _errorHandler - Error handler for event triggers.
 *
 * @method pressUpButton - Activates the up button and triggers related events.
 * @method pressDownButton - Activates the down button and triggers related events.
 * @method elevatorAvailable - Resets button states when an elevator becomes available.
 * @method getSpawnPosY - Gets the Y position for spawning entities on this floor.
 * @method floorNum - Returns the floor number/level.
 * @private
 * @method _tryTrigger - Tries to trigger an event and handles errors.
 */
export default class Floor {
  /**
   * Creates an instance of Floor.
   * Initializes the floor with a level, Y position, and an error handler for event triggering.
   * @param {Object} options - Configuration options for the floor.
   * @param {number} options.floorLevel - The floor number/level.
   * @param {number} options.yPosition - The vertical position of the floor.
   * @param {Function} options.errorHandler - Function to handle errors during event triggering.
   */
  constructor(options) {
    if (!options || typeof options.errorHandler !== 'function') {
      throw new Error('errorHandler must be provided and be a function.');
    }

    this.level = options.floorLevel;
    this.yPosition = options.yPosition;
    this.buttonStates = { up: '', down: '' };
    this._errorHandler = options.errorHandler;

    observable(this);
  }

  /**
   * Attempts to trigger a specified event with up to four arguments.
   * If an error occurs during the trigger, it is handled by the internal error handler.
   *
   * @param {string} event - The name of the event to trigger.
   * @param {*} [arg1] - The first argument to pass to the event handler.
   * @param {*} [arg2] - The second argument to pass to the event handler.
   * @param {*} [arg3] - The third argument to pass to the event handler.
   * @param {*} [arg4] - The fourth argument to pass to the event handler.
   */
  _tryTrigger(event, arg1, arg2, arg3, arg4) {
    try {
      this.trigger(event, arg1, arg2, arg3, arg4);
    } catch (e) {
      this._errorHandler(e);
    }
  }

  /**
   * Activates the "up" button on the floor, updating its state and triggering relevant events if the state changes.
   *
   * Triggers:
   * - 'buttonstate_change' with the updated button states if the "up" button was not already activated.
   * - 'up_button_pressed' with the current floor instance if the "up" button was not already activated.
   */
  pressUpButton() {
    const prev = this.buttonStates.up;
    this.buttonStates.up = 'activated';
    if (prev !== this.buttonStates.up) {
      this._tryTrigger('buttonstate_change', this.buttonStates);
      this._tryTrigger('up_button_pressed', this);
    }
  }

  /**
   * Activates the "down" button on the floor, updating its state to 'activated'.
   * If the button state changes, triggers the 'buttonstate_change' and 'down_button_pressed' events.
   *
   * @fires buttonstate_change - Triggered when the button state changes.
   * @fires down_button_pressed - Triggered when the down button is pressed.
   */
  pressDownButton() {
    const prev = this.buttonStates.down;
    this.buttonStates.down = 'activated';
    if (prev !== this.buttonStates.down) {
      this._tryTrigger('buttonstate_change', this.buttonStates);
      this._tryTrigger('down_button_pressed', this);
    }
  }

  /**
   * Handles the availability of an elevator at the floor.
   * If the elevator is going in the direction of a pressed button (up or down),
   * resets the corresponding button state and triggers a 'buttonstate_change' event.
   *
   * @param {Object} elevator - The elevator object.
   * @param {boolean} elevator.goingUpIndicator - Indicates if the elevator is going up.
   * @param {boolean} elevator.goingDownIndicator - Indicates if the elevator is going down.
   */
  elevatorAvailable(elevator) {
    if (elevator.goingUpIndicator && this.buttonStates.up) {
      this.buttonStates.up = '';
      this._tryTrigger('buttonstate_change', this.buttonStates);
    }
    if (elevator.goingDownIndicator && this.buttonStates.down) {
      this.buttonStates.down = '';
      this._tryTrigger('buttonstate_change', this.buttonStates);
    }
  }

  /**
   * Calculates and returns the Y-coordinate for spawning an object on the floor.
   * Adds an offset of 30 to the current floor's Y position.
   *
   * @returns {number} The Y-coordinate for the spawn position.
   */
  getSpawnPosY() {
    return this.yPosition + 30;
  }

  /**
   * Returns the floor number (level) of this floor.
   * @returns {number} The floor number.
   */
  floorNum() {
    return this.level;
  }
}
