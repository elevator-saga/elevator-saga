import Floor from './floor';
// Mocks for dependencies
jest.mock('@riotjs/observable', () => {
  return jest.fn((obj) => {
    obj.on = jest.fn();
    obj.off = jest.fn();
    obj.trigger = jest.fn();
  });
});

describe('Floor', () => {
  let floor, errorHandler, triggeredEvents;

  // Mock observable's trigger method
  beforeEach(() => {
    triggeredEvents = [];
    errorHandler = jest.fn();
    floor = new Floor({ floorLevel: 2, yPosition: 100, errorHandler });
    jest.spyOn(floor, 'trigger').mockImplementation((event, ...args) => {
      triggeredEvents.push({ event, args });
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    triggeredEvents = [];
  });

  it('constructor initializes properties', () => {
    // Assert
    expect(floor.level).toBe(2);
    expect(floor.yPosition).toBe(100);
    expect(floor.buttonStates).toEqual({ up: '', down: '' });
    expect(floor._errorHandler).toBe(errorHandler);
  });

  describe('_tryTrigger', () => {
    it('calls trigger with correct arguments', () => {
      // Act
      floor._tryTrigger('foo', 1, 2, 3, 4);

      // Assert
      expect(triggeredEvents).toEqual([{ event: 'foo', args: [1, 2, 3, 4] }]);
    });

    it('calls errorHandler if trigger throws', () => {
      // Arrange
      floor.trigger = () => {
        throw new Error('fail');
      };

      // Act
      floor._tryTrigger('bar', 1);

      // Assert
      expect(errorHandler).toHaveBeenCalled();
    });
  });

  describe('pressUpButton', () => {
    it('activates up button and triggers events if not already activated', () => {
      // Act
      floor.pressUpButton();

      // Assert
      expect(floor.buttonStates.up).toBe('activated');
      expect(triggeredEvents).toEqual([
        { event: 'buttonstate_change', args: [{ up: 'activated', down: '' }] },
        { event: 'up_button_pressed', args: [floor] },
      ]);
    });

    it('does not trigger events if up button already activated', () => {
      // Arrange
      floor.buttonStates.up = 'activated';

      // Act
      floor.pressUpButton();

      // Assert
      expect(triggeredEvents).toEqual([]);
    });
  });

  describe('pressDownButton', () => {
    it('activates down button and triggers events if not already activated', () => {
      // Act
      floor.pressDownButton();

      // Assert
      expect(floor.buttonStates.down).toBe('activated');
      expect(triggeredEvents).toEqual([
        { event: 'buttonstate_change', args: [{ up: '', down: 'activated' }] },
        { event: 'down_button_pressed', args: [floor] },
      ]);
    });

    it('does not trigger events if down button already activated', () => {
      // Arrange
      floor.buttonStates.down = 'activated';

      // Act
      floor.pressDownButton();

      // Assert
      expect(triggeredEvents).toEqual([]);
    });
  });

  describe('elevatorAvailable', () => {
    it('resets up button and triggers event if elevator going up', () => {
      // Arrange
      floor.buttonStates.up = 'activated';

      // Act
      floor.elevatorAvailable({ goingUpIndicator: true, goingDownIndicator: false });

      // Assert
      expect(floor.buttonStates.up).toBe('');
      expect(triggeredEvents).toEqual([{ event: 'buttonstate_change', args: [{ up: '', down: '' }] }]);
    });

    it('resets down button and triggers event if elevator going down', () => {
      // Arrange
      floor.buttonStates.down = 'activated';

      // Act
      floor.elevatorAvailable({ goingUpIndicator: false, goingDownIndicator: true });

      // Assert
      expect(floor.buttonStates.down).toBe('');
      expect(triggeredEvents).toEqual([{ event: 'buttonstate_change', args: [{ up: '', down: '' }] }]);
    });

    it('resets both buttons if elevator going both directions', () => {
      // Arrange
      floor.buttonStates.up = 'activated';
      floor.buttonStates.down = 'activated';

      // Act
      floor.elevatorAvailable({ goingUpIndicator: true, goingDownIndicator: true });

      // Assert
      expect(floor.buttonStates.up).toBe('');
      expect(floor.buttonStates.down).toBe('');
      expect(triggeredEvents).toEqual([
        { event: 'buttonstate_change', args: [{ up: '', down: '' }] },
        { event: 'buttonstate_change', args: [{ up: '', down: '' }] },
      ]);
    });

    it('does nothing if no button is pressed', () => {
      // Act
      floor.elevatorAvailable({ goingUpIndicator: true, goingDownIndicator: true });

      // Assert
      expect(triggeredEvents).toEqual([]);
    });
  });

  it('getSpawnPosY returns yPosition + 30', () => {
    // Asert
    expect(floor.getSpawnPosY()).toBe(130);
  });

  it('floorNum returns level', () => {
    // Assert
    expect(floor.floorNum()).toBe(2);
  });

  describe('integration and edge cases', () => {
    it('pressUpButton then elevatorAvailable going up resets up button', () => {
      // Act
      floor.pressUpButton();

      // Assert
      expect(floor.buttonStates.up).toBe('activated');

      // Arrange
      triggeredEvents = [];

      // Act
      floor.elevatorAvailable({ goingUpIndicator: true, goingDownIndicator: false });

      // Assert
      expect(floor.buttonStates.up).toBe('');
      expect(triggeredEvents).toEqual([{ event: 'buttonstate_change', args: [{ up: '', down: '' }] }]);
    });

    it('pressDownButton then elevatorAvailable going down resets down button', () => {
      // Act
      floor.pressDownButton();

      // Assert
      expect(floor.buttonStates.down).toBe('activated');

      // Arrange
      triggeredEvents = [];

      // Act
      floor.elevatorAvailable({ goingUpIndicator: false, goingDownIndicator: true });

      // Assert
      expect(floor.buttonStates.down).toBe('');
      expect(triggeredEvents).toEqual([{ event: 'buttonstate_change', args: [{ up: '', down: '' }] }]);
    });

    it('press both buttons, elevatorAvailable going both resets both', () => {
      // Act
      floor.pressUpButton();
      floor.pressDownButton();

      // Assert
      expect(floor.buttonStates).toEqual({ up: 'activated', down: 'activated' });

      // Arrange
      triggeredEvents = [];

      // Act
      floor.elevatorAvailable({ goingUpIndicator: true, goingDownIndicator: true });

      // Assert
      expect(floor.buttonStates).toEqual({ up: '', down: '' });
      expect(triggeredEvents).toEqual([
        { event: 'buttonstate_change', args: [{ up: '', down: '' }] },
        { event: 'buttonstate_change', args: [{ up: '', down: '' }] },
      ]);
    });

    it('elevatorAvailable does not trigger if no buttons pressed', () => {
      // Arrange
      floor.elevatorAvailable({ goingUpIndicator: true, goingDownIndicator: true });

      // Assert
      expect(triggeredEvents).toEqual([]);
    });

    it('getSpawnPosY works for negative yPosition', () => {
      // Arrange
      const f = new Floor({ floorLevel: 1, yPosition: -10, errorHandler });

      // Assert
      expect(f.getSpawnPosY()).toBe(20);
    });

    it('floorNum returns correct level for different floors', () => {
      // Arrange
      const f = new Floor({ floorLevel: 5, yPosition: 0, errorHandler });

      // Assert
      expect(f.floorNum()).toBe(5);
    });

    it('constructor throws if errorHandler is not provided', () => {
      // Assert
      expect(() => new Floor({ floorLevel: 1, yPosition: 0 })).toThrow();
    });
  });
});
