import $ from 'jquery';
import { renderElevatorButtons } from './render-elevator-buttons';
import { renderTemplate } from './render-template';
import { setTransformPosition } from './set-transform-position';
import { setUpElevator } from './set-up-elevator';

jest.mock('./render-elevator-buttons');
jest.mock('./set-transform-position');
jest.mock('./render-template', () => ({
  __esModule: true,
  renderTemplate: jest.fn((templ, data) => templ),
}));

describe('setUpElevator', () => {
  let elevator, elevatorTempl, elevatorButtonTempl, $container;

  beforeEach(() => {
    // Set up DOM container for jQuery
    document.body.innerHTML = '<div id="test-root"></div>';
    $container = $('#test-root');

    // Mock elevator object with event system
    elevator = {
      buttonStates: [false, true, false],
      worldX: 10,
      worldY: 20,
      currentFloor: 1,
      on: jest.fn(),
      emit: jest.fn(),
      pressFloorButton: jest.fn(),
    };

    // Minimal Riot template and button template
    elevatorTempl =
      '<div class="elevator"><div class="buttonindicator"></div><div class="floorindicator"><span></span></div><div class="up"></div><div class="down"></div></div>';
    elevatorButtonTempl = '<button class="buttonpress">{floorNum}</button>';

    // Mock renderTemplate to return the template as HTML string
    renderTemplate.mockImplementation((templ, data) => templ);

    // Mock renderElevatorButtons to return button HTML
    renderElevatorButtons.mockReturnValue(
      '<button class="buttonpress">0</button><button class="buttonpress activated">1</button><button class="buttonpress">2</button>'
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders elevator DOM and returns a jQuery object', () => {
    const $elevator = setUpElevator(elevator, elevatorTempl, elevatorButtonTempl);
    expect($elevator).toBeInstanceOf($);
    expect($elevator.hasClass('elevator')).toBe(true);
    expect($elevator.find('.buttonindicator .buttonpress').length).toBe(3);
    expect(renderElevatorButtons).toHaveBeenCalledWith(elevator.buttonStates, elevatorButtonTempl);
  });

  it('binds click event to elevator buttons and calls pressFloorButton', () => {
    const $elevator = setUpElevator(elevator, elevatorTempl, elevatorButtonTempl);
    // Simulate click on the second button (floor 1)
    $elevator.find('.buttonpress').eq(1).text('1'); // ensure text is '1'
    $elevator.find('.buttonpress').eq(1).trigger('click');
    expect(elevator.pressFloorButton).toHaveBeenCalledWith(1);
  });

  it('binds elevator events and updates position, floor, buttons, and indicators', () => {
    // Store event handlers
    const eventHandlers = {};
    elevator.on.mockImplementation((event, handler) => {
      eventHandlers[event] = handler;
    });

    const $elevator = setUpElevator(elevator, elevatorTempl, elevatorButtonTempl);
    const elem_elevator = $elevator.get(0);
    const elem_floorindicator = $elevator.find('.floorindicator > span').get(0);

    // Simulate new_display_state event
    eventHandlers['new_display_state']();
    expect(setTransformPosition).toHaveBeenCalledWith(elem_elevator, elevator.worldX, elevator.worldY);

    // Simulate new_current_floor event
    eventHandlers['new_current_floor'](5);
    expect(elem_floorindicator.textContent).toBe('5');

    // Simulate floor_buttons_changed event
    const $buttons = $elevator.find('.buttonindicator').children();
    eventHandlers['floor_buttons_changed']([true, false, true], 2);
    expect($($buttons[2]).hasClass('activated')).toBe(true);

    // Simulate indicatorstate_change event
    eventHandlers['indicatorstate_change']({ up: true, down: false });
    expect($elevator.find('.up').hasClass('activated')).toBe(true);
    expect($elevator.find('.down').hasClass('activated')).toBe(false);
  });

  it('triggers initial elevator events', () => {
    setUpElevator(elevator, elevatorTempl, elevatorButtonTempl);
    expect(elevator.emit).toHaveBeenCalledWith('new_state', elevator);
    expect(elevator.emit).toHaveBeenCalledWith('new_display_state', elevator);
    expect(elevator.emit).toHaveBeenCalledWith('new_current_floor', elevator.currentFloor);
  });
});
