import { createBoolPassthroughFunction } from './create-bool-passthrough-function';

describe('createBoolPassthroughFunction', () => {
  let owner;
  let obj;
  let triggerMock;
  let fn;

  beforeEach(() => {
    owner = { name: 'owner' };
    triggerMock = jest.fn();
    obj = {
      testProp: false,
      trigger: triggerMock,
    };
    fn = createBoolPassthroughFunction(owner, obj, 'testProp');
  });

  it('should return the current value when called with no arguments', () => {
    obj.testProp = true;
    expect(fn()).toBe(true);
    obj.testProp = false;
    expect(fn()).toBe(false);
  });

  it('should set the property to true when called with a truthy value', () => {
    fn('something');
    expect(obj.testProp).toBe(true);
    expect(triggerMock).toHaveBeenCalledWith('change:testProp', true);
  });

  it('should set the property to false when called with a falsy value', () => {
    fn(0);
    expect(obj.testProp).toBe(false);
    expect(triggerMock).toHaveBeenCalledWith('change:testProp', false);
  });

  it('should return the owner when setting the value', () => {
    const result = fn(true);
    expect(result).toBe(owner);
  });

  it('should call trigger with correct arguments when value changes', () => {
    fn(true);
    expect(triggerMock).toHaveBeenCalledWith('change:testProp', true);
    fn(false);
    expect(triggerMock).toHaveBeenCalledWith('change:testProp', false);
  });

  it('should coerce value to boolean', () => {
    fn(''); // falsy
    expect(obj.testProp).toBe(false);
    fn('non-empty'); // truthy
    expect(obj.testProp).toBe(true);
  });
});
