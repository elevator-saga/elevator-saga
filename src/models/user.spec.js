import Movable from './movable';
import User from './user';

jest.mock('./movable');
jest.mock('./utils', () => ({
  newGuard: jest.fn(),
}));
jest.mock('./elevator');
jest.mock('./floor');

describe('User', () => {
  let user;
  const mockMoveTo = jest.fn();
  const mockMoveToOverTime = jest.fn();
  const mockSetParent = jest.fn();
  const mockTrigger = jest.fn();
  const mockOff = jest.fn();
  const mockIsBusy = jest.fn(() => false);

  beforeEach(() => {
    Movable.mockClear();
    user = new User(70);
    user.moveTo = mockMoveTo;
    user.moveToOverTime = mockMoveToOverTime;
    user.setParent = mockSetParent;
    user.trigger = mockTrigger;
    user.off = mockOff;
    user.isBusy = mockIsBusy;
    user.x = 10;
    user.parent = null;
    user.exitAvailableHandler = undefined;
  });

  describe('constructor', () => {
    it('should initialize properties', () => {
      expect(user.weight).toBe(70);
      expect(user.currentFloor).toBe(0);
      expect(user.destinationFloor).toBe(0);
      expect(user.done).toBe(false);
      expect(user.removeMe).toBe(false);
    });
  });

  describe('appearOnFloor', () => {
    it('should set currentFloor, destinationFloor, move to spawn position, and press floor button', () => {
      const floor = {
        level: 2,
        getSpawnPosY: jest.fn(() => 123),
        pressUpButton: jest.fn(),
        pressDownButton: jest.fn(),
      };
      user.pressFloorButton = jest.fn();

      user.appearOnFloor(floor, 5);

      expect(user.currentFloor).toBe(2);
      expect(user.destinationFloor).toBe(5);
      expect(mockMoveTo).toHaveBeenCalledWith(null, 123);
      expect(user.pressFloorButton).toHaveBeenCalledWith(floor);
    });
  });

  describe('pressFloorButton', () => {
    it('should press down button if destinationFloor < currentFloor', () => {
      const floor = { pressUpButton: jest.fn(), pressDownButton: jest.fn() };
      user.currentFloor = 5;
      user.destinationFloor = 2;
      user.pressFloorButton(floor);
      expect(floor.pressDownButton).toHaveBeenCalled();
      expect(floor.pressUpButton).not.toHaveBeenCalled();
    });

    it('should press up button if destinationFloor >= currentFloor', () => {
      const floor = { pressUpButton: jest.fn(), pressDownButton: jest.fn() };
      user.currentFloor = 2;
      user.destinationFloor = 5;
      user.pressFloorButton(floor);
      expect(floor.pressUpButton).toHaveBeenCalled();
      expect(floor.pressDownButton).not.toHaveBeenCalled();
    });
  });

  describe('handleExit', () => {
    it('should do nothing if elevator is not at destination', () => {
      const elevator = { currentFloor: 3 };
      user.destinationFloor = 5;
      user.handleExit(3, elevator);
      expect(mockSetParent).not.toHaveBeenCalled();
      expect(mockTrigger).not.toHaveBeenCalled();
    });

    it('should handle exit when elevator is at destination', () => {
      const elevator = {
        currentFloor: 5,
        userExiting: jest.fn(),
        off: jest.fn(),
      };
      user.destinationFloor = 5;
      user.x = 10;
      user.moveToOverTime = jest.fn((x, y, t, interp, cb) => cb());
      user.handleExit(5, elevator);

      expect(elevator.userExiting).toHaveBeenCalledWith(user);
      expect(user.currentFloor).toBe(5);
      expect(mockSetParent).toHaveBeenCalledWith(null);
      expect(user.done).toBe(true);
      expect(mockTrigger).toHaveBeenCalledWith('exited_elevator', elevator);
      expect(mockTrigger).toHaveBeenCalledWith('new_state');
      expect(mockTrigger).toHaveBeenCalledWith('new_display_state');
      expect(user.removeMe).toBe(true);
      expect(mockTrigger).toHaveBeenCalledWith('removed');
      expect(mockOff).toHaveBeenCalledWith('*');
      expect(elevator.off).toHaveBeenCalled();
    });
  });

  describe('elevatorAvailable', () => {
    let elevator, floor;
    beforeEach(() => {
      elevator = {
        isSuitableForTravelBetween: jest.fn(() => true),
        userEntering: jest.fn(() => [1, 2]),
        pressFloorButton: jest.fn(),
        on: jest.fn(),
        off: jest.fn(),
        currentFloor: 2,
      };
      floor = { pressUpButton: jest.fn(), pressDownButton: jest.fn() };
      user.currentFloor = 1;
      user.destinationFloor = 2;
    });

    it('should do nothing if user is done', () => {
      user.done = true;
      user.elevatorAvailable(elevator, floor);
      expect(elevator.userEntering).not.toHaveBeenCalled();
    });

    it('should do nothing if user has parent', () => {
      user.parent = {};
      user.elevatorAvailable(elevator, floor);
      expect(elevator.userEntering).not.toHaveBeenCalled();
    });

    it('should do nothing if user is busy', () => {
      user.isBusy = jest.fn(() => true);
      user.elevatorAvailable(elevator, floor);
      expect(elevator.userEntering).not.toHaveBeenCalled();
    });

    it('should do nothing if elevator is not suitable', () => {
      elevator.isSuitableForTravelBetween = jest.fn(() => false);
      user.elevatorAvailable(elevator, floor);
      expect(elevator.userEntering).not.toHaveBeenCalled();
    });

    it('should enter elevator and set up handlers if position is returned', () => {
      user.moveToOverTime = jest.fn((x, y, t, interp, cb) => cb());
      user.elevatorAvailable(elevator, floor);

      expect(user.setParent).toHaveBeenCalledWith(elevator);
      expect(user.trigger).toHaveBeenCalledWith('entered_elevator', elevator);
      expect(user.moveToOverTime).toHaveBeenCalledWith(1, 2, 1, undefined, expect.any(Function));
      expect(elevator.pressFloorButton).toHaveBeenCalledWith(user.destinationFloor);
      expect(elevator.on).toHaveBeenCalledWith('exit_available', expect.any(Function));
    });

    it('should press floor button if elevator.userEntering returns falsy', () => {
      elevator.userEntering = jest.fn(() => null);
      user.pressFloorButton = jest.fn();
      user.elevatorAvailable(elevator, floor);
      expect(user.pressFloorButton).toHaveBeenCalledWith(floor);
    });
  });
});
