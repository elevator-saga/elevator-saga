import MockElevator from './__mocks__/elevator';
import MockElevatorFacade from './__mocks__/elevator-facade';
import MockFloor from './__mocks__/floor';
import MockUser from './__mocks__/user';
import World from './world';
const reduce = require('lodash/reduce');

// Mocks for dependencies
jest.mock('@riotjs/observable', () => {
  return jest.fn((obj) => {
    obj.on = jest.fn();
    obj.off = jest.fn();
    obj.trigger = jest.fn();
  });
});
jest.mock('lodash/clone', () => jest.fn((obj) => ({ ...obj })));
jest.mock('lodash/each', () => jest.fn((arr, fn) => arr.forEach(fn)));
jest.mock('lodash/map', () => jest.fn((arr, fn) => Array.prototype.map.call(arr, fn)));
jest.mock('lodash/random', () => jest.fn(() => 0));
jest.mock('lodash/range', () => jest.fn((n) => Array.from({ length: n }, (_, i) => i)));
jest.mock('lodash/reduce', () => jest.fn((arr, fn, init) => arr.reduce(fn, init)));

jest.mock('./floor', () => {
  return { __esModule: true, default: require('./__mocks__/floor').default };
});
jest.mock('./elevator', () => {
  return { __esModule: true, default: require('./__mocks__/elevator').default };
});
jest.mock('./elevator-facade', () => {
  return { __esModule: true, default: require('./__mocks__/elevator-facade').default };
});
jest.mock('./user', () => {
  return { __esModule: true, default: require('./__mocks__/user').default };
});

// const mockOn = jest.fn();
// const mockOff = jest.fn();
// const mockTrigger = jest.fn();

// Patch World.createRandomUser to return a mock user
const mockUser = new MockUser();
World.createRandomUser = jest.fn(() => mockUser);

describe('World', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with default options', () => {
    // Arrange
    const world = new World({});

    // Assert
    expect(world.spawnRate).toBe(0.5);
    expect(world.floorCount).toBe(4);
    expect(world.floorHeight).toBe(50);
    expect(world.transportedCounter).toBe(0);
    expect(world.transportedPerSec).toBe(0.0);
    expect(world.moveCount).toBe(0);
    expect(world.elapsedTime).toBe(0.0);
    expect(world.maxWaitTime).toBe(0.0);
    expect(world.avgWaitTime).toBe(0.0);
    expect(world.challengeEnded).toBe(false);
    expect(Array.isArray(world.users)).toBe(true);
    expect(Array.isArray(world.floors)).toBe(true);
    expect(Array.isArray(world.elevators)).toBe(true);
    expect(Array.isArray(world.facades)).toBe(true);
  });

  it('should create floors with correct count and yPos', () => {
    // Arrange
    const world = new World({});

    // Act
    const floors = world.createFloors(3, 10, jest.fn());

    // Assert
    expect(floors.length).toBe(3);
    expect(floors[0]).toBeInstanceOf(MockFloor);
  });

  it('should create elevators with correct count', () => {
    // Arrange
    const world = new World({});

    // Act
    const elevators = world.createElevators(2, 4, 10, [4, 5]);

    // Assert
    expect(elevators.length).toBe(2);
    expect(elevators[0]).toBeInstanceOf(MockElevator);
  });

  it('should spawn a user randomly and call appearOnFloor', () => {
    // Arrange
    const world = new World({});
    world.floors = [new MockFloor(), new MockFloor()];
    world.floorCount = 2;

    // Act
    const user = world.spawnUserRandomly();

    // Assert
    expect(user).toBe(mockUser);
    expect(user.moveTo).toHaveBeenCalled();
    expect(user.appearOnFloor).toHaveBeenCalled();
  });

  it('should register a user and wire up events', () => {
    // Arrange
    const world = new World({});
    world.elapsedTime = 5;
    world.trigger = jest.fn();
    const user = new MockUser();

    // Act
    world.registerUser(user);

    // Assert
    expect(world.users).toContain(user);
    expect(user.updateDisplayPosition).toHaveBeenCalledWith(true);
    expect(user.spawnTimestamp).toBe(5);
    expect(world.trigger).toHaveBeenCalledWith('new_user', user);
    expect(user.on).toHaveBeenCalled();
  });

  it('should recalculate stats and trigger stats_changed', () => {
    // Arrange
    const world = new World({});
    world.transportedCounter = 10;
    world.elapsedTime = 2;
    world.elevators = [{ moveCount: 2 }, { moveCount: 3 }];
    world.trigger = jest.fn();
    // Patch reduce to sum moveCounts
    reduce.mockImplementation((arr, fn, init) => arr.reduce(fn, init));

    // Act
    world.recalculateStats();

    // Assert
    expect(world.transportedPerSec).toBe(5);
    expect(world.moveCount).toBe(5);
    expect(world.trigger).toHaveBeenCalledWith('stats_changed');
  });

  it('should handle elevator availability for floors and users', () => {
    // Arrange
    const world = new World({});
    const elevator = new MockElevator();
    elevator.currentFloor = 0;
    world.floors = [new MockFloor()];
    world.users = [new MockUser()];
    world.users[0].currentFloor = 0;

    // Act
    world.handleElevAvailability(elevator);

    // Assert
    expect(world.floors[0].elevatorAvailable).toHaveBeenCalledWith(elevator);
    expect(world.users[0].elevatorAvailable).toHaveBeenCalledWith(elevator, world.floors[0]);
  });

  it('should handle button repressing and call goToFloor', () => {
    // Arrange
    const world = new World({});
    const elevator = new MockElevator();
    elevator.currentFloor = 0;
    elevator.isMoving = false;
    elevator.isFull = jest.fn(() => false);
    world.elevators = [elevator];
    world.facades = [new MockElevatorFacade()];
    const floor = new MockFloor();
    floor.level = 0;

    // Act
    world.handleButtonRepressing('up_button_pressed', floor);

    // Assert
    expect(world.facades[0].goToFloor).toHaveBeenCalledWith(0, true);
  });

  it('should update world and spawn users, update elevators and users', () => {
    // Arrange
    const world = new World({});
    world.floors = [new MockFloor()];
    world.elevators = [new MockElevator()];
    world.facades = [new MockElevatorFacade()];
    world.users = [new MockUser()];
    world.spawnRate = 1;
    world.elapsedTime = 0;
    world._elapsedSinceSpawn = 2;
    world._elapsedSinceStatsUpdate = 0;
    world.registerUser = jest.fn();
    world.spawnUserRandomly = jest.fn(() => new MockUser());
    world.recalculateStats = jest.fn();

    // Act
    world.update(1);

    // Assert
    expect(world.registerUser).toHaveBeenCalled();
    expect(world.elevators[0].update).toHaveBeenCalled();
    expect(world.elevators[0].updateElevatorMovement).toHaveBeenCalled();
    expect(world.users[0].update).toHaveBeenCalled();
    expect(world.recalculateStats).toHaveBeenCalled();
  });

  it('should update display positions for elevators and users', () => {
    // Arrange
    const world = new World({});
    world.elevators = [new MockElevator()];
    world.users = [new MockUser()];

    // Act
    world.updateDisplayPositions();

    // Assert
    expect(world.elevators[0].updateDisplayPosition).toHaveBeenCalled();
    expect(world.users[0].updateDisplayPosition).toHaveBeenCalled();
  });

  it('should unwind the world and clear arrays', () => {
    // Arrange
    const world = new World({});
    world.elevators = [new MockElevator()];
    world.facades = [new MockElevatorFacade()];
    world.users = [new MockUser()];
    world.floors = [new MockFloor()];
    world.off = jest.fn();

    // Act
    world.unWind();

    // Assert
    expect(world.challengeEnded).toBe(true);
    expect(world.elevators).toEqual([]);
    expect(world.facades).toEqual([]);
    expect(world.users).toEqual([]);
    expect(world.floors).toEqual([]);
  });

  it('should call checkDestinationQueue on init', () => {
    // Arrange
    const world = new World({});
    world.facades = [new MockElevatorFacade(), new MockElevatorFacade()];

    // Act
    world.init();

    // Assert
    expect(world.facades[0].checkDestinationQueue).toHaveBeenCalled();
    expect(world.facades[1].checkDestinationQueue).toHaveBeenCalled();
  });
});
