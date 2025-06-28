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
jest.mock('lodash/defaults', () => jest.fn((obj, defaults) => ({ ...defaults, ...obj })));
jest.mock('lodash/each', () => jest.fn((arr, fn) => arr.forEach(fn)));
jest.mock('lodash/map', () => jest.fn((arr, fn) => Array.prototype.map.call(arr, fn)));
jest.mock('lodash/random', () => jest.fn(() => 0));
jest.mock('lodash/range', () => jest.fn((n) => Array.from({ length: n }, (_, i) => i)));
jest.mock('lodash/reduce', () => jest.fn((arr, fn, init) => arr.reduce(fn, init)));

const mockOn = jest.fn();
const mockOff = jest.fn();
const mockTrigger = jest.fn();

class MockFloor {
  constructor() {
    this.on = mockOn;
    this.off = mockOff;
    this.level = 0;
    this.elevatorAvailable = jest.fn();
  }
}
class MockElevator {
  constructor() {
    this.on = mockOn;
    this.off = mockOff;
    this.currentFloor = 0;
    this.goingUpIndicator = true;
    this.goingDownIndicator = true;
    this.isOnAFloor = jest.fn(() => true);
    this.isMoving = false;
    this.isFull = jest.fn(() => false);
    this.moveCount = 0;
    this.width = 10;
    this.update = jest.fn();
    this.updateElevatorMovement = jest.fn();
    this.setFloorPosition = jest.fn();
    this.moveTo = jest.fn();
    this.updateDisplayPosition = jest.fn();
  }
}
class MockElevatorFacade {
  constructor() {
    this.goToFloor = jest.fn();
    this.checkDestinationQueue = jest.fn();
    this.off = mockOff;
  }
}
class MockUser {
  constructor() {
    this.on = jest.fn();
    this.off = mockOff;
    this.updateDisplayPosition = jest.fn();
    this.update = jest.fn();
    this.currentFloor = 0;
    this.removeMe = false;
    this.spawnTimestamp = 0;
    this.elevatorAvailable = jest.fn();
    this.moveTo = jest.fn();
    this.appearOnFloor = jest.fn();
  }
}

jest.mock('./floor', () => MockFloor);
jest.mock('./elevator', () => MockElevator);
jest.mock('./elevator-facade', () => MockElevatorFacade);

// Patch World.createRandomUser to return a mock user
const mockUser = new MockUser();
World.createRandomUser = jest.fn(() => mockUser);

describe('World', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with default options', () => {
    const world = new World({});
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
    expect(Array.isArray(world.elevatorInterfaces)).toBe(true);
  });

  it('should call observable and bind events in constructor', () => {
    new World({});
    expect(mockOn).toHaveBeenCalled();
  });

  it('should create floors with correct count and yPos', () => {
    const floors = World.createFloors(3, 10, jest.fn());
    expect(floors.length).toBe(3);
    expect(floors[0]).toBeInstanceOf(MockFloor);
  });

  it('should create elevators with correct count', () => {
    const elevators = World.createElevators(2, 4, 10, [4, 5]);
    expect(elevators.length).toBe(2);
    expect(elevators[0]).toBeInstanceOf(MockElevator);
  });

  it('should spawn a user randomly and call appearOnFloor', () => {
    const world = new World({});
    world.floors = [new MockFloor(), new MockFloor()];
    world.options.floorCount = 2;
    const user = world.spawnUserRandomly();
    expect(user).toBe(mockUser);
    expect(user.moveTo).toHaveBeenCalled();
    expect(user.appearOnFloor).toHaveBeenCalled();
  });

  it('should register a user and wire up events', () => {
    const world = new World({});
    world.elapsedTime = 5;
    world.trigger = jest.fn();
    const user = new MockUser();
    world.registerUser(user);
    expect(world.users).toContain(user);
    expect(user.updateDisplayPosition).toHaveBeenCalledWith(true);
    expect(user.spawnTimestamp).toBe(5);
    expect(world.trigger).toHaveBeenCalledWith('new_user', user);
    expect(user.on).toHaveBeenCalled();
  });

  it('should recalculate stats and trigger stats_changed', () => {
    const world = new World({});
    world.transportedCounter = 10;
    world.elapsedTime = 2;
    world.elevators = [{ moveCount: 2 }, { moveCount: 3 }];
    world.trigger = jest.fn();
    // Patch reduce to sum moveCounts
    reduce.mockImplementation((arr, fn, init) => arr.reduce(fn, init));
    world.recalculateStats();
    expect(world.transportedPerSec).toBe(5);
    expect(world.moveCount).toBe(5);
    expect(world.trigger).toHaveBeenCalledWith('stats_changed');
  });

  it('should handle elevator availability for floors and users', () => {
    const world = new World({});
    const elevator = new MockElevator();
    elevator.currentFloor = 0;
    world.floors = [new MockFloor()];
    world.users = [new MockUser()];
    world.users[0].currentFloor = 0;
    world.handleElevAvailability(elevator);
    expect(world.floors[0].elevatorAvailable).toHaveBeenCalledWith(elevator);
    expect(world.users[0].elevatorAvailable).toHaveBeenCalledWith(elevator, world.floors[0]);
  });

  it('should handle button repressing and call goToFloor', () => {
    const world = new World({});
    const elevator = new MockElevator();
    elevator.currentFloor = 0;
    elevator.isMoving = false;
    elevator.isFull = jest.fn(() => false);
    world.elevators = [elevator];
    world.elevatorInterfaces = [new MockElevatorFacade()];
    const floor = new MockFloor();
    floor.level = 0;
    world.handleButtonRepressing('up_button_pressed', floor);
    expect(world.elevatorInterfaces[0].goToFloor).toHaveBeenCalledWith(0, true);
  });

  it('should update world and spawn users, update elevators and users', () => {
    const world = new World({});
    world.floors = [new MockFloor()];
    world.elevators = [new MockElevator()];
    world.elevatorInterfaces = [new MockElevatorFacade()];
    world.users = [new MockUser()];
    world.options.spawnRate = 1;
    world.elapsedTime = 0;
    world._elapsedSinceSpawn = 2;
    world._elapsedSinceStatsUpdate = 0;
    world.registerUser = jest.fn();
    world.spawnUserRandomly = jest.fn(() => new MockUser());
    world.recalculateStats = jest.fn();
    world.update(1);
    expect(world.registerUser).toHaveBeenCalled();
    expect(world.elevators[0].update).toHaveBeenCalled();
    expect(world.elevators[0].updateElevatorMovement).toHaveBeenCalled();
    expect(world.users[0].update).toHaveBeenCalled();
    expect(world.recalculateStats).toHaveBeenCalled();
  });

  it('should update display positions for elevators and users', () => {
    const world = new World({});
    world.elevators = [new MockElevator()];
    world.users = [new MockUser()];
    world.updateDisplayPositions();
    expect(world.elevators[0].updateDisplayPosition).toHaveBeenCalled();
    expect(world.users[0].updateDisplayPosition).toHaveBeenCalled();
  });

  it('should unwind the world and clear arrays', () => {
    const world = new World({});
    world.elevators = [new MockElevator()];
    world.elevatorInterfaces = [new MockElevatorFacade()];
    world.users = [new MockUser()];
    world.floors = [new MockFloor()];
    world.off = mockOff;
    world.unWind();
    expect(world.challengeEnded).toBe(true);
    expect(world.elevators).toEqual([]);
    expect(world.elevatorInterfaces).toEqual([]);
    expect(world.users).toEqual([]);
    expect(world.floors).toEqual([]);
  });

  it('should call checkDestinationQueue on init', () => {
    const world = new World({});
    world.elevatorInterfaces = [new MockElevatorFacade(), new MockElevatorFacade()];
    world.init();
    expect(world.elevatorInterfaces[0].checkDestinationQueue).toHaveBeenCalled();
    expect(world.elevatorInterfaces[1].checkDestinationQueue).toHaveBeenCalled();
  });
});
