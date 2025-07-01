import map from 'lodash/map';
import random from 'lodash/random';
import range from 'lodash/range';
import reduce from 'lodash/reduce';
import Movable from './movable';
import {
  accelerationNeededToAchieveChangeDistance,
  distanceNeededToAchieveSpeed,
  epsilonEquals,
  limitNumber,
  newGuard,
} from './utils';

/**
 * Handles the transition to a new state for the given elevator.
 *
 * @param {Elevator} elevator - The elevator instance to handle the new state for.
 */
function newElevStateHandler(elevator) {
  elevator.handleNewState();
}

/**
 * Represents an elevator that can move between floors, carry users, and respond to button presses.
 * The elevator can accelerate, decelerate, and has indicators for going up and down.
 * It manages user slots, floor buttons, and provides methods to control its movement.
 * The elevator can also handle events for when it stops at a floor, when users enter or exit, and when it passes a floor.
 * @class Elevator
 * @extends Movable
 * @param {Object} options - Configuration options for the elevator.
 * @param {number} options.speedFloorsPerSec - The speed of the elevator in floors per second.
 * @param {number} options.floorCount - The total number of floors the elevator serves.
 * @param {number} options.floorHeight - The height of each floor in pixels.
 * @param {number} [options.maxUsers=4] - The maximum number of users the elevator can carry. Defaults to 4.
 *
 * @fires Elevator#new_current_floor - Triggered when the elevator arrives at a new floor.
 * @fires Elevator#passing_floor - Triggered when the elevator passes a floor (not the destination).
 * @fires Elevator#stopped - Triggered when the elevator stops at a floor.
 * @fires Elevator#stopped_at_floor - Triggered when the elevator stops at a specific floor.
 * @fires Elevator#exit_available - Triggered when users can exit the elevator.
 * @fires Elevator#entrance_available - Triggered when new users can enter the elevator.
 * @fires Elevator#floor_button_pressed - Triggered when a floor button is pressed.
 */
export default class Elevator extends Movable {
  /**
   * Creates an instance of Elevator.
   * Initializes the elevator with its properties, user slots, and event handlers.
   * @param {Object} options - Configuration options for the elevator.
   * @param {number} options.speedFloorsPerSec - The speed of the elevator in floors per second.
   * @param {number} options.floorCount - The total number of floors the elevator serves.
   * @param {number} options.floorHeight - The height of each floor in pixels.
   * @param {number} [options.maxUsers=4] - The maximum number of users the elevator can carry. Defaults to 4.
   */
  constructor(options) {
    super();
    newGuard(this, Elevator);
    this.ACCELERATION = options.floorHeight * 2.1;
    this.DECELERATION = options.floorHeight * 2.6;
    this.MAXSPEED = options.floorHeight * options.speedFloorsPerSec;
    this.floorCount = options.floorCount;
    this.floorHeight = options.floorHeight;
    this.maxUsers = options.maxUsers || 4;
    this.destinationY = 0.0;
    this.velocityY = 0.0;
    // isMoving flag is needed when going to same floor again - need to re-raise events
    this.isMoving = false;

    this.goingDownIndicator = true;
    this.goingUpIndicator = true;

    this.currentFloor = 0;
    this.previousTruncFutureFloorIfStopped = 0;
    this.buttonStates = map(range(this.floorCount), function (e, i) {
      return false;
    });
    this.moveCount = 0;
    this.removed = false;
    this.userSlots = map(range(this.maxUsers), function (user, i) {
      return { pos: [2 + i * 10, 30], user: null };
    });
    this.width = this.maxUsers * 10;
    this.destinationY = this.getYPosOfFloor(this.currentFloor);

    this.on('new_state', newElevStateHandler);

    this.on('change:goingUpIndicator', () => {
      this.trigger('indicatorstate_change', {
        up: this.goingUpIndicator,
        down: this.goingDownIndicator,
      });
    });

    this.on('change:goingDownIndicator', () => {
      this.trigger('indicatorstate_change', {
        up: this.goingUpIndicator,
        down: this.goingDownIndicator,
      });
    });
  }

  /**
   * Sets the elevator to a specific floor position.
   * @param {number} floor - The floor number to set the elevator to.
   * @throws Will throw an error if the elevator is busy.
   */
  setFloorPosition(floor) {
    const destination = this.getYPosOfFloor(floor);
    this.currentFloor = floor;
    this.previousTruncFutureFloorIfStopped = floor;
    this.moveTo(null, destination);
  }

  /**
   * Attempts to assign a user to a random available slot in the elevator.
   * Starts searching from a random offset to distribute users more evenly.
   *
   * @param {Object} user - The user object to be assigned to a slot.
   * @returns {(Object|boolean)} The position of the assigned slot if successful, or false if no slots are available.
   */
  userEntering(user) {
    const randomOffset = random(this.userSlots.length - 1);
    for (let i = 0; i < this.userSlots.length; i++) {
      const slot = this.userSlots[(i + randomOffset) % this.userSlots.length];
      if (slot.user === null) {
        slot.user = user;
        return slot.pos;
      }
    }
    return false;
  }

  /**
   * Handles the pressing of a floor button.
   *
   * Ensures the floor number is within valid bounds, updates the button state,
   * and triggers relevant events if the button was not previously pressed.
   *
   * @param {number} floorNumber - The floor number whose button is being pressed.
   */
  pressFloorButton(floorNumber) {
    floorNumber = limitNumber(floorNumber, 0, this.floorCount - 1);
    const prev = this.buttonStates[floorNumber];
    this.buttonStates[floorNumber] = true;
    if (!prev) {
      this.trigger('floor_button_pressed', floorNumber);
      this.trigger('floor_buttons_changed', this.buttonStates, floorNumber);
    }
  }

  /**
   * Marks the specified user as exiting the elevator by setting their slot to null.
   *
   * @param {Object} user - The user object to be removed from the elevator slots.
   */
  userExiting(user) {
    for (let i = 0; i < this.userSlots.length; i++) {
      const slot = this.userSlots[i];
      if (slot.user === user) {
        slot.user = null;
      }
    }
  }

  /**
   * Updates the elevator's vertical movement based on the current velocity, acceleration, and destination.
   * Handles acceleration, deceleration, and stopping logic to ensure smooth movement and accurate arrival at the destination.
   *
   * @param {number} dt - The time delta (in seconds) since the last update.
   *
   * @throws {Error} (potentially) if the elevator is busy and has a nonzero velocity (not currently implemented).
   */
  updateElevatorMovement(dt) {
    if (this.isBusy()) {
      // TODO: Consider if having a nonzero velocity here should throw error..
      return;
    }

    // Make sure we're not speeding
    this.velocityY = limitNumber(this.velocityY, -this.MAXSPEED, this.MAXSPEED);

    // Move elevator
    this.moveTo(null, this.y + this.velocityY * dt);

    const destinationDiff = this.destinationY - this.y;
    const directionSign = Math.sign(destinationDiff);
    const velocitySign = Math.sign(this.velocityY);
    let acceleration = 0.0;
    if (destinationDiff !== 0.0) {
      if (directionSign === velocitySign) {
        // Moving in correct direction
        const distanceNeededToStop = distanceNeededToAchieveSpeed(this.velocityY, 0.0, this.DECELERATION);
        if (distanceNeededToStop * 1.05 < -Math.abs(destinationDiff)) {
          // Slow down
          // Allow a certain factor of extra breaking, to enable a smooth breaking movement after detecting overshoot
          const requiredDeceleration = accelerationNeededToAchieveChangeDistance(this.velocityY, 0.0, destinationDiff);
          const deceleration = Math.min(this.DECELERATION * 1.1, Math.abs(requiredDeceleration));
          this.velocityY -= directionSign * deceleration * dt;
        } else {
          // Speed up (or keep max speed...)
          acceleration = Math.min(Math.abs(destinationDiff * 5), this.ACCELERATION);
          this.velocityY += directionSign * acceleration * dt;
        }
      } else if (velocitySign === 0) {
        // Standing still - should accelerate
        acceleration = Math.min(Math.abs(destinationDiff * 5), this.ACCELERATION);
        this.velocityY += directionSign * acceleration * dt;
      } else {
        // Moving in wrong direction - decelerate as much as possible
        this.velocityY -= velocitySign * this.DECELERATION * dt;
        // Make sure we don't change direction within this time step - let standstill logic handle it
        if (Math.sign(this.velocityY) !== velocitySign) {
          this.velocityY = 0.0;
        }
      }
    }

    if (this.isMoving && Math.abs(destinationDiff) < 0.5 && Math.abs(this.velocityY) < 3) {
      // Snap to destination and stop
      this.moveTo(null, this.destinationY);
      this.velocityY = 0.0;
      this.isMoving = false;
      this.handleDestinationArrival();
    }
  }

  /**
   * Handles the elevator's arrival at a destination floor.
   *
   * Triggers the 'stopped' event with the exact current floor.
   * If the elevator is on a floor, it:
   * - Updates the button state for the current floor.
   * - Triggers 'floor_buttons_changed' with updated button states and current floor.
   * - Triggers 'stopped_at_floor' for the current floor.
   * - Triggers 'exit_available' to allow passengers to exit.
   * - Triggers 'entrance_available' to allow new passengers to enter.
   */
  handleDestinationArrival() {
    this.trigger('stopped', this.getExactCurrentFloor());

    if (this.isOnAFloor()) {
      this.buttonStates[this.currentFloor] = false;
      this.trigger('floor_buttons_changed', this.buttonStates, this.currentFloor);
      this.trigger('stopped_at_floor', this.currentFloor);
      // Need to allow users to get off first, so that new ones
      // can enter on the same floor
      this.trigger('exit_available', this.currentFloor, this);
      this.trigger('entrance_available', this);
    }
  }

  /**
   * Commands the elevator to move to the specified floor.
   * Ensures the elevator is not currently busy before initiating movement.
   *
   * @param {number} floor - The floor number to which the elevator should move.
   * @throws {Error} If the elevator is currently busy and cannot accept new commands.
   */
  goToFloor(floor) {
    this.makeSureNotBusy();
    this.isMoving = true;
    this.destinationY = this.getYPosOfFloor(floor);
  }

  /**
   * Returns the index of the first pressed floor button.
   * Iterates through the buttonStates array and returns the index of the first element that is truthy.
   * If no button is pressed, returns 0.
   *
   * @returns {number} The index of the first pressed floor button, or 0 if none are pressed.
   */
  getFirstPressedFloor() {
    deprecationWarning('getFirstPressedFloor');
    for (let i = 0; i < this.buttonStates.length; i++) {
      if (this.buttonStates[i]) {
        return i;
      }
    }
    return 0;
  }

  /**
   * Returns an array of floor numbers for which the elevator's buttons are currently pressed.
   *
   * Iterates through the `buttonStates` array and collects the indices (representing floor numbers)
   * where the button state is truthy (pressed).
   *
   * @returns {number[]} An array of floor numbers with pressed buttons.
   */
  getPressedFloors() {
    const arr = [];
    for (let i = 0; i < this.buttonStates.length; i++) {
      if (this.buttonStates[i]) {
        arr.push(i);
      }
    }
    return arr;
  }

  /**
   * Determines if the elevator is suitable for travel between two floors based on its current direction indicators.
   *
   * @param {number} fromFloorNum - The floor number where the travel starts.
   * @param {number} toFloorNum - The floor number where the travel ends.
   * @returns {boolean} - Returns true if the elevator is suitable for the requested travel direction, otherwise false.
   */
  isSuitableForTravelBetween(fromFloorNum, toFloorNum) {
    if (fromFloorNum > toFloorNum) {
      return this.goingDownIndicator;
    }
    if (fromFloorNum < toFloorNum) {
      return this.goingUpIndicator;
    }
    return true;
  }

  /**
   * Calculates the Y position of a given floor number.
   *
   * @param {number} floorNum - The floor number for which to calculate the Y position (0-based).
   * @returns {number} The Y coordinate of the specified floor.
   */
  getYPosOfFloor(floorNum) {
    return (this.floorCount - 1) * this.floorHeight - floorNum * this.floorHeight;
  }

  /**
   * Calculates the exact floor number corresponding to a given Y position.
   *
   * @param {number} y - The Y position to convert to a floor number.
   * @returns {number} The exact (possibly fractional) floor number for the given Y position.
   */
  getExactFloorOfYPos(y) {
    return ((this.floorCount - 1) * this.floorHeight - y) / this.floorHeight;
  }

  /**
   * Returns the exact current floor of the elevator based on its current Y position.
   *
   * @returns {number} The exact floor number corresponding to the elevator's current Y position.
   */
  getExactCurrentFloor() {
    return this.getExactFloorOfYPos(this.y);
  }

  /**
   * Returns the destination floor number based on the elevator's destination Y position.
   *
   * @returns {number} The floor number corresponding to the elevator's destination Y position.
   */
  getDestinationFloor() {
    return this.getExactFloorOfYPos(this.destinationY);
  }

  /**
   * Returns the current floor number rounded to the nearest integer.
   * Utilizes the exact current floor value and rounds it to the closest whole number.
   *
   * @returns {number} The rounded current floor number.
   */
  getRoundedCurrentFloor() {
    return Math.round(this.getExactCurrentFloor());
  }

  /**
   * Calculates the exact floor the elevator will be at if it stops immediately,
   * taking into account the current velocity and deceleration.
   *
   * @returns {number} The exact floor (as a floating-point number) where the elevator would stop.
   */
  getExactFutureFloorIfStopped() {
    const distanceNeededToStop = distanceNeededToAchieveSpeed(this.velocityY, 0.0, this.DECELERATION);
    return this.getExactFloorOfYPos(this.y - Math.sign(this.velocityY) * distanceNeededToStop);
  }

  /**
   * Determines if the elevator is currently moving towards the specified floor.
   *
   * @param {number} floorNum - The floor number to check against the elevator's current trajectory.
   * @returns {boolean} True if the elevator is moving and heading towards the given floor, false otherwise.
   */
  isApproachingFloor(floorNum) {
    const floorYPos = this.getYPosOfFloor(floorNum);
    const elevToFloor = floorYPos - this.y;
    return this.velocityY !== 0.0 && Math.sign(this.velocityY) === Math.sign(elevToFloor);
  }

  /**
   * Determines whether the elevator is currently positioned exactly on a floor.
   *
   * @returns {boolean} True if the elevator's exact current floor is equal to its rounded current floor, otherwise false.
   */
  isOnAFloor() {
    return epsilonEquals(this.getExactCurrentFloor(), this.getRoundedCurrentFloor());
  }

  /**
   * Calculates the current load factor of the elevator.
   * The load factor is determined by summing the weights of all users currently in the elevator
   * and dividing by the maximum possible load (maxUsers * 100).
   *
   * @returns {number} The load factor as a decimal between 0 and 1.
   */
  getLoadFactor() {
    const load = reduce(
      this.userSlots,
      function (sum, slot) {
        return sum + (slot.user ? slot.user.weight : 0);
      },
      0
    );
    return load / (this.maxUsers * 100);
  }

  /**
   * Checks if all user slots in the elevator are occupied.
   *
   * @returns {boolean} Returns true if every slot has a user, otherwise false.
   */
  isFull() {
    for (let i = 0; i < this.userSlots.length; i++) {
      if (this.userSlots[i].user === null) {
        return false;
      }
    }
    return true;
  }

  /**
   * Checks if all user slots are empty.
   * @returns {boolean} Returns true if all user slots are empty (i.e., no user is present), otherwise false.
   */
  isEmpty() {
    for (let i = 0; i < this.userSlots.length; i++) {
      if (this.userSlots[i].user !== null) {
        return false;
      }
    }
    return true;
  }

  /**
   * Handles the elevator's state update when its position or movement changes.
   *
   * - Updates the current floor if the elevator has moved to a new floor, increments the move count,
   *   and triggers the 'new_current_floor' event.
   * - Checks if the truncated future floor (if the elevator stopped now) has changed since the last check.
   *   If so, determines if the elevator is passing a floor (not the destination) and triggers the
   *   'passing_floor' event with the floor number and direction ('up' or 'down').
   * - Updates the previous truncated future floor for the next state check.
   *
   * @fires Elevator#new_current_floor - Triggered when the elevator arrives at a new floor.
   * @fires Elevator#passing_floor - Triggered when the elevator passes a floor (not the destination).
   */
  handleNewState() {
    const currentFloor = this.getRoundedCurrentFloor();
    if (currentFloor !== this.currentFloor) {
      this.moveCount++;
      this.currentFloor = currentFloor;
      this.trigger('new_current_floor', this.currentFloor);
    }

    const futureTruncFloorIfStopped = Math.trunc(this.getExactFutureFloorIfStopped());
    if (futureTruncFloorIfStopped !== this.previousTruncFutureFloorIfStopped) {
      const floorBeingPassed = Math.round(this.getExactFutureFloorIfStopped());
      if (this.getDestinationFloor() !== floorBeingPassed && this.isApproachingFloor(floorBeingPassed)) {
        const direction = this.velocityY > 0.0 ? 'down' : 'up';
        this.trigger('passing_floor', floorBeingPassed, direction);
      }
    }
    this.previousTruncFutureFloorIfStopped = futureTruncFloorIfStopped;
  }
}
