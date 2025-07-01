import render from '@riotjs/ssr';
import { presentWorld } from './present-world';
import { setUpElevator } from './set-up-elevator';
import { updateUserState } from './update-user-state';

jest.mock('@riotjs/ssr', () => ({
  __esModule: true,
  default: jest.fn((templ, data) => templ),
}));
jest.mock('./set-up-elevator');
jest.mock('./update-user-state');

describe('presentWorld', () => {
  let $world, world, floorTempl, elevatorTempl, elevatorButtonTempl, userTempl;

  beforeEach(() => {
    // Set up DOM
    document.body.innerHTML = '<div id="world"></div>';
    $world = $('#world');

    // Mock templates
    floorTempl = '<div class="floor"><button class="up"></button><button class="down"></button></div>';
    elevatorTempl = '<div class="elevator"></div>';
    elevatorButtonTempl = '<button class="elevator-btn"></button>';
    userTempl = '<div class="user"></div>';

    // Mock render
    render.mockImplementation((templ, data) => templ);

    // Mock world, floors, elevators
    world = {
      floorHeight: 10,
      floors: [
        {
          on: jest.fn(),
          pressUpButton: jest.fn(),
          pressDownButton: jest.fn(),
        },
        {
          on: jest.fn(),
          pressUpButton: jest.fn(),
          pressDownButton: jest.fn(),
        },
      ],
      elevators: [{ id: 1 }, { id: 2 }],
      on: jest.fn(),
    };

    // Mock setUpElevator
    setUpElevator.mockImplementation((e, t, bt) => `<div class="elevator" data-id="${e.id}"></div>`);
    updateUserState.mockImplementation(($user, elem_user, user) => {
      $user.css({ left: user.worldX, top: user.worldY });
      if (user.done) {
        $user.addClass('leaving');
      }
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('sets the world container height', () => {
    presentWorld($world, world, floorTempl, elevatorTempl, elevatorButtonTempl, userTempl);
    expect($world.css('height')).toBe(world.floorHeight * world.floors.length + 'px');
  });

  it('renders all floors and attaches up/down button handlers', () => {
    presentWorld($world, world, floorTempl, elevatorTempl, elevatorButtonTempl, userTempl);

    const $floors = $world.find('.floor');
    expect($floors.length).toBe(world.floors.length);

    // Simulate up button click
    $floors.eq(0).find('.up').trigger('click');
    expect(world.floors[0].pressUpButton).toHaveBeenCalled();

    // Simulate down button click
    $floors.eq(1).find('.down').trigger('click');
    expect(world.floors[1].pressDownButton).toHaveBeenCalled();
  });

  it('makes first floor down button and last floor up button invisible', () => {
    presentWorld($world, world, floorTempl, elevatorTempl, elevatorButtonTempl, userTempl);

    expect($world.find('.floor').first().find('.down').hasClass('invisible')).toBe(true);
    expect($world.find('.floor').last().find('.up').hasClass('invisible')).toBe(true);
  });

  it('renders all elevators using setUpElevator', () => {
    presentWorld($world, world, floorTempl, elevatorTempl, elevatorButtonTempl, userTempl);

    expect(setUpElevator).toHaveBeenCalledTimes(world.elevators.length);
    expect($world.find('.elevator').length).toBe(world.elevators.length);
  });

  it('adds new users to the world and updates their state', () => {
    const user = { done: false, on: jest.fn() };
    world.on.mockImplementation((event, cb) => {
      if (event === 'new_user') cb(user);
    });

    presentWorld($world, world, floorTempl, elevatorTempl, elevatorButtonTempl, userTempl);

    expect($world.find('.user').length).toBe(1);
    expect($world.find('.user').hasClass('leaving')).toBe(false);
    expect(user.on).toHaveBeenCalledWith('new_display_state', expect.any(Function));
  });

  it('updates user state when new_display_state is triggered', () => {
    const user = { done: false, on: jest.fn() };
    world.on.mockImplementation((event, cb) => {
      if (event === 'new_user') cb(user);
    });

    presentWorld($world, world, floorTempl, elevatorTempl, elevatorButtonTempl, userTempl);

    const $user = $world.find('.user');
    user.on.mock.calls[0][1](); // Trigger new_display_state

    expect($user.hasClass('leaving')).toBe(false); // Assuming done is false
  });
});
