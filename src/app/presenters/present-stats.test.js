import { presentStats } from './present-stats';

describe('presentStats', () => {
  let $parent, elements, world, listeners;

  beforeEach(() => {
    // Create mock DOM elements
    elements = {
      transportedcounter: { textContent: '' },
      elapsedtime: { textContent: '' },
      transportedpersec: { textContent: '' },
      avgwaittime: { textContent: '' },
      maxwaittime: { textContent: '' },
      movecount: { textContent: '' },
    };

    $parent = {
      find: (selector) => {
        // Return the corresponding element based on the selector
        switch (selector) {
          case '.transportedcounter':
            return { get: () => elements.transportedcounter };
          case '.elapsedtime':
            return { get: () => elements.elapsedtime };
          case '.transportedpersec':
            return { get: () => elements.transportedpersec };
          case '.avgwaittime':
            return { get: () => elements.avgwaittime };
          case '.maxwaittime':
            return { get: () => elements.maxwaittime };
          case '.movecount':
            return { get: () => elements.movecount };
          default:
            throw new Error(`Unknown selector: ${selector}`);
        }
      },
    };

    // Mock world object with event system
    listeners = {};
    world = {
      transportedCounter: 42,
      elapsedTime: 123.456,
      transportedPerSec: 1.23456,
      avgWaitTime: 7.89,
      maxWaitTime: 12.34,
      moveCount: 99,
      on: jest.fn((event, cb) => {
        listeners[event] = cb;
      }),
      trigger: jest.fn((event) => {
        if (listeners[event]) listeners[event]();
      }),
    };
  });

  it('should update stats display elements with world values', () => {
    presentStats($parent, world);

    expect(elements.transportedcounter.textContent).toBe(world.transportedCounter);
    expect(elements.elapsedtime.textContent).toBe(world.elapsedTime.toFixed(0) + 's');
    expect(elements.transportedpersec.textContent).toBe(world.transportedPerSec.toPrecision(3));
    expect(elements.avgwaittime.textContent).toBe(world.avgWaitTime.toFixed(1) + 's');
    expect(elements.maxwaittime.textContent).toBe(world.maxWaitTime.toFixed(1) + 's');
    expect(elements.movecount.textContent).toBe(world.moveCount);
  });

  it('should update stats when world triggers stats_display_changed', () => {
    presentStats($parent, world);

    // Change world values
    world.transportedCounter = 100;
    world.elapsedTime = 200.9;
    world.transportedPerSec = 3.1415;
    world.avgWaitTime = 2.71;
    world.maxWaitTime = 8.88;
    world.moveCount = 1234;

    // Simulate event
    listeners['stats_display_changed']();

    expect(elements.transportedcounter.textContent).toBe(100);
    expect(elements.elapsedtime.textContent).toBe('201s');
    expect(elements.transportedpersec.textContent).toBe('3.14');
    expect(elements.avgwaittime.textContent).toBe('2.7s');
    expect(elements.maxwaittime.textContent).toBe('8.9s');
    expect(elements.movecount.textContent).toBe(1234);
  });

  it('should register event listener and trigger stats_display_changed', () => {
    // Act
    presentStats($parent, world);

    // Assert
    expect(world.on).toHaveBeenCalledWith('stats_display_changed', expect.any(Function));
    expect(world.trigger).toHaveBeenCalledWith('stats_display_changed');
  });
});
