export default class MockUser {
  constructor() {
    this.on = jest.fn();
    this.off = jest.fn();
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
