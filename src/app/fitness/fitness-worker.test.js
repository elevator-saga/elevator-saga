global.importScripts = jest.fn();
global.onmessage = jest.fn();
global.postMessage = jest.fn();

describe('fitnessworker', () => {
  it('should load without error', () => {
    require('../app/fitnessworker.js');
    expect(global.importScripts).toHaveBeenCalled();
  });
});
