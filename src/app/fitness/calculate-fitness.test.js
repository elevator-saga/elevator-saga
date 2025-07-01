import { createFrameRequester } from '../../models/utils';
import World from '../../models/world';
import WorldController from '../../models/world-controller';
import { calculateFitness } from './calculate-fitness';

jest.mock('../../models/world', () => jest.fn());
jest.mock('../../models/world-controller', () => jest.fn());
jest.mock('../../models/utils', () => ({
  createFrameRequester: jest.fn(),
}));

describe('calculateFitness', () => {
  let mockWorld, mockController, mockFrameRequester, challenge, codeObj;

  beforeEach(() => {
    // Mock World
    mockWorld = {
      on: jest.fn(),
      transportedPerSec: 2.5,
      avgWaitTime: 10,
      transportedCounter: 42,
    };
    World.mockImplementation(() => mockWorld);

    // Mock WorldController
    mockController = {
      on: jest.fn(),
      start: jest.fn(),
      isPaused: false,
    };
    WorldController.mockImplementation(() => mockController);

    // Mock frameRequester
    mockFrameRequester = {
      register: jest.fn(),
      trigger: jest.fn(),
    };
    createFrameRequester.mockReturnValue(mockFrameRequester);

    challenge = { options: { foo: 'bar' } };
    codeObj = { code: 'user code' };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return stats after simulation', () => {
    // Simulate stats_changed event
    let statsChangedHandler;
    mockWorld.on.mockImplementation((event, handler) => {
      if (event === 'stats_changed') statsChangedHandler = handler;
    });

    // Simulate usercode_error event (not triggered in this test)
    mockController.on.mockImplementation(() => {});

    // Simulate frameRequester.trigger calling stats_changed at step 2
    let triggerCount = 0;
    mockFrameRequester.trigger.mockImplementation(() => {
      triggerCount++;
      if (triggerCount === 2 && statsChangedHandler) statsChangedHandler();
    });

    const result = calculateFitness(challenge, codeObj, 100, 5);

    expect(World).toHaveBeenCalledWith(challenge.options);
    expect(WorldController).toHaveBeenCalledWith(100);
    expect(mockController.start).toHaveBeenCalledWith(mockWorld, codeObj, mockFrameRequester.register, true);
    expect(mockFrameRequester.trigger).toHaveBeenCalledTimes(5);

    expect(result.transportedPerSec).toBe(2.5);
    expect(result.avgWaitTime).toBe(10);
    expect(result.transportedCount).toBe(42);
    expect(result.error).toBeUndefined();
  });

  it('should set error if usercode_error event is emitted', () => {
    let usercodeErrorHandler;
    mockController.on.mockImplementation((event, handler) => {
      if (event === 'usercode_error') usercodeErrorHandler = handler;
    });
    mockWorld.on.mockImplementation(() => {});

    mockFrameRequester.trigger.mockImplementation(() => {
      if (usercodeErrorHandler) usercodeErrorHandler(new Error('User code failed'));
    });

    const result = calculateFitness(challenge, codeObj, 100, 3);

    expect(result.error).toBeInstanceOf(Error);
    expect(result.error.message).toBe('User code failed');
  });

  it('should wrap non-Error usercode_error as Error', () => {
    let usercodeErrorHandler;
    mockController.on.mockImplementation((event, handler) => {
      if (event === 'usercode_error') usercodeErrorHandler = handler;
    });
    mockWorld.on.mockImplementation(() => {});

    mockFrameRequester.trigger.mockImplementation(() => {
      if (usercodeErrorHandler) usercodeErrorHandler('string error');
    });

    const result = calculateFitness(challenge, codeObj, 100, 2);

    expect(result.error).toBeInstanceOf(Error);
    expect(result.error.message).toBe('string error');
  });

  it('should stop simulation if controller.isPaused becomes true', () => {
    mockWorld.on.mockImplementation(() => {});
    mockController.on.mockImplementation(() => {});

    let callCount = 0;
    mockFrameRequester.trigger.mockImplementation(() => {
      callCount++;
      if (callCount === 2) mockController.isPaused = true;
    });

    const result = calculateFitness(challenge, codeObj, 100, 10);

    expect(mockFrameRequester.trigger).toHaveBeenCalledTimes(2);
    expect(result).toEqual({});
  });
});
