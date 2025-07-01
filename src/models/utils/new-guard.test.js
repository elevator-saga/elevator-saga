import { newGuard } from './new-guard';

class MyClass {}
class OtherClass {}

describe('newGuard', () => {
  it('does not throw if obj is an instance of type', () => {
    expect(() => newGuard(new MyClass(), MyClass)).not.toThrow();
  });

  it('throws if obj is not an instance of type', () => {
    expect(() => newGuard({}, MyClass)).toThrow(/Incorrect instantiation, got object but expected/);
  });

  it('throws if obj is an instance of a different class', () => {
    expect(() => newGuard(new OtherClass(), MyClass)).toThrow(/Incorrect instantiation, got object but expected/);
  });

  it('throws if obj is null', () => {
    expect(() => newGuard(null, MyClass)).toThrow(/Incorrect instantiation, got object but expected/);
  });

  it('throws if obj is undefined', () => {
    expect(() => newGuard(undefined, MyClass)).toThrow(/Incorrect instantiation, got undefined but expected/);
  });

  it('throws if type is not a constructor', () => {
    expect(() => newGuard({}, undefined)).toThrow();
    expect(() => newGuard({}, null)).toThrow();
    expect(() => newGuard({}, {})).toThrow();
  });
});
