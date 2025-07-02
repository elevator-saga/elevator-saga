import { createFrameRequester } from './utils';
import WorldController from './world-controller';

describe('World controller', function () {
  let controller = null;
  let fakeWorld = null;
  let fakeCodeObj = null;
  let frameRequester = null;
  const DT_MAX = 1000.0 / 59;

  beforeEach(function () {
    controller = new WorldController(DT_MAX);
    fakeWorld = {
      update: function (dt) {},
      init: function () {},
      updateDisplayPositions: function () {},
      emit: function () {},
      on: function () {},
      off: function () {},
    };
    fakeCodeObj = { init: function () {}, update: function () {} };
    frameRequester = createFrameRequester(10.0);
    jest.spyOn(fakeWorld, 'update').mockImplementation(function (dt) {});
  });

  it('does not update world on first animation frame', function () {
    controller.start(fakeWorld, fakeCodeObj, frameRequester.register, true);
    frameRequester.emit();
    expect(fakeWorld.update).not.toHaveBeenCalled();
  });

  it('calls world update with correct delta t', function () {
    controller.start(fakeWorld, fakeCodeObj, frameRequester.register, true);
    frameRequester.emit();
    frameRequester.emit();
    expect(fakeWorld.update).toHaveBeenCalledWith(0.01);
  });

  it('calls world update with scaled delta t', function () {
    controller.timeScale = 2.0;
    controller.start(fakeWorld, fakeCodeObj, frameRequester.register, true);
    frameRequester.emit();
    frameRequester.emit();
    expect(fakeWorld.update).toHaveBeenCalledWith(0.02);
  });

  it('does not update world when paused', function () {
    controller.start(fakeWorld, fakeCodeObj, frameRequester.register, true);
    controller.isPaused = true;
    frameRequester.emit();
    frameRequester.emit();
    expect(fakeWorld.update).not.toHaveBeenCalled();
  });
});
