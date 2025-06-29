export class MockFloor {
  constructor() {
    this.on = jest.fn();
    this.off = jest.fn();
    this.level = 0;
    this.elevatorAvailable = jest.fn();
  }
}
