import { setTransformPosition } from './set-transform-position';
import { updateUserState } from './update-user-state';

jest.mock('./set-transform-position.js', () => ({
  setTransformPosition: jest.fn(),
}));

describe('updateUserState', () => {
  let $user, elem_user, user;

  beforeEach(() => {
    // Mock jQuery object
    $user = {
      addClass: jest.fn(),
    };
    // Mock DOM element
    elem_user = {};
    // Mock user object
    user = {
      worldX: 10,
      worldY: 20,
      done: false,
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('calls setTransformPosition with correct arguments', () => {
    updateUserState($user, elem_user, user);
    expect(setTransformPosition).toHaveBeenCalledWith(elem_user, 10, 20);
  });

  it('does not add "leaving" class if user.done is false', () => {
    user.done = false;
    updateUserState($user, elem_user, user);
    expect($user.addClass).not.toHaveBeenCalled();
  });

  it('adds "leaving" class if user.done is true', () => {
    user.done = true;
    updateUserState($user, elem_user, user);
    expect($user.addClass).toHaveBeenCalledWith('leaving');
  });
});
