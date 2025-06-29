import { jest } from '@jest/globals';
import random from 'lodash/random';
import range from 'lodash/range';
import { timeForwarder } from '../test-helpers';
import Elevator from './elevator';
import ElevatorFacade from './elevator-facade';

describe('API', function () {
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
  });

  describe('Elevator Facade', function () {
    let elevator = null;
    let facade = null;

    beforeEach(function () {
      elevator = new Elevator({
        speedFloorsPerSec: 1.5,
        floorCount: 4,
        floorHeight: 40,
        maxUsers: 4,
      });
      elevator.setFloorPosition(0);
      facade = new ElevatorFacade({ elevator, floorCount: 4 });
    });

    describe('events', function () {
      it('propagates stopped_at_floor event', function () {
        facade.on('stopped_at_floor', handlers.someHandler);
        elevator.trigger('stopped_at_floor', 3);
        expect(handlers.someHandler.mock.calls[handlers.someHandler.mock.calls.length - 1].slice(0, 1)).toEqual([3]);
      });

      it('does not propagate stopped event', function () {
        facade.on('stopped', handlers.someHandler);
        elevator.trigger('stopped', 3.1);
        expect(handlers.someHandler).not.toHaveBeenCalled();
      });

      it('triggers idle event at start', function () {
        facade.on('idle', handlers.someHandler);
        facade.checkDestinationQueue();
        expect(handlers.someHandler).toHaveBeenCalled();
      });

      it('triggers idle event when queue empties', function () {
        facade.on('idle', handlers.someHandler);
        facade.destinationQueue = [11, 21];
        elevator.y = 11;
        elevator.trigger('stopped', elevator.y);
        expect(handlers.someHandler).not.toHaveBeenCalled();
        elevator.y = 21;
        elevator.trigger('stopped', elevator.y);
        expect(handlers.someHandler).toHaveBeenCalled();
      });
    });

    it('stops when told told to stop', function () {
      const originalY = elevator.y;
      facade.goToFloor(2);
      timeForwarder(10, 0.015, function (dt) {
        elevator.update(dt);
        elevator.updateElevatorMovement(dt);
      });
      expect(elevator.y).not.toBe(originalY);

      facade.goToFloor(0);
      timeForwarder(0.2, 0.015, function (dt) {
        elevator.update(dt);
        elevator.updateElevatorMovement(dt);
      });
      const whenMovingY = elevator.y;

      facade.stop();
      timeForwarder(10, 0.015, function (dt) {
        elevator.update(dt);
        elevator.updateElevatorMovement(dt);
      });
      expect(elevator.y).not.toBe(whenMovingY);
      expect(elevator.y).not.toBe(originalY);
    });

    describe('destination direction', function () {
      it('reports up when going up', function () {
        elevator.setFloorPosition(1);
        facade.goToFloor(1);
        expect(facade.destinationDirection()).toBe('stopped');
      });
      it('reports up when going up', function () {
        facade.goToFloor(1);
        expect(facade.destinationDirection()).toBe('up');
      });
      it('reports down when going down', function () {
        elevator.setFloorPosition(3);
        facade.goToFloor(2);
        expect(facade.destinationDirection()).toBe('down');
      });
    });

    it('stores going up and going down properties', function () {
      expect(elevator.goingUpIndicator).toBe(true);
      expect(elevator.goingDownIndicator).toBe(true);
      expect(facade.goingUpIndicator()).toBe(true);
      expect(facade.goingDownIndicator()).toBe(true);

      facade.goingUpIndicator(false);
      expect(facade.goingUpIndicator()).toBe(false);
      expect(facade.goingDownIndicator()).toBe(true);

      facade.goingDownIndicator(false);
      expect(facade.goingDownIndicator()).toBe(false);
      expect(facade.goingUpIndicator()).toBe(false);
    });

    it('can chain calls to going up and down indicator functions', function () {
      facade.goingUpIndicator(false).goingDownIndicator(false);
      expect(facade.goingUpIndicator()).toBe(false);
      expect(facade.goingDownIndicator()).toBe(false);
    });

    it('normalizes load factor', function () {
      const fnNewUser = function () {
          return { weight: random(55, 100) };
        },
        fnEnterElevator = function (user) {
          elevator.userEntering(user);
        };

      range(20).map(fnNewUser).forEach(fnEnterElevator);
      const load = facade.loadFactor();
      expect(load >= 0 && load <= 1).toBeTruthy();
    });

    it('doesnt raise unexpected events when told to stop when passing floor', function () {
      elevator.setFloorPosition(2);
      facade.goToFloor(0);
      let passingFloorEventCount = 0;
      facade.on('passing_floor', function (floorNum, direction) {
        passingFloorEventCount++;
        // We only expect to be passing floor 1, but it is possible and ok that several
        // such events are raised, due to possible overshoot.
        expect(floorNum).toBe(1, 'floor being passed');
        facade.stop();
      });
      timeForwarder(3.0, 0.01401, function (dt) {
        elevator.update(dt);
        elevator.updateElevatorMovement(dt);
      });
      expect(passingFloorEventCount).toBeGreaterThan(0);
    });
  });
});
