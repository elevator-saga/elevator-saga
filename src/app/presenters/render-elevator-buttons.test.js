import * as riot from 'riot';
import { renderElevatorButtons } from './render-elevator-buttons';

jest.mock('riot', () => ({
  render: jest.fn(),
}));

describe('renderElevatorButtons', () => {
  beforeEach(() => {
    riot.render.mockClear();
    riot.render.mockImplementation(() => '');
  });

  it('renders the correct number of elevator buttons', () => {
    const states = [false, true, false];
    riot.render.mockImplementation((templ, data) => `<button data-floor="${data.floorNum}"></button>`);
    const result = renderElevatorButtons(states, 'elevatorButtonTempl');
    expect(result).toBe(
      '<button data-floor="0"></button><button data-floor="1"></button><button data-floor="2"></button>'
    );
    expect(riot.render).toHaveBeenCalledTimes(3);
    expect(riot.render).toHaveBeenNthCalledWith(1, 'elevatorButtonTempl', { floorNum: 0 });
    expect(riot.render).toHaveBeenNthCalledWith(2, 'elevatorButtonTempl', { floorNum: 1 });
    expect(riot.render).toHaveBeenNthCalledWith(3, 'elevatorButtonTempl', { floorNum: 2 });
  });

  it('returns an empty string if states is empty', () => {
    const states = [];
    const result = renderElevatorButtons(states, 'elevatorButtonTempl');
    expect(result).toBe('');
    expect(riot.render).not.toHaveBeenCalled();
  });

  it('handles non-boolean values in states', () => {
    const states = [0, 1, null, undefined];
    riot.render.mockImplementation((templ, data) => `<button data-floor="${data.floorNum}"></button>`);
    const result = renderElevatorButtons(states, 'elevatorButtonTempl');
    expect(result).toBe(
      '<button data-floor="0"></button><button data-floor="1"></button><button data-floor="2"></button><button data-floor="3"></button>'
    );
    expect(riot.render).toHaveBeenCalledTimes(4);
  });
});
