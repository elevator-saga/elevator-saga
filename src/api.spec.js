import { jest } from '@jest/globals';
import random from 'lodash/random';
import range from 'lodash/range';
import Elevator from './elevator';
import ElevatorFacade from './elevator-facade';
import { timeForwarder } from './test-helpers';

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

  describe('Elevator interface', function () {
    var e = null;
    var elevInterface = null;
    beforeEach(function () {
      e = new Elevator(1.5, 4, 40);
      e.setFloorPosition(0);
      elevInterface = new ElevatorFacade({}, e, 4);
    });

    describe('events', function () {
      it('propagates stopped_at_floor event', function () {
        elevInterface.on('stopped_at_floor', handlers.someHandler);
        e.trigger('stopped_at_floor', 3);
        expect(handlers.someHandler.mock.calls[handlers.someHandler.mock.calls.length - 1].slice(0, 1)).toEqual([3]);
      });

      it('does not propagate stopped event', function () {
        elevInterface.on('stopped', handlers.someHandler);
        e.trigger('stopped', 3.1);
        expect(handlers.someHandler).not.toHaveBeenCalled();
      });

      it('triggers idle event at start', function () {
        elevInterface.on('idle', handlers.someHandler);
        elevInterface.checkDestinationQueue();
        expect(handlers.someHandler).toHaveBeenCalled();
      });

      it('triggers idle event when queue empties', function () {
        elevInterface.on('idle', handlers.someHandler);
        elevInterface.destinationQueue = [11, 21];
        e.y = 11;
        e.trigger('stopped', e.y);
        expect(handlers.someHandler).not.toHaveBeenCalled();
        e.y = 21;
        e.trigger('stopped', e.y);
        expect(handlers.someHandler).toHaveBeenCalled();
      });
    });

    it('stops when told told to stop', function () {
      var originalY = e.y;
      elevInterface.goToFloor(2);
      timeForwarder(10, 0.015, function (dt) {
        e.update(dt);
        e.updateElevatorMovement(dt);
      });
      expect(e.y).not.toBe(originalY);

      elevInterface.goToFloor(0);
      timeForwarder(0.2, 0.015, function (dt) {
        e.update(dt);
        e.updateElevatorMovement(dt);
      });
      var whenMovingY = e.y;

      elevInterface.stop();
      timeForwarder(10, 0.015, function (dt) {
        e.update(dt);
        e.updateElevatorMovement(dt);
      });
      expect(e.y).not.toBe(whenMovingY);
      expect(e.y).not.toBe(originalY);
    });

    describe('destination direction', function () {
      it('reports up when going up', function () {
        e.setFloorPosition(1);
        elevInterface.goToFloor(1);
        expect(elevInterface.destinationDirection()).toBe('stopped');
      });
      it('reports up when going up', function () {
        elevInterface.goToFloor(1);
        expect(elevInterface.destinationDirection()).toBe('up');
      });
      it('reports down when going down', function () {
        e.setFloorPosition(3);
        elevInterface.goToFloor(2);
        expect(elevInterface.destinationDirection()).toBe('down');
      });
    });

    it('stores going up and going down properties', function () {
      expect(e.goingUpIndicator).toBe(true);
      expect(e.goingDownIndicator).toBe(true);
      expect(elevInterface.goingUpIndicator()).toBe(true);
      expect(elevInterface.goingDownIndicator()).toBe(true);

      elevInterface.goingUpIndicator(false);
      expect(elevInterface.goingUpIndicator()).toBe(false);
      expect(elevInterface.goingDownIndicator()).toBe(true);

      elevInterface.goingDownIndicator(false);
      expect(elevInterface.goingDownIndicator()).toBe(false);
      expect(elevInterface.goingUpIndicator()).toBe(false);
    });

    it('can chain calls to going up and down indicator functions', function () {
      elevInterface.goingUpIndicator(false).goingDownIndicator(false);
      expect(elevInterface.goingUpIndicator()).toBe(false);
      expect(elevInterface.goingDownIndicator()).toBe(false);
    });

    it('normalizes load factor', function () {
      var fnNewUser = function () {
          return { weight: random(55, 100) };
        },
        fnEnterElevator = function (user) {
          e.userEntering(user);
        };

      range(20).map(fnNewUser).forEach(fnEnterElevator);
      var load = elevInterface.loadFactor();
      expect(load >= 0 && load <= 1).toBeTruthy();
    });

    it('doesnt raise unexpected events when told to stop when passing floor', function () {
      e.setFloorPosition(2);
      elevInterface.goToFloor(0);
      var passingFloorEventCount = 0;
      elevInterface.on('passing_floor', function (floorNum, direction) {
        passingFloorEventCount++;
        // We only expect to be passing floor 1, but it is possible and ok that several
        // such events are raised, due to possible overshoot.
        expect(floorNum).toBe(1, 'floor being passed');
        elevInterface.stop();
      });
      timeForwarder(3.0, 0.01401, function (dt) {
        e.update(dt);
        e.updateElevatorMovement(dt);
      });
      expect(passingFloorEventCount).toBeGreaterThan(0);
    });
  });
});
