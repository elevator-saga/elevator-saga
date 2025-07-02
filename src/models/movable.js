import { EventEmitter } from 'events';
import { newGuard } from './utils';

const EPSILON = 0.00001;

/**
 * Linearly interpolates between two values based on a given factor.
 *
 * @param {number} value0 - The start value.
 * @param {number} value1 - The end value.
 * @param {number} x - The interpolation factor, typically between 0 and 1.
 * @returns {number} The interpolated value between value0 and value1.
 */
export function linearInterpolate(value0, value1, x) {
  return value0 + (value1 - value0) * x;
}

/**
 * Performs a power-based interpolation between two values.
 *
 * @param {number} value0 - The starting value.
 * @param {number} value1 - The ending value.
 * @param {number} x - The interpolation factor, typically between 0 and 1.
 * @param {number} a - The exponent that controls the interpolation curve.
 * @returns {number} The interpolated value between value0 and value1.
 */
function powInterpolate(value0, value1, x, a) {
  return value0 + ((value1 - value0) * Math.pow(x, a)) / (Math.pow(x, a) + Math.pow(1 - x, a));
}

/**
 * Interpolates between two values using a power-based interpolation with an exponent of 1.3.
 *
 * @param {number} value0 - The starting value of the interpolation.
 * @param {number} value1 - The ending value of the interpolation.
 * @param {number} x - The interpolation factor, typically between 0 and 1.
 * @returns {number} The interpolated value between value0 and value1.
 */
function coolInterpolate(value0, value1, x) {
  return powInterpolate(value0, value1, x, 1.3);
}

/**
 * The default interpolation function used for movement calculations.
 * @type {Function}
 * @see coolInterpolate
 */
const DEFAULT_INTERPOLATOR = coolInterpolate;

const _tmpPosStorage = [0, 0];

/**
 * Represents an object that can be moved within a 2D space, supporting hierarchical parenting,
 * smooth and instant movement, task-based actions, and observable state changes.
 *
 * Extends:
 *   Observable
 *
 * Events:
 *   - 'new_state': Triggered when the object's logical state changes.
 *   - 'new_display_state': Triggered when the object's display position changes.
 *
 * Properties:
 *   @property {number} x - The local x-coordinate of the object.
 *   @property {number} y - The local y-coordinate of the object.
 *   @property {Movable|null} parent - The parent object in the hierarchy, or null if none.
 *   @property {number} worldX - The computed world x-coordinate (updated via updateDisplayPosition).
 *   @property {number} worldY - The computed world y-coordinate (updated via updateDisplayPosition).
 *   @property {Function|null} currentTask - The current asynchronous task being executed, or null if idle.
 *
 * Methods:
 *   @method updateDisplayPosition(forceTrigger) - Updates the display position and triggers an event if changed.
 *   @method moveTo(newX, newY) - Moves the object to the specified coordinates, optionally leaving one unchanged.
 *   @method moveToFast(newX, newY) - Instantly moves the object to the specified coordinates.
 *   @method isBusy() - Returns true if the object is currently executing a task.
 *   @method makeSureNotBusy() - Throws if the object is busy.
 *   @method wait(millis, cb) - Pauses execution for a specified duration, then calls a callback.
 *   @method moveToOverTime(newX, newY, timeToSpend, interpolator, cb) - Smoothly moves the object to a new position over time.
 *   @method update(dt) - Advances the current task by a time delta.
 *   @method getWorldPosition(storage) - Computes the object's world position, considering parent hierarchy.
 *   @method setParent(movableParent) - Sets or removes the object's parent, preserving world position.
 */
export default class Movable extends EventEmitter {
  constructor() {
    super();
    newGuard(this, Movable);
    this.x = 0.0;
    this.y = 0.0;
    this.parent = null;
    this.worldX = 0.0;
    this.worldY = 0.0;
    this.currentTask = null;
    this.emit('new_state', this);
  }

  /**
   * Updates the display position of the object by retrieving its current world position.
   * If the position has changed or if `forceTrigger` is true, triggers a 'new_display_state' event.
   *
   * @param {boolean} [forceTrigger] - If true, forces the emit of the 'new_display_state' event even if the position hasn't changed.
   */
  updateDisplayPosition(forceTrigger) {
    this.getWorldPosition(_tmpPosStorage);
    const oldX = this.worldX;
    const oldY = this.worldY;
    this.worldX = _tmpPosStorage[0];
    this.worldY = _tmpPosStorage[1];
    if (oldX !== this.worldX || oldY !== this.worldY || forceTrigger === true) {
      this.emit('new_display_state', this);
    }
  }

  /**
   * Moves the object to the specified coordinates.
   * If a coordinate is null, it will not be updated.
   * Triggers a 'new_state' event after moving.
   *
   * @param {number|null} newX - The new x-coordinate, or null to leave unchanged.
   * @param {number|null} newY - The new y-coordinate, or null to leave unchanged.
   */
  moveTo(newX, newY) {
    if (newX !== null) {
      this.x = newX;
    }
    if (newY !== null) {
      this.y = newY;
    }
    this.emit('new_state', this);
  }

  /**
   * Instantly moves the object to the specified coordinates and triggers a 'new_state' event.
   *
   * @param {number} newX - The new x-coordinate to move to.
   * @param {number} newY - The new y-coordinate to move to.
   */
  moveToFast(newX, newY) {
    this.x = newX;
    this.y = newY;
    this.emit('new_state', this);
  }

  /**
   * Checks if the movable object is currently busy with a task.
   * @returns {boolean} Returns true if there is a current task assigned, otherwise false.
   */
  isBusy() {
    return this.currentTask !== null;
  }

  /**
   * Ensures that the movable object is not currently busy.
   * If the object is busy, logs an error and throws an exception.
   *
   * @throws {Object} Throws an object with a message and the current object if it is busy.
   */
  makeSureNotBusy() {
    if (this.isBusy()) {
      console.error('Attempt to use movable while it was busy', this);
      throw { message: 'Object is busy - you should use callback', obj: this };
    }
  }

  /**
   * Pauses the execution of the current task for a specified number of milliseconds.
   * Once the wait time has elapsed, an optional callback function is invoked.
   *
   * @param {number} millis - The number of milliseconds to wait.
   * @param {Function} [cb] - Optional callback to execute after waiting.
   */
  wait(millis, cb) {
    this.makeSureNotBusy();
    let timeSpent = 0.0;
    const self = this;
    self.currentTask = function waitTask(dt) {
      timeSpent += dt;
      if (timeSpent > millis) {
        self.currentTask = null;
        if (cb) {
          cb();
        }
      }
    };
  }

  /**
   * Moves the object smoothly from its current position to the specified (newX, newY) over a given duration.
   * The movement is interpolated using the provided interpolator function.
   *
   * @param {number|null} newX - The target X coordinate. If null, the current X is used.
   * @param {number|null} newY - The target Y coordinate. If null, the current Y is used.
   * @param {number} timeToSpend - The total time (in seconds or ms, depending on context) to spend moving.
   * @param {function} [interpolator=DEFAULT_INTERPOLATOR] - Function to interpolate between start and end values.
   *        Signature: (start: number, end: number, factor: number) => number
   * @param {function} [cb] - Optional callback to invoke when movement is complete.
   */
  moveToOverTime(newX, newY, timeToSpend, interpolator, cb) {
    this.makeSureNotBusy();
    this.currentTask = true;
    if (newX === null) {
      newX = this.x;
    }
    if (newY === null) {
      newY = this.y;
    }
    if (typeof interpolator === 'undefined') {
      interpolator = DEFAULT_INTERPOLATOR;
    }
    const origX = this.x;
    const origY = this.y;
    let timeSpent = 0.0;
    const self = this;
    self.currentTask = function moveToOverTimeTask(dt) {
      timeSpent = Math.min(timeToSpend, timeSpent + dt);
      if (timeSpent === timeToSpend) {
        self.moveToFast(newX, newY);
        self.currentTask = null;
        if (cb) {
          cb();
        }
      } else {
        const factor = timeSpent / timeToSpend;
        self.moveToFast(interpolator(origX, newX, factor), interpolator(origY, newY, factor));
      }
    };
  }

  /**
   * Updates the state of the movable object by executing the current task, if any.
   *
   * @param {number} dt - The time delta in milliseconds since the last update.
   */
  update(dt) {
    if (this.currentTask !== null) {
      this.currentTask(dt);
    }
  }

  /**
   * Calculates the world position of the current object by traversing up its parent hierarchy,
   * accumulating the x and y offsets, and stores the result in the provided storage array.
   *
   * @param {number[]} storage - An array where the resulting world x and y coordinates will be stored at indices 0 and 1.
   */
  getWorldPosition(storage) {
    let resultX = this.x;
    let resultY = this.y;
    let currentParent = this.parent;
    while (currentParent !== null) {
      resultX += currentParent.x;
      resultY += currentParent.y;
      currentParent = currentParent.parent;
    }
    storage[0] = resultX;
    storage[1] = resultY;
  }

  /**
   * Sets the parent of this movable object, updating its position accordingly.
   *
   * If the new parent is `null`, the object is detached from its current parent and its world position is preserved.
   * If a new parent is provided, the object's position is updated to maintain its world position relative to the new parent.
   *
   * @param {Object|null} movableParent - The new parent object, or `null` to remove the parent.
   */
  setParent(movableParent) {
    const objWorld = [0, 0];
    if (movableParent === null) {
      if (this.parent !== null) {
        this.getWorldPosition(objWorld);
        this.parent = null;
        this.moveToFast(objWorld[0], objWorld[1]);
      }
    } else {
      this.getWorldPosition(objWorld);
      const parentWorld = [0, 0];
      movableParent.getWorldPosition(parentWorld);
      this.parent = movableParent;
      this.moveToFast(objWorld[0] - parentWorld[0], objWorld[1] - parentWorld[1]);
    }
  }
}
