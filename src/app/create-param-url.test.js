import { createParamsUrl } from './create-param-url';

describe('createParamsUrl', () => {
  it('should create a URL parameter string from an object', () => {
    const params = { foo: 'bar', baz: 'qux' };
    const url = createParamsUrl(params, {});
    expect(url).toBe('#foo=bar,baz=qux');
  });

  it('should override existing parameters', () => {
    const params = { foo: 'bar', baz: 'qux' };
    const overrides = { foo: 'new' };
    const url = createParamsUrl(params, overrides);
    expect(url).toBe('#foo=new,baz=qux');
  });
});
