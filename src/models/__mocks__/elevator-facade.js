export default class MockElevatorFacade {
  constructor() {
    this.goToFloor = jest.fn();
    this.checkDestinationQueue = jest.fn();
    this.off = jest.fn();
    this.on = jest.fn();
    this.emit = jest.fn();
  }
}
