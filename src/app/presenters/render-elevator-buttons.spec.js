import { renderElevatorButtons } from './render-elevator-buttons';
import { renderTemplate } from './render-template';

jest.mock('./render-template');

describe('renderElevatorButtons', () => {
  beforeEach(() => {
    renderTemplate.mockClear();
    renderTemplate.mockImplementation(() => '');
  });

  it('renders the correct number of elevator buttons', () => {
    const states = [false, true, false];
    renderTemplate.mockImplementation((templ, data) => `<button data-floor="${data.floorNum}"></button>`);
    const result = renderElevatorButtons(states, 'elevatorButtonTempl');
    expect(result).toBe(
      '<button data-floor="0"></button><button data-floor="1"></button><button data-floor="2"></button>'
    );
    expect(renderTemplate).toHaveBeenCalledTimes(3);
    expect(renderTemplate).toHaveBeenNthCalledWith(1, 'elevatorButtonTempl', { floorNum: 0 });
    expect(renderTemplate).toHaveBeenNthCalledWith(2, 'elevatorButtonTempl', { floorNum: 1 });
    expect(renderTemplate).toHaveBeenNthCalledWith(3, 'elevatorButtonTempl', { floorNum: 2 });
  });

  it('returns an empty string if states is empty', () => {
    const states = [];
    const result = renderElevatorButtons(states, 'elevatorButtonTempl');
    expect(result).toBe('');
    expect(renderTemplate).not.toHaveBeenCalled();
  });

  it('handles non-boolean values in states', () => {
    const states = [0, 1, null, undefined];
    renderTemplate.mockImplementation((templ, data) => `<button data-floor="${data.floorNum}"></button>`);
    const result = renderElevatorButtons(states, 'elevatorButtonTempl');
    expect(result).toBe(
      '<button data-floor="0"></button><button data-floor="1"></button><button data-floor="2"></button><button data-floor="3"></button>'
    );
    expect(renderTemplate).toHaveBeenCalledTimes(4);
  });
});
