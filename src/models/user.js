import Elevator from './elevator';
import Floor from './floor';
import Movable, { linearInterpolate } from './movable';
import { newGuard } from './utils';

/**
 * Represents a user in the elevator simulation.
 * Extends the Movable class to provide movement and event capabilities.
 *
 * @class
 * @extends Movable
 *
 * @param {number} weight - The weight of the user.
 *
 * @property {number} weight - The user's weight.
 * @property {number} currentFloor - The floor the user is currently on.
 * @property {number} destinationFloor - The floor the user wants to go to.
 * @property {boolean} done - Whether the user has completed their journey.
 * @property {boolean} removeMe - Whether the user should be removed from the simulation.
 *
 * @method appearOnFloor - Places the user on a floor and sets their destination.
 * @param {Object} floor - The floor object where the user appears.
 * @param {number} destinationFloorNum - The floor number the user wants to go to.
 *
 * @method pressFloorButton - Simulates the user pressing the up or down button on a floor.
 * @param {Object} floor - The floor object where the button is pressed.
 *
 * @method handleExit - Handles the user exiting the elevator at their destination.
 * @param {number} floorNum - The floor number where the user exits.
 * @param {Object} elevator - The elevator the user is exiting from.
 *
 * @method elevatorAvailable - Handles the logic when an elevator becomes available for the user.
 * @param {Object} elevator - The available elevator.
 * @param {Object} floor - The floor where the user is waiting.
 */
export default class User extends Movable {
  constructor(weight) {
    super();
    newGuard(this, User);
    this.weight = weight;
    this.currentFloor = 0;
    this.destinationFloor = 0;
    this.done = false;
    this.removeMe = false;
  }

  /**
   * Makes the user appear on a specified floor and sets their destination floor.
   *
   * @param {Floor} floor - The floor object where the user will appear.
   * @param {number} destinationFloorNum - The number of the floor the user wants to go to.
   */
  appearOnFloor(floor, destinationFloorNum) {
    const floorPosY = floor.getSpawnPosY();
    this.currentFloor = floor.level;
    this.destinationFloor = destinationFloorNum;
    this.moveTo(null, floorPosY);
    this.pressFloorButton(floor);
  }

  /**
   * Simulates pressing the appropriate floor button (up or down) based on the elevator's current and destination floors.
   *
   * @param {Object} floor - The floor object representing the target floor.
   * @param {Function} floor.pressUpButton - Method to simulate pressing the up button on the floor.
   * @param {Function} floor.pressDownButton - Method to simulate pressing the down button on the floor.
   */
  pressFloorButton(floor) {
    if (this.destinationFloor < this.currentFloor) {
      floor.pressDownButton();
    } else {
      floor.pressUpButton();
    }
  }

  /**
   * Handles the process of a user exiting an elevator at a specified floor.
   * If the elevator is at the user's destination floor, the user exits,
   * updates their state, triggers relevant events, animates their movement,
   * and cleans up event listeners.
   *
   * @param {number} floorNum - The floor number where the exit is attempted.
   * @param {Elevator} elevator - The elevator instance the user is exiting from.
   */
  handleExit(floorNum, elevator) {
    if (elevator.currentFloor === this.destinationFloor) {
      elevator.userExiting(this);
      this.currentFloor = elevator.currentFloor;
      this.setParent(null);
      const destination = this.x + 100;
      this.done = true;
      this.emit('exited_elevator', elevator);
      this.emit('new_state');
      this.emit('new_display_state');
      this.moveToOverTime(destination, null, 1 + Math.random() * 0.5, linearInterpolate, () => {
        this.removeMe = true;
        this.emit('removed');
        this.off('*');
      });
      elevator.off('exit_available', this.exitAvailableHandler);
    }
  }

  /**
   * Handles the logic for when an elevator becomes available for the user.
   *
   * - Checks if the user is eligible to enter the elevator.
   * - Determines if the elevator is suitable for the user's travel.
   * - If suitable and available, the user enters the elevator, triggers relevant events,
   *   and sets up handlers for exiting.
   * - If not available, the user presses the floor button to request the elevator.
   *
   * @param {Elevator} elevator - The elevator instance being considered.
   * @param {number} floor - The floor number where the elevator is available.
   */
  elevatorAvailable(elevator, floor) {
    if (this.done || this.parent !== null || this.isBusy()) {
      return;
    }
    if (!elevator.isSuitableForTravelBetween(this.currentFloor, this.destinationFloor)) {
      return;
    }
    const position = elevator.userEntering(this);
    if (position) {
      this.setParent(elevator);
      this.emit('entered_elevator', elevator);
      this.moveToOverTime(position[0], position[1], 1, undefined, () => {
        elevator.pressFloorButton(this.destinationFloor);
        elevator.on('exit_available', this.exitAvailableHandler);
      });
      this.exitAvailableHandler = (floorNum, elevator) => {
        this.handleExit(elevator.currentFloor, elevator);
      };
      elevator.on('exit_available', this.exitAvailableHandler);
    } else {
      this.pressFloorButton(floor);
    }
  }
}
