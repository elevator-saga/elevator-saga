import { jest } from '@jest/globals';
import each from 'lodash/each';
import range from 'lodash/range';
import { timeForwarder } from '../test-helpers';
import Elevator from './elevator';

describe('Elevator object', () => {
  let elevator = null;
  const floorCount = 4;
  const floorHeight = 44;
  let handlers = null;

  beforeEach(function () {
    handlers = {
      someHandler: function () {},
      someOtherHandler: function () {},
    };
    // Use Jest spies
    for (const key in handlers) {
      handlers[key] = jest.fn();
    }

    elevator = new Elevator({ speedFloorsPerSec: 1.5, floorCount, floorHeight, maxUsers: 4 });
    elevator.setFloorPosition(0);
  });

  it('moves to floors specified', () => {
    for (let floor = 0; floor < floorCount - 1; floor++) {
      elevator.goToFloor(floor);
      timeForwarder(10.0, 0.015, (dt) => {
        elevator.update(dt);
        elevator.updateElevatorMovement(dt);
      });
      const expectedY = floorHeight * (floorCount - 1) - floorHeight * floor;
      expect(elevator.y).toBe(expectedY);
      expect(elevator.currentFloor).toBe(floor);
    }
  });

  it('can change direction', function () {
    expect(elevator.currentFloor).toBe(0);
    const originalY = elevator.y;
    elevator.goToFloor(1);
    timeForwarder(0.2, 0.015, function (dt) {
      elevator.update(dt);
      elevator.updateElevatorMovement(dt);
    });
    expect(elevator.y).not.toBe(originalY);
    elevator.goToFloor(0);
    timeForwarder(10.0, 0.015, function (dt) {
      elevator.update(dt);
      elevator.updateElevatorMovement(dt);
    });
    expect(elevator.y).toBe(originalY);
    expect(elevator.currentFloor).toBe(0);
  });

  it('is correctly aware of it being on a floor', function () {
    expect(elevator.isOnAFloor()).toBe(true);
    elevator.y = elevator.y + 0.0000000000000001;
    expect(elevator.isOnAFloor()).toBe(true);
    elevator.y = elevator.y + 0.0001;
    expect(elevator.isOnAFloor()).toBe(false);
  });

  it('correctly reports travel suitability', function () {
    elevator.goingUpIndicator = true;
    elevator.goingDownIndicator = true;
    expect(elevator.isSuitableForTravelBetween(0, 1)).toBe(true);
    expect(elevator.isSuitableForTravelBetween(2, 4)).toBe(true);
    expect(elevator.isSuitableForTravelBetween(5, 3)).toBe(true);
    expect(elevator.isSuitableForTravelBetween(2, 0)).toBe(true);
    elevator.goingUpIndicator = false;
    expect(elevator.isSuitableForTravelBetween(1, 10)).toBe(false);
    elevator.goingDownIndicator = false;
    expect(elevator.isSuitableForTravelBetween(20, 0)).toBe(false);
  });

  it('reports pressed floor buttons', function () {
    elevator.pressFloorButton(2);
    elevator.pressFloorButton(3);
    expect(elevator.getPressedFloors()).toEqual([2, 3]);
  });

  it('reports not approaching floor 0 when going up from floor 0', function () {
    elevator.goToFloor(1);
    timeForwarder(0.01, 0.015, function (dt) {
      elevator.update(dt);
      elevator.updateElevatorMovement(dt);
    });
    expect(elevator.isApproachingFloor(0)).toBe(false);
  });

  it('reports approaching floor 2 when going up from floor 0', function () {
    elevator.goToFloor(1);
    timeForwarder(0.01, 0.015, function (dt) {
      elevator.update(dt);
      elevator.updateElevatorMovement(dt);
    });
    expect(elevator.isApproachingFloor(2)).toBe(true);
  });

  it('reports approaching floor 2 when going down from floor 3', function () {
    elevator.setFloorPosition(3);
    elevator.goToFloor(2);
    timeForwarder(0.01, 0.015, function (dt) {
      elevator.update(dt);
      elevator.updateElevatorMovement(dt);
    });
    expect(elevator.isApproachingFloor(2)).toBe(true);
  });

  it('emits no passing floor events when going from floor 0 to 1', function () {
    elevator.on('passing_floor', handlers.someHandler);
    elevator.on('passing_floor', function (floorNum, direction) {
      console.log('Passing floor yo', floorNum, direction);
    });
    elevator.goToFloor(1);
    timeForwarder(10.0, 0.015, function (dt) {
      elevator.update(dt);
      elevator.updateElevatorMovement(dt);
    });
    expect(elevator.currentFloor).toBe(1);
    expect(handlers.someHandler).not.toHaveBeenCalled();
  });

  it('emits passing floor event when going from floor 0 to 2', function () {
    elevator.on('passing_floor', handlers.someHandler);
    elevator.goToFloor(2);
    timeForwarder(10.0, 0.015, function (dt) {
      elevator.update(dt);
      elevator.updateElevatorMovement(dt);
    });
    expect(elevator.currentFloor).toBe(2);
    expect(handlers.someHandler.mock.calls.length).toEqual(1);
    expect(handlers.someHandler.mock.calls[handlers.someHandler.mock.calls.length - 1].slice(0, 1)).toEqual([1]);
  });

  it('emits passing floor events when going from floor 0 to 3', function () {
    elevator.on('passing_floor', handlers.someHandler);
    elevator.goToFloor(3);
    timeForwarder(10.0, 0.015, function (dt) {
      elevator.update(dt);
      elevator.updateElevatorMovement(dt);
    });
    expect(elevator.currentFloor).toBe(3);
    expect(handlers.someHandler.mock.calls.length).toEqual(2);
    expect(handlers.someHandler.mock.calls[0].slice(0, 1)).toEqual([1]);
    expect(handlers.someHandler.mock.calls[1].slice(0, 1)).toEqual([2]);
  });

  it('emits passing floor events when going from floor 3 to 0', function () {
    elevator.on('passing_floor', handlers.someHandler);
    elevator.goToFloor(3);
    timeForwarder(10.0, 0.015, function (dt) {
      elevator.update(dt);
      elevator.updateElevatorMovement(dt);
    });
    expect(elevator.currentFloor).toBe(3);
    expect(handlers.someHandler.mock.calls.length).toEqual(2);
    expect(handlers.someHandler.mock.calls[0].slice(0, 1)).toEqual([1]);
    expect(handlers.someHandler.mock.calls[1].slice(0, 1)).toEqual([2]);
  });

  it('doesnt raise unexpected events when told to stop(ish) when passing floor', function () {
    let passingFloorEventCount = 0;
    elevator.on('passing_floor', function (floorNum, direction) {
      expect(floorNum).toBe(1, 'floor being passed');
      expect(direction).toBe('up');
      passingFloorEventCount++;
      elevator.goToFloor(elevator.getExactFutureFloorIfStopped());
    });
    elevator.goToFloor(2);
    timeForwarder(3.0, 0.01401, function (dt) {
      elevator.update(dt);
      elevator.updateElevatorMovement(dt);
    });
    expect(passingFloorEventCount).toBeGreaterThan(0, 'event count');
    expect(elevator.getExactCurrentFloor()).toBeLessThan(1.15, 'current floor');
  });

  it('doesnt seem to overshoot when stopping at floors', function () {
    each(range(60, 120, 2.32133), function (updatesPerSecond) {
      const STEPSIZE = 1.0 / updatesPerSecond;
      elevator.setFloorPosition(1);
      elevator.goToFloor(3);
      timeForwarder(5.0, STEPSIZE, function (dt) {
        elevator.update(dt);
        elevator.updateElevatorMovement(dt);
        // Replace Jasmine's toBeWithinRange with Jest's range matchers
        const val = elevator.getExactCurrentFloor();
        expect(val).toBeGreaterThanOrEqual(1.0);
        expect(val).toBeLessThanOrEqual(3.0);
        // Optionally, you can add a custom message using console.log if needed
        // console.log('(STEPSIZE is ' + STEPSIZE + ')'
      });
      expect(elevator.getExactCurrentFloor()).toEqual(3.0);
    });
  });
});
