import { getCodeObjFromCode } from './base';

describe('base', function () {
  describe('getCodeObjFromCode', function () {
    var testCode = '{init: function init() {}, update: function update() {}}';

    it('handles trailing whitespace', function () {
      expect(getCodeObjFromCode(testCode + '\n')).toEqual(expect.any(Object));
    });

    it('handles prefix whitespace', function () {
      expect(getCodeObjFromCode('\n' + testCode)).toEqual(expect.any(Object));
    });

    it('handles prefix and trailing whitespace', function () {
      expect(getCodeObjFromCode('\n' + testCode + '\n')).toEqual(expect.any(Object));
    });
  });
});
