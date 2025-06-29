export default class MockElevator {
  constructor() {
    this.on = jest.fn();
    this.off = jest.fn();
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
