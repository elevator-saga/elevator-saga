import { deprecationWarning } from './deprecation-warning';

describe('deprecationWarning', () => {
  beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    console.warn.mockRestore();
  });

  it('logs the correct deprecation warning message', () => {
    deprecationWarning('oldFeature');
    expect(console.warn).toHaveBeenCalledWith('You are using a deprecated feature scheduled for removal: oldFeature');
  });

  it('logs the warning with the provided feature name', () => {
    deprecationWarning('anotherFeature');
    expect(console.warn).toHaveBeenCalledWith(
      'You are using a deprecated feature scheduled for removal: anotherFeature'
    );
  });
});
