import { EventEmitter } from 'events';
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
 * @property {Array<ElevatorFacade>} facades - The list of elevator interface facades.
 *
 * @example
 * const world = new World({ floorHeight: 60, floorCount: 5, elevatorCount: 3, spawnRate: 0.7 });
 */
export default class World extends EventEmitter {
  /**
   * @param {Object} options - World configuration options.
   * @param {number} options.floorHeight
   * @param {number} options.floorCount
   * @param {number} options.elevatorCount
   * @param {number} options.spawnRate
   * @param {Array<number>} [options.elevatorCapacities]
   */
  constructor(options) {
    super();
    const defaultOptions = { ...options, floorHeight: 50, floorCount: 4, elevatorCount: 2, spawnRate: 0.5 };

    console.log('World: Creating world with options:', defaultOptions);

    this.floorCount = defaultOptions.floorCount;
    this.spawnRate = defaultOptions.spawnRate;
    this.floorHeight = defaultOptions.floorHeight;
    this.transportedCounter = 0;
    this.transportedPerSec = 0.0;
    this.moveCount = 0;
    this.elapsedTime = 0.0;
    this.maxWaitTime = 0.0;
    this.avgWaitTime = 0.0;
    this.challengeEnded = false;
    this.users = [];

    this._handleUserCodeError = (e) => this.emit('usercode_error', e);

    this.floors = this.createFloors(defaultOptions.floorCount, this.floorHeight, this._handleUserCodeError);
    this.elevators = this.createElevators(
      defaultOptions.elevatorCount,
      defaultOptions.floorCount,
      this.floorHeight,
      defaultOptions.elevatorCapacities
    );
    // Debug: log elevator types and check for .on method
    console.log(
      'Elevators:',
      this.elevators.map((e) => e && typeof e.on)
    );
    if (this.elevators.some((e) => !e)) {
      throw new Error('World: Failed to create all elevators');
    }
    this.facades = this.elevators.map(
      (elevator) =>
        new ElevatorFacade({
          elevator,
          floorCount: defaultOptions.floorCount,
          errorHandler: this._handleUserCodeError,
        })
    );
    this.floors.forEach((floor) => {
      floor.on('usercode_error', this._handleUserCodeError);
    });
    this.facades.forEach((facade) => {
      facade.on('usercode_error', this._handleUserCodeError);
    });
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
    return Array.from({ length: floorCount }, (_, i) => {
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

    return Array.from({ length: elevatorCount }, (_, i) => {
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
    const weight = Math.floor(Math.random() * (100 - 55 + 1)) + 55;
    const user = new User(weight);
    if (Math.random() < 0.025) {
      user.displayType = 'child';
    } else if (Math.random() < 0.5) {
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
    user.moveTo(105 + Math.floor(Math.random() * 41), 0);
    const floorCount = this.floorCount;
    const currentFloor = Math.random() < 0.5 ? 0 : Math.floor(Math.random() * floorCount);
    let destinationFloor;
    if (currentFloor === 0) {
      destinationFloor = Math.floor(Math.random() * (floorCount - 1)) + 1;
    } else {
      if (Math.random() < 0.1) {
        destinationFloor = (currentFloor + Math.floor(Math.random() * (floorCount - 1)) + 1) % floorCount;
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
    this.emit('new_user', user);
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
    this.moveCount = this.elevators.reduce((sum, elevator) => sum + elevator.moveCount, 0);
    this.emit('stats_changed');
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
    for (let i = 0, len = this.elevators.length, offset = Math.floor(Math.random() * len); i < len; ++i) {
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
          this.facades[elevIndex].goToFloor(floor.level, true);
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
    this._elapsedSinceSpawn = (this._elapsedSinceSpawn || 1.001 / this.spawnRate) + dt;
    this._elapsedSinceStatsUpdate = (this._elapsedSinceStatsUpdate || 0.0) + dt;

    while (this._elapsedSinceSpawn > 1.0 / this.spawnRate) {
      this._elapsedSinceSpawn -= 1.0 / this.spawnRate;
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
    this.elevators
      .concat(this.facades)
      .concat(this.users)
      .concat(this.floors)
      .concat([this])
      .forEach((obj) => {
        obj.off('*');
      });
    this.challengeEnded = true;
    this.elevators = this.facades = this.users = this.floors = [];
  }

  /**
   * Initialize the world (checks elevator queues).
   */
  init() {
    for (let i = 0; i < this.facades.length; ++i) {
      this.facades[i].checkDestinationQueue();
    }
  }
}
