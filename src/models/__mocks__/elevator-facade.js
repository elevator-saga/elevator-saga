export default class MockElevatorFacade {
  constructor() {
    this.goToFloor = jest.fn();
    this.checkDestinationQueue = jest.fn();
    this.off = jest.fn();
  }
}
