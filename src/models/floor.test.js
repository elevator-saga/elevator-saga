import Floor from './floor';

describe('Floor', () => {
  let floor, errorHandler, triggeredEvents;

  // Mock observable's trigger method
  beforeEach(() => {
    triggeredEvents = [];
    errorHandler = jest.fn();
    // Patch observable(this) to add a trigger method
    Floor.prototype.trigger = function (event, ...args) {
      triggeredEvents.push({ event, args });
    };
    floor = new Floor({ floorLevel: 2, yPosition: 100, errorHandler });
  });

  afterEach(() => {
    jest.clearAllMocks();
    triggeredEvents = [];
  });

  it('constructor initializes properties', () => {
    expect(floor.level).toBe(2);
    expect(floor.yPosition).toBe(100);
    expect(floor.buttonStates).toEqual({ up: '', down: '' });
    expect(floor._errorHandler).toBe(errorHandler);
  });

  describe('_tryTrigger', () => {
    it('calls trigger with correct arguments', () => {
      floor._tryTrigger('foo', 1, 2, 3, 4);
      expect(triggeredEvents).toEqual([{ event: 'foo', args: [1, 2, 3, 4] }]);
    });

    it('calls errorHandler if trigger throws', () => {
      floor.trigger = () => {
        throw new Error('fail');
      };
      floor._tryTrigger('bar', 1);
      expect(errorHandler).toHaveBeenCalled();
    });
  });

  describe('pressUpButton', () => {
    it('activates up button and triggers events if not already activated', () => {
      floor.pressUpButton();
      expect(floor.buttonStates.up).toBe('activated');
      expect(triggeredEvents).toEqual([
        { event: 'buttonstate_change', args: [{ up: 'activated', down: '' }] },
        { event: 'up_button_pressed', args: [floor] },
      ]);
    });

    it('does not trigger events if up button already activated', () => {
      floor.buttonStates.up = 'activated';
      floor.pressUpButton();
      expect(triggeredEvents).toEqual([]);
    });
  });

  describe('pressDownButton', () => {
    it('activates down button and triggers events if not already activated', () => {
      floor.pressDownButton();
      expect(floor.buttonStates.down).toBe('activated');
      expect(triggeredEvents).toEqual([
        { event: 'buttonstate_change', args: [{ up: '', down: 'activated' }] },
        { event: 'down_button_pressed', args: [floor] },
      ]);
    });

    it('does not trigger events if down button already activated', () => {
      floor.buttonStates.down = 'activated';
      floor.pressDownButton();
      expect(triggeredEvents).toEqual([]);
    });
  });

  describe('elevatorAvailable', () => {
    it('resets up button and triggers event if elevator going up', () => {
      floor.buttonStates.up = 'activated';
      floor.elevatorAvailable({ goingUpIndicator: true, goingDownIndicator: false });
      expect(floor.buttonStates.up).toBe('');
      expect(triggeredEvents).toEqual([{ event: 'buttonstate_change', args: [{ up: '', down: '' }] }]);
    });

    it('resets down button and triggers event if elevator going down', () => {
      floor.buttonStates.down = 'activated';
      floor.elevatorAvailable({ goingUpIndicator: false, goingDownIndicator: true });
      expect(floor.buttonStates.down).toBe('');
      expect(triggeredEvents).toEqual([{ event: 'buttonstate_change', args: [{ up: '', down: '' }] }]);
    });

    it('resets both buttons if elevator going both directions', () => {
      floor.buttonStates.up = 'activated';
      floor.buttonStates.down = 'activated';
      floor.elevatorAvailable({ goingUpIndicator: true, goingDownIndicator: true });
      expect(floor.buttonStates.up).toBe('');
      expect(floor.buttonStates.down).toBe('');
      expect(triggeredEvents).toEqual([
        { event: 'buttonstate_change', args: [{ up: '', down: 'activated' }] },
        { event: 'buttonstate_change', args: [{ up: '', down: '' }] },
      ]);
    });

    it('does nothing if no button is pressed', () => {
      floor.elevatorAvailable({ goingUpIndicator: true, goingDownIndicator: true });
      expect(triggeredEvents).toEqual([]);
    });
  });

  it('getSpawnPosY returns yPosition + 30', () => {
    expect(floor.getSpawnPosY()).toBe(130);
  });

  it('floorNum returns level', () => {
    expect(floor.floorNum()).toBe(2);
  });
});
