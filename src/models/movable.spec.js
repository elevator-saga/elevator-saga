import { jest } from '@jest/globals';
import { timeForwarder } from '../test-helpers';
import Movable from './movable';

describe('Movable object', function () {
  let movable = null;
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

  beforeEach(function () {
    movable = new Movable();
  });

  it('updates display position when told to', function () {
    movable.moveTo(1.0, 1.0);
    movable.updateDisplayPosition();
    expect(movable.worldX).toBe(1.0);
    expect(movable.worldY).toBe(1.0);
  });

  it('does not update display position when moved', function () {
    movable.moveTo(1.0, 1.0);
    expect(movable.worldX).toBe(0.0);
    expect(movable.worldY).toBe(0.0);
  });

  it('triggers event when moved', function () {
    movable.on('new_state', handlers.someHandler);
    movable.moveTo(1.0, 1.0);
    expect(handlers.someHandler).toHaveBeenCalled();
  });

  it('retains x pos when moveTo x is null', function () {
    movable.moveTo(1.0, 1.0);
    movable.moveTo(null, 2.0);
    expect(movable.x).toBe(1.0);
  });

  it('retains y pos when moveTo y is null', function () {
    movable.moveTo(1.0, 1.0);
    movable.moveTo(2.0, null);
    expect(movable.y).toBe(1.0);
  });

  it('gets new display position when parent is moved', function () {
    const mParent = new Movable();
    movable.setParent(mParent);
    mParent.moveTo(2.0, 3.0);
    movable.updateDisplayPosition();
    expect(movable.x).toBe(0.0);
    expect(movable.y).toBe(0.0);
    expect(movable.worldX).toBe(2.0);
    expect(movable.worldY).toBe(3.0);
  });

  it('moves to destination over time', function () {
    //obj.moveToOverTime = function(newX, newY, timeToSpend, interpolator, cb) {
    movable.moveToOverTime(2.0, 3.0, 10.0, handlers.someHandler);
    timeForwarder(10.0, 0.1, function (dt) {
      movable.update(dt);
    });
    expect(movable.x).toBe(2.0);
    expect(movable.y).toBe(3.0);
    expect(handlers.someHandler).toHaveBeenCalled();
  });
});
