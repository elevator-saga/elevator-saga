import { jest } from '@jest/globals';
import observable from '@riotjs/observable';
import { createFrameRequester } from './base';
import { createWorldController } from './world';

describe('World controller', function () {
  var controller = null;
  var fakeWorld = null;
  var fakeCodeObj = null;
  var frameRequester = null;
  var DT_MAX = 1000.0 / 59;

  beforeEach(function () {
    controller = createWorldController(DT_MAX);
    fakeWorld = {
      update: function (dt) {},
      init: function () {},
      updateDisplayPositions: function () {},
      trigger: function () {},
    };
    fakeWorld = observable(fakeWorld);
    fakeCodeObj = { init: function () {}, update: function () {} };
    frameRequester = createFrameRequester(10.0);
    jest.spyOn(fakeWorld, 'update').mockImplementation(function (dt) {});
  });

  it('does not update world on first animation frame', function () {
    controller.start(fakeWorld, fakeCodeObj, frameRequester.register, true);
    frameRequester.trigger();
    expect(fakeWorld.update).not.toHaveBeenCalled();
  });

  it('calls world update with correct delta t', function () {
    controller.start(fakeWorld, fakeCodeObj, frameRequester.register, true);
    frameRequester.trigger();
    frameRequester.trigger();
    expect(fakeWorld.update).toHaveBeenCalledWith(0.01);
  });

  it('calls world update with scaled delta t', function () {
    controller.timeScale = 2.0;
    controller.start(fakeWorld, fakeCodeObj, frameRequester.register, true);
    frameRequester.trigger();
    frameRequester.trigger();
    expect(fakeWorld.update).toHaveBeenCalledWith(0.02);
  });

  it('does not update world when paused', function () {
    controller.start(fakeWorld, fakeCodeObj, frameRequester.register, true);
    controller.isPaused = true;
    frameRequester.trigger();
    frameRequester.trigger();
    expect(fakeWorld.update).not.toHaveBeenCalled();
  });
});
