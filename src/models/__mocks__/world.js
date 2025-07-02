export default class MockWorld {
  constructor() {
    this.on = jest.fn();
    this.off = jest.fn();
    this.emit = jest.fn();
    this.spawnRate = 0.5;
    this.floorCount = 4;
    this.floorHeight = 50;
    this.transportedCounter = 0;
    this.transportedPerSec = 0.0;
    this.moveCount = 0;
    this.elapsedTime = 0.0;
    this.maxWaitTime = 0.0;
    this.avgWaitTime = 0.0;
    this.challengeEnded = false;
    this.users = [];
    this.floors = [];
    this.elevators = [];
    this.facades = [];
    this.createFloors = jest.fn();
    this.createElevators = jest.fn();
    this.spawnUserRandomly = jest.fn();
    this.registerUser = jest.fn();
    this.recalculateStats = jest.fn();
    this.handleElevAvailability = jest.fn();
    this.handleButtonRepressing = jest.fn();
    this.update = jest.fn();
    this.updateDisplayPositions = jest.fn();
    this.init = jest.fn();
    this.unWind = jest.fn();
  }
}
