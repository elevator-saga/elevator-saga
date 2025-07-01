import MockWorld from '../../models/__mocks__/world';
import MockWorldController from '../../models/__mocks__/world-controller';
import { createFrameRequester } from '../../models/utils';
import { calculateFitness } from './calculate-fitness';

jest.mock('../../models/world', () => {
  return {
    __esModule: true,
    default: require('../../models/__mocks__/world').default,
  };
});
jest.mock('../../models/world-controller', () => {
  return {
    __esModule: true,
    default: require('../../models/__mocks__/world-controller').default,
  };
});
jest.mock('../../models/utils', () => {
  return {
    __esModule: true,
    createFrameRequester: jest.fn().mockImplementation(() => ({
      trigger: jest.fn(),
      register: jest.fn(),
    })),
  };
});

describe('calculateFitness', () => {
  let mockWorld, mockController, mockFrameRequester, challenge, codeObj;

  beforeEach(() => {
    mockWorld = new MockWorld();
    mockController = new MockWorldController();
    mockFrameRequester = createFrameRequester();

    challenge = { options: { foo: 'bar' } };
    codeObj = { code: 'some code' };
  });

  it('should return stats after simulation', () => {
    // Simulate stats_changed event
    let statsChangedHandler;
    mockWorld.on.mockImplementation((event, handler) => {
      if (event === 'stats_changed') statsChangedHandler = handler;
    });

    // Simulate frameRequester.trigger calling stats_changed
    mockFrameRequester.trigger.mockImplementation(() => {
      if (statsChangedHandler) statsChangedHandler();
    });

    const result = calculateFitness(challenge, codeObj, 100, 3);

    expect(mockWorld).toHaveBeenCalledWith(challenge.options);
    expect(mockController).toHaveBeenCalledWith(100);
    expect(mockController.start).toHaveBeenCalledWith(mockWorld, codeObj, mockFrameRequester.register, true);
    expect(mockFrameRequester.trigger).toHaveBeenCalledTimes(3);

    expect(result.transportedPerSec).toBe(2.5);
    expect(result.avgWaitTime).toBe(10);
    expect(result.transportedCount).toBe(5);
    expect(result.error).toBeUndefined();
  });

  it('should set error if usercode_error event is emitted', () => {
    let usercodeErrorHandler;
    mockController.on.mockImplementation((event, handler) => {
      if (event === 'usercode_error') usercodeErrorHandler = handler;
    });

    // Simulate error emission before any stats
    mockFrameRequester.trigger.mockImplementation(() => {
      if (usercodeErrorHandler) usercodeErrorHandler(new Error('User code failed'));
    });

    const result = calculateFitness(challenge, codeObj, 100, 2);

    expect(result.error).toBeInstanceOf(Error);
    expect(result.error.message).toBe('User code failed');
  });

  it('should stop simulation if controller is paused', () => {
    let callCount = 0;

    mockFrameRequester.trigger.mockImplementation(() => {
      callCount++;
      if (callCount === 2) mockController.isPaused = true;
    });

    calculateFitness(challenge, codeObj, 100, 5);

    // Should only call trigger twice due to pause
    expect(mockFrameRequester.trigger).toHaveBeenCalledTimes(2);
  });

  it('should not set stats if stats_changed is never emitted', () => {
    // No stats_changed handler called
    mockFrameRequester.trigger.mockImplementation(() => {});

    const result = calculateFitness(challenge, codeObj, 100, 2);

    expect(result.transportedPerSec).toBeUndefined();
    expect(result.avgWaitTime).toBeUndefined();
    expect(result.transportedCount).toBeUndefined();
  });
});
