import MockWorld from '../models/__mocks__/world';
import MockWorldController from '../models/__mocks__/world-controller';
import World from '../models/world';
import Simulation from './simulation';

// Mocks for dependencies
jest.mock('@riotjs/observable', () => {
  return jest.fn((obj) => {
    obj.on = jest.fn();
    obj.off = jest.fn();
    obj.trigger = jest.fn();
  });
});

jest.mock('../models/world', () => {
  const ActualMock = require('../models/__mocks__/world').default;
  return {
    __esModule: true,
    default: jest.fn().mockImplementation(function (...args) {
      return new ActualMock(...args);
    }),
  };
});
jest.mock('../models/world-controller', () => {
  const ActualMock = require('../models/__mocks__/world-controller').default;
  return {
    __esModule: true,
    default: jest.fn().mockImplementation(function (...args) {
      return new ActualMock(...args);
    }),
  };
});

describe('Simulation', () => {
  let deps;
  let simulation;
  let mockEditor;
  let mockChallenges;
  let mockClearAll;
  let mockPresentStats;
  let mockPresentChallenge;
  let mockPresentWorld;
  let mockPresentFeedback;
  let mockTemplates;
  let mockParams;
  let mockCreateParamsUrl;
  let mockTsKey;
  let mock$world, mock$feedback, mock$stats, mock$challenge;
  let mockWorldController;
  let mockWorld;

  beforeEach(() => {
    jest.clearAllMocks();
    // global.localStorage = window.localStorage = { setItem: jest.fn() };
    // mockWorldController = new MockWorldController();
    // mockWorld = new MockWorld();
    mockEditor = { getCodeObj: jest.fn(() => ({})), trigger: jest.fn() };
    mockChallenges = [
      {
        options: { foo: 'bar' },
        condition: { evaluate: jest.fn(() => null) },
      },
      {
        options: { foo: 'baz' },
        condition: { evaluate: jest.fn(() => true) },
      },
    ];
    mockClearAll = jest.fn();
    mockPresentStats = jest.fn();
    mockPresentChallenge = jest.fn();
    mockPresentWorld = jest.fn();
    mockPresentFeedback = jest.fn();
    mockTemplates = {
      challengeTempl: 'challengeTempl',
      floorTempl: 'floorTempl',
      elevatorTempl: 'elevatorTempl',
      elevatorButtonTempl: 'elevatorButtonTempl',
      userTempl: 'userTempl',
      feedbackTempl: 'feedbackTempl',
    };
    mockParams = { foo: 'bar' };
    mockCreateParamsUrl = jest.fn(() => 'url');
    mockTsKey = 'tsKey';
    mock$world = {};
    mock$feedback = {};
    mock$stats = {};
    mock$challenge = {};

    deps = {
      editor: mockEditor,
      challenges: mockChallenges,
      clearAll: mockClearAll,
      presentStats: mockPresentStats,
      presentChallenge: mockPresentChallenge,
      presentWorld: mockPresentWorld,
      presentFeedback: mockPresentFeedback,
      templates: mockTemplates,
      params: mockParams,
      createParamsUrl: mockCreateParamsUrl,
      tsKey: mockTsKey,
      $world: mock$world,
      $feedback: mock$feedback,
      $stats: mock$stats,
      $challenge: mock$challenge,
    };

    // Reset mocks
    mockEditor.getCodeObj.mockClear();
    mockEditor.trigger.mockClear();

    simulation = new Simulation(deps);
    // simulation.worldController = new MockWorldController();
    // simulation.world = new MockWorld();
  });

  it('should initialize with dependencies', () => {
    expect(simulation.editor).toBe(mockEditor);
    expect(simulation.challenges).toBe(mockChallenges);
    expect(simulation.clearAll).toBe(mockClearAll);
    expect(simulation.presentStats).toBe(mockPresentStats);
    expect(simulation.presentChallenge).toBe(mockPresentChallenge);
    expect(simulation.presentWorld).toBe(mockPresentWorld);
    expect(simulation.presentFeedback).toBe(mockPresentFeedback);
    expect(simulation.templates).toBe(mockTemplates);
    expect(simulation.params).toBe(mockParams);
    expect(simulation.createParamsUrl).toBe(mockCreateParamsUrl);
    expect(simulation.tsKey).toBe(mockTsKey);
    expect(simulation.$world).toBe(mock$world);
    expect(simulation.$feedback).toBe(mock$feedback);
    expect(simulation.$stats).toBe(mock$stats);
    expect(simulation.$challenge).toBe(mock$challenge);
    expect(simulation.currentChallengeIndex).toBe(0);
    expect(simulation.worldController).toBeInstanceOf(MockWorldController);
    expect(simulation.worldController.on).toHaveBeenCalledWith('usercode_error', expect.any(Function));
  });

  it('startStopOrRestart should restart challenge if ended', () => {
    // Arrange
    simulation.world = { challengeEnded: true };
    simulation.startChallenge = jest.fn();
    simulation.currentChallengeIndex = 1;

    // Act
    simulation.startStopOrRestart();

    // Assert
    expect(simulation.startChallenge).toHaveBeenCalledWith(1);
  });

  it('startStopOrRestart should toggle pause if not ended', () => {
    // Arrange
    simulation.world = new MockWorld();
    simulation.worldController = new MockWorldController();
    // simulation.world = { challengeEnded: false };
    simulation.worldController.setPaused = jest.fn();
    simulation.worldController.isPaused = false;

    // Act
    simulation.startStopOrRestart();

    // Assert
    expect(simulation.worldController.setPaused).toHaveBeenCalledWith(true);
  });

  it('startChallenge should unwind previous world if exists', () => {
    // Arrange
    const unWind = jest.fn();
    simulation.world = { unWind };

    // Act
    simulation.startChallenge(0);

    // Assert
    expect(unWind).toHaveBeenCalled();
  });

  it('startChallenge should set up world and call UI methods', () => {
    // Arrange
    global.window = Object.create(window);
    window.requestAnimationFrame = jest.fn();

    // Act
    simulation.startChallenge(0);

    // Assert
    expect(simulation.currentChallengeIndex).toBe(0);
    expect(World).toHaveBeenCalledWith(mockChallenges[0].options);
    expect(mockClearAll).toHaveBeenCalledWith([mock$world, mock$feedback]);
    expect(mockPresentStats).toHaveBeenCalledWith(mock$stats, expect.any(Object));
    expect(mockPresentChallenge).toHaveBeenCalledWith(mock$challenge, mockChallenges[0], {
      app: simulation,
      world: expect.any(Object),
      worldController: simulation.worldController,
      challengeNum: 1,
      challengeTempl: mockTemplates.challengeTempl,
    });
    expect(mockPresentWorld).toHaveBeenCalledWith(
      mock$world,
      expect.any(Object),
      mockTemplates.floorTempl,
      mockTemplates.elevatorTempl,
      mockTemplates.elevatorButtonTempl,
      mockTemplates.userTempl
    );
    expect(mockEditor.getCodeObj).toHaveBeenCalled();
    expect(simulation.worldController.start).toHaveBeenCalled();
  });

  it('should handle stats_changed event and present feedback on challenge success', () => {
    // Arrange
    global.window = Object.create(window);
    window.requestAnimationFrame = jest.fn();
    const challengeIndex = 1;
    mockChallenges[challengeIndex].condition.evaluate = jest.fn(() => true);
    simulation.startChallenge(challengeIndex);

    // Simulate stats_changed event
    const statsChangedHandler = simulation.world.on.mock.calls.find(([event]) => event === 'stats_changed')[1];

    simulation.world = { challengeEnded: false };
    simulation.worldController.setPaused = jest.fn();

    // Act
    statsChangedHandler();

    // Assert
    expect(simulation.world.challengeEnded).toBe(true);
    expect(simulation.worldController.setPaused).toHaveBeenCalledWith(true);
    expect(mockPresentFeedback).toHaveBeenCalledWith(
      mock$feedback,
      mockTemplates.feedbackTempl,
      simulation.world,
      'Success!',
      'Challenge completed',
      'url'
    );
  });

  it('should handle stats_changed event and present feedback on challenge failure', () => {
    // Arrange
    global.window = Object.create(window);
    window.requestAnimationFrame = jest.fn();
    const challengeIndex = 0;
    mockChallenges[challengeIndex].condition.evaluate = jest.fn(() => false);

    simulation.startChallenge(challengeIndex);

    // Simulate stats_changed event
    const statsChangedHandler = simulation.world.on.mock.calls.find(([event]) => event === 'stats_changed')[1];

    simulation.world = { challengeEnded: false };
    simulation.worldController.setPaused = jest.fn();

    // Act
    statsChangedHandler();

    // Assert
    expect(simulation.world.challengeEnded).toBe(true);
    expect(simulation.worldController.setPaused).toHaveBeenCalledWith(true);
    expect(mockPresentFeedback).toHaveBeenCalledWith(
      mock$feedback,
      mockTemplates.feedbackTempl,
      simulation.world,
      'Challenge failed',
      'Maybe your program needs an improvement?',
      ''
    );
  });

  it('should handle timescale_changed event and update localStorage', () => {
    // Arrange
    const mockLocalStorageSpy = jest.spyOn(Storage.prototype, 'setItem');
    simulation.worldController.timeScale = 2;
    simulation.startChallenge(0);

    // Simulate timescale_changed event
    const timescaleChangedHandler = simulation.worldController.on.mock.calls.find(
      ([event]) => event === 'timescale_changed'
    )[1];

    // Act
    timescaleChangedHandler();

    // Assert
    expect(mockLocalStorageSpy).toHaveBeenCalledWith(mockTsKey, simulation.worldController.timeScale);
    expect(mockPresentChallenge).toHaveBeenCalledWith(mock$challenge, mockChallenges[0], {
      app: simulation,
      world: simulation.world,
      worldController: simulation.worldController,
      challengeNum: 1,
      challengeTempl: mockTemplates.challengeTempl,
    });
  });
});
