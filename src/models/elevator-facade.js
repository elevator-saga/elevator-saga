import observable from '@riotjs/observable';
import first from 'lodash/first';
import last from 'lodash/last';
import tail from 'lodash/tail';
import { createBoolPassthroughFunction, epsilonEquals, limitNumber } from './utils';

/**
 * Facade class for controlling and interacting with an elevator instance.
 * Provides a simplified interface for managing elevator destinations, events, and state.
 *
 * @class ElevatorFacade
 * @param {Object} obj - The observable object to extend.
 * @param {Object} elevator - The underlying elevator instance to wrap.
 * @param {number} floorCount - The total number of floors in the building.
 * @param {Function} errorHandler - Callback to handle errors thrown during event triggering.
 *
 * @property {Array<number>} destinationQueue - Queue of floor numbers the elevator is scheduled to visit.
 * @property {Function} goingUpIndicator - Passthrough function to set/get the elevator's "going up" indicator.
 * @property {Function} goingDownIndicator - Passthrough function to set/get the elevator's "going down" indicator.
 *
 * @method _tryTrigger(event, arg1, arg2, arg3, arg4) - Safely triggers an event, catching and handling errors.
 * @method checkDestinationQueue() - Checks and processes the next destination in the queue if the elevator is idle.
 * @method goToFloor(floorNum, forceNow) - Adds a floor to the destination queue, optionally forcing it to the front.
 * @method stop() - Clears the destination queue and stops the elevator at the nearest floor.
 * @method getFirstPressedFloor() - Returns the first floor button pressed inside the elevator (deprecated).
 * @method getPressedFloors() - Returns an array of all pressed floor buttons inside the elevator.
 * @method currentFloor() - Returns the current floor number of the elevator.
 * @method maxPassengerCount() - Returns the maximum passenger capacity of the elevator.
 * @method loadFactor() - Returns the current load factor of the elevator.
 * @method destinationDirection() - Returns the direction the elevator is heading ('up', 'down', or 'stopped').
 */
export default class ElevatorFacade {
  constructor(options) {
    this.elevator = options.elevator;
    this.floorCount = options.floorCount;
    this.errorHandler = options.errorHandler;
    this.destinationQueue = [];

    // Bind passthrough indicator methods
    this.goingUpIndicator = createBoolPassthroughFunction(this, this.elevator, 'goingUpIndicator');
    this.goingDownIndicator = createBoolPassthroughFunction(this, this.elevator, 'goingDownIndicator');

    observable(this);
    // Bind elevator events to facade
    this.elevator.on('stopped', (position) => {
      if (this.destinationQueue.length && epsilonEquals(first(this.destinationQueue), position)) {
        // Reached the destination, so remove element at front of queue
        this.destinationQueue = tail(this.destinationQueue);
        if (this.elevator.isOnAFloor()) {
          this.elevator.wait(1, () => {
            this.checkDestinationQueue();
          });
        } else {
          this.checkDestinationQueue();
        }
      }
    });
    this.elevator.on('passing_floor', (floorNum, direction) => {
      this._tryTrigger('passing_floor', floorNum, direction);
    });
    this.elevator.on('stopped_at_floor', (floorNum) => {
      this._tryTrigger('stopped_at_floor', floorNum);
    });
    this.elevator.on('floor_button_pressed', (floorNum) => {
      this._tryTrigger('floor_button_pressed', floorNum);
    });
  }

  _tryTrigger(event, arg1, arg2, arg3, arg4) {
    try {
      this.trigger(event, arg1, arg2, arg3, arg4);
    } catch (e) {
      this.errorHandler(e);
    }
  }

  /**
   * Checks the elevator's destination queue and directs the elevator to the next floor if it is not busy.
   * If the destination queue is empty, triggers the 'idle' event.
   *
   * @returns {void}
   */
  checkDestinationQueue() {
    if (!this.elevator.isBusy()) {
      if (this.destinationQueue.length) {
        this.elevator.goToFloor(first(this.destinationQueue));
      } else {
        this._tryTrigger('idle');
      }
    }
  }

  /**
   * Adds a floor number to the elevator's destination queue, optionally forcing it to the front.
   * Prevents adding immediately duplicate destinations.
   *
   * @param {number} floorNum - The target floor number to go to.
   * @param {boolean} [forceNow=false] - If true, adds the floor to the front of the queue; otherwise, adds to the end.
   */
  goToFloor(floorNum, forceNow) {
    floorNum = limitNumber(Number(floorNum), 0, this.floorCount - 1);
    // Auto-prevent immediately duplicate destinations
    if (this.destinationQueue.length) {
      const adjacentElement = forceNow ? first(this.destinationQueue) : last(this.destinationQueue);
      if (epsilonEquals(floorNum, adjacentElement)) {
        return;
      }
    }
    this.destinationQueue[forceNow ? 'unshift' : 'push'](floorNum);
    this.checkDestinationQueue();
  }

  /**
   * Stops the elevator by clearing its destination queue.
   * If the elevator is not busy, it sends the elevator to its current exact future floor.
   *
   * @returns {void}
   */
  stop() {
    this.destinationQueue = [];
    if (!this.elevator.isBusy()) {
      this.elevator.goToFloor(this.elevator.getExactFutureFloorIfStopped());
    }
  }

  /**
   * Returns the first floor button that was pressed inside the elevator.
   *
   * @deprecated This method is undocumented and will be removed in future versions.
   * @returns {number|undefined} The number of the first pressed floor, or undefined if no floor is pressed.
   */
  getFirstPressedFloor() {
    return this.elevator.getFirstPressedFloor();
  } // Undocumented and deprecated, will be removed

  /**
   * Returns an array of floor numbers that have been requested by passengers inside the elevator.
   * These are the floors for which the corresponding buttons have been pressed.
   *
   * @returns {number[]} An array of floor numbers currently pressed inside the elevator.
   */
  getPressedFloors() {
    return this.elevator.getPressedFloors();
  }

  /**
   * Returns the current floor number of the elevator.
   * @returns {number} The current floor the elevator is on.
   */
  currentFloor() {
    return this.elevator.currentFloor;
  }

  /**
   * Returns the maximum number of passengers the elevator can carry.
   * @returns {number} The maximum passenger count for the elevator.
   */
  maxPassengerCount() {
    return this.elevator.maxUsers;
  }

  /**
   * Returns the current load factor of the elevator.
   * The load factor is a value between 0 and 1 representing how full the elevator is.
   *
   * @returns {number} The current load factor of the elevator.
   */
  loadFactor() {
    return this.elevator.getLoadFactor();
  }

  /**
   * Determines the direction the elevator should move to reach its destination.
   *
   * @returns {string} Returns 'up' if the destination is above the current position,
   *                   'down' if the destination is below, or 'stopped' if already at the destination.
   */
  destinationDirection() {
    if (this.elevator.destinationY === this.elevator.y) {
      return 'stopped';
    }
    return this.elevator.destinationY > this.elevator.y ? 'down' : 'up';
  }
}
