import observable from '@riotjs/observable';
import each from 'lodash/each';
import map from 'lodash/map';
import random from 'lodash/random';
import range from 'lodash/range';
import reduce from 'lodash/reduce';
import Elevator from './elevator';
import ElevatorFacade from './elevator-facade';
import Floor from './floor';
import User from './user';

/**
 * Represents the simulation world for the elevator saga, managing floors, elevators, users, and simulation statistics.
 *
 * @class
 * @fires World#usercode_error
 * @fires World#new_user
 * @fires World#stats_changed
 *
 * @param {Object} options - Configuration options for the world.
 * @param {number} options.floorHeight - The height of each floor.
 * @param {number} options.floorCount - The total number of floors in the world.
 * @param {number} options.elevatorCount - The number of elevators in the world.
 * @param {number} options.spawnRate - The rate at which users spawn (users per second).
 * @param {Array<number>} [options.elevatorCapacities] - Optional array specifying the capacity of each elevator.
 *
 * @property {number} floorHeight - The height of each floor.
 * @property {number} transportedCounter - The total number of users transported.
 * @property {number} transportedPerSec - The average number of users transported per second.
 * @property {number} moveCount - The total number of elevator moves.
 * @property {number} elapsedTime - The total elapsed simulation time in seconds.
 * @property {number} maxWaitTime - The maximum wait time experienced by any user.
 * @property {number} avgWaitTime - The average wait time for all users.
 * @property {boolean} challengeEnded - Indicates if the simulation challenge has ended.
 * @property {Array<User>} users - The list of users currently in the world.
 * @property {Array<Floor>} floors - The list of floor instances in the world.
 * @property {Array<Elevator>} elevators - The list of elevator instances in the world.
 * @property {Array<ElevatorFacade>} elevatorInterfaces - The list of elevator interface facades.
 *
 * @example
 * const world = new World({ floorHeight: 60, floorCount: 5, elevatorCount: 3, spawnRate: 0.7 });
 */
export default class World {
  /**
   * @param {Object} options - World configuration options.
   * @param {number} options.floorHeight
   * @param {number} options.floorCount
   * @param {number} options.elevatorCount
   * @param {number} options.spawnRate
   * @param {Array<number>} [options.elevatorCapacities]
   */
  constructor(options) {
    const defaultOptions = { ...options, floorHeight: 50, floorCount: 4, elevatorCount: 2, spawnRate: 0.5 };

    this.floorHeight = defaultOptions.floorHeight;
    this.transportedCounter = 0;
    this.transportedPerSec = 0.0;
    this.moveCount = 0;
    this.elapsedTime = 0.0;
    this.maxWaitTime = 0.0;
    this.avgWaitTime = 0.0;
    this.challengeEnded = false;
    this.users = [];

    observable(this);

    this._handleUserCodeError = (e) => this.trigger('usercode_error', e);

    this.floors = this.createFloors(defaultOptions.floorCount, this.floorHeight, this._handleUserCodeError);
    this.elevators = this.createElevators(
      defaultOptions.elevatorCount,
      defaultOptions.floorCount,
      this.floorHeight,
      defaultOptions.elevatorCapacities
    );
    this.elevatorInterfaces = map(
      this.elevators,
      (elevator) => new ElevatorFacade({}, elevator, defaultOptions.floorCount, this._handleUserCodeError)
    );

    // Bind elevator entrance availability to floors/users
    for (let i = 0; i < this.elevators.length; ++i) {
      this.elevators[i].on('entrance_available', (elevator) => this.handleElevAvailability(elevator));
    }

    // Bind floor button presses to elevator queueing
    for (let i = 0; i < this.floors.length; ++i) {
      this.floors[i].on('up_button_pressed down_button_pressed', (eventName, floor) =>
        this.handleButtonRepressing(eventName, floor)
      );
    }
  }

  /**
   * Create an array of Floor instances.
   * Floors are positioned from top (highest index) to bottom (lowest index),
   * so the highest floor appears at the top of the display.
   *
   * @param {number} floorCount - The number of floors to create.
   * @param {number} floorHeight - The height of each floor.
   * @param {Function} errorHandler - Function to handle errors during event triggering.
   *
   * @returns {Array<Floor>} An array of Floor instances.
   */
  createFloors(floorCount, floorHeight, errorHandler) {
    return map(range(floorCount), (i) => {
      const yPos = (floorCount - 1 - i) * floorHeight;
      return new Floor({ floorLevel: i, yPosition: yPos, errorHandler });
    });
  }

  /**
   * Create an array of Elevator instances.
   * Elevators are positioned horizontally with a gap of 20 pixels between them.
   * @param {number} elevatorCount - The number of elevators to create.
   * @param {number} floorCount - The total number of floors in the building.
   * @param {number} floorHeight - The height of each floor.
   * @param {Array<number>} [elevatorCapacities] - Optional array specifying the capacity of each elevator.
   * If not provided, defaults to a single capacity of 4
   *
   * @returns {Array<Elevator>} An array of Elevator instances.
   */
  createElevators(elevatorCount, floorCount, floorHeight, elevatorCapacities) {
    elevatorCapacities = elevatorCapacities || [4];
    let currentX = 200.0;

    return map(range(elevatorCount), (e, i) => {
      const elevator = new Elevator({
        speedFloorsPerSec: 2.6,
        floorCount,
        floorHeight,
        maxUsers: elevatorCapacities[i % elevatorCapacities.length],
      });
      elevator.moveTo(currentX, null);
      elevator.setFloorPosition(0);
      elevator.updateDisplayPosition();
      currentX += 20 + elevator.width;
      return elevator;
    });
  }

  /**
   * Create a random user for the simulation.
   * The user will have a random weight between 55 and 100 kg.
   * The display type is randomly assigned
   * to 'child', 'female', or 'male'.
   *
   * @returns {User} A new User instance with random attributes.
   */
  createRandomUser() {
    const weight = random(55, 100);
    const user = new User(weight);
    if (random(40) === 0) {
      user.displayType = 'child';
    } else if (random(1) === 0) {
      user.displayType = 'female';
    } else {
      user.displayType = 'male';
    }
    return user;
  }

  /**
   * Spawn a user randomly on a floor with a random destination.
   */
  spawnUserRandomly() {
    const user = World.createRandomUser();
    user.moveTo(105 + random(40), 0);
    const floorCount = this.options.floorCount;
    const currentFloor = random(1) === 0 ? 0 : random(floorCount - 1);
    let destinationFloor;
    if (currentFloor === 0) {
      destinationFloor = random(1, floorCount - 1);
    } else {
      if (random(10) === 0) {
        destinationFloor = (currentFloor + random(1, floorCount - 1)) % floorCount;
      } else {
        destinationFloor = 0;
      }
    }
    user.appearOnFloor(this.floors[currentFloor], destinationFloor);
    return user;
  }

  /**
   * Register a user in the world and wire up events.
   * @param {User} user
   */
  registerUser(user) {
    this.users.push(user);
    user.updateDisplayPosition(true);
    user.spawnTimestamp = this.elapsedTime;
    this.trigger('new_user', user);
    user.on('exited_elevator', () => {
      this.transportedCounter++;
      this.maxWaitTime = Math.max(this.maxWaitTime, this.elapsedTime - user.spawnTimestamp);
      this.avgWaitTime =
        (this.avgWaitTime * (this.transportedCounter - 1) + (this.elapsedTime - user.spawnTimestamp)) /
        this.transportedCounter;
      this.recalculateStats();
    });
    user.updateDisplayPosition(true);
  }

  /**
   * Recalculate world statistics.
   */
  recalculateStats() {
    this.transportedPerSec = this.transportedCounter / this.elapsedTime;
    this.moveCount = reduce(this.elevators, (sum, elevator) => sum + elevator.moveCount, 0);
    this.trigger('stats_changed');
  }

  /**
   * Handle elevator availability for floors and users.
   * @param {Elevator} elevator
   */
  handleElevAvailability(elevator) {
    for (let i = 0, len = this.floors.length; i < len; ++i) {
      const floor = this.floors[i];
      if (elevator.currentFloor === i) {
        floor.elevatorAvailable(elevator);
      }
    }
    for (let users = this.users, i = 0, len = users.length; i < len; ++i) {
      const user = users[i];
      if (user.currentFloor === elevator.currentFloor) {
        user.elevatorAvailable(elevator, this.floors[elevator.currentFloor]);
      }
    }
  }

  /**
   * Handle button repressing logic for floors and elevators.
   */
  handleButtonRepressing(eventName, floor) {
    for (let i = 0, len = this.elevators.length, offset = random(len - 1); i < len; ++i) {
      const elevIndex = (i + offset) % len;
      const elevator = this.elevators[elevIndex];
      if (
        (eventName === 'up_button_pressed' && elevator.goingUpIndicator) ||
        (eventName === 'down_button_pressed' && elevator.goingDownIndicator)
      ) {
        if (
          elevator.currentFloor === floor.level &&
          elevator.isOnAFloor() &&
          !elevator.isMoving &&
          !elevator.isFull()
        ) {
          this.elevatorInterfaces[elevIndex].goToFloor(floor.level, true);
          return;
        }
      }
    }
  }

  /**
   * Main update function for the simulation.
   * @param {number} dt - Delta time in seconds.
   */
  update(dt) {
    this.elapsedTime += dt;
    this._elapsedSinceSpawn = (this._elapsedSinceSpawn || 1.001 / this.options.spawnRate) + dt;
    this._elapsedSinceStatsUpdate = (this._elapsedSinceStatsUpdate || 0.0) + dt;

    while (this._elapsedSinceSpawn > 1.0 / this.options.spawnRate) {
      this._elapsedSinceSpawn -= 1.0 / this.options.spawnRate;
      this.registerUser(this.spawnUserRandomly());
    }

    for (let i = 0, len = this.elevators.length; i < len; ++i) {
      const e = this.elevators[i];
      e.update(dt);
      e.updateElevatorMovement(dt);
    }
    for (let users = this.users, i = 0, len = users.length; i < len; ++i) {
      const u = users[i];
      u.update(dt);
      this.maxWaitTime = Math.max(this.maxWaitTime, this.elapsedTime - u.spawnTimestamp);
    }
    for (let users = this.users, i = users.length - 1; i >= 0; i--) {
      const u = users[i];
      if (u.removeMe) {
        users.splice(i, 1);
      }
    }
    this.recalculateStats();
  }

  /**
   * Update display positions for all elevators and users.
   */
  updateDisplayPositions() {
    for (let i = 0, len = this.elevators.length; i < len; ++i) {
      this.elevators[i].updateDisplayPosition();
    }
    for (let users = this.users, i = 0, len = users.length; i < len; ++i) {
      users[i].updateDisplayPosition();
    }
  }

  /**
   * Unwind the world, removing all event listeners and clearing arrays.
   */
  unWind() {
    console.log('Unwinding', this);
    each(
      this.elevators.concat(this.elevatorInterfaces).concat(this.users).concat(this.floors).concat([this]),
      (obj) => {
        obj.off('*');
      }
    );
    this.challengeEnded = true;
    this.elevators = this.elevatorInterfaces = this.users = this.floors = [];
  }

  /**
   * Initialize the world (checks elevator queues).
   */
  init() {
    for (let i = 0; i < this.elevatorInterfaces.length; ++i) {
      this.elevatorInterfaces[i].checkDestinationQueue();
    }
  }
}
