const { onmessage } = require('./fitness-worker.js');
const fitnessWorker = require('./fitness-worker.js');

global.importScripts = jest.fn();
global.onmessage = jest.fn();
global.postMessage = jest.fn();

global.Worker = class {
  constructor() {}
  postMessage() {}
  onmessage() {}
};

jest.mock('./do-fitness-suite', () => ({
  doFitnessSuite: jest.fn(() => ({ score: 42 })),
}));

describe('fitness-worker', () => {
  beforeAll(() => {
    global.importScripts = jest.fn();
    global.postMessage = jest.fn();
    global.Worker = class {
      constructor() {}
      postMessage() {}
      onmessage() {}
    };

    importScripts = global.importScripts;
  });

  afterAll(() => {
    delete global.importScripts;
    delete global.postMessage;
    delete global.Worker;
  });

  it('should load without error', () => {
    expect(() => require('./fitness-worker.js')).not.toThrow();
  });

  it('should define onmessage handler', () => {
    expect(typeof onmessage).toBe('function');
  });

  it('should call doFitnessSuite and postMessage with results', () => {
    const codeStr = 'some code';
    const msg = { data: codeStr };

    fitnessWorker.onmessage(msg);

    const { doFitnessSuite } = require('./do-fitness-suite');
    expect(doFitnessSuite).toHaveBeenCalledWith(codeStr, 6);
    expect(global.postMessage).toHaveBeenCalledWith({ score: 42 });
  });
});
