global.importScripts = jest.fn();
global.onmessage = jest.fn();
global.postMessage = jest.fn();

global.Worker = class {
  constructor() {}
  postMessage() {}
  onmessage() {}
};

describe('fitness-worker', () => {
  afterAll(() => {
    delete global.Worker;
  });

  it('should load without error', () => {
    require('./fitness-worker.js');
    expect(global.importScripts).toHaveBeenCalled();
  });
});
