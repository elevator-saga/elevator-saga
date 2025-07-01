import { clearAll } from './clear-all';

describe('clearAll', () => {
  it('should call empty() on each jQuery element in the collection', () => {
    const mockElem1 = { empty: jest.fn() };
    const mockElem2 = { empty: jest.fn() };
    const elems = [mockElem1, mockElem2];

    clearAll(elems);

    expect(mockElem1.empty).toHaveBeenCalledTimes(1);
    expect(mockElem2.empty).toHaveBeenCalledTimes(1);
  });

  it('should not throw if the collection is empty', () => {
    expect(() => clearAll([])).not.toThrow();
  });

  it('should work with a single element in the collection', () => {
    const mockElem = { empty: jest.fn() };
    clearAll([mockElem]);
    expect(mockElem.empty).toHaveBeenCalledTimes(1);
  });

  it('works with array-like objects', () => {
    const mockElem = { empty: jest.fn() };
    const arrayLike = { 0: mockElem, length: 1 };
    clearAll(arrayLike);
    expect(mockElem.empty).toHaveBeenCalledTimes(1);
  });
});
