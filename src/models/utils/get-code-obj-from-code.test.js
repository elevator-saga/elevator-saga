import { getCodeObjFromCode } from './get-code-obj-from-code';

describe('getCodeObjFromCode', () => {
  it('parses a valid object literal with init and update', () => {
    const code = `{
      init: function() { return 'init'; },
      update: function() { return 'update'; }
    }`;
    const obj = getCodeObjFromCode(code);
    expect(typeof obj.init).toBe('function');
    expect(typeof obj.update).toBe('function');
    expect(obj.init()).toBe('init');
    expect(obj.update()).toBe('update');
  });

  it('parses a valid function returning an object with init and update', () => {
    const code = `(() => ({
      init: () => 'init',
      update: () => 'update'
    }))()`;
    const obj = getCodeObjFromCode(code);
    expect(typeof obj.init).toBe('function');
    expect(typeof obj.update).toBe('function');
    expect(obj.init()).toBe('init');
    expect(obj.update()).toBe('update');
  });

  it('throws if init is missing', () => {
    const code = `{
      update: function() {}
    }`;
    expect(() => getCodeObjFromCode(code)).toThrow('Code must contain an init function');
  });

  it('throws if update is missing', () => {
    const code = `{
      init: function() {}
    }`;
    expect(() => getCodeObjFromCode(code)).toThrow('Code must contain an update function');
  });

  it('throws if code is not valid JavaScript', () => {
    const code = `{ this is not valid js }`;
    expect(() => getCodeObjFromCode(code)).toThrow();
  });

  it('works with whitespace around code', () => {
    const code = `
      {
        init: function() { return 1; },
        update: function() { return 2; }
      }
    `;
    const obj = getCodeObjFromCode(code);
    expect(obj.init()).toBe(1);
    expect(obj.update()).toBe(2);
  });
});
