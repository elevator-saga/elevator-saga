import render from '@riotjs/ssr';
import { renderElevatorButtons } from './render-elevator-buttons';

jest.mock('@riotjs/ssr', () => ({
  __esModule: true,
  default: jest.fn((templ, data) => templ),
}));

describe('renderElevatorButtons', () => {
  beforeEach(() => {
    render.mockClear();
    render.mockImplementation(() => '');
  });

  it('renders the correct number of elevator buttons', () => {
    const states = [false, true, false];
    render.mockImplementation((templ, data) => `<button data-floor="${data.floorNum}"></button>`);
    const result = renderElevatorButtons(states, 'elevatorButtonTempl');
    expect(result).toBe(
      '<button data-floor="0"></button><button data-floor="1"></button><button data-floor="2"></button>'
    );
    expect(render).toHaveBeenCalledTimes(3);
    expect(render).toHaveBeenNthCalledWith(1, 'elevatorButtonTempl', { floorNum: 0 });
    expect(render).toHaveBeenNthCalledWith(2, 'elevatorButtonTempl', { floorNum: 1 });
    expect(render).toHaveBeenNthCalledWith(3, 'elevatorButtonTempl', { floorNum: 2 });
  });

  it('returns an empty string if states is empty', () => {
    const states = [];
    const result = renderElevatorButtons(states, 'elevatorButtonTempl');
    expect(result).toBe('');
    expect(render).not.toHaveBeenCalled();
  });

  it('handles non-boolean values in states', () => {
    const states = [0, 1, null, undefined];
    render.mockImplementation((templ, data) => `<button data-floor="${data.floorNum}"></button>`);
    const result = renderElevatorButtons(states, 'elevatorButtonTempl');
    expect(result).toBe(
      '<button data-floor="0"></button><button data-floor="1"></button><button data-floor="2"></button><button data-floor="3"></button>'
    );
    expect(render).toHaveBeenCalledTimes(4);
  });
});
