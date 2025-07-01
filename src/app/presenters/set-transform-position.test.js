import { setTransformPosition } from './set-transform-position';

describe('setTransformPosition', () => {
  let elem;

  beforeEach(() => {
    elem = {
      style: {},
    };
  });

  it('sets the correct transform styles for given x and y', () => {
    setTransformPosition(elem, 10, 20);
    const expected = 'translate(10px,20px) translateZ(0)';
    expect(elem.style.transform).toBe(expected);
    expect(elem.style['-ms-transform']).toBe(expected);
    expect(elem.style['-webkit-transform']).toBe(expected);
  });

  it('works with negative coordinates', () => {
    setTransformPosition(elem, -5, -15);
    const expected = 'translate(-5px,-15px) translateZ(0)';
    expect(elem.style.transform).toBe(expected);
    expect(elem.style['-ms-transform']).toBe(expected);
    expect(elem.style['-webkit-transform']).toBe(expected);
  });

  it('works with zero coordinates', () => {
    setTransformPosition(elem, 0, 0);
    const expected = 'translate(0px,0px) translateZ(0)';
    expect(elem.style.transform).toBe(expected);
    expect(elem.style['-ms-transform']).toBe(expected);
    expect(elem.style['-webkit-transform']).toBe(expected);
  });

  it('overwrites previous transform styles', () => {
    elem.style.transform = 'foo';
    elem.style['-ms-transform'] = 'bar';
    elem.style['-webkit-transform'] = 'baz';
    setTransformPosition(elem, 1, 2);
    const expected = 'translate(1px,2px) translateZ(0)';
    expect(elem.style.transform).toBe(expected);
    expect(elem.style['-ms-transform']).toBe(expected);
    expect(elem.style['-webkit-transform']).toBe(expected);
  });
});
