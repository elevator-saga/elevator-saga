import { clearAll } from './clear-all';

describe('clearAll', () => {
  let mockElem1, mockElem2;

  beforeEach(() => {
    mockElem1 = { empty: jest.fn() };
    mockElem2 = { empty: jest.fn() };
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('calls empty() on each element in an array', () => {
    clearAll([mockElem1, mockElem2]);
    expect(mockElem1.empty).toHaveBeenCalled();
    expect(mockElem2.empty).toHaveBeenCalled();
  });

  it('calls empty() on each element in an object', () => {
    const elemsObj = { a: mockElem1, b: mockElem2 };
    clearAll(elemsObj);
    expect(mockElem1.empty).toHaveBeenCalled();
    expect(mockElem2.empty).toHaveBeenCalled();
  });

  it('warns if called with an empty array', () => {
    clearAll([]);
    expect(console.warn).toHaveBeenCalledWith('clearAll called with empty collection');
  });

  it('warns if called with an empty object', () => {
    clearAll({});
    expect(console.warn).toHaveBeenCalledWith('clearAll called with empty collection');
  });

  it('does not throw if called with empty array', () => {
    expect(() => clearAll([])).not.toThrow();
  });

  it('does not throw if called with empty object', () => {
    expect(() => clearAll({})).not.toThrow();
  });
});
