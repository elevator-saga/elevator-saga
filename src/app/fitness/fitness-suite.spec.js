import { doFitnessSuite } from './do-fitness-suite';
import { fitnessSuite } from './fitness-suite';

jest.mock('./do-fitness-suite');

describe('fitnessSuite', () => {
  const codeStr = 'some code';
  const fakeResults = { score: 42 };

  beforeEach(() => {
    jest.clearAllMocks();
    doFitnessSuite.mockReturnValue(fakeResults);
  });

  describe('when Worker is not available or preferWorker is false', () => {
    let originalWorker;

    beforeAll(() => {
      originalWorker = global.Worker;
      delete global.Worker;
    });

    afterAll(() => {
      global.Worker = originalWorker;
    });

    it('calls doFitnessSuite and invokes callback with results', () => {
      const callback = jest.fn();
      fitnessSuite(codeStr, false, callback);
      expect(doFitnessSuite).toHaveBeenCalledWith(codeStr, 2);
      expect(callback).toHaveBeenCalledWith(fakeResults);
    });
  });

  describe('when Worker is available and preferWorker is true', () => {
    let originalWorker;
    let postMessageMock, onmessageSetter;

    beforeEach(() => {
      postMessageMock = jest.fn();
      onmessageSetter = null;

      function MockWorker() {
        this.postMessage = postMessageMock;
        Object.defineProperty(this, 'onmessage', {
          set(fn) {
            onmessageSetter = fn;
          },
        });
      }

      originalWorker = global.Worker;
      global.Worker = MockWorker;
    });

    afterEach(() => {
      global.Worker = originalWorker;
    });

    it('uses Worker, posts message, and invokes callback on message', () => {
      const callback = jest.fn();
      fitnessSuite(codeStr, true, callback);

      expect(postMessageMock).toHaveBeenCalledWith(codeStr);
      expect(typeof onmessageSetter).toBe('function');

      // Simulate worker message
      const workerMsg = { data: fakeResults };
      onmessageSetter(workerMsg);

      expect(callback).toHaveBeenCalledWith(fakeResults);
      // doFitnessSuite should not be called in this path
      expect(doFitnessSuite).not.toHaveBeenCalled();
    });

    it('falls back to doFitnessSuite if Worker throws', () => {
      global.Worker = () => {
        throw new Error('fail');
      };
      const callback = jest.fn();

      fitnessSuite(codeStr, true, callback);

      expect(doFitnessSuite).toHaveBeenCalledWith(codeStr, 2);
      expect(callback).toHaveBeenCalledWith(fakeResults);
    });
  });
});
