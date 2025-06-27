(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __require = /* @__PURE__ */ ((x) =>
    typeof require !== 'undefined'
      ? require
      : typeof Proxy !== 'undefined'
        ? new Proxy(x, {
            get: (a, b) => (typeof require !== 'undefined' ? require : a)[b],
          })
        : x)(function (x) {
    if (typeof require !== 'undefined') return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x + '" is not supported');
  });
  var __commonJS = (cb, mod) =>
    function __require2() {
      return (mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports);
    };
  var __copyProps = (to, from, except, desc) => {
    if ((from && typeof from === 'object') || typeof from === 'function') {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, {
            get: () => from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable,
          });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (
    (target = mod != null ? __create(__getProtoOf(mod)) : {}),
    __copyProps(
      // If the importer is in node compatibility mode or this is not an ESM
      // file that has been converted to a CommonJS file using a Babel-
      // compatible transform (i.e. "__esModule" has not been set), then set
      // "default" to the CommonJS "module.exports" for node compatibility.
      isNodeMode || !mod || !mod.__esModule ? __defProp(target, 'default', { value: mod, enumerable: true }) : target,
      mod
    )
  );

  // node_modules/@riotjs/observable/dist/observable.js
  var require_observable = __commonJS({
    'node_modules/@riotjs/observable/dist/observable.js'(exports, module) {
      (function (window2, undefined2) {
        const ALL_CALLBACKS = '*';
        const define2 = Object.defineProperties;
        const entries = Object.entries;
        const on = (callbacks, el) => (event, fn) => {
          if (callbacks.has(event)) {
            callbacks.get(event).add(fn);
          } else {
            callbacks.set(event, /* @__PURE__ */ new Set().add(fn));
          }
          return el;
        };
        const deleteCallback = (callbacks, el, event, fn) => {
          if (fn) {
            const fns = callbacks.get(event);
            if (fns) {
              fns.delete(fn);
              if (fns.size === 0) callbacks.delete(event);
            }
          } else callbacks.delete(event);
        };
        const off = (callbacks, el) => (event, fn) => {
          if (event === ALL_CALLBACKS && !fn) {
            callbacks.clear();
          } else {
            deleteCallback(callbacks, el, event, fn);
          }
          return el;
        };
        const one = (callbacks, el) => (event, fn) => {
          function on2(...args) {
            el.off(event, on2);
            fn.apply(el, args);
          }
          return el.on(event, on2);
        };
        const trigger =
          (callbacks, el) =>
          (event, ...args) => {
            const fns = callbacks.get(event);
            if (fns) fns.forEach((fn) => fn.apply(el, args));
            if (callbacks.get(ALL_CALLBACKS) && event !== ALL_CALLBACKS) {
              el.trigger(ALL_CALLBACKS, event, ...args);
            }
            return el;
          };
        const observable4 = function (el) {
          const callbacks = /* @__PURE__ */ new Map();
          const methods = { on, off, one, trigger };
          el = el || {};
          define2(
            el,
            entries(methods).reduce((acc, [key, method]) => {
              acc[key] = {
                value: method(callbacks, el),
                enumerable: false,
                writable: false,
                configurable: false,
              };
              return acc;
            }, {})
          );
          return el;
        };
        if (typeof exports === 'object') module.exports = observable4;
        else if (typeof define2 === 'function' && define2.amd)
          define2(function () {
            return observable4;
          });
        else window2.observable = observable4;
      })(typeof window != 'undefined' ? window : void 0);
    },
  });

  // node_modules/lodash/lodash.js
  var require_lodash = __commonJS({
    'node_modules/lodash/lodash.js'(exports, module) {
      (function () {
        var undefined2;
        var VERSION = '4.17.21';
        var LARGE_ARRAY_SIZE = 200;
        var CORE_ERROR_TEXT = 'Unsupported core-js use. Try https://npms.io/search?q=ponyfill.',
          FUNC_ERROR_TEXT = 'Expected a function',
          INVALID_TEMPL_VAR_ERROR_TEXT = 'Invalid `variable` option passed into `_.template`';
        var HASH_UNDEFINED = '__lodash_hash_undefined__';
        var MAX_MEMOIZE_SIZE = 500;
        var PLACEHOLDER = '__lodash_placeholder__';
        var CLONE_DEEP_FLAG = 1,
          CLONE_FLAT_FLAG = 2,
          CLONE_SYMBOLS_FLAG = 4;
        var COMPARE_PARTIAL_FLAG = 1,
          COMPARE_UNORDERED_FLAG = 2;
        var WRAP_BIND_FLAG = 1,
          WRAP_BIND_KEY_FLAG = 2,
          WRAP_CURRY_BOUND_FLAG = 4,
          WRAP_CURRY_FLAG = 8,
          WRAP_CURRY_RIGHT_FLAG = 16,
          WRAP_PARTIAL_FLAG = 32,
          WRAP_PARTIAL_RIGHT_FLAG = 64,
          WRAP_ARY_FLAG = 128,
          WRAP_REARG_FLAG = 256,
          WRAP_FLIP_FLAG = 512;
        var DEFAULT_TRUNC_LENGTH = 30,
          DEFAULT_TRUNC_OMISSION = '...';
        var HOT_COUNT = 800,
          HOT_SPAN = 16;
        var LAZY_FILTER_FLAG = 1,
          LAZY_MAP_FLAG = 2,
          LAZY_WHILE_FLAG = 3;
        var INFINITY = 1 / 0,
          MAX_SAFE_INTEGER = 9007199254740991,
          MAX_INTEGER = 17976931348623157e292,
          NAN = 0 / 0;
        var MAX_ARRAY_LENGTH = 4294967295,
          MAX_ARRAY_INDEX = MAX_ARRAY_LENGTH - 1,
          HALF_MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH >>> 1;
        var wrapFlags = [
          ['ary', WRAP_ARY_FLAG],
          ['bind', WRAP_BIND_FLAG],
          ['bindKey', WRAP_BIND_KEY_FLAG],
          ['curry', WRAP_CURRY_FLAG],
          ['curryRight', WRAP_CURRY_RIGHT_FLAG],
          ['flip', WRAP_FLIP_FLAG],
          ['partial', WRAP_PARTIAL_FLAG],
          ['partialRight', WRAP_PARTIAL_RIGHT_FLAG],
          ['rearg', WRAP_REARG_FLAG],
        ];
        var argsTag = '[object Arguments]',
          arrayTag = '[object Array]',
          asyncTag = '[object AsyncFunction]',
          boolTag = '[object Boolean]',
          dateTag = '[object Date]',
          domExcTag = '[object DOMException]',
          errorTag = '[object Error]',
          funcTag = '[object Function]',
          genTag = '[object GeneratorFunction]',
          mapTag = '[object Map]',
          numberTag = '[object Number]',
          nullTag = '[object Null]',
          objectTag = '[object Object]',
          promiseTag = '[object Promise]',
          proxyTag = '[object Proxy]',
          regexpTag = '[object RegExp]',
          setTag = '[object Set]',
          stringTag = '[object String]',
          symbolTag = '[object Symbol]',
          undefinedTag = '[object Undefined]',
          weakMapTag = '[object WeakMap]',
          weakSetTag = '[object WeakSet]';
        var arrayBufferTag = '[object ArrayBuffer]',
          dataViewTag = '[object DataView]',
          float32Tag = '[object Float32Array]',
          float64Tag = '[object Float64Array]',
          int8Tag = '[object Int8Array]',
          int16Tag = '[object Int16Array]',
          int32Tag = '[object Int32Array]',
          uint8Tag = '[object Uint8Array]',
          uint8ClampedTag = '[object Uint8ClampedArray]',
          uint16Tag = '[object Uint16Array]',
          uint32Tag = '[object Uint32Array]';
        var reEmptyStringLeading = /\b__p \+= '';/g,
          reEmptyStringMiddle = /\b(__p \+=) '' \+/g,
          reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;
        var reEscapedHtml = /&(?:amp|lt|gt|quot|#39);/g,
          reUnescapedHtml = /[&<>"']/g,
          reHasEscapedHtml = RegExp(reEscapedHtml.source),
          reHasUnescapedHtml = RegExp(reUnescapedHtml.source);
        var reEscape = /<%-([\s\S]+?)%>/g,
          reEvaluate = /<%([\s\S]+?)%>/g,
          reInterpolate = /<%=([\s\S]+?)%>/g;
        var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
          reIsPlainProp = /^\w*$/,
          rePropName =
            /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
        var reRegExpChar = /[\\^$.*+?()[\]{}|]/g,
          reHasRegExpChar = RegExp(reRegExpChar.source);
        var reTrimStart = /^\s+/;
        var reWhitespace = /\s/;
        var reWrapComment = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/,
          reWrapDetails = /\{\n\/\* \[wrapped with (.+)\] \*/,
          reSplitDetails = /,? & /;
        var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
        var reForbiddenIdentifierChars = /[()=,{}\[\]\/\s]/;
        var reEscapeChar = /\\(\\)?/g;
        var reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;
        var reFlags = /\w*$/;
        var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
        var reIsBinary = /^0b[01]+$/i;
        var reIsHostCtor = /^\[object .+?Constructor\]$/;
        var reIsOctal = /^0o[0-7]+$/i;
        var reIsUint = /^(?:0|[1-9]\d*)$/;
        var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;
        var reNoMatch = /($^)/;
        var reUnescapedString = /['\n\r\u2028\u2029\\]/g;
        var rsAstralRange = '\\ud800-\\udfff',
          rsComboMarksRange = '\\u0300-\\u036f',
          reComboHalfMarksRange = '\\ufe20-\\ufe2f',
          rsComboSymbolsRange = '\\u20d0-\\u20ff',
          rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
          rsDingbatRange = '\\u2700-\\u27bf',
          rsLowerRange = 'a-z\\xdf-\\xf6\\xf8-\\xff',
          rsMathOpRange = '\\xac\\xb1\\xd7\\xf7',
          rsNonCharRange = '\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf',
          rsPunctuationRange = '\\u2000-\\u206f',
          rsSpaceRange =
            ' \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000',
          rsUpperRange = 'A-Z\\xc0-\\xd6\\xd8-\\xde',
          rsVarRange = '\\ufe0e\\ufe0f',
          rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;
        var rsApos = "['\u2019]",
          rsAstral = '[' + rsAstralRange + ']',
          rsBreak = '[' + rsBreakRange + ']',
          rsCombo = '[' + rsComboRange + ']',
          rsDigits = '\\d+',
          rsDingbat = '[' + rsDingbatRange + ']',
          rsLower = '[' + rsLowerRange + ']',
          rsMisc = '[^' + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + ']',
          rsFitz = '\\ud83c[\\udffb-\\udfff]',
          rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
          rsNonAstral = '[^' + rsAstralRange + ']',
          rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
          rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
          rsUpper = '[' + rsUpperRange + ']',
          rsZWJ = '\\u200d';
        var rsMiscLower = '(?:' + rsLower + '|' + rsMisc + ')',
          rsMiscUpper = '(?:' + rsUpper + '|' + rsMisc + ')',
          rsOptContrLower = '(?:' + rsApos + '(?:d|ll|m|re|s|t|ve))?',
          rsOptContrUpper = '(?:' + rsApos + '(?:D|LL|M|RE|S|T|VE))?',
          reOptMod = rsModifier + '?',
          rsOptVar = '[' + rsVarRange + ']?',
          rsOptJoin =
            '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
          rsOrdLower = '\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])',
          rsOrdUpper = '\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])',
          rsSeq = rsOptVar + reOptMod + rsOptJoin,
          rsEmoji = '(?:' + [rsDingbat, rsRegional, rsSurrPair].join('|') + ')' + rsSeq,
          rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';
        var reApos = RegExp(rsApos, 'g');
        var reComboMark = RegExp(rsCombo, 'g');
        var reUnicode = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');
        var reUnicodeWord = RegExp(
          [
            rsUpper + '?' + rsLower + '+' + rsOptContrLower + '(?=' + [rsBreak, rsUpper, '$'].join('|') + ')',
            rsMiscUpper + '+' + rsOptContrUpper + '(?=' + [rsBreak, rsUpper + rsMiscLower, '$'].join('|') + ')',
            rsUpper + '?' + rsMiscLower + '+' + rsOptContrLower,
            rsUpper + '+' + rsOptContrUpper,
            rsOrdUpper,
            rsOrdLower,
            rsDigits,
            rsEmoji,
          ].join('|'),
          'g'
        );
        var reHasUnicode = RegExp('[' + rsZWJ + rsAstralRange + rsComboRange + rsVarRange + ']');
        var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
        var contextProps = [
          'Array',
          'Buffer',
          'DataView',
          'Date',
          'Error',
          'Float32Array',
          'Float64Array',
          'Function',
          'Int8Array',
          'Int16Array',
          'Int32Array',
          'Map',
          'Math',
          'Object',
          'Promise',
          'RegExp',
          'Set',
          'String',
          'Symbol',
          'TypeError',
          'Uint8Array',
          'Uint8ClampedArray',
          'Uint16Array',
          'Uint32Array',
          'WeakMap',
          '_',
          'clearTimeout',
          'isFinite',
          'parseInt',
          'setTimeout',
        ];
        var templateCounter = -1;
        var typedArrayTags = {};
        typedArrayTags[float32Tag] =
          typedArrayTags[float64Tag] =
          typedArrayTags[int8Tag] =
          typedArrayTags[int16Tag] =
          typedArrayTags[int32Tag] =
          typedArrayTags[uint8Tag] =
          typedArrayTags[uint8ClampedTag] =
          typedArrayTags[uint16Tag] =
          typedArrayTags[uint32Tag] =
            true;
        typedArrayTags[argsTag] =
          typedArrayTags[arrayTag] =
          typedArrayTags[arrayBufferTag] =
          typedArrayTags[boolTag] =
          typedArrayTags[dataViewTag] =
          typedArrayTags[dateTag] =
          typedArrayTags[errorTag] =
          typedArrayTags[funcTag] =
          typedArrayTags[mapTag] =
          typedArrayTags[numberTag] =
          typedArrayTags[objectTag] =
          typedArrayTags[regexpTag] =
          typedArrayTags[setTag] =
          typedArrayTags[stringTag] =
          typedArrayTags[weakMapTag] =
            false;
        var cloneableTags = {};
        cloneableTags[argsTag] =
          cloneableTags[arrayTag] =
          cloneableTags[arrayBufferTag] =
          cloneableTags[dataViewTag] =
          cloneableTags[boolTag] =
          cloneableTags[dateTag] =
          cloneableTags[float32Tag] =
          cloneableTags[float64Tag] =
          cloneableTags[int8Tag] =
          cloneableTags[int16Tag] =
          cloneableTags[int32Tag] =
          cloneableTags[mapTag] =
          cloneableTags[numberTag] =
          cloneableTags[objectTag] =
          cloneableTags[regexpTag] =
          cloneableTags[setTag] =
          cloneableTags[stringTag] =
          cloneableTags[symbolTag] =
          cloneableTags[uint8Tag] =
          cloneableTags[uint8ClampedTag] =
          cloneableTags[uint16Tag] =
          cloneableTags[uint32Tag] =
            true;
        cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;
        var deburredLetters = {
          // Latin-1 Supplement block.
          '\xC0': 'A',
          '\xC1': 'A',
          '\xC2': 'A',
          '\xC3': 'A',
          '\xC4': 'A',
          '\xC5': 'A',
          '\xE0': 'a',
          '\xE1': 'a',
          '\xE2': 'a',
          '\xE3': 'a',
          '\xE4': 'a',
          '\xE5': 'a',
          '\xC7': 'C',
          '\xE7': 'c',
          '\xD0': 'D',
          '\xF0': 'd',
          '\xC8': 'E',
          '\xC9': 'E',
          '\xCA': 'E',
          '\xCB': 'E',
          '\xE8': 'e',
          '\xE9': 'e',
          '\xEA': 'e',
          '\xEB': 'e',
          '\xCC': 'I',
          '\xCD': 'I',
          '\xCE': 'I',
          '\xCF': 'I',
          '\xEC': 'i',
          '\xED': 'i',
          '\xEE': 'i',
          '\xEF': 'i',
          '\xD1': 'N',
          '\xF1': 'n',
          '\xD2': 'O',
          '\xD3': 'O',
          '\xD4': 'O',
          '\xD5': 'O',
          '\xD6': 'O',
          '\xD8': 'O',
          '\xF2': 'o',
          '\xF3': 'o',
          '\xF4': 'o',
          '\xF5': 'o',
          '\xF6': 'o',
          '\xF8': 'o',
          '\xD9': 'U',
          '\xDA': 'U',
          '\xDB': 'U',
          '\xDC': 'U',
          '\xF9': 'u',
          '\xFA': 'u',
          '\xFB': 'u',
          '\xFC': 'u',
          '\xDD': 'Y',
          '\xFD': 'y',
          '\xFF': 'y',
          '\xC6': 'Ae',
          '\xE6': 'ae',
          '\xDE': 'Th',
          '\xFE': 'th',
          '\xDF': 'ss',
          // Latin Extended-A block.
          '\u0100': 'A',
          '\u0102': 'A',
          '\u0104': 'A',
          '\u0101': 'a',
          '\u0103': 'a',
          '\u0105': 'a',
          '\u0106': 'C',
          '\u0108': 'C',
          '\u010A': 'C',
          '\u010C': 'C',
          '\u0107': 'c',
          '\u0109': 'c',
          '\u010B': 'c',
          '\u010D': 'c',
          '\u010E': 'D',
          '\u0110': 'D',
          '\u010F': 'd',
          '\u0111': 'd',
          '\u0112': 'E',
          '\u0114': 'E',
          '\u0116': 'E',
          '\u0118': 'E',
          '\u011A': 'E',
          '\u0113': 'e',
          '\u0115': 'e',
          '\u0117': 'e',
          '\u0119': 'e',
          '\u011B': 'e',
          '\u011C': 'G',
          '\u011E': 'G',
          '\u0120': 'G',
          '\u0122': 'G',
          '\u011D': 'g',
          '\u011F': 'g',
          '\u0121': 'g',
          '\u0123': 'g',
          '\u0124': 'H',
          '\u0126': 'H',
          '\u0125': 'h',
          '\u0127': 'h',
          '\u0128': 'I',
          '\u012A': 'I',
          '\u012C': 'I',
          '\u012E': 'I',
          '\u0130': 'I',
          '\u0129': 'i',
          '\u012B': 'i',
          '\u012D': 'i',
          '\u012F': 'i',
          '\u0131': 'i',
          '\u0134': 'J',
          '\u0135': 'j',
          '\u0136': 'K',
          '\u0137': 'k',
          '\u0138': 'k',
          '\u0139': 'L',
          '\u013B': 'L',
          '\u013D': 'L',
          '\u013F': 'L',
          '\u0141': 'L',
          '\u013A': 'l',
          '\u013C': 'l',
          '\u013E': 'l',
          '\u0140': 'l',
          '\u0142': 'l',
          '\u0143': 'N',
          '\u0145': 'N',
          '\u0147': 'N',
          '\u014A': 'N',
          '\u0144': 'n',
          '\u0146': 'n',
          '\u0148': 'n',
          '\u014B': 'n',
          '\u014C': 'O',
          '\u014E': 'O',
          '\u0150': 'O',
          '\u014D': 'o',
          '\u014F': 'o',
          '\u0151': 'o',
          '\u0154': 'R',
          '\u0156': 'R',
          '\u0158': 'R',
          '\u0155': 'r',
          '\u0157': 'r',
          '\u0159': 'r',
          '\u015A': 'S',
          '\u015C': 'S',
          '\u015E': 'S',
          '\u0160': 'S',
          '\u015B': 's',
          '\u015D': 's',
          '\u015F': 's',
          '\u0161': 's',
          '\u0162': 'T',
          '\u0164': 'T',
          '\u0166': 'T',
          '\u0163': 't',
          '\u0165': 't',
          '\u0167': 't',
          '\u0168': 'U',
          '\u016A': 'U',
          '\u016C': 'U',
          '\u016E': 'U',
          '\u0170': 'U',
          '\u0172': 'U',
          '\u0169': 'u',
          '\u016B': 'u',
          '\u016D': 'u',
          '\u016F': 'u',
          '\u0171': 'u',
          '\u0173': 'u',
          '\u0174': 'W',
          '\u0175': 'w',
          '\u0176': 'Y',
          '\u0177': 'y',
          '\u0178': 'Y',
          '\u0179': 'Z',
          '\u017B': 'Z',
          '\u017D': 'Z',
          '\u017A': 'z',
          '\u017C': 'z',
          '\u017E': 'z',
          '\u0132': 'IJ',
          '\u0133': 'ij',
          '\u0152': 'Oe',
          '\u0153': 'oe',
          '\u0149': "'n",
          '\u017F': 's',
        };
        var htmlEscapes = {
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          '"': '&quot;',
          "'": '&#39;',
        };
        var htmlUnescapes = {
          '&amp;': '&',
          '&lt;': '<',
          '&gt;': '>',
          '&quot;': '"',
          '&#39;': "'",
        };
        var stringEscapes = {
          '\\': '\\',
          "'": "'",
          '\n': 'n',
          '\r': 'r',
          '\u2028': 'u2028',
          '\u2029': 'u2029',
        };
        var freeParseFloat = parseFloat,
          freeParseInt = parseInt;
        var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;
        var freeSelf = typeof self == 'object' && self && self.Object === Object && self;
        var root = freeGlobal || freeSelf || Function('return this')();
        var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;
        var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;
        var moduleExports = freeModule && freeModule.exports === freeExports;
        var freeProcess = moduleExports && freeGlobal.process;
        var nodeUtil = (function () {
          try {
            var types = freeModule && freeModule.require && freeModule.require('util').types;
            if (types) {
              return types;
            }
            return freeProcess && freeProcess.binding && freeProcess.binding('util');
          } catch (e) {}
        })();
        var nodeIsArrayBuffer = nodeUtil && nodeUtil.isArrayBuffer,
          nodeIsDate = nodeUtil && nodeUtil.isDate,
          nodeIsMap = nodeUtil && nodeUtil.isMap,
          nodeIsRegExp = nodeUtil && nodeUtil.isRegExp,
          nodeIsSet = nodeUtil && nodeUtil.isSet,
          nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
        function apply(func, thisArg, args) {
          switch (args.length) {
            case 0:
              return func.call(thisArg);
            case 1:
              return func.call(thisArg, args[0]);
            case 2:
              return func.call(thisArg, args[0], args[1]);
            case 3:
              return func.call(thisArg, args[0], args[1], args[2]);
          }
          return func.apply(thisArg, args);
        }
        function arrayAggregator(array, setter, iteratee, accumulator) {
          var index = -1,
            length = array == null ? 0 : array.length;
          while (++index < length) {
            var value = array[index];
            setter(accumulator, value, iteratee(value), array);
          }
          return accumulator;
        }
        function arrayEach(array, iteratee) {
          var index = -1,
            length = array == null ? 0 : array.length;
          while (++index < length) {
            if (iteratee(array[index], index, array) === false) {
              break;
            }
          }
          return array;
        }
        function arrayEachRight(array, iteratee) {
          var length = array == null ? 0 : array.length;
          while (length--) {
            if (iteratee(array[length], length, array) === false) {
              break;
            }
          }
          return array;
        }
        function arrayEvery(array, predicate) {
          var index = -1,
            length = array == null ? 0 : array.length;
          while (++index < length) {
            if (!predicate(array[index], index, array)) {
              return false;
            }
          }
          return true;
        }
        function arrayFilter(array, predicate) {
          var index = -1,
            length = array == null ? 0 : array.length,
            resIndex = 0,
            result = [];
          while (++index < length) {
            var value = array[index];
            if (predicate(value, index, array)) {
              result[resIndex++] = value;
            }
          }
          return result;
        }
        function arrayIncludes(array, value) {
          var length = array == null ? 0 : array.length;
          return !!length && baseIndexOf(array, value, 0) > -1;
        }
        function arrayIncludesWith(array, value, comparator) {
          var index = -1,
            length = array == null ? 0 : array.length;
          while (++index < length) {
            if (comparator(value, array[index])) {
              return true;
            }
          }
          return false;
        }
        function arrayMap(array, iteratee) {
          var index = -1,
            length = array == null ? 0 : array.length,
            result = Array(length);
          while (++index < length) {
            result[index] = iteratee(array[index], index, array);
          }
          return result;
        }
        function arrayPush(array, values) {
          var index = -1,
            length = values.length,
            offset = array.length;
          while (++index < length) {
            array[offset + index] = values[index];
          }
          return array;
        }
        function arrayReduce(array, iteratee, accumulator, initAccum) {
          var index = -1,
            length = array == null ? 0 : array.length;
          if (initAccum && length) {
            accumulator = array[++index];
          }
          while (++index < length) {
            accumulator = iteratee(accumulator, array[index], index, array);
          }
          return accumulator;
        }
        function arrayReduceRight(array, iteratee, accumulator, initAccum) {
          var length = array == null ? 0 : array.length;
          if (initAccum && length) {
            accumulator = array[--length];
          }
          while (length--) {
            accumulator = iteratee(accumulator, array[length], length, array);
          }
          return accumulator;
        }
        function arraySome(array, predicate) {
          var index = -1,
            length = array == null ? 0 : array.length;
          while (++index < length) {
            if (predicate(array[index], index, array)) {
              return true;
            }
          }
          return false;
        }
        var asciiSize = baseProperty('length');
        function asciiToArray(string) {
          return string.split('');
        }
        function asciiWords(string) {
          return string.match(reAsciiWord) || [];
        }
        function baseFindKey(collection, predicate, eachFunc) {
          var result;
          eachFunc(collection, function (value, key, collection2) {
            if (predicate(value, key, collection2)) {
              result = key;
              return false;
            }
          });
          return result;
        }
        function baseFindIndex(array, predicate, fromIndex, fromRight) {
          var length = array.length,
            index = fromIndex + (fromRight ? 1 : -1);
          while (fromRight ? index-- : ++index < length) {
            if (predicate(array[index], index, array)) {
              return index;
            }
          }
          return -1;
        }
        function baseIndexOf(array, value, fromIndex) {
          return value === value ? strictIndexOf(array, value, fromIndex) : baseFindIndex(array, baseIsNaN, fromIndex);
        }
        function baseIndexOfWith(array, value, fromIndex, comparator) {
          var index = fromIndex - 1,
            length = array.length;
          while (++index < length) {
            if (comparator(array[index], value)) {
              return index;
            }
          }
          return -1;
        }
        function baseIsNaN(value) {
          return value !== value;
        }
        function baseMean(array, iteratee) {
          var length = array == null ? 0 : array.length;
          return length ? baseSum(array, iteratee) / length : NAN;
        }
        function baseProperty(key) {
          return function (object) {
            return object == null ? undefined2 : object[key];
          };
        }
        function basePropertyOf(object) {
          return function (key) {
            return object == null ? undefined2 : object[key];
          };
        }
        function baseReduce(collection, iteratee, accumulator, initAccum, eachFunc) {
          eachFunc(collection, function (value, index, collection2) {
            accumulator = initAccum ? ((initAccum = false), value) : iteratee(accumulator, value, index, collection2);
          });
          return accumulator;
        }
        function baseSortBy(array, comparer) {
          var length = array.length;
          array.sort(comparer);
          while (length--) {
            array[length] = array[length].value;
          }
          return array;
        }
        function baseSum(array, iteratee) {
          var result,
            index = -1,
            length = array.length;
          while (++index < length) {
            var current = iteratee(array[index]);
            if (current !== undefined2) {
              result = result === undefined2 ? current : result + current;
            }
          }
          return result;
        }
        function baseTimes(n, iteratee) {
          var index = -1,
            result = Array(n);
          while (++index < n) {
            result[index] = iteratee(index);
          }
          return result;
        }
        function baseToPairs(object, props) {
          return arrayMap(props, function (key) {
            return [key, object[key]];
          });
        }
        function baseTrim(string) {
          return string ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, '') : string;
        }
        function baseUnary(func) {
          return function (value) {
            return func(value);
          };
        }
        function baseValues(object, props) {
          return arrayMap(props, function (key) {
            return object[key];
          });
        }
        function cacheHas(cache, key) {
          return cache.has(key);
        }
        function charsStartIndex(strSymbols, chrSymbols) {
          var index = -1,
            length = strSymbols.length;
          while (++index < length && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {}
          return index;
        }
        function charsEndIndex(strSymbols, chrSymbols) {
          var index = strSymbols.length;
          while (index-- && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {}
          return index;
        }
        function countHolders(array, placeholder) {
          var length = array.length,
            result = 0;
          while (length--) {
            if (array[length] === placeholder) {
              ++result;
            }
          }
          return result;
        }
        var deburrLetter = basePropertyOf(deburredLetters);
        var escapeHtmlChar = basePropertyOf(htmlEscapes);
        function escapeStringChar(chr) {
          return '\\' + stringEscapes[chr];
        }
        function getValue(object, key) {
          return object == null ? undefined2 : object[key];
        }
        function hasUnicode(string) {
          return reHasUnicode.test(string);
        }
        function hasUnicodeWord(string) {
          return reHasUnicodeWord.test(string);
        }
        function iteratorToArray(iterator) {
          var data,
            result = [];
          while (!(data = iterator.next()).done) {
            result.push(data.value);
          }
          return result;
        }
        function mapToArray(map) {
          var index = -1,
            result = Array(map.size);
          map.forEach(function (value, key) {
            result[++index] = [key, value];
          });
          return result;
        }
        function overArg(func, transform) {
          return function (arg) {
            return func(transform(arg));
          };
        }
        function replaceHolders(array, placeholder) {
          var index = -1,
            length = array.length,
            resIndex = 0,
            result = [];
          while (++index < length) {
            var value = array[index];
            if (value === placeholder || value === PLACEHOLDER) {
              array[index] = PLACEHOLDER;
              result[resIndex++] = index;
            }
          }
          return result;
        }
        function setToArray(set2) {
          var index = -1,
            result = Array(set2.size);
          set2.forEach(function (value) {
            result[++index] = value;
          });
          return result;
        }
        function setToPairs(set2) {
          var index = -1,
            result = Array(set2.size);
          set2.forEach(function (value) {
            result[++index] = [value, value];
          });
          return result;
        }
        function strictIndexOf(array, value, fromIndex) {
          var index = fromIndex - 1,
            length = array.length;
          while (++index < length) {
            if (array[index] === value) {
              return index;
            }
          }
          return -1;
        }
        function strictLastIndexOf(array, value, fromIndex) {
          var index = fromIndex + 1;
          while (index--) {
            if (array[index] === value) {
              return index;
            }
          }
          return index;
        }
        function stringSize(string) {
          return hasUnicode(string) ? unicodeSize(string) : asciiSize(string);
        }
        function stringToArray(string) {
          return hasUnicode(string) ? unicodeToArray(string) : asciiToArray(string);
        }
        function trimmedEndIndex(string) {
          var index = string.length;
          while (index-- && reWhitespace.test(string.charAt(index))) {}
          return index;
        }
        var unescapeHtmlChar = basePropertyOf(htmlUnescapes);
        function unicodeSize(string) {
          var result = (reUnicode.lastIndex = 0);
          while (reUnicode.test(string)) {
            ++result;
          }
          return result;
        }
        function unicodeToArray(string) {
          return string.match(reUnicode) || [];
        }
        function unicodeWords(string) {
          return string.match(reUnicodeWord) || [];
        }
        var runInContext = function runInContext2(context) {
          context = context == null ? root : _4.defaults(root.Object(), context, _4.pick(root, contextProps));
          var Array2 = context.Array,
            Date2 = context.Date,
            Error2 = context.Error,
            Function2 = context.Function,
            Math2 = context.Math,
            Object2 = context.Object,
            RegExp2 = context.RegExp,
            String2 = context.String,
            TypeError2 = context.TypeError;
          var arrayProto = Array2.prototype,
            funcProto = Function2.prototype,
            objectProto = Object2.prototype;
          var coreJsData = context['__core-js_shared__'];
          var funcToString = funcProto.toString;
          var hasOwnProperty = objectProto.hasOwnProperty;
          var idCounter = 0;
          var maskSrcKey = (function () {
            var uid = /[^.]+$/.exec((coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO) || '');
            return uid ? 'Symbol(src)_1.' + uid : '';
          })();
          var nativeObjectToString = objectProto.toString;
          var objectCtorString = funcToString.call(Object2);
          var oldDash = root._;
          var reIsNative = RegExp2(
            '^' +
              funcToString
                .call(hasOwnProperty)
                .replace(reRegExpChar, '\\$&')
                .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') +
              '$'
          );
          var Buffer2 = moduleExports ? context.Buffer : undefined2,
            Symbol2 = context.Symbol,
            Uint8Array2 = context.Uint8Array,
            allocUnsafe = Buffer2 ? Buffer2.allocUnsafe : undefined2,
            getPrototype = overArg(Object2.getPrototypeOf, Object2),
            objectCreate = Object2.create,
            propertyIsEnumerable = objectProto.propertyIsEnumerable,
            splice = arrayProto.splice,
            spreadableSymbol = Symbol2 ? Symbol2.isConcatSpreadable : undefined2,
            symIterator = Symbol2 ? Symbol2.iterator : undefined2,
            symToStringTag = Symbol2 ? Symbol2.toStringTag : undefined2;
          var defineProperty2 = (function () {
            try {
              var func = getNative(Object2, 'defineProperty');
              func({}, '', {});
              return func;
            } catch (e) {}
          })();
          var ctxClearTimeout = context.clearTimeout !== root.clearTimeout && context.clearTimeout,
            ctxNow = Date2 && Date2.now !== root.Date.now && Date2.now,
            ctxSetTimeout = context.setTimeout !== root.setTimeout && context.setTimeout;
          var nativeCeil = Math2.ceil,
            nativeFloor = Math2.floor,
            nativeGetSymbols = Object2.getOwnPropertySymbols,
            nativeIsBuffer = Buffer2 ? Buffer2.isBuffer : undefined2,
            nativeIsFinite = context.isFinite,
            nativeJoin = arrayProto.join,
            nativeKeys = overArg(Object2.keys, Object2),
            nativeMax = Math2.max,
            nativeMin = Math2.min,
            nativeNow = Date2.now,
            nativeParseInt = context.parseInt,
            nativeRandom = Math2.random,
            nativeReverse = arrayProto.reverse;
          var DataView = getNative(context, 'DataView'),
            Map2 = getNative(context, 'Map'),
            Promise2 = getNative(context, 'Promise'),
            Set2 = getNative(context, 'Set'),
            WeakMap2 = getNative(context, 'WeakMap'),
            nativeCreate = getNative(Object2, 'create');
          var metaMap = WeakMap2 && new WeakMap2();
          var realNames = {};
          var dataViewCtorString = toSource(DataView),
            mapCtorString = toSource(Map2),
            promiseCtorString = toSource(Promise2),
            setCtorString = toSource(Set2),
            weakMapCtorString = toSource(WeakMap2);
          var symbolProto = Symbol2 ? Symbol2.prototype : undefined2,
            symbolValueOf = symbolProto ? symbolProto.valueOf : undefined2,
            symbolToString = symbolProto ? symbolProto.toString : undefined2;
          function lodash(value) {
            if (isObjectLike(value) && !isArray(value) && !(value instanceof LazyWrapper)) {
              if (value instanceof LodashWrapper) {
                return value;
              }
              if (hasOwnProperty.call(value, '__wrapped__')) {
                return wrapperClone(value);
              }
            }
            return new LodashWrapper(value);
          }
          var baseCreate = /* @__PURE__ */ (function () {
            function object() {}
            return function (proto) {
              if (!isObject2(proto)) {
                return {};
              }
              if (objectCreate) {
                return objectCreate(proto);
              }
              object.prototype = proto;
              var result2 = new object();
              object.prototype = undefined2;
              return result2;
            };
          })();
          function baseLodash() {}
          function LodashWrapper(value, chainAll) {
            this.__wrapped__ = value;
            this.__actions__ = [];
            this.__chain__ = !!chainAll;
            this.__index__ = 0;
            this.__values__ = undefined2;
          }
          lodash.templateSettings = {
            /**
             * Used to detect `data` property values to be HTML-escaped.
             *
             * @memberOf _.templateSettings
             * @type {RegExp}
             */
            escape: reEscape,
            /**
             * Used to detect code to be evaluated.
             *
             * @memberOf _.templateSettings
             * @type {RegExp}
             */
            evaluate: reEvaluate,
            /**
             * Used to detect `data` property values to inject.
             *
             * @memberOf _.templateSettings
             * @type {RegExp}
             */
            interpolate: reInterpolate,
            /**
             * Used to reference the data object in the template text.
             *
             * @memberOf _.templateSettings
             * @type {string}
             */
            variable: '',
            /**
             * Used to import variables into the compiled template.
             *
             * @memberOf _.templateSettings
             * @type {Object}
             */
            imports: {
              /**
               * A reference to the `lodash` function.
               *
               * @memberOf _.templateSettings.imports
               * @type {Function}
               */
              _: lodash,
            },
          };
          lodash.prototype = baseLodash.prototype;
          lodash.prototype.constructor = lodash;
          LodashWrapper.prototype = baseCreate(baseLodash.prototype);
          LodashWrapper.prototype.constructor = LodashWrapper;
          function LazyWrapper(value) {
            this.__wrapped__ = value;
            this.__actions__ = [];
            this.__dir__ = 1;
            this.__filtered__ = false;
            this.__iteratees__ = [];
            this.__takeCount__ = MAX_ARRAY_LENGTH;
            this.__views__ = [];
          }
          function lazyClone() {
            var result2 = new LazyWrapper(this.__wrapped__);
            result2.__actions__ = copyArray(this.__actions__);
            result2.__dir__ = this.__dir__;
            result2.__filtered__ = this.__filtered__;
            result2.__iteratees__ = copyArray(this.__iteratees__);
            result2.__takeCount__ = this.__takeCount__;
            result2.__views__ = copyArray(this.__views__);
            return result2;
          }
          function lazyReverse() {
            if (this.__filtered__) {
              var result2 = new LazyWrapper(this);
              result2.__dir__ = -1;
              result2.__filtered__ = true;
            } else {
              result2 = this.clone();
              result2.__dir__ *= -1;
            }
            return result2;
          }
          function lazyValue() {
            var array = this.__wrapped__.value(),
              dir = this.__dir__,
              isArr = isArray(array),
              isRight = dir < 0,
              arrLength = isArr ? array.length : 0,
              view = getView(0, arrLength, this.__views__),
              start = view.start,
              end = view.end,
              length = end - start,
              index = isRight ? end : start - 1,
              iteratees = this.__iteratees__,
              iterLength = iteratees.length,
              resIndex = 0,
              takeCount = nativeMin(length, this.__takeCount__);
            if (!isArr || (!isRight && arrLength == length && takeCount == length)) {
              return baseWrapperValue(array, this.__actions__);
            }
            var result2 = [];
            outer: while (length-- && resIndex < takeCount) {
              index += dir;
              var iterIndex = -1,
                value = array[index];
              while (++iterIndex < iterLength) {
                var data = iteratees[iterIndex],
                  iteratee2 = data.iteratee,
                  type = data.type,
                  computed = iteratee2(value);
                if (type == LAZY_MAP_FLAG) {
                  value = computed;
                } else if (!computed) {
                  if (type == LAZY_FILTER_FLAG) {
                    continue outer;
                  } else {
                    break outer;
                  }
                }
              }
              result2[resIndex++] = value;
            }
            return result2;
          }
          LazyWrapper.prototype = baseCreate(baseLodash.prototype);
          LazyWrapper.prototype.constructor = LazyWrapper;
          function Hash(entries) {
            var index = -1,
              length = entries == null ? 0 : entries.length;
            this.clear();
            while (++index < length) {
              var entry = entries[index];
              this.set(entry[0], entry[1]);
            }
          }
          function hashClear() {
            this.__data__ = nativeCreate ? nativeCreate(null) : {};
            this.size = 0;
          }
          function hashDelete(key) {
            var result2 = this.has(key) && delete this.__data__[key];
            this.size -= result2 ? 1 : 0;
            return result2;
          }
          function hashGet(key) {
            var data = this.__data__;
            if (nativeCreate) {
              var result2 = data[key];
              return result2 === HASH_UNDEFINED ? undefined2 : result2;
            }
            return hasOwnProperty.call(data, key) ? data[key] : undefined2;
          }
          function hashHas(key) {
            var data = this.__data__;
            return nativeCreate ? data[key] !== undefined2 : hasOwnProperty.call(data, key);
          }
          function hashSet(key, value) {
            var data = this.__data__;
            this.size += this.has(key) ? 0 : 1;
            data[key] = nativeCreate && value === undefined2 ? HASH_UNDEFINED : value;
            return this;
          }
          Hash.prototype.clear = hashClear;
          Hash.prototype['delete'] = hashDelete;
          Hash.prototype.get = hashGet;
          Hash.prototype.has = hashHas;
          Hash.prototype.set = hashSet;
          function ListCache(entries) {
            var index = -1,
              length = entries == null ? 0 : entries.length;
            this.clear();
            while (++index < length) {
              var entry = entries[index];
              this.set(entry[0], entry[1]);
            }
          }
          function listCacheClear() {
            this.__data__ = [];
            this.size = 0;
          }
          function listCacheDelete(key) {
            var data = this.__data__,
              index = assocIndexOf(data, key);
            if (index < 0) {
              return false;
            }
            var lastIndex = data.length - 1;
            if (index == lastIndex) {
              data.pop();
            } else {
              splice.call(data, index, 1);
            }
            --this.size;
            return true;
          }
          function listCacheGet(key) {
            var data = this.__data__,
              index = assocIndexOf(data, key);
            return index < 0 ? undefined2 : data[index][1];
          }
          function listCacheHas(key) {
            return assocIndexOf(this.__data__, key) > -1;
          }
          function listCacheSet(key, value) {
            var data = this.__data__,
              index = assocIndexOf(data, key);
            if (index < 0) {
              ++this.size;
              data.push([key, value]);
            } else {
              data[index][1] = value;
            }
            return this;
          }
          ListCache.prototype.clear = listCacheClear;
          ListCache.prototype['delete'] = listCacheDelete;
          ListCache.prototype.get = listCacheGet;
          ListCache.prototype.has = listCacheHas;
          ListCache.prototype.set = listCacheSet;
          function MapCache(entries) {
            var index = -1,
              length = entries == null ? 0 : entries.length;
            this.clear();
            while (++index < length) {
              var entry = entries[index];
              this.set(entry[0], entry[1]);
            }
          }
          function mapCacheClear() {
            this.size = 0;
            this.__data__ = {
              hash: new Hash(),
              map: new (Map2 || ListCache)(),
              string: new Hash(),
            };
          }
          function mapCacheDelete(key) {
            var result2 = getMapData(this, key)['delete'](key);
            this.size -= result2 ? 1 : 0;
            return result2;
          }
          function mapCacheGet(key) {
            return getMapData(this, key).get(key);
          }
          function mapCacheHas(key) {
            return getMapData(this, key).has(key);
          }
          function mapCacheSet(key, value) {
            var data = getMapData(this, key),
              size2 = data.size;
            data.set(key, value);
            this.size += data.size == size2 ? 0 : 1;
            return this;
          }
          MapCache.prototype.clear = mapCacheClear;
          MapCache.prototype['delete'] = mapCacheDelete;
          MapCache.prototype.get = mapCacheGet;
          MapCache.prototype.has = mapCacheHas;
          MapCache.prototype.set = mapCacheSet;
          function SetCache(values2) {
            var index = -1,
              length = values2 == null ? 0 : values2.length;
            this.__data__ = new MapCache();
            while (++index < length) {
              this.add(values2[index]);
            }
          }
          function setCacheAdd(value) {
            this.__data__.set(value, HASH_UNDEFINED);
            return this;
          }
          function setCacheHas(value) {
            return this.__data__.has(value);
          }
          SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
          SetCache.prototype.has = setCacheHas;
          function Stack(entries) {
            var data = (this.__data__ = new ListCache(entries));
            this.size = data.size;
          }
          function stackClear() {
            this.__data__ = new ListCache();
            this.size = 0;
          }
          function stackDelete(key) {
            var data = this.__data__,
              result2 = data['delete'](key);
            this.size = data.size;
            return result2;
          }
          function stackGet(key) {
            return this.__data__.get(key);
          }
          function stackHas(key) {
            return this.__data__.has(key);
          }
          function stackSet(key, value) {
            var data = this.__data__;
            if (data instanceof ListCache) {
              var pairs = data.__data__;
              if (!Map2 || pairs.length < LARGE_ARRAY_SIZE - 1) {
                pairs.push([key, value]);
                this.size = ++data.size;
                return this;
              }
              data = this.__data__ = new MapCache(pairs);
            }
            data.set(key, value);
            this.size = data.size;
            return this;
          }
          Stack.prototype.clear = stackClear;
          Stack.prototype['delete'] = stackDelete;
          Stack.prototype.get = stackGet;
          Stack.prototype.has = stackHas;
          Stack.prototype.set = stackSet;
          function arrayLikeKeys(value, inherited) {
            var isArr = isArray(value),
              isArg = !isArr && isArguments(value),
              isBuff = !isArr && !isArg && isBuffer(value),
              isType = !isArr && !isArg && !isBuff && isTypedArray(value),
              skipIndexes = isArr || isArg || isBuff || isType,
              result2 = skipIndexes ? baseTimes(value.length, String2) : [],
              length = result2.length;
            for (var key in value) {
              if (
                (inherited || hasOwnProperty.call(value, key)) &&
                !(
                  skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
                  (key == 'length' || // Node.js 0.10 has enumerable non-index properties on buffers.
                    (isBuff && (key == 'offset' || key == 'parent')) || // PhantomJS 2 has enumerable non-index properties on typed arrays.
                    (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) || // Skip index properties.
                    isIndex(key, length))
                )
              ) {
                result2.push(key);
              }
            }
            return result2;
          }
          function arraySample(array) {
            var length = array.length;
            return length ? array[baseRandom(0, length - 1)] : undefined2;
          }
          function arraySampleSize(array, n) {
            return shuffleSelf(copyArray(array), baseClamp(n, 0, array.length));
          }
          function arrayShuffle(array) {
            return shuffleSelf(copyArray(array));
          }
          function assignMergeValue(object, key, value) {
            if ((value !== undefined2 && !eq(object[key], value)) || (value === undefined2 && !(key in object))) {
              baseAssignValue(object, key, value);
            }
          }
          function assignValue(object, key, value) {
            var objValue = object[key];
            if (
              !(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
              (value === undefined2 && !(key in object))
            ) {
              baseAssignValue(object, key, value);
            }
          }
          function assocIndexOf(array, key) {
            var length = array.length;
            while (length--) {
              if (eq(array[length][0], key)) {
                return length;
              }
            }
            return -1;
          }
          function baseAggregator(collection, setter, iteratee2, accumulator) {
            baseEach(collection, function (value, key, collection2) {
              setter(accumulator, value, iteratee2(value), collection2);
            });
            return accumulator;
          }
          function baseAssign(object, source) {
            return object && copyObject(source, keys(source), object);
          }
          function baseAssignIn(object, source) {
            return object && copyObject(source, keysIn(source), object);
          }
          function baseAssignValue(object, key, value) {
            if (key == '__proto__' && defineProperty2) {
              defineProperty2(object, key, {
                configurable: true,
                enumerable: true,
                value: value,
                writable: true,
              });
            } else {
              object[key] = value;
            }
          }
          function baseAt(object, paths) {
            var index = -1,
              length = paths.length,
              result2 = Array2(length),
              skip = object == null;
            while (++index < length) {
              result2[index] = skip ? undefined2 : get2(object, paths[index]);
            }
            return result2;
          }
          function baseClamp(number, lower, upper) {
            if (number === number) {
              if (upper !== undefined2) {
                number = number <= upper ? number : upper;
              }
              if (lower !== undefined2) {
                number = number >= lower ? number : lower;
              }
            }
            return number;
          }
          function baseClone(value, bitmask, customizer, key, object, stack) {
            var result2,
              isDeep = bitmask & CLONE_DEEP_FLAG,
              isFlat = bitmask & CLONE_FLAT_FLAG,
              isFull = bitmask & CLONE_SYMBOLS_FLAG;
            if (customizer) {
              result2 = object ? customizer(value, key, object, stack) : customizer(value);
            }
            if (result2 !== undefined2) {
              return result2;
            }
            if (!isObject2(value)) {
              return value;
            }
            var isArr = isArray(value);
            if (isArr) {
              result2 = initCloneArray(value);
              if (!isDeep) {
                return copyArray(value, result2);
              }
            } else {
              var tag = getTag2(value),
                isFunc = tag == funcTag || tag == genTag;
              if (isBuffer(value)) {
                return cloneBuffer(value, isDeep);
              }
              if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
                result2 = isFlat || isFunc ? {} : initCloneObject(value);
                if (!isDeep) {
                  return isFlat
                    ? copySymbolsIn(value, baseAssignIn(result2, value))
                    : copySymbols(value, baseAssign(result2, value));
                }
              } else {
                if (!cloneableTags[tag]) {
                  return object ? value : {};
                }
                result2 = initCloneByTag(value, tag, isDeep);
              }
            }
            stack || (stack = new Stack());
            var stacked = stack.get(value);
            if (stacked) {
              return stacked;
            }
            stack.set(value, result2);
            if (isSet(value)) {
              value.forEach(function (subValue) {
                result2.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
              });
            } else if (isMap(value)) {
              value.forEach(function (subValue, key2) {
                result2.set(key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
              });
            }
            var keysFunc = isFull ? (isFlat ? getAllKeysIn : getAllKeys) : isFlat ? keysIn : keys;
            var props = isArr ? undefined2 : keysFunc(value);
            arrayEach(props || value, function (subValue, key2) {
              if (props) {
                key2 = subValue;
                subValue = value[key2];
              }
              assignValue(result2, key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
            });
            return result2;
          }
          function baseConforms(source) {
            var props = keys(source);
            return function (object) {
              return baseConformsTo(object, source, props);
            };
          }
          function baseConformsTo(object, source, props) {
            var length = props.length;
            if (object == null) {
              return !length;
            }
            object = Object2(object);
            while (length--) {
              var key = props[length],
                predicate = source[key],
                value = object[key];
              if ((value === undefined2 && !(key in object)) || !predicate(value)) {
                return false;
              }
            }
            return true;
          }
          function baseDelay(func, wait, args) {
            if (typeof func != 'function') {
              throw new TypeError2(FUNC_ERROR_TEXT);
            }
            return setTimeout2(function () {
              func.apply(undefined2, args);
            }, wait);
          }
          function baseDifference(array, values2, iteratee2, comparator) {
            var index = -1,
              includes2 = arrayIncludes,
              isCommon = true,
              length = array.length,
              result2 = [],
              valuesLength = values2.length;
            if (!length) {
              return result2;
            }
            if (iteratee2) {
              values2 = arrayMap(values2, baseUnary(iteratee2));
            }
            if (comparator) {
              includes2 = arrayIncludesWith;
              isCommon = false;
            } else if (values2.length >= LARGE_ARRAY_SIZE) {
              includes2 = cacheHas;
              isCommon = false;
              values2 = new SetCache(values2);
            }
            outer: while (++index < length) {
              var value = array[index],
                computed = iteratee2 == null ? value : iteratee2(value);
              value = comparator || value !== 0 ? value : 0;
              if (isCommon && computed === computed) {
                var valuesIndex = valuesLength;
                while (valuesIndex--) {
                  if (values2[valuesIndex] === computed) {
                    continue outer;
                  }
                }
                result2.push(value);
              } else if (!includes2(values2, computed, comparator)) {
                result2.push(value);
              }
            }
            return result2;
          }
          var baseEach = createBaseEach(baseForOwn);
          var baseEachRight = createBaseEach(baseForOwnRight, true);
          function baseEvery(collection, predicate) {
            var result2 = true;
            baseEach(collection, function (value, index, collection2) {
              result2 = !!predicate(value, index, collection2);
              return result2;
            });
            return result2;
          }
          function baseExtremum(array, iteratee2, comparator) {
            var index = -1,
              length = array.length;
            while (++index < length) {
              var value = array[index],
                current = iteratee2(value);
              if (
                current != null &&
                (computed === undefined2 ? current === current && !isSymbol(current) : comparator(current, computed))
              ) {
                var computed = current,
                  result2 = value;
              }
            }
            return result2;
          }
          function baseFill(array, value, start, end) {
            var length = array.length;
            start = toInteger(start);
            if (start < 0) {
              start = -start > length ? 0 : length + start;
            }
            end = end === undefined2 || end > length ? length : toInteger(end);
            if (end < 0) {
              end += length;
            }
            end = start > end ? 0 : toLength(end);
            while (start < end) {
              array[start++] = value;
            }
            return array;
          }
          function baseFilter(collection, predicate) {
            var result2 = [];
            baseEach(collection, function (value, index, collection2) {
              if (predicate(value, index, collection2)) {
                result2.push(value);
              }
            });
            return result2;
          }
          function baseFlatten(array, depth, predicate, isStrict, result2) {
            var index = -1,
              length = array.length;
            predicate || (predicate = isFlattenable);
            result2 || (result2 = []);
            while (++index < length) {
              var value = array[index];
              if (depth > 0 && predicate(value)) {
                if (depth > 1) {
                  baseFlatten(value, depth - 1, predicate, isStrict, result2);
                } else {
                  arrayPush(result2, value);
                }
              } else if (!isStrict) {
                result2[result2.length] = value;
              }
            }
            return result2;
          }
          var baseFor = createBaseFor();
          var baseForRight = createBaseFor(true);
          function baseForOwn(object, iteratee2) {
            return object && baseFor(object, iteratee2, keys);
          }
          function baseForOwnRight(object, iteratee2) {
            return object && baseForRight(object, iteratee2, keys);
          }
          function baseFunctions(object, props) {
            return arrayFilter(props, function (key) {
              return isFunction2(object[key]);
            });
          }
          function baseGet(object, path) {
            path = castPath(path, object);
            var index = 0,
              length = path.length;
            while (object != null && index < length) {
              object = object[toKey(path[index++])];
            }
            return index && index == length ? object : undefined2;
          }
          function baseGetAllKeys(object, keysFunc, symbolsFunc) {
            var result2 = keysFunc(object);
            return isArray(object) ? result2 : arrayPush(result2, symbolsFunc(object));
          }
          function baseGetTag(value) {
            if (value == null) {
              return value === undefined2 ? undefinedTag : nullTag;
            }
            return symToStringTag && symToStringTag in Object2(value) ? getRawTag(value) : objectToString(value);
          }
          function baseGt(value, other) {
            return value > other;
          }
          function baseHas(object, key) {
            return object != null && hasOwnProperty.call(object, key);
          }
          function baseHasIn(object, key) {
            return object != null && key in Object2(object);
          }
          function baseInRange(number, start, end) {
            return number >= nativeMin(start, end) && number < nativeMax(start, end);
          }
          function baseIntersection(arrays, iteratee2, comparator) {
            var includes2 = comparator ? arrayIncludesWith : arrayIncludes,
              length = arrays[0].length,
              othLength = arrays.length,
              othIndex = othLength,
              caches = Array2(othLength),
              maxLength = Infinity,
              result2 = [];
            while (othIndex--) {
              var array = arrays[othIndex];
              if (othIndex && iteratee2) {
                array = arrayMap(array, baseUnary(iteratee2));
              }
              maxLength = nativeMin(array.length, maxLength);
              caches[othIndex] =
                !comparator && (iteratee2 || (length >= 120 && array.length >= 120))
                  ? new SetCache(othIndex && array)
                  : undefined2;
            }
            array = arrays[0];
            var index = -1,
              seen = caches[0];
            outer: while (++index < length && result2.length < maxLength) {
              var value = array[index],
                computed = iteratee2 ? iteratee2(value) : value;
              value = comparator || value !== 0 ? value : 0;
              if (!(seen ? cacheHas(seen, computed) : includes2(result2, computed, comparator))) {
                othIndex = othLength;
                while (--othIndex) {
                  var cache = caches[othIndex];
                  if (!(cache ? cacheHas(cache, computed) : includes2(arrays[othIndex], computed, comparator))) {
                    continue outer;
                  }
                }
                if (seen) {
                  seen.push(computed);
                }
                result2.push(value);
              }
            }
            return result2;
          }
          function baseInverter(object, setter, iteratee2, accumulator) {
            baseForOwn(object, function (value, key, object2) {
              setter(accumulator, iteratee2(value), key, object2);
            });
            return accumulator;
          }
          function baseInvoke(object, path, args) {
            path = castPath(path, object);
            object = parent(object, path);
            var func = object == null ? object : object[toKey(last(path))];
            return func == null ? undefined2 : apply(func, object, args);
          }
          function baseIsArguments(value) {
            return isObjectLike(value) && baseGetTag(value) == argsTag;
          }
          function baseIsArrayBuffer(value) {
            return isObjectLike(value) && baseGetTag(value) == arrayBufferTag;
          }
          function baseIsDate(value) {
            return isObjectLike(value) && baseGetTag(value) == dateTag;
          }
          function baseIsEqual(value, other, bitmask, customizer, stack) {
            if (value === other) {
              return true;
            }
            if (value == null || other == null || (!isObjectLike(value) && !isObjectLike(other))) {
              return value !== value && other !== other;
            }
            return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
          }
          function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
            var objIsArr = isArray(object),
              othIsArr = isArray(other),
              objTag = objIsArr ? arrayTag : getTag2(object),
              othTag = othIsArr ? arrayTag : getTag2(other);
            objTag = objTag == argsTag ? objectTag : objTag;
            othTag = othTag == argsTag ? objectTag : othTag;
            var objIsObj = objTag == objectTag,
              othIsObj = othTag == objectTag,
              isSameTag = objTag == othTag;
            if (isSameTag && isBuffer(object)) {
              if (!isBuffer(other)) {
                return false;
              }
              objIsArr = true;
              objIsObj = false;
            }
            if (isSameTag && !objIsObj) {
              stack || (stack = new Stack());
              return objIsArr || isTypedArray(object)
                ? equalArrays(object, other, bitmask, customizer, equalFunc, stack)
                : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
            }
            if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
              var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
                othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');
              if (objIsWrapped || othIsWrapped) {
                var objUnwrapped = objIsWrapped ? object.value() : object,
                  othUnwrapped = othIsWrapped ? other.value() : other;
                stack || (stack = new Stack());
                return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
              }
            }
            if (!isSameTag) {
              return false;
            }
            stack || (stack = new Stack());
            return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
          }
          function baseIsMap(value) {
            return isObjectLike(value) && getTag2(value) == mapTag;
          }
          function baseIsMatch(object, source, matchData, customizer) {
            var index = matchData.length,
              length = index,
              noCustomizer = !customizer;
            if (object == null) {
              return !length;
            }
            object = Object2(object);
            while (index--) {
              var data = matchData[index];
              if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) {
                return false;
              }
            }
            while (++index < length) {
              data = matchData[index];
              var key = data[0],
                objValue = object[key],
                srcValue = data[1];
              if (noCustomizer && data[2]) {
                if (objValue === undefined2 && !(key in object)) {
                  return false;
                }
              } else {
                var stack = new Stack();
                if (customizer) {
                  var result2 = customizer(objValue, srcValue, key, object, source, stack);
                }
                if (
                  !(result2 === undefined2
                    ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack)
                    : result2)
                ) {
                  return false;
                }
              }
            }
            return true;
          }
          function baseIsNative(value) {
            if (!isObject2(value) || isMasked(value)) {
              return false;
            }
            var pattern = isFunction2(value) ? reIsNative : reIsHostCtor;
            return pattern.test(toSource(value));
          }
          function baseIsRegExp(value) {
            return isObjectLike(value) && baseGetTag(value) == regexpTag;
          }
          function baseIsSet(value) {
            return isObjectLike(value) && getTag2(value) == setTag;
          }
          function baseIsTypedArray(value) {
            return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
          }
          function baseIteratee(value) {
            if (typeof value == 'function') {
              return value;
            }
            if (value == null) {
              return identity;
            }
            if (typeof value == 'object') {
              return isArray(value) ? baseMatchesProperty(value[0], value[1]) : baseMatches(value);
            }
            return property(value);
          }
          function baseKeys(object) {
            if (!isPrototype(object)) {
              return nativeKeys(object);
            }
            var result2 = [];
            for (var key in Object2(object)) {
              if (hasOwnProperty.call(object, key) && key != 'constructor') {
                result2.push(key);
              }
            }
            return result2;
          }
          function baseKeysIn(object) {
            if (!isObject2(object)) {
              return nativeKeysIn(object);
            }
            var isProto = isPrototype(object),
              result2 = [];
            for (var key in object) {
              if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
                result2.push(key);
              }
            }
            return result2;
          }
          function baseLt(value, other) {
            return value < other;
          }
          function baseMap(collection, iteratee2) {
            var index = -1,
              result2 = isArrayLike(collection) ? Array2(collection.length) : [];
            baseEach(collection, function (value, key, collection2) {
              result2[++index] = iteratee2(value, key, collection2);
            });
            return result2;
          }
          function baseMatches(source) {
            var matchData = getMatchData(source);
            if (matchData.length == 1 && matchData[0][2]) {
              return matchesStrictComparable(matchData[0][0], matchData[0][1]);
            }
            return function (object) {
              return object === source || baseIsMatch(object, source, matchData);
            };
          }
          function baseMatchesProperty(path, srcValue) {
            if (isKey(path) && isStrictComparable(srcValue)) {
              return matchesStrictComparable(toKey(path), srcValue);
            }
            return function (object) {
              var objValue = get2(object, path);
              return objValue === undefined2 && objValue === srcValue
                ? hasIn(object, path)
                : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
            };
          }
          function baseMerge(object, source, srcIndex, customizer, stack) {
            if (object === source) {
              return;
            }
            baseFor(
              source,
              function (srcValue, key) {
                stack || (stack = new Stack());
                if (isObject2(srcValue)) {
                  baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
                } else {
                  var newValue = customizer
                    ? customizer(safeGet(object, key), srcValue, key + '', object, source, stack)
                    : undefined2;
                  if (newValue === undefined2) {
                    newValue = srcValue;
                  }
                  assignMergeValue(object, key, newValue);
                }
              },
              keysIn
            );
          }
          function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
            var objValue = safeGet(object, key),
              srcValue = safeGet(source, key),
              stacked = stack.get(srcValue);
            if (stacked) {
              assignMergeValue(object, key, stacked);
              return;
            }
            var newValue = customizer ? customizer(objValue, srcValue, key + '', object, source, stack) : undefined2;
            var isCommon = newValue === undefined2;
            if (isCommon) {
              var isArr = isArray(srcValue),
                isBuff = !isArr && isBuffer(srcValue),
                isTyped = !isArr && !isBuff && isTypedArray(srcValue);
              newValue = srcValue;
              if (isArr || isBuff || isTyped) {
                if (isArray(objValue)) {
                  newValue = objValue;
                } else if (isArrayLikeObject(objValue)) {
                  newValue = copyArray(objValue);
                } else if (isBuff) {
                  isCommon = false;
                  newValue = cloneBuffer(srcValue, true);
                } else if (isTyped) {
                  isCommon = false;
                  newValue = cloneTypedArray(srcValue, true);
                } else {
                  newValue = [];
                }
              } else if (isPlainObject(srcValue) || isArguments(srcValue)) {
                newValue = objValue;
                if (isArguments(objValue)) {
                  newValue = toPlainObject(objValue);
                } else if (!isObject2(objValue) || isFunction2(objValue)) {
                  newValue = initCloneObject(srcValue);
                }
              } else {
                isCommon = false;
              }
            }
            if (isCommon) {
              stack.set(srcValue, newValue);
              mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
              stack['delete'](srcValue);
            }
            assignMergeValue(object, key, newValue);
          }
          function baseNth(array, n) {
            var length = array.length;
            if (!length) {
              return;
            }
            n += n < 0 ? length : 0;
            return isIndex(n, length) ? array[n] : undefined2;
          }
          function baseOrderBy(collection, iteratees, orders) {
            if (iteratees.length) {
              iteratees = arrayMap(iteratees, function (iteratee2) {
                if (isArray(iteratee2)) {
                  return function (value) {
                    return baseGet(value, iteratee2.length === 1 ? iteratee2[0] : iteratee2);
                  };
                }
                return iteratee2;
              });
            } else {
              iteratees = [identity];
            }
            var index = -1;
            iteratees = arrayMap(iteratees, baseUnary(getIteratee()));
            var result2 = baseMap(collection, function (value, key, collection2) {
              var criteria = arrayMap(iteratees, function (iteratee2) {
                return iteratee2(value);
              });
              return { criteria: criteria, index: ++index, value: value };
            });
            return baseSortBy(result2, function (object, other) {
              return compareMultiple(object, other, orders);
            });
          }
          function basePick(object, paths) {
            return basePickBy(object, paths, function (value, path) {
              return hasIn(object, path);
            });
          }
          function basePickBy(object, paths, predicate) {
            var index = -1,
              length = paths.length,
              result2 = {};
            while (++index < length) {
              var path = paths[index],
                value = baseGet(object, path);
              if (predicate(value, path)) {
                baseSet(result2, castPath(path, object), value);
              }
            }
            return result2;
          }
          function basePropertyDeep(path) {
            return function (object) {
              return baseGet(object, path);
            };
          }
          function basePullAll(array, values2, iteratee2, comparator) {
            var indexOf2 = comparator ? baseIndexOfWith : baseIndexOf,
              index = -1,
              length = values2.length,
              seen = array;
            if (array === values2) {
              values2 = copyArray(values2);
            }
            if (iteratee2) {
              seen = arrayMap(array, baseUnary(iteratee2));
            }
            while (++index < length) {
              var fromIndex = 0,
                value = values2[index],
                computed = iteratee2 ? iteratee2(value) : value;
              while ((fromIndex = indexOf2(seen, computed, fromIndex, comparator)) > -1) {
                if (seen !== array) {
                  splice.call(seen, fromIndex, 1);
                }
                splice.call(array, fromIndex, 1);
              }
            }
            return array;
          }
          function basePullAt(array, indexes) {
            var length = array ? indexes.length : 0,
              lastIndex = length - 1;
            while (length--) {
              var index = indexes[length];
              if (length == lastIndex || index !== previous) {
                var previous = index;
                if (isIndex(index)) {
                  splice.call(array, index, 1);
                } else {
                  baseUnset(array, index);
                }
              }
            }
            return array;
          }
          function baseRandom(lower, upper) {
            return lower + nativeFloor(nativeRandom() * (upper - lower + 1));
          }
          function baseRange(start, end, step, fromRight) {
            var index = -1,
              length = nativeMax(nativeCeil((end - start) / (step || 1)), 0),
              result2 = Array2(length);
            while (length--) {
              result2[fromRight ? length : ++index] = start;
              start += step;
            }
            return result2;
          }
          function baseRepeat(string, n) {
            var result2 = '';
            if (!string || n < 1 || n > MAX_SAFE_INTEGER) {
              return result2;
            }
            do {
              if (n % 2) {
                result2 += string;
              }
              n = nativeFloor(n / 2);
              if (n) {
                string += string;
              }
            } while (n);
            return result2;
          }
          function baseRest(func, start) {
            return setToString(overRest(func, start, identity), func + '');
          }
          function baseSample(collection) {
            return arraySample(values(collection));
          }
          function baseSampleSize(collection, n) {
            var array = values(collection);
            return shuffleSelf(array, baseClamp(n, 0, array.length));
          }
          function baseSet(object, path, value, customizer) {
            if (!isObject2(object)) {
              return object;
            }
            path = castPath(path, object);
            var index = -1,
              length = path.length,
              lastIndex = length - 1,
              nested = object;
            while (nested != null && ++index < length) {
              var key = toKey(path[index]),
                newValue = value;
              if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
                return object;
              }
              if (index != lastIndex) {
                var objValue = nested[key];
                newValue = customizer ? customizer(objValue, key, nested) : undefined2;
                if (newValue === undefined2) {
                  newValue = isObject2(objValue) ? objValue : isIndex(path[index + 1]) ? [] : {};
                }
              }
              assignValue(nested, key, newValue);
              nested = nested[key];
            }
            return object;
          }
          var baseSetData = !metaMap
            ? identity
            : function (func, data) {
                metaMap.set(func, data);
                return func;
              };
          var baseSetToString = !defineProperty2
            ? identity
            : function (func, string) {
                return defineProperty2(func, 'toString', {
                  configurable: true,
                  enumerable: false,
                  value: constant(string),
                  writable: true,
                });
              };
          function baseShuffle(collection) {
            return shuffleSelf(values(collection));
          }
          function baseSlice(array, start, end) {
            var index = -1,
              length = array.length;
            if (start < 0) {
              start = -start > length ? 0 : length + start;
            }
            end = end > length ? length : end;
            if (end < 0) {
              end += length;
            }
            length = start > end ? 0 : (end - start) >>> 0;
            start >>>= 0;
            var result2 = Array2(length);
            while (++index < length) {
              result2[index] = array[index + start];
            }
            return result2;
          }
          function baseSome(collection, predicate) {
            var result2;
            baseEach(collection, function (value, index, collection2) {
              result2 = predicate(value, index, collection2);
              return !result2;
            });
            return !!result2;
          }
          function baseSortedIndex(array, value, retHighest) {
            var low = 0,
              high = array == null ? low : array.length;
            if (typeof value == 'number' && value === value && high <= HALF_MAX_ARRAY_LENGTH) {
              while (low < high) {
                var mid = (low + high) >>> 1,
                  computed = array[mid];
                if (computed !== null && !isSymbol(computed) && (retHighest ? computed <= value : computed < value)) {
                  low = mid + 1;
                } else {
                  high = mid;
                }
              }
              return high;
            }
            return baseSortedIndexBy(array, value, identity, retHighest);
          }
          function baseSortedIndexBy(array, value, iteratee2, retHighest) {
            var low = 0,
              high = array == null ? 0 : array.length;
            if (high === 0) {
              return 0;
            }
            value = iteratee2(value);
            var valIsNaN = value !== value,
              valIsNull = value === null,
              valIsSymbol = isSymbol(value),
              valIsUndefined = value === undefined2;
            while (low < high) {
              var mid = nativeFloor((low + high) / 2),
                computed = iteratee2(array[mid]),
                othIsDefined = computed !== undefined2,
                othIsNull = computed === null,
                othIsReflexive = computed === computed,
                othIsSymbol = isSymbol(computed);
              if (valIsNaN) {
                var setLow = retHighest || othIsReflexive;
              } else if (valIsUndefined) {
                setLow = othIsReflexive && (retHighest || othIsDefined);
              } else if (valIsNull) {
                setLow = othIsReflexive && othIsDefined && (retHighest || !othIsNull);
              } else if (valIsSymbol) {
                setLow = othIsReflexive && othIsDefined && !othIsNull && (retHighest || !othIsSymbol);
              } else if (othIsNull || othIsSymbol) {
                setLow = false;
              } else {
                setLow = retHighest ? computed <= value : computed < value;
              }
              if (setLow) {
                low = mid + 1;
              } else {
                high = mid;
              }
            }
            return nativeMin(high, MAX_ARRAY_INDEX);
          }
          function baseSortedUniq(array, iteratee2) {
            var index = -1,
              length = array.length,
              resIndex = 0,
              result2 = [];
            while (++index < length) {
              var value = array[index],
                computed = iteratee2 ? iteratee2(value) : value;
              if (!index || !eq(computed, seen)) {
                var seen = computed;
                result2[resIndex++] = value === 0 ? 0 : value;
              }
            }
            return result2;
          }
          function baseToNumber(value) {
            if (typeof value == 'number') {
              return value;
            }
            if (isSymbol(value)) {
              return NAN;
            }
            return +value;
          }
          function baseToString(value) {
            if (typeof value == 'string') {
              return value;
            }
            if (isArray(value)) {
              return arrayMap(value, baseToString) + '';
            }
            if (isSymbol(value)) {
              return symbolToString ? symbolToString.call(value) : '';
            }
            var result2 = value + '';
            return result2 == '0' && 1 / value == -INFINITY ? '-0' : result2;
          }
          function baseUniq(array, iteratee2, comparator) {
            var index = -1,
              includes2 = arrayIncludes,
              length = array.length,
              isCommon = true,
              result2 = [],
              seen = result2;
            if (comparator) {
              isCommon = false;
              includes2 = arrayIncludesWith;
            } else if (length >= LARGE_ARRAY_SIZE) {
              var set3 = iteratee2 ? null : createSet(array);
              if (set3) {
                return setToArray(set3);
              }
              isCommon = false;
              includes2 = cacheHas;
              seen = new SetCache();
            } else {
              seen = iteratee2 ? [] : result2;
            }
            outer: while (++index < length) {
              var value = array[index],
                computed = iteratee2 ? iteratee2(value) : value;
              value = comparator || value !== 0 ? value : 0;
              if (isCommon && computed === computed) {
                var seenIndex = seen.length;
                while (seenIndex--) {
                  if (seen[seenIndex] === computed) {
                    continue outer;
                  }
                }
                if (iteratee2) {
                  seen.push(computed);
                }
                result2.push(value);
              } else if (!includes2(seen, computed, comparator)) {
                if (seen !== result2) {
                  seen.push(computed);
                }
                result2.push(value);
              }
            }
            return result2;
          }
          function baseUnset(object, path) {
            path = castPath(path, object);
            object = parent(object, path);
            return object == null || delete object[toKey(last(path))];
          }
          function baseUpdate(object, path, updater, customizer) {
            return baseSet(object, path, updater(baseGet(object, path)), customizer);
          }
          function baseWhile(array, predicate, isDrop, fromRight) {
            var length = array.length,
              index = fromRight ? length : -1;
            while ((fromRight ? index-- : ++index < length) && predicate(array[index], index, array)) {}
            return isDrop
              ? baseSlice(array, fromRight ? 0 : index, fromRight ? index + 1 : length)
              : baseSlice(array, fromRight ? index + 1 : 0, fromRight ? length : index);
          }
          function baseWrapperValue(value, actions) {
            var result2 = value;
            if (result2 instanceof LazyWrapper) {
              result2 = result2.value();
            }
            return arrayReduce(
              actions,
              function (result3, action) {
                return action.func.apply(action.thisArg, arrayPush([result3], action.args));
              },
              result2
            );
          }
          function baseXor(arrays, iteratee2, comparator) {
            var length = arrays.length;
            if (length < 2) {
              return length ? baseUniq(arrays[0]) : [];
            }
            var index = -1,
              result2 = Array2(length);
            while (++index < length) {
              var array = arrays[index],
                othIndex = -1;
              while (++othIndex < length) {
                if (othIndex != index) {
                  result2[index] = baseDifference(result2[index] || array, arrays[othIndex], iteratee2, comparator);
                }
              }
            }
            return baseUniq(baseFlatten(result2, 1), iteratee2, comparator);
          }
          function baseZipObject(props, values2, assignFunc) {
            var index = -1,
              length = props.length,
              valsLength = values2.length,
              result2 = {};
            while (++index < length) {
              var value = index < valsLength ? values2[index] : undefined2;
              assignFunc(result2, props[index], value);
            }
            return result2;
          }
          function castArrayLikeObject(value) {
            return isArrayLikeObject(value) ? value : [];
          }
          function castFunction(value) {
            return typeof value == 'function' ? value : identity;
          }
          function castPath(value, object) {
            if (isArray(value)) {
              return value;
            }
            return isKey(value, object) ? [value] : stringToPath(toString(value));
          }
          var castRest = baseRest;
          function castSlice(array, start, end) {
            var length = array.length;
            end = end === undefined2 ? length : end;
            return !start && end >= length ? array : baseSlice(array, start, end);
          }
          var clearTimeout2 =
            ctxClearTimeout ||
            function (id) {
              return root.clearTimeout(id);
            };
          function cloneBuffer(buffer, isDeep) {
            if (isDeep) {
              return buffer.slice();
            }
            var length = buffer.length,
              result2 = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
            buffer.copy(result2);
            return result2;
          }
          function cloneArrayBuffer(arrayBuffer) {
            var result2 = new arrayBuffer.constructor(arrayBuffer.byteLength);
            new Uint8Array2(result2).set(new Uint8Array2(arrayBuffer));
            return result2;
          }
          function cloneDataView(dataView, isDeep) {
            var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
            return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
          }
          function cloneRegExp(regexp) {
            var result2 = new regexp.constructor(regexp.source, reFlags.exec(regexp));
            result2.lastIndex = regexp.lastIndex;
            return result2;
          }
          function cloneSymbol(symbol) {
            return symbolValueOf ? Object2(symbolValueOf.call(symbol)) : {};
          }
          function cloneTypedArray(typedArray, isDeep) {
            var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
            return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
          }
          function compareAscending(value, other) {
            if (value !== other) {
              var valIsDefined = value !== undefined2,
                valIsNull = value === null,
                valIsReflexive = value === value,
                valIsSymbol = isSymbol(value);
              var othIsDefined = other !== undefined2,
                othIsNull = other === null,
                othIsReflexive = other === other,
                othIsSymbol = isSymbol(other);
              if (
                (!othIsNull && !othIsSymbol && !valIsSymbol && value > other) ||
                (valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol) ||
                (valIsNull && othIsDefined && othIsReflexive) ||
                (!valIsDefined && othIsReflexive) ||
                !valIsReflexive
              ) {
                return 1;
              }
              if (
                (!valIsNull && !valIsSymbol && !othIsSymbol && value < other) ||
                (othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol) ||
                (othIsNull && valIsDefined && valIsReflexive) ||
                (!othIsDefined && valIsReflexive) ||
                !othIsReflexive
              ) {
                return -1;
              }
            }
            return 0;
          }
          function compareMultiple(object, other, orders) {
            var index = -1,
              objCriteria = object.criteria,
              othCriteria = other.criteria,
              length = objCriteria.length,
              ordersLength = orders.length;
            while (++index < length) {
              var result2 = compareAscending(objCriteria[index], othCriteria[index]);
              if (result2) {
                if (index >= ordersLength) {
                  return result2;
                }
                var order = orders[index];
                return result2 * (order == 'desc' ? -1 : 1);
              }
            }
            return object.index - other.index;
          }
          function composeArgs(args, partials, holders, isCurried) {
            var argsIndex = -1,
              argsLength = args.length,
              holdersLength = holders.length,
              leftIndex = -1,
              leftLength = partials.length,
              rangeLength = nativeMax(argsLength - holdersLength, 0),
              result2 = Array2(leftLength + rangeLength),
              isUncurried = !isCurried;
            while (++leftIndex < leftLength) {
              result2[leftIndex] = partials[leftIndex];
            }
            while (++argsIndex < holdersLength) {
              if (isUncurried || argsIndex < argsLength) {
                result2[holders[argsIndex]] = args[argsIndex];
              }
            }
            while (rangeLength--) {
              result2[leftIndex++] = args[argsIndex++];
            }
            return result2;
          }
          function composeArgsRight(args, partials, holders, isCurried) {
            var argsIndex = -1,
              argsLength = args.length,
              holdersIndex = -1,
              holdersLength = holders.length,
              rightIndex = -1,
              rightLength = partials.length,
              rangeLength = nativeMax(argsLength - holdersLength, 0),
              result2 = Array2(rangeLength + rightLength),
              isUncurried = !isCurried;
            while (++argsIndex < rangeLength) {
              result2[argsIndex] = args[argsIndex];
            }
            var offset = argsIndex;
            while (++rightIndex < rightLength) {
              result2[offset + rightIndex] = partials[rightIndex];
            }
            while (++holdersIndex < holdersLength) {
              if (isUncurried || argsIndex < argsLength) {
                result2[offset + holders[holdersIndex]] = args[argsIndex++];
              }
            }
            return result2;
          }
          function copyArray(source, array) {
            var index = -1,
              length = source.length;
            array || (array = Array2(length));
            while (++index < length) {
              array[index] = source[index];
            }
            return array;
          }
          function copyObject(source, props, object, customizer) {
            var isNew = !object;
            object || (object = {});
            var index = -1,
              length = props.length;
            while (++index < length) {
              var key = props[index];
              var newValue = customizer ? customizer(object[key], source[key], key, object, source) : undefined2;
              if (newValue === undefined2) {
                newValue = source[key];
              }
              if (isNew) {
                baseAssignValue(object, key, newValue);
              } else {
                assignValue(object, key, newValue);
              }
            }
            return object;
          }
          function copySymbols(source, object) {
            return copyObject(source, getSymbols(source), object);
          }
          function copySymbolsIn(source, object) {
            return copyObject(source, getSymbolsIn(source), object);
          }
          function createAggregator(setter, initializer) {
            return function (collection, iteratee2) {
              var func = isArray(collection) ? arrayAggregator : baseAggregator,
                accumulator = initializer ? initializer() : {};
              return func(collection, setter, getIteratee(iteratee2, 2), accumulator);
            };
          }
          function createAssigner(assigner) {
            return baseRest(function (object, sources) {
              var index = -1,
                length = sources.length,
                customizer = length > 1 ? sources[length - 1] : undefined2,
                guard = length > 2 ? sources[2] : undefined2;
              customizer = assigner.length > 3 && typeof customizer == 'function' ? (length--, customizer) : undefined2;
              if (guard && isIterateeCall(sources[0], sources[1], guard)) {
                customizer = length < 3 ? undefined2 : customizer;
                length = 1;
              }
              object = Object2(object);
              while (++index < length) {
                var source = sources[index];
                if (source) {
                  assigner(object, source, index, customizer);
                }
              }
              return object;
            });
          }
          function createBaseEach(eachFunc, fromRight) {
            return function (collection, iteratee2) {
              if (collection == null) {
                return collection;
              }
              if (!isArrayLike(collection)) {
                return eachFunc(collection, iteratee2);
              }
              var length = collection.length,
                index = fromRight ? length : -1,
                iterable = Object2(collection);
              while (fromRight ? index-- : ++index < length) {
                if (iteratee2(iterable[index], index, iterable) === false) {
                  break;
                }
              }
              return collection;
            };
          }
          function createBaseFor(fromRight) {
            return function (object, iteratee2, keysFunc) {
              var index = -1,
                iterable = Object2(object),
                props = keysFunc(object),
                length = props.length;
              while (length--) {
                var key = props[fromRight ? length : ++index];
                if (iteratee2(iterable[key], key, iterable) === false) {
                  break;
                }
              }
              return object;
            };
          }
          function createBind(func, bitmask, thisArg) {
            var isBind = bitmask & WRAP_BIND_FLAG,
              Ctor = createCtor(func);
            function wrapper() {
              var fn = this && this !== root && this instanceof wrapper ? Ctor : func;
              return fn.apply(isBind ? thisArg : this, arguments);
            }
            return wrapper;
          }
          function createCaseFirst(methodName) {
            return function (string) {
              string = toString(string);
              var strSymbols = hasUnicode(string) ? stringToArray(string) : undefined2;
              var chr = strSymbols ? strSymbols[0] : string.charAt(0);
              var trailing = strSymbols ? castSlice(strSymbols, 1).join('') : string.slice(1);
              return chr[methodName]() + trailing;
            };
          }
          function createCompounder(callback) {
            return function (string) {
              return arrayReduce(words(deburr(string).replace(reApos, '')), callback, '');
            };
          }
          function createCtor(Ctor) {
            return function () {
              var args = arguments;
              switch (args.length) {
                case 0:
                  return new Ctor();
                case 1:
                  return new Ctor(args[0]);
                case 2:
                  return new Ctor(args[0], args[1]);
                case 3:
                  return new Ctor(args[0], args[1], args[2]);
                case 4:
                  return new Ctor(args[0], args[1], args[2], args[3]);
                case 5:
                  return new Ctor(args[0], args[1], args[2], args[3], args[4]);
                case 6:
                  return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5]);
                case 7:
                  return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
              }
              var thisBinding = baseCreate(Ctor.prototype),
                result2 = Ctor.apply(thisBinding, args);
              return isObject2(result2) ? result2 : thisBinding;
            };
          }
          function createCurry(func, bitmask, arity) {
            var Ctor = createCtor(func);
            function wrapper() {
              var length = arguments.length,
                args = Array2(length),
                index = length,
                placeholder = getHolder(wrapper);
              while (index--) {
                args[index] = arguments[index];
              }
              var holders =
                length < 3 && args[0] !== placeholder && args[length - 1] !== placeholder
                  ? []
                  : replaceHolders(args, placeholder);
              length -= holders.length;
              if (length < arity) {
                return createRecurry(
                  func,
                  bitmask,
                  createHybrid,
                  wrapper.placeholder,
                  undefined2,
                  args,
                  holders,
                  undefined2,
                  undefined2,
                  arity - length
                );
              }
              var fn = this && this !== root && this instanceof wrapper ? Ctor : func;
              return apply(fn, this, args);
            }
            return wrapper;
          }
          function createFind(findIndexFunc) {
            return function (collection, predicate, fromIndex) {
              var iterable = Object2(collection);
              if (!isArrayLike(collection)) {
                var iteratee2 = getIteratee(predicate, 3);
                collection = keys(collection);
                predicate = function (key) {
                  return iteratee2(iterable[key], key, iterable);
                };
              }
              var index = findIndexFunc(collection, predicate, fromIndex);
              return index > -1 ? iterable[iteratee2 ? collection[index] : index] : undefined2;
            };
          }
          function createFlow(fromRight) {
            return flatRest(function (funcs) {
              var length = funcs.length,
                index = length,
                prereq = LodashWrapper.prototype.thru;
              if (fromRight) {
                funcs.reverse();
              }
              while (index--) {
                var func = funcs[index];
                if (typeof func != 'function') {
                  throw new TypeError2(FUNC_ERROR_TEXT);
                }
                if (prereq && !wrapper && getFuncName(func) == 'wrapper') {
                  var wrapper = new LodashWrapper([], true);
                }
              }
              index = wrapper ? index : length;
              while (++index < length) {
                func = funcs[index];
                var funcName = getFuncName(func),
                  data = funcName == 'wrapper' ? getData(func) : undefined2;
                if (
                  data &&
                  isLaziable(data[0]) &&
                  data[1] == (WRAP_ARY_FLAG | WRAP_CURRY_FLAG | WRAP_PARTIAL_FLAG | WRAP_REARG_FLAG) &&
                  !data[4].length &&
                  data[9] == 1
                ) {
                  wrapper = wrapper[getFuncName(data[0])].apply(wrapper, data[3]);
                } else {
                  wrapper = func.length == 1 && isLaziable(func) ? wrapper[funcName]() : wrapper.thru(func);
                }
              }
              return function () {
                var args = arguments,
                  value = args[0];
                if (wrapper && args.length == 1 && isArray(value)) {
                  return wrapper.plant(value).value();
                }
                var index2 = 0,
                  result2 = length ? funcs[index2].apply(this, args) : value;
                while (++index2 < length) {
                  result2 = funcs[index2].call(this, result2);
                }
                return result2;
              };
            });
          }
          function createHybrid(
            func,
            bitmask,
            thisArg,
            partials,
            holders,
            partialsRight,
            holdersRight,
            argPos,
            ary2,
            arity
          ) {
            var isAry = bitmask & WRAP_ARY_FLAG,
              isBind = bitmask & WRAP_BIND_FLAG,
              isBindKey = bitmask & WRAP_BIND_KEY_FLAG,
              isCurried = bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG),
              isFlip = bitmask & WRAP_FLIP_FLAG,
              Ctor = isBindKey ? undefined2 : createCtor(func);
            function wrapper() {
              var length = arguments.length,
                args = Array2(length),
                index = length;
              while (index--) {
                args[index] = arguments[index];
              }
              if (isCurried) {
                var placeholder = getHolder(wrapper),
                  holdersCount = countHolders(args, placeholder);
              }
              if (partials) {
                args = composeArgs(args, partials, holders, isCurried);
              }
              if (partialsRight) {
                args = composeArgsRight(args, partialsRight, holdersRight, isCurried);
              }
              length -= holdersCount;
              if (isCurried && length < arity) {
                var newHolders = replaceHolders(args, placeholder);
                return createRecurry(
                  func,
                  bitmask,
                  createHybrid,
                  wrapper.placeholder,
                  thisArg,
                  args,
                  newHolders,
                  argPos,
                  ary2,
                  arity - length
                );
              }
              var thisBinding = isBind ? thisArg : this,
                fn = isBindKey ? thisBinding[func] : func;
              length = args.length;
              if (argPos) {
                args = reorder(args, argPos);
              } else if (isFlip && length > 1) {
                args.reverse();
              }
              if (isAry && ary2 < length) {
                args.length = ary2;
              }
              if (this && this !== root && this instanceof wrapper) {
                fn = Ctor || createCtor(fn);
              }
              return fn.apply(thisBinding, args);
            }
            return wrapper;
          }
          function createInverter(setter, toIteratee) {
            return function (object, iteratee2) {
              return baseInverter(object, setter, toIteratee(iteratee2), {});
            };
          }
          function createMathOperation(operator, defaultValue) {
            return function (value, other) {
              var result2;
              if (value === undefined2 && other === undefined2) {
                return defaultValue;
              }
              if (value !== undefined2) {
                result2 = value;
              }
              if (other !== undefined2) {
                if (result2 === undefined2) {
                  return other;
                }
                if (typeof value == 'string' || typeof other == 'string') {
                  value = baseToString(value);
                  other = baseToString(other);
                } else {
                  value = baseToNumber(value);
                  other = baseToNumber(other);
                }
                result2 = operator(value, other);
              }
              return result2;
            };
          }
          function createOver(arrayFunc) {
            return flatRest(function (iteratees) {
              iteratees = arrayMap(iteratees, baseUnary(getIteratee()));
              return baseRest(function (args) {
                var thisArg = this;
                return arrayFunc(iteratees, function (iteratee2) {
                  return apply(iteratee2, thisArg, args);
                });
              });
            });
          }
          function createPadding(length, chars) {
            chars = chars === undefined2 ? ' ' : baseToString(chars);
            var charsLength = chars.length;
            if (charsLength < 2) {
              return charsLength ? baseRepeat(chars, length) : chars;
            }
            var result2 = baseRepeat(chars, nativeCeil(length / stringSize(chars)));
            return hasUnicode(chars) ? castSlice(stringToArray(result2), 0, length).join('') : result2.slice(0, length);
          }
          function createPartial(func, bitmask, thisArg, partials) {
            var isBind = bitmask & WRAP_BIND_FLAG,
              Ctor = createCtor(func);
            function wrapper() {
              var argsIndex = -1,
                argsLength = arguments.length,
                leftIndex = -1,
                leftLength = partials.length,
                args = Array2(leftLength + argsLength),
                fn = this && this !== root && this instanceof wrapper ? Ctor : func;
              while (++leftIndex < leftLength) {
                args[leftIndex] = partials[leftIndex];
              }
              while (argsLength--) {
                args[leftIndex++] = arguments[++argsIndex];
              }
              return apply(fn, isBind ? thisArg : this, args);
            }
            return wrapper;
          }
          function createRange(fromRight) {
            return function (start, end, step) {
              if (step && typeof step != 'number' && isIterateeCall(start, end, step)) {
                end = step = undefined2;
              }
              start = toFinite(start);
              if (end === undefined2) {
                end = start;
                start = 0;
              } else {
                end = toFinite(end);
              }
              step = step === undefined2 ? (start < end ? 1 : -1) : toFinite(step);
              return baseRange(start, end, step, fromRight);
            };
          }
          function createRelationalOperation(operator) {
            return function (value, other) {
              if (!(typeof value == 'string' && typeof other == 'string')) {
                value = toNumber(value);
                other = toNumber(other);
              }
              return operator(value, other);
            };
          }
          function createRecurry(
            func,
            bitmask,
            wrapFunc,
            placeholder,
            thisArg,
            partials,
            holders,
            argPos,
            ary2,
            arity
          ) {
            var isCurry = bitmask & WRAP_CURRY_FLAG,
              newHolders = isCurry ? holders : undefined2,
              newHoldersRight = isCurry ? undefined2 : holders,
              newPartials = isCurry ? partials : undefined2,
              newPartialsRight = isCurry ? undefined2 : partials;
            bitmask |= isCurry ? WRAP_PARTIAL_FLAG : WRAP_PARTIAL_RIGHT_FLAG;
            bitmask &= ~(isCurry ? WRAP_PARTIAL_RIGHT_FLAG : WRAP_PARTIAL_FLAG);
            if (!(bitmask & WRAP_CURRY_BOUND_FLAG)) {
              bitmask &= ~(WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG);
            }
            var newData = [
              func,
              bitmask,
              thisArg,
              newPartials,
              newHolders,
              newPartialsRight,
              newHoldersRight,
              argPos,
              ary2,
              arity,
            ];
            var result2 = wrapFunc.apply(undefined2, newData);
            if (isLaziable(func)) {
              setData(result2, newData);
            }
            result2.placeholder = placeholder;
            return setWrapToString(result2, func, bitmask);
          }
          function createRound(methodName) {
            var func = Math2[methodName];
            return function (number, precision) {
              number = toNumber(number);
              precision = precision == null ? 0 : nativeMin(toInteger(precision), 292);
              if (precision && nativeIsFinite(number)) {
                var pair = (toString(number) + 'e').split('e'),
                  value = func(pair[0] + 'e' + (+pair[1] + precision));
                pair = (toString(value) + 'e').split('e');
                return +(pair[0] + 'e' + (+pair[1] - precision));
              }
              return func(number);
            };
          }
          var createSet = !(Set2 && 1 / setToArray(new Set2([, -0]))[1] == INFINITY)
            ? noop
            : function (values2) {
                return new Set2(values2);
              };
          function createToPairs(keysFunc) {
            return function (object) {
              var tag = getTag2(object);
              if (tag == mapTag) {
                return mapToArray(object);
              }
              if (tag == setTag) {
                return setToPairs(object);
              }
              return baseToPairs(object, keysFunc(object));
            };
          }
          function createWrap(func, bitmask, thisArg, partials, holders, argPos, ary2, arity) {
            var isBindKey = bitmask & WRAP_BIND_KEY_FLAG;
            if (!isBindKey && typeof func != 'function') {
              throw new TypeError2(FUNC_ERROR_TEXT);
            }
            var length = partials ? partials.length : 0;
            if (!length) {
              bitmask &= ~(WRAP_PARTIAL_FLAG | WRAP_PARTIAL_RIGHT_FLAG);
              partials = holders = undefined2;
            }
            ary2 = ary2 === undefined2 ? ary2 : nativeMax(toInteger(ary2), 0);
            arity = arity === undefined2 ? arity : toInteger(arity);
            length -= holders ? holders.length : 0;
            if (bitmask & WRAP_PARTIAL_RIGHT_FLAG) {
              var partialsRight = partials,
                holdersRight = holders;
              partials = holders = undefined2;
            }
            var data = isBindKey ? undefined2 : getData(func);
            var newData = [func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary2, arity];
            if (data) {
              mergeData(newData, data);
            }
            func = newData[0];
            bitmask = newData[1];
            thisArg = newData[2];
            partials = newData[3];
            holders = newData[4];
            arity = newData[9] =
              newData[9] === undefined2 ? (isBindKey ? 0 : func.length) : nativeMax(newData[9] - length, 0);
            if (!arity && bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG)) {
              bitmask &= ~(WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG);
            }
            if (!bitmask || bitmask == WRAP_BIND_FLAG) {
              var result2 = createBind(func, bitmask, thisArg);
            } else if (bitmask == WRAP_CURRY_FLAG || bitmask == WRAP_CURRY_RIGHT_FLAG) {
              result2 = createCurry(func, bitmask, arity);
            } else if (
              (bitmask == WRAP_PARTIAL_FLAG || bitmask == (WRAP_BIND_FLAG | WRAP_PARTIAL_FLAG)) &&
              !holders.length
            ) {
              result2 = createPartial(func, bitmask, thisArg, partials);
            } else {
              result2 = createHybrid.apply(undefined2, newData);
            }
            var setter = data ? baseSetData : setData;
            return setWrapToString(setter(result2, newData), func, bitmask);
          }
          function customDefaultsAssignIn(objValue, srcValue, key, object) {
            if (objValue === undefined2 || (eq(objValue, objectProto[key]) && !hasOwnProperty.call(object, key))) {
              return srcValue;
            }
            return objValue;
          }
          function customDefaultsMerge(objValue, srcValue, key, object, source, stack) {
            if (isObject2(objValue) && isObject2(srcValue)) {
              stack.set(srcValue, objValue);
              baseMerge(objValue, srcValue, undefined2, customDefaultsMerge, stack);
              stack['delete'](srcValue);
            }
            return objValue;
          }
          function customOmitClone(value) {
            return isPlainObject(value) ? undefined2 : value;
          }
          function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
            var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
              arrLength = array.length,
              othLength = other.length;
            if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
              return false;
            }
            var arrStacked = stack.get(array);
            var othStacked = stack.get(other);
            if (arrStacked && othStacked) {
              return arrStacked == other && othStacked == array;
            }
            var index = -1,
              result2 = true,
              seen = bitmask & COMPARE_UNORDERED_FLAG ? new SetCache() : undefined2;
            stack.set(array, other);
            stack.set(other, array);
            while (++index < arrLength) {
              var arrValue = array[index],
                othValue = other[index];
              if (customizer) {
                var compared = isPartial
                  ? customizer(othValue, arrValue, index, other, array, stack)
                  : customizer(arrValue, othValue, index, array, other, stack);
              }
              if (compared !== undefined2) {
                if (compared) {
                  continue;
                }
                result2 = false;
                break;
              }
              if (seen) {
                if (
                  !arraySome(other, function (othValue2, othIndex) {
                    if (
                      !cacheHas(seen, othIndex) &&
                      (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack))
                    ) {
                      return seen.push(othIndex);
                    }
                  })
                ) {
                  result2 = false;
                  break;
                }
              } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
                result2 = false;
                break;
              }
            }
            stack['delete'](array);
            stack['delete'](other);
            return result2;
          }
          function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
            switch (tag) {
              case dataViewTag:
                if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
                  return false;
                }
                object = object.buffer;
                other = other.buffer;
              case arrayBufferTag:
                if (
                  object.byteLength != other.byteLength ||
                  !equalFunc(new Uint8Array2(object), new Uint8Array2(other))
                ) {
                  return false;
                }
                return true;
              case boolTag:
              case dateTag:
              case numberTag:
                return eq(+object, +other);
              case errorTag:
                return object.name == other.name && object.message == other.message;
              case regexpTag:
              case stringTag:
                return object == other + '';
              case mapTag:
                var convert = mapToArray;
              case setTag:
                var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
                convert || (convert = setToArray);
                if (object.size != other.size && !isPartial) {
                  return false;
                }
                var stacked = stack.get(object);
                if (stacked) {
                  return stacked == other;
                }
                bitmask |= COMPARE_UNORDERED_FLAG;
                stack.set(object, other);
                var result2 = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
                stack['delete'](object);
                return result2;
              case symbolTag:
                if (symbolValueOf) {
                  return symbolValueOf.call(object) == symbolValueOf.call(other);
                }
            }
            return false;
          }
          function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
            var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
              objProps = getAllKeys(object),
              objLength = objProps.length,
              othProps = getAllKeys(other),
              othLength = othProps.length;
            if (objLength != othLength && !isPartial) {
              return false;
            }
            var index = objLength;
            while (index--) {
              var key = objProps[index];
              if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
                return false;
              }
            }
            var objStacked = stack.get(object);
            var othStacked = stack.get(other);
            if (objStacked && othStacked) {
              return objStacked == other && othStacked == object;
            }
            var result2 = true;
            stack.set(object, other);
            stack.set(other, object);
            var skipCtor = isPartial;
            while (++index < objLength) {
              key = objProps[index];
              var objValue = object[key],
                othValue = other[key];
              if (customizer) {
                var compared = isPartial
                  ? customizer(othValue, objValue, key, other, object, stack)
                  : customizer(objValue, othValue, key, object, other, stack);
              }
              if (
                !(compared === undefined2
                  ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack)
                  : compared)
              ) {
                result2 = false;
                break;
              }
              skipCtor || (skipCtor = key == 'constructor');
            }
            if (result2 && !skipCtor) {
              var objCtor = object.constructor,
                othCtor = other.constructor;
              if (
                objCtor != othCtor &&
                'constructor' in object &&
                'constructor' in other &&
                !(
                  typeof objCtor == 'function' &&
                  objCtor instanceof objCtor &&
                  typeof othCtor == 'function' &&
                  othCtor instanceof othCtor
                )
              ) {
                result2 = false;
              }
            }
            stack['delete'](object);
            stack['delete'](other);
            return result2;
          }
          function flatRest(func) {
            return setToString(overRest(func, undefined2, flatten), func + '');
          }
          function getAllKeys(object) {
            return baseGetAllKeys(object, keys, getSymbols);
          }
          function getAllKeysIn(object) {
            return baseGetAllKeys(object, keysIn, getSymbolsIn);
          }
          var getData = !metaMap
            ? noop
            : function (func) {
                return metaMap.get(func);
              };
          function getFuncName(func) {
            var result2 = func.name + '',
              array = realNames[result2],
              length = hasOwnProperty.call(realNames, result2) ? array.length : 0;
            while (length--) {
              var data = array[length],
                otherFunc = data.func;
              if (otherFunc == null || otherFunc == func) {
                return data.name;
              }
            }
            return result2;
          }
          function getHolder(func) {
            var object = hasOwnProperty.call(lodash, 'placeholder') ? lodash : func;
            return object.placeholder;
          }
          function getIteratee() {
            var result2 = lodash.iteratee || iteratee;
            result2 = result2 === iteratee ? baseIteratee : result2;
            return arguments.length ? result2(arguments[0], arguments[1]) : result2;
          }
          function getMapData(map2, key) {
            var data = map2.__data__;
            return isKeyable(key) ? data[typeof key == 'string' ? 'string' : 'hash'] : data.map;
          }
          function getMatchData(object) {
            var result2 = keys(object),
              length = result2.length;
            while (length--) {
              var key = result2[length],
                value = object[key];
              result2[length] = [key, value, isStrictComparable(value)];
            }
            return result2;
          }
          function getNative(object, key) {
            var value = getValue(object, key);
            return baseIsNative(value) ? value : undefined2;
          }
          function getRawTag(value) {
            var isOwn = hasOwnProperty.call(value, symToStringTag),
              tag = value[symToStringTag];
            try {
              value[symToStringTag] = undefined2;
              var unmasked = true;
            } catch (e) {}
            var result2 = nativeObjectToString.call(value);
            if (unmasked) {
              if (isOwn) {
                value[symToStringTag] = tag;
              } else {
                delete value[symToStringTag];
              }
            }
            return result2;
          }
          var getSymbols = !nativeGetSymbols
            ? stubArray
            : function (object) {
                if (object == null) {
                  return [];
                }
                object = Object2(object);
                return arrayFilter(nativeGetSymbols(object), function (symbol) {
                  return propertyIsEnumerable.call(object, symbol);
                });
              };
          var getSymbolsIn = !nativeGetSymbols
            ? stubArray
            : function (object) {
                var result2 = [];
                while (object) {
                  arrayPush(result2, getSymbols(object));
                  object = getPrototype(object);
                }
                return result2;
              };
          var getTag2 = baseGetTag;
          if (
            (DataView && getTag2(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
            (Map2 && getTag2(new Map2()) != mapTag) ||
            (Promise2 && getTag2(Promise2.resolve()) != promiseTag) ||
            (Set2 && getTag2(new Set2()) != setTag) ||
            (WeakMap2 && getTag2(new WeakMap2()) != weakMapTag)
          ) {
            getTag2 = function (value) {
              var result2 = baseGetTag(value),
                Ctor = result2 == objectTag ? value.constructor : undefined2,
                ctorString = Ctor ? toSource(Ctor) : '';
              if (ctorString) {
                switch (ctorString) {
                  case dataViewCtorString:
                    return dataViewTag;
                  case mapCtorString:
                    return mapTag;
                  case promiseCtorString:
                    return promiseTag;
                  case setCtorString:
                    return setTag;
                  case weakMapCtorString:
                    return weakMapTag;
                }
              }
              return result2;
            };
          }
          function getView(start, end, transforms) {
            var index = -1,
              length = transforms.length;
            while (++index < length) {
              var data = transforms[index],
                size2 = data.size;
              switch (data.type) {
                case 'drop':
                  start += size2;
                  break;
                case 'dropRight':
                  end -= size2;
                  break;
                case 'take':
                  end = nativeMin(end, start + size2);
                  break;
                case 'takeRight':
                  start = nativeMax(start, end - size2);
                  break;
              }
            }
            return { start: start, end: end };
          }
          function getWrapDetails(source) {
            var match2 = source.match(reWrapDetails);
            return match2 ? match2[1].split(reSplitDetails) : [];
          }
          function hasPath(object, path, hasFunc) {
            path = castPath(path, object);
            var index = -1,
              length = path.length,
              result2 = false;
            while (++index < length) {
              var key = toKey(path[index]);
              if (!(result2 = object != null && hasFunc(object, key))) {
                break;
              }
              object = object[key];
            }
            if (result2 || ++index != length) {
              return result2;
            }
            length = object == null ? 0 : object.length;
            return !!length && isLength(length) && isIndex(key, length) && (isArray(object) || isArguments(object));
          }
          function initCloneArray(array) {
            var length = array.length,
              result2 = new array.constructor(length);
            if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
              result2.index = array.index;
              result2.input = array.input;
            }
            return result2;
          }
          function initCloneObject(object) {
            return typeof object.constructor == 'function' && !isPrototype(object)
              ? baseCreate(getPrototype(object))
              : {};
          }
          function initCloneByTag(object, tag, isDeep) {
            var Ctor = object.constructor;
            switch (tag) {
              case arrayBufferTag:
                return cloneArrayBuffer(object);
              case boolTag:
              case dateTag:
                return new Ctor(+object);
              case dataViewTag:
                return cloneDataView(object, isDeep);
              case float32Tag:
              case float64Tag:
              case int8Tag:
              case int16Tag:
              case int32Tag:
              case uint8Tag:
              case uint8ClampedTag:
              case uint16Tag:
              case uint32Tag:
                return cloneTypedArray(object, isDeep);
              case mapTag:
                return new Ctor();
              case numberTag:
              case stringTag:
                return new Ctor(object);
              case regexpTag:
                return cloneRegExp(object);
              case setTag:
                return new Ctor();
              case symbolTag:
                return cloneSymbol(object);
            }
          }
          function insertWrapDetails(source, details) {
            var length = details.length;
            if (!length) {
              return source;
            }
            var lastIndex = length - 1;
            details[lastIndex] = (length > 1 ? '& ' : '') + details[lastIndex];
            details = details.join(length > 2 ? ', ' : ' ');
            return source.replace(reWrapComment, '{\n/* [wrapped with ' + details + '] */\n');
          }
          function isFlattenable(value) {
            return isArray(value) || isArguments(value) || !!(spreadableSymbol && value && value[spreadableSymbol]);
          }
          function isIndex(value, length) {
            var type = typeof value;
            length = length == null ? MAX_SAFE_INTEGER : length;
            return (
              !!length &&
              (type == 'number' || (type != 'symbol' && reIsUint.test(value))) &&
              value > -1 &&
              value % 1 == 0 &&
              value < length
            );
          }
          function isIterateeCall(value, index, object) {
            if (!isObject2(object)) {
              return false;
            }
            var type = typeof index;
            if (
              type == 'number'
                ? isArrayLike(object) && isIndex(index, object.length)
                : type == 'string' && index in object
            ) {
              return eq(object[index], value);
            }
            return false;
          }
          function isKey(value, object) {
            if (isArray(value)) {
              return false;
            }
            var type = typeof value;
            if (type == 'number' || type == 'symbol' || type == 'boolean' || value == null || isSymbol(value)) {
              return true;
            }
            return (
              reIsPlainProp.test(value) || !reIsDeepProp.test(value) || (object != null && value in Object2(object))
            );
          }
          function isKeyable(value) {
            var type = typeof value;
            return type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean'
              ? value !== '__proto__'
              : value === null;
          }
          function isLaziable(func) {
            var funcName = getFuncName(func),
              other = lodash[funcName];
            if (typeof other != 'function' || !(funcName in LazyWrapper.prototype)) {
              return false;
            }
            if (func === other) {
              return true;
            }
            var data = getData(other);
            return !!data && func === data[0];
          }
          function isMasked(func) {
            return !!maskSrcKey && maskSrcKey in func;
          }
          var isMaskable = coreJsData ? isFunction2 : stubFalse;
          function isPrototype(value) {
            var Ctor = value && value.constructor,
              proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;
            return value === proto;
          }
          function isStrictComparable(value) {
            return value === value && !isObject2(value);
          }
          function matchesStrictComparable(key, srcValue) {
            return function (object) {
              if (object == null) {
                return false;
              }
              return object[key] === srcValue && (srcValue !== undefined2 || key in Object2(object));
            };
          }
          function memoizeCapped(func) {
            var result2 = memoize2(func, function (key) {
              if (cache.size === MAX_MEMOIZE_SIZE) {
                cache.clear();
              }
              return key;
            });
            var cache = result2.cache;
            return result2;
          }
          function mergeData(data, source) {
            var bitmask = data[1],
              srcBitmask = source[1],
              newBitmask = bitmask | srcBitmask,
              isCommon = newBitmask < (WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG | WRAP_ARY_FLAG);
            var isCombo =
              (srcBitmask == WRAP_ARY_FLAG && bitmask == WRAP_CURRY_FLAG) ||
              (srcBitmask == WRAP_ARY_FLAG && bitmask == WRAP_REARG_FLAG && data[7].length <= source[8]) ||
              (srcBitmask == (WRAP_ARY_FLAG | WRAP_REARG_FLAG) &&
                source[7].length <= source[8] &&
                bitmask == WRAP_CURRY_FLAG);
            if (!(isCommon || isCombo)) {
              return data;
            }
            if (srcBitmask & WRAP_BIND_FLAG) {
              data[2] = source[2];
              newBitmask |= bitmask & WRAP_BIND_FLAG ? 0 : WRAP_CURRY_BOUND_FLAG;
            }
            var value = source[3];
            if (value) {
              var partials = data[3];
              data[3] = partials ? composeArgs(partials, value, source[4]) : value;
              data[4] = partials ? replaceHolders(data[3], PLACEHOLDER) : source[4];
            }
            value = source[5];
            if (value) {
              partials = data[5];
              data[5] = partials ? composeArgsRight(partials, value, source[6]) : value;
              data[6] = partials ? replaceHolders(data[5], PLACEHOLDER) : source[6];
            }
            value = source[7];
            if (value) {
              data[7] = value;
            }
            if (srcBitmask & WRAP_ARY_FLAG) {
              data[8] = data[8] == null ? source[8] : nativeMin(data[8], source[8]);
            }
            if (data[9] == null) {
              data[9] = source[9];
            }
            data[0] = source[0];
            data[1] = newBitmask;
            return data;
          }
          function nativeKeysIn(object) {
            var result2 = [];
            if (object != null) {
              for (var key in Object2(object)) {
                result2.push(key);
              }
            }
            return result2;
          }
          function objectToString(value) {
            return nativeObjectToString.call(value);
          }
          function overRest(func, start, transform2) {
            start = nativeMax(start === undefined2 ? func.length - 1 : start, 0);
            return function () {
              var args = arguments,
                index = -1,
                length = nativeMax(args.length - start, 0),
                array = Array2(length);
              while (++index < length) {
                array[index] = args[start + index];
              }
              index = -1;
              var otherArgs = Array2(start + 1);
              while (++index < start) {
                otherArgs[index] = args[index];
              }
              otherArgs[start] = transform2(array);
              return apply(func, this, otherArgs);
            };
          }
          function parent(object, path) {
            return path.length < 2 ? object : baseGet(object, baseSlice(path, 0, -1));
          }
          function reorder(array, indexes) {
            var arrLength = array.length,
              length = nativeMin(indexes.length, arrLength),
              oldArray = copyArray(array);
            while (length--) {
              var index = indexes[length];
              array[length] = isIndex(index, arrLength) ? oldArray[index] : undefined2;
            }
            return array;
          }
          function safeGet(object, key) {
            if (key === 'constructor' && typeof object[key] === 'function') {
              return;
            }
            if (key == '__proto__') {
              return;
            }
            return object[key];
          }
          var setData = shortOut(baseSetData);
          var setTimeout2 =
            ctxSetTimeout ||
            function (func, wait) {
              return root.setTimeout(func, wait);
            };
          var setToString = shortOut(baseSetToString);
          function setWrapToString(wrapper, reference, bitmask) {
            var source = reference + '';
            return setToString(wrapper, insertWrapDetails(source, updateWrapDetails(getWrapDetails(source), bitmask)));
          }
          function shortOut(func) {
            var count = 0,
              lastCalled = 0;
            return function () {
              var stamp = nativeNow(),
                remaining = HOT_SPAN - (stamp - lastCalled);
              lastCalled = stamp;
              if (remaining > 0) {
                if (++count >= HOT_COUNT) {
                  return arguments[0];
                }
              } else {
                count = 0;
              }
              return func.apply(undefined2, arguments);
            };
          }
          function shuffleSelf(array, size2) {
            var index = -1,
              length = array.length,
              lastIndex = length - 1;
            size2 = size2 === undefined2 ? length : size2;
            while (++index < size2) {
              var rand = baseRandom(index, lastIndex),
                value = array[rand];
              array[rand] = array[index];
              array[index] = value;
            }
            array.length = size2;
            return array;
          }
          var stringToPath = memoizeCapped(function (string) {
            var result2 = [];
            if (string.charCodeAt(0) === 46) {
              result2.push('');
            }
            string.replace(rePropName, function (match2, number, quote, subString) {
              result2.push(quote ? subString.replace(reEscapeChar, '$1') : number || match2);
            });
            return result2;
          });
          function toKey(value) {
            if (typeof value == 'string' || isSymbol(value)) {
              return value;
            }
            var result2 = value + '';
            return result2 == '0' && 1 / value == -INFINITY ? '-0' : result2;
          }
          function toSource(func) {
            if (func != null) {
              try {
                return funcToString.call(func);
              } catch (e) {}
              try {
                return func + '';
              } catch (e) {}
            }
            return '';
          }
          function updateWrapDetails(details, bitmask) {
            arrayEach(wrapFlags, function (pair) {
              var value = '_.' + pair[0];
              if (bitmask & pair[1] && !arrayIncludes(details, value)) {
                details.push(value);
              }
            });
            return details.sort();
          }
          function wrapperClone(wrapper) {
            if (wrapper instanceof LazyWrapper) {
              return wrapper.clone();
            }
            var result2 = new LodashWrapper(wrapper.__wrapped__, wrapper.__chain__);
            result2.__actions__ = copyArray(wrapper.__actions__);
            result2.__index__ = wrapper.__index__;
            result2.__values__ = wrapper.__values__;
            return result2;
          }
          function chunk(array, size2, guard) {
            if (guard ? isIterateeCall(array, size2, guard) : size2 === undefined2) {
              size2 = 1;
            } else {
              size2 = nativeMax(toInteger(size2), 0);
            }
            var length = array == null ? 0 : array.length;
            if (!length || size2 < 1) {
              return [];
            }
            var index = 0,
              resIndex = 0,
              result2 = Array2(nativeCeil(length / size2));
            while (index < length) {
              result2[resIndex++] = baseSlice(array, index, (index += size2));
            }
            return result2;
          }
          function compact(array) {
            var index = -1,
              length = array == null ? 0 : array.length,
              resIndex = 0,
              result2 = [];
            while (++index < length) {
              var value = array[index];
              if (value) {
                result2[resIndex++] = value;
              }
            }
            return result2;
          }
          function concat() {
            var length = arguments.length;
            if (!length) {
              return [];
            }
            var args = Array2(length - 1),
              array = arguments[0],
              index = length;
            while (index--) {
              args[index - 1] = arguments[index];
            }
            return arrayPush(isArray(array) ? copyArray(array) : [array], baseFlatten(args, 1));
          }
          var difference = baseRest(function (array, values2) {
            return isArrayLikeObject(array)
              ? baseDifference(array, baseFlatten(values2, 1, isArrayLikeObject, true))
              : [];
          });
          var differenceBy = baseRest(function (array, values2) {
            var iteratee2 = last(values2);
            if (isArrayLikeObject(iteratee2)) {
              iteratee2 = undefined2;
            }
            return isArrayLikeObject(array)
              ? baseDifference(array, baseFlatten(values2, 1, isArrayLikeObject, true), getIteratee(iteratee2, 2))
              : [];
          });
          var differenceWith = baseRest(function (array, values2) {
            var comparator = last(values2);
            if (isArrayLikeObject(comparator)) {
              comparator = undefined2;
            }
            return isArrayLikeObject(array)
              ? baseDifference(array, baseFlatten(values2, 1, isArrayLikeObject, true), undefined2, comparator)
              : [];
          });
          function drop(array, n, guard) {
            var length = array == null ? 0 : array.length;
            if (!length) {
              return [];
            }
            n = guard || n === undefined2 ? 1 : toInteger(n);
            return baseSlice(array, n < 0 ? 0 : n, length);
          }
          function dropRight(array, n, guard) {
            var length = array == null ? 0 : array.length;
            if (!length) {
              return [];
            }
            n = guard || n === undefined2 ? 1 : toInteger(n);
            n = length - n;
            return baseSlice(array, 0, n < 0 ? 0 : n);
          }
          function dropRightWhile(array, predicate) {
            return array && array.length ? baseWhile(array, getIteratee(predicate, 3), true, true) : [];
          }
          function dropWhile(array, predicate) {
            return array && array.length ? baseWhile(array, getIteratee(predicate, 3), true) : [];
          }
          function fill(array, value, start, end) {
            var length = array == null ? 0 : array.length;
            if (!length) {
              return [];
            }
            if (start && typeof start != 'number' && isIterateeCall(array, value, start)) {
              start = 0;
              end = length;
            }
            return baseFill(array, value, start, end);
          }
          function findIndex(array, predicate, fromIndex) {
            var length = array == null ? 0 : array.length;
            if (!length) {
              return -1;
            }
            var index = fromIndex == null ? 0 : toInteger(fromIndex);
            if (index < 0) {
              index = nativeMax(length + index, 0);
            }
            return baseFindIndex(array, getIteratee(predicate, 3), index);
          }
          function findLastIndex(array, predicate, fromIndex) {
            var length = array == null ? 0 : array.length;
            if (!length) {
              return -1;
            }
            var index = length - 1;
            if (fromIndex !== undefined2) {
              index = toInteger(fromIndex);
              index = fromIndex < 0 ? nativeMax(length + index, 0) : nativeMin(index, length - 1);
            }
            return baseFindIndex(array, getIteratee(predicate, 3), index, true);
          }
          function flatten(array) {
            var length = array == null ? 0 : array.length;
            return length ? baseFlatten(array, 1) : [];
          }
          function flattenDeep(array) {
            var length = array == null ? 0 : array.length;
            return length ? baseFlatten(array, INFINITY) : [];
          }
          function flattenDepth(array, depth) {
            var length = array == null ? 0 : array.length;
            if (!length) {
              return [];
            }
            depth = depth === undefined2 ? 1 : toInteger(depth);
            return baseFlatten(array, depth);
          }
          function fromPairs(pairs) {
            var index = -1,
              length = pairs == null ? 0 : pairs.length,
              result2 = {};
            while (++index < length) {
              var pair = pairs[index];
              result2[pair[0]] = pair[1];
            }
            return result2;
          }
          function head(array) {
            return array && array.length ? array[0] : undefined2;
          }
          function indexOf(array, value, fromIndex) {
            var length = array == null ? 0 : array.length;
            if (!length) {
              return -1;
            }
            var index = fromIndex == null ? 0 : toInteger(fromIndex);
            if (index < 0) {
              index = nativeMax(length + index, 0);
            }
            return baseIndexOf(array, value, index);
          }
          function initial(array) {
            var length = array == null ? 0 : array.length;
            return length ? baseSlice(array, 0, -1) : [];
          }
          var intersection = baseRest(function (arrays) {
            var mapped = arrayMap(arrays, castArrayLikeObject);
            return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped) : [];
          });
          var intersectionBy = baseRest(function (arrays) {
            var iteratee2 = last(arrays),
              mapped = arrayMap(arrays, castArrayLikeObject);
            if (iteratee2 === last(mapped)) {
              iteratee2 = undefined2;
            } else {
              mapped.pop();
            }
            return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped, getIteratee(iteratee2, 2)) : [];
          });
          var intersectionWith = baseRest(function (arrays) {
            var comparator = last(arrays),
              mapped = arrayMap(arrays, castArrayLikeObject);
            comparator = typeof comparator == 'function' ? comparator : undefined2;
            if (comparator) {
              mapped.pop();
            }
            return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped, undefined2, comparator) : [];
          });
          function join(array, separator) {
            return array == null ? '' : nativeJoin.call(array, separator);
          }
          function last(array) {
            var length = array == null ? 0 : array.length;
            return length ? array[length - 1] : undefined2;
          }
          function lastIndexOf(array, value, fromIndex) {
            var length = array == null ? 0 : array.length;
            if (!length) {
              return -1;
            }
            var index = length;
            if (fromIndex !== undefined2) {
              index = toInteger(fromIndex);
              index = index < 0 ? nativeMax(length + index, 0) : nativeMin(index, length - 1);
            }
            return value === value
              ? strictLastIndexOf(array, value, index)
              : baseFindIndex(array, baseIsNaN, index, true);
          }
          function nth(array, n) {
            return array && array.length ? baseNth(array, toInteger(n)) : undefined2;
          }
          var pull = baseRest(pullAll);
          function pullAll(array, values2) {
            return array && array.length && values2 && values2.length ? basePullAll(array, values2) : array;
          }
          function pullAllBy(array, values2, iteratee2) {
            return array && array.length && values2 && values2.length
              ? basePullAll(array, values2, getIteratee(iteratee2, 2))
              : array;
          }
          function pullAllWith(array, values2, comparator) {
            return array && array.length && values2 && values2.length
              ? basePullAll(array, values2, undefined2, comparator)
              : array;
          }
          var pullAt = flatRest(function (array, indexes) {
            var length = array == null ? 0 : array.length,
              result2 = baseAt(array, indexes);
            basePullAt(
              array,
              arrayMap(indexes, function (index) {
                return isIndex(index, length) ? +index : index;
              }).sort(compareAscending)
            );
            return result2;
          });
          function remove2(array, predicate) {
            var result2 = [];
            if (!(array && array.length)) {
              return result2;
            }
            var index = -1,
              indexes = [],
              length = array.length;
            predicate = getIteratee(predicate, 3);
            while (++index < length) {
              var value = array[index];
              if (predicate(value, index, array)) {
                result2.push(value);
                indexes.push(index);
              }
            }
            basePullAt(array, indexes);
            return result2;
          }
          function reverse(array) {
            return array == null ? array : nativeReverse.call(array);
          }
          function slice(array, start, end) {
            var length = array == null ? 0 : array.length;
            if (!length) {
              return [];
            }
            if (end && typeof end != 'number' && isIterateeCall(array, start, end)) {
              start = 0;
              end = length;
            } else {
              start = start == null ? 0 : toInteger(start);
              end = end === undefined2 ? length : toInteger(end);
            }
            return baseSlice(array, start, end);
          }
          function sortedIndex(array, value) {
            return baseSortedIndex(array, value);
          }
          function sortedIndexBy(array, value, iteratee2) {
            return baseSortedIndexBy(array, value, getIteratee(iteratee2, 2));
          }
          function sortedIndexOf(array, value) {
            var length = array == null ? 0 : array.length;
            if (length) {
              var index = baseSortedIndex(array, value);
              if (index < length && eq(array[index], value)) {
                return index;
              }
            }
            return -1;
          }
          function sortedLastIndex(array, value) {
            return baseSortedIndex(array, value, true);
          }
          function sortedLastIndexBy(array, value, iteratee2) {
            return baseSortedIndexBy(array, value, getIteratee(iteratee2, 2), true);
          }
          function sortedLastIndexOf(array, value) {
            var length = array == null ? 0 : array.length;
            if (length) {
              var index = baseSortedIndex(array, value, true) - 1;
              if (eq(array[index], value)) {
                return index;
              }
            }
            return -1;
          }
          function sortedUniq(array) {
            return array && array.length ? baseSortedUniq(array) : [];
          }
          function sortedUniqBy(array, iteratee2) {
            return array && array.length ? baseSortedUniq(array, getIteratee(iteratee2, 2)) : [];
          }
          function tail(array) {
            var length = array == null ? 0 : array.length;
            return length ? baseSlice(array, 1, length) : [];
          }
          function take(array, n, guard) {
            if (!(array && array.length)) {
              return [];
            }
            n = guard || n === undefined2 ? 1 : toInteger(n);
            return baseSlice(array, 0, n < 0 ? 0 : n);
          }
          function takeRight(array, n, guard) {
            var length = array == null ? 0 : array.length;
            if (!length) {
              return [];
            }
            n = guard || n === undefined2 ? 1 : toInteger(n);
            n = length - n;
            return baseSlice(array, n < 0 ? 0 : n, length);
          }
          function takeRightWhile(array, predicate) {
            return array && array.length ? baseWhile(array, getIteratee(predicate, 3), false, true) : [];
          }
          function takeWhile(array, predicate) {
            return array && array.length ? baseWhile(array, getIteratee(predicate, 3)) : [];
          }
          var union = baseRest(function (arrays) {
            return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true));
          });
          var unionBy = baseRest(function (arrays) {
            var iteratee2 = last(arrays);
            if (isArrayLikeObject(iteratee2)) {
              iteratee2 = undefined2;
            }
            return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), getIteratee(iteratee2, 2));
          });
          var unionWith = baseRest(function (arrays) {
            var comparator = last(arrays);
            comparator = typeof comparator == 'function' ? comparator : undefined2;
            return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), undefined2, comparator);
          });
          function uniq(array) {
            return array && array.length ? baseUniq(array) : [];
          }
          function uniqBy(array, iteratee2) {
            return array && array.length ? baseUniq(array, getIteratee(iteratee2, 2)) : [];
          }
          function uniqWith(array, comparator) {
            comparator = typeof comparator == 'function' ? comparator : undefined2;
            return array && array.length ? baseUniq(array, undefined2, comparator) : [];
          }
          function unzip(array) {
            if (!(array && array.length)) {
              return [];
            }
            var length = 0;
            array = arrayFilter(array, function (group) {
              if (isArrayLikeObject(group)) {
                length = nativeMax(group.length, length);
                return true;
              }
            });
            return baseTimes(length, function (index) {
              return arrayMap(array, baseProperty(index));
            });
          }
          function unzipWith(array, iteratee2) {
            if (!(array && array.length)) {
              return [];
            }
            var result2 = unzip(array);
            if (iteratee2 == null) {
              return result2;
            }
            return arrayMap(result2, function (group) {
              return apply(iteratee2, undefined2, group);
            });
          }
          var without = baseRest(function (array, values2) {
            return isArrayLikeObject(array) ? baseDifference(array, values2) : [];
          });
          var xor = baseRest(function (arrays) {
            return baseXor(arrayFilter(arrays, isArrayLikeObject));
          });
          var xorBy = baseRest(function (arrays) {
            var iteratee2 = last(arrays);
            if (isArrayLikeObject(iteratee2)) {
              iteratee2 = undefined2;
            }
            return baseXor(arrayFilter(arrays, isArrayLikeObject), getIteratee(iteratee2, 2));
          });
          var xorWith = baseRest(function (arrays) {
            var comparator = last(arrays);
            comparator = typeof comparator == 'function' ? comparator : undefined2;
            return baseXor(arrayFilter(arrays, isArrayLikeObject), undefined2, comparator);
          });
          var zip = baseRest(unzip);
          function zipObject(props, values2) {
            return baseZipObject(props || [], values2 || [], assignValue);
          }
          function zipObjectDeep(props, values2) {
            return baseZipObject(props || [], values2 || [], baseSet);
          }
          var zipWith = baseRest(function (arrays) {
            var length = arrays.length,
              iteratee2 = length > 1 ? arrays[length - 1] : undefined2;
            iteratee2 = typeof iteratee2 == 'function' ? (arrays.pop(), iteratee2) : undefined2;
            return unzipWith(arrays, iteratee2);
          });
          function chain(value) {
            var result2 = lodash(value);
            result2.__chain__ = true;
            return result2;
          }
          function tap(value, interceptor) {
            interceptor(value);
            return value;
          }
          function thru(value, interceptor) {
            return interceptor(value);
          }
          var wrapperAt = flatRest(function (paths) {
            var length = paths.length,
              start = length ? paths[0] : 0,
              value = this.__wrapped__,
              interceptor = function (object) {
                return baseAt(object, paths);
              };
            if (length > 1 || this.__actions__.length || !(value instanceof LazyWrapper) || !isIndex(start)) {
              return this.thru(interceptor);
            }
            value = value.slice(start, +start + (length ? 1 : 0));
            value.__actions__.push({
              func: thru,
              args: [interceptor],
              thisArg: undefined2,
            });
            return new LodashWrapper(value, this.__chain__).thru(function (array) {
              if (length && !array.length) {
                array.push(undefined2);
              }
              return array;
            });
          });
          function wrapperChain() {
            return chain(this);
          }
          function wrapperCommit() {
            return new LodashWrapper(this.value(), this.__chain__);
          }
          function wrapperNext() {
            if (this.__values__ === undefined2) {
              this.__values__ = toArray(this.value());
            }
            var done = this.__index__ >= this.__values__.length,
              value = done ? undefined2 : this.__values__[this.__index__++];
            return { done: done, value: value };
          }
          function wrapperToIterator() {
            return this;
          }
          function wrapperPlant(value) {
            var result2,
              parent2 = this;
            while (parent2 instanceof baseLodash) {
              var clone2 = wrapperClone(parent2);
              clone2.__index__ = 0;
              clone2.__values__ = undefined2;
              if (result2) {
                previous.__wrapped__ = clone2;
              } else {
                result2 = clone2;
              }
              var previous = clone2;
              parent2 = parent2.__wrapped__;
            }
            previous.__wrapped__ = value;
            return result2;
          }
          function wrapperReverse() {
            var value = this.__wrapped__;
            if (value instanceof LazyWrapper) {
              var wrapped = value;
              if (this.__actions__.length) {
                wrapped = new LazyWrapper(this);
              }
              wrapped = wrapped.reverse();
              wrapped.__actions__.push({
                func: thru,
                args: [reverse],
                thisArg: undefined2,
              });
              return new LodashWrapper(wrapped, this.__chain__);
            }
            return this.thru(reverse);
          }
          function wrapperValue() {
            return baseWrapperValue(this.__wrapped__, this.__actions__);
          }
          var countBy = createAggregator(function (result2, value, key) {
            if (hasOwnProperty.call(result2, key)) {
              ++result2[key];
            } else {
              baseAssignValue(result2, key, 1);
            }
          });
          function every(collection, predicate, guard) {
            var func = isArray(collection) ? arrayEvery : baseEvery;
            if (guard && isIterateeCall(collection, predicate, guard)) {
              predicate = undefined2;
            }
            return func(collection, getIteratee(predicate, 3));
          }
          function filter(collection, predicate) {
            var func = isArray(collection) ? arrayFilter : baseFilter;
            return func(collection, getIteratee(predicate, 3));
          }
          var find = createFind(findIndex);
          var findLast = createFind(findLastIndex);
          function flatMap(collection, iteratee2) {
            return baseFlatten(map(collection, iteratee2), 1);
          }
          function flatMapDeep(collection, iteratee2) {
            return baseFlatten(map(collection, iteratee2), INFINITY);
          }
          function flatMapDepth(collection, iteratee2, depth) {
            depth = depth === undefined2 ? 1 : toInteger(depth);
            return baseFlatten(map(collection, iteratee2), depth);
          }
          function forEach(collection, iteratee2) {
            var func = isArray(collection) ? arrayEach : baseEach;
            return func(collection, getIteratee(iteratee2, 3));
          }
          function forEachRight(collection, iteratee2) {
            var func = isArray(collection) ? arrayEachRight : baseEachRight;
            return func(collection, getIteratee(iteratee2, 3));
          }
          var groupBy = createAggregator(function (result2, value, key) {
            if (hasOwnProperty.call(result2, key)) {
              result2[key].push(value);
            } else {
              baseAssignValue(result2, key, [value]);
            }
          });
          function includes(collection, value, fromIndex, guard) {
            collection = isArrayLike(collection) ? collection : values(collection);
            fromIndex = fromIndex && !guard ? toInteger(fromIndex) : 0;
            var length = collection.length;
            if (fromIndex < 0) {
              fromIndex = nativeMax(length + fromIndex, 0);
            }
            return isString2(collection)
              ? fromIndex <= length && collection.indexOf(value, fromIndex) > -1
              : !!length && baseIndexOf(collection, value, fromIndex) > -1;
          }
          var invokeMap = baseRest(function (collection, path, args) {
            var index = -1,
              isFunc = typeof path == 'function',
              result2 = isArrayLike(collection) ? Array2(collection.length) : [];
            baseEach(collection, function (value) {
              result2[++index] = isFunc ? apply(path, value, args) : baseInvoke(value, path, args);
            });
            return result2;
          });
          var keyBy = createAggregator(function (result2, value, key) {
            baseAssignValue(result2, key, value);
          });
          function map(collection, iteratee2) {
            var func = isArray(collection) ? arrayMap : baseMap;
            return func(collection, getIteratee(iteratee2, 3));
          }
          function orderBy(collection, iteratees, orders, guard) {
            if (collection == null) {
              return [];
            }
            if (!isArray(iteratees)) {
              iteratees = iteratees == null ? [] : [iteratees];
            }
            orders = guard ? undefined2 : orders;
            if (!isArray(orders)) {
              orders = orders == null ? [] : [orders];
            }
            return baseOrderBy(collection, iteratees, orders);
          }
          var partition = createAggregator(
            function (result2, value, key) {
              result2[key ? 0 : 1].push(value);
            },
            function () {
              return [[], []];
            }
          );
          function reduce(collection, iteratee2, accumulator) {
            var func = isArray(collection) ? arrayReduce : baseReduce,
              initAccum = arguments.length < 3;
            return func(collection, getIteratee(iteratee2, 4), accumulator, initAccum, baseEach);
          }
          function reduceRight(collection, iteratee2, accumulator) {
            var func = isArray(collection) ? arrayReduceRight : baseReduce,
              initAccum = arguments.length < 3;
            return func(collection, getIteratee(iteratee2, 4), accumulator, initAccum, baseEachRight);
          }
          function reject(collection, predicate) {
            var func = isArray(collection) ? arrayFilter : baseFilter;
            return func(collection, negate(getIteratee(predicate, 3)));
          }
          function sample(collection) {
            var func = isArray(collection) ? arraySample : baseSample;
            return func(collection);
          }
          function sampleSize(collection, n, guard) {
            if (guard ? isIterateeCall(collection, n, guard) : n === undefined2) {
              n = 1;
            } else {
              n = toInteger(n);
            }
            var func = isArray(collection) ? arraySampleSize : baseSampleSize;
            return func(collection, n);
          }
          function shuffle(collection) {
            var func = isArray(collection) ? arrayShuffle : baseShuffle;
            return func(collection);
          }
          function size(collection) {
            if (collection == null) {
              return 0;
            }
            if (isArrayLike(collection)) {
              return isString2(collection) ? stringSize(collection) : collection.length;
            }
            var tag = getTag2(collection);
            if (tag == mapTag || tag == setTag) {
              return collection.size;
            }
            return baseKeys(collection).length;
          }
          function some(collection, predicate, guard) {
            var func = isArray(collection) ? arraySome : baseSome;
            if (guard && isIterateeCall(collection, predicate, guard)) {
              predicate = undefined2;
            }
            return func(collection, getIteratee(predicate, 3));
          }
          var sortBy = baseRest(function (collection, iteratees) {
            if (collection == null) {
              return [];
            }
            var length = iteratees.length;
            if (length > 1 && isIterateeCall(collection, iteratees[0], iteratees[1])) {
              iteratees = [];
            } else if (length > 2 && isIterateeCall(iteratees[0], iteratees[1], iteratees[2])) {
              iteratees = [iteratees[0]];
            }
            return baseOrderBy(collection, baseFlatten(iteratees, 1), []);
          });
          var now =
            ctxNow ||
            function () {
              return root.Date.now();
            };
          function after(n, func) {
            if (typeof func != 'function') {
              throw new TypeError2(FUNC_ERROR_TEXT);
            }
            n = toInteger(n);
            return function () {
              if (--n < 1) {
                return func.apply(this, arguments);
              }
            };
          }
          function ary(func, n, guard) {
            n = guard ? undefined2 : n;
            n = func && n == null ? func.length : n;
            return createWrap(func, WRAP_ARY_FLAG, undefined2, undefined2, undefined2, undefined2, n);
          }
          function before(n, func) {
            var result2;
            if (typeof func != 'function') {
              throw new TypeError2(FUNC_ERROR_TEXT);
            }
            n = toInteger(n);
            return function () {
              if (--n > 0) {
                result2 = func.apply(this, arguments);
              }
              if (n <= 1) {
                func = undefined2;
              }
              return result2;
            };
          }
          var bind = baseRest(function (func, thisArg, partials) {
            var bitmask = WRAP_BIND_FLAG;
            if (partials.length) {
              var holders = replaceHolders(partials, getHolder(bind));
              bitmask |= WRAP_PARTIAL_FLAG;
            }
            return createWrap(func, bitmask, thisArg, partials, holders);
          });
          var bindKey = baseRest(function (object, key, partials) {
            var bitmask = WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG;
            if (partials.length) {
              var holders = replaceHolders(partials, getHolder(bindKey));
              bitmask |= WRAP_PARTIAL_FLAG;
            }
            return createWrap(key, bitmask, object, partials, holders);
          });
          function curry(func, arity, guard) {
            arity = guard ? undefined2 : arity;
            var result2 = createWrap(
              func,
              WRAP_CURRY_FLAG,
              undefined2,
              undefined2,
              undefined2,
              undefined2,
              undefined2,
              arity
            );
            result2.placeholder = curry.placeholder;
            return result2;
          }
          function curryRight(func, arity, guard) {
            arity = guard ? undefined2 : arity;
            var result2 = createWrap(
              func,
              WRAP_CURRY_RIGHT_FLAG,
              undefined2,
              undefined2,
              undefined2,
              undefined2,
              undefined2,
              arity
            );
            result2.placeholder = curryRight.placeholder;
            return result2;
          }
          function debounce2(func, wait, options) {
            var lastArgs,
              lastThis,
              maxWait,
              result2,
              timerId,
              lastCallTime,
              lastInvokeTime = 0,
              leading = false,
              maxing = false,
              trailing = true;
            if (typeof func != 'function') {
              throw new TypeError2(FUNC_ERROR_TEXT);
            }
            wait = toNumber(wait) || 0;
            if (isObject2(options)) {
              leading = !!options.leading;
              maxing = 'maxWait' in options;
              maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
              trailing = 'trailing' in options ? !!options.trailing : trailing;
            }
            function invokeFunc(time) {
              var args = lastArgs,
                thisArg = lastThis;
              lastArgs = lastThis = undefined2;
              lastInvokeTime = time;
              result2 = func.apply(thisArg, args);
              return result2;
            }
            function leadingEdge(time) {
              lastInvokeTime = time;
              timerId = setTimeout2(timerExpired, wait);
              return leading ? invokeFunc(time) : result2;
            }
            function remainingWait(time) {
              var timeSinceLastCall = time - lastCallTime,
                timeSinceLastInvoke = time - lastInvokeTime,
                timeWaiting = wait - timeSinceLastCall;
              return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
            }
            function shouldInvoke(time) {
              var timeSinceLastCall = time - lastCallTime,
                timeSinceLastInvoke = time - lastInvokeTime;
              return (
                lastCallTime === undefined2 ||
                timeSinceLastCall >= wait ||
                timeSinceLastCall < 0 ||
                (maxing && timeSinceLastInvoke >= maxWait)
              );
            }
            function timerExpired() {
              var time = now();
              if (shouldInvoke(time)) {
                return trailingEdge(time);
              }
              timerId = setTimeout2(timerExpired, remainingWait(time));
            }
            function trailingEdge(time) {
              timerId = undefined2;
              if (trailing && lastArgs) {
                return invokeFunc(time);
              }
              lastArgs = lastThis = undefined2;
              return result2;
            }
            function cancel() {
              if (timerId !== undefined2) {
                clearTimeout2(timerId);
              }
              lastInvokeTime = 0;
              lastArgs = lastCallTime = lastThis = timerId = undefined2;
            }
            function flush() {
              return timerId === undefined2 ? result2 : trailingEdge(now());
            }
            function debounced() {
              var time = now(),
                isInvoking = shouldInvoke(time);
              lastArgs = arguments;
              lastThis = this;
              lastCallTime = time;
              if (isInvoking) {
                if (timerId === undefined2) {
                  return leadingEdge(lastCallTime);
                }
                if (maxing) {
                  clearTimeout2(timerId);
                  timerId = setTimeout2(timerExpired, wait);
                  return invokeFunc(lastCallTime);
                }
              }
              if (timerId === undefined2) {
                timerId = setTimeout2(timerExpired, wait);
              }
              return result2;
            }
            debounced.cancel = cancel;
            debounced.flush = flush;
            return debounced;
          }
          var defer2 = baseRest(function (func, args) {
            return baseDelay(func, 1, args);
          });
          var delay = baseRest(function (func, wait, args) {
            return baseDelay(func, toNumber(wait) || 0, args);
          });
          function flip(func) {
            return createWrap(func, WRAP_FLIP_FLAG);
          }
          function memoize2(func, resolver) {
            if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
              throw new TypeError2(FUNC_ERROR_TEXT);
            }
            var memoized = function () {
              var args = arguments,
                key = resolver ? resolver.apply(this, args) : args[0],
                cache = memoized.cache;
              if (cache.has(key)) {
                return cache.get(key);
              }
              var result2 = func.apply(this, args);
              memoized.cache = cache.set(key, result2) || cache;
              return result2;
            };
            memoized.cache = new (memoize2.Cache || MapCache)();
            return memoized;
          }
          memoize2.Cache = MapCache;
          function negate(predicate) {
            if (typeof predicate != 'function') {
              throw new TypeError2(FUNC_ERROR_TEXT);
            }
            return function () {
              var args = arguments;
              switch (args.length) {
                case 0:
                  return !predicate.call(this);
                case 1:
                  return !predicate.call(this, args[0]);
                case 2:
                  return !predicate.call(this, args[0], args[1]);
                case 3:
                  return !predicate.call(this, args[0], args[1], args[2]);
              }
              return !predicate.apply(this, args);
            };
          }
          function once(func) {
            return before(2, func);
          }
          var overArgs = castRest(function (func, transforms) {
            transforms =
              transforms.length == 1 && isArray(transforms[0])
                ? arrayMap(transforms[0], baseUnary(getIteratee()))
                : arrayMap(baseFlatten(transforms, 1), baseUnary(getIteratee()));
            var funcsLength = transforms.length;
            return baseRest(function (args) {
              var index = -1,
                length = nativeMin(args.length, funcsLength);
              while (++index < length) {
                args[index] = transforms[index].call(this, args[index]);
              }
              return apply(func, this, args);
            });
          });
          var partial = baseRest(function (func, partials) {
            var holders = replaceHolders(partials, getHolder(partial));
            return createWrap(func, WRAP_PARTIAL_FLAG, undefined2, partials, holders);
          });
          var partialRight = baseRest(function (func, partials) {
            var holders = replaceHolders(partials, getHolder(partialRight));
            return createWrap(func, WRAP_PARTIAL_RIGHT_FLAG, undefined2, partials, holders);
          });
          var rearg = flatRest(function (func, indexes) {
            return createWrap(func, WRAP_REARG_FLAG, undefined2, undefined2, undefined2, indexes);
          });
          function rest(func, start) {
            if (typeof func != 'function') {
              throw new TypeError2(FUNC_ERROR_TEXT);
            }
            start = start === undefined2 ? start : toInteger(start);
            return baseRest(func, start);
          }
          function spread(func, start) {
            if (typeof func != 'function') {
              throw new TypeError2(FUNC_ERROR_TEXT);
            }
            start = start == null ? 0 : nativeMax(toInteger(start), 0);
            return baseRest(function (args) {
              var array = args[start],
                otherArgs = castSlice(args, 0, start);
              if (array) {
                arrayPush(otherArgs, array);
              }
              return apply(func, this, otherArgs);
            });
          }
          function throttle(func, wait, options) {
            var leading = true,
              trailing = true;
            if (typeof func != 'function') {
              throw new TypeError2(FUNC_ERROR_TEXT);
            }
            if (isObject2(options)) {
              leading = 'leading' in options ? !!options.leading : leading;
              trailing = 'trailing' in options ? !!options.trailing : trailing;
            }
            return debounce2(func, wait, {
              leading: leading,
              maxWait: wait,
              trailing: trailing,
            });
          }
          function unary(func) {
            return ary(func, 1);
          }
          function wrap(value, wrapper) {
            return partial(castFunction(wrapper), value);
          }
          function castArray() {
            if (!arguments.length) {
              return [];
            }
            var value = arguments[0];
            return isArray(value) ? value : [value];
          }
          function clone(value) {
            return baseClone(value, CLONE_SYMBOLS_FLAG);
          }
          function cloneWith(value, customizer) {
            customizer = typeof customizer == 'function' ? customizer : undefined2;
            return baseClone(value, CLONE_SYMBOLS_FLAG, customizer);
          }
          function cloneDeep(value) {
            return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
          }
          function cloneDeepWith(value, customizer) {
            customizer = typeof customizer == 'function' ? customizer : undefined2;
            return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG, customizer);
          }
          function conformsTo(object, source) {
            return source == null || baseConformsTo(object, source, keys(source));
          }
          function eq(value, other) {
            return value === other || (value !== value && other !== other);
          }
          var gt = createRelationalOperation(baseGt);
          var gte = createRelationalOperation(function (value, other) {
            return value >= other;
          });
          var isArguments = baseIsArguments(
            /* @__PURE__ */ (function () {
              return arguments;
            })()
          )
            ? baseIsArguments
            : function (value) {
                return (
                  isObjectLike(value) &&
                  hasOwnProperty.call(value, 'callee') &&
                  !propertyIsEnumerable.call(value, 'callee')
                );
              };
          var isArray = Array2.isArray;
          var isArrayBuffer = nodeIsArrayBuffer ? baseUnary(nodeIsArrayBuffer) : baseIsArrayBuffer;
          function isArrayLike(value) {
            return value != null && isLength(value.length) && !isFunction2(value);
          }
          function isArrayLikeObject(value) {
            return isObjectLike(value) && isArrayLike(value);
          }
          function isBoolean2(value) {
            return value === true || value === false || (isObjectLike(value) && baseGetTag(value) == boolTag);
          }
          var isBuffer = nativeIsBuffer || stubFalse;
          var isDate = nodeIsDate ? baseUnary(nodeIsDate) : baseIsDate;
          function isElement(value) {
            return isObjectLike(value) && value.nodeType === 1 && !isPlainObject(value);
          }
          function isEmpty(value) {
            if (value == null) {
              return true;
            }
            if (
              isArrayLike(value) &&
              (isArray(value) ||
                typeof value == 'string' ||
                typeof value.splice == 'function' ||
                isBuffer(value) ||
                isTypedArray(value) ||
                isArguments(value))
            ) {
              return !value.length;
            }
            var tag = getTag2(value);
            if (tag == mapTag || tag == setTag) {
              return !value.size;
            }
            if (isPrototype(value)) {
              return !baseKeys(value).length;
            }
            for (var key in value) {
              if (hasOwnProperty.call(value, key)) {
                return false;
              }
            }
            return true;
          }
          function isEqual(value, other) {
            return baseIsEqual(value, other);
          }
          function isEqualWith(value, other, customizer) {
            customizer = typeof customizer == 'function' ? customizer : undefined2;
            var result2 = customizer ? customizer(value, other) : undefined2;
            return result2 === undefined2 ? baseIsEqual(value, other, undefined2, customizer) : !!result2;
          }
          function isError(value) {
            if (!isObjectLike(value)) {
              return false;
            }
            var tag = baseGetTag(value);
            return (
              tag == errorTag ||
              tag == domExcTag ||
              (typeof value.message == 'string' && typeof value.name == 'string' && !isPlainObject(value))
            );
          }
          function isFinite(value) {
            return typeof value == 'number' && nativeIsFinite(value);
          }
          function isFunction2(value) {
            if (!isObject2(value)) {
              return false;
            }
            var tag = baseGetTag(value);
            return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
          }
          function isInteger(value) {
            return typeof value == 'number' && value == toInteger(value);
          }
          function isLength(value) {
            return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
          }
          function isObject2(value) {
            var type = typeof value;
            return value != null && (type == 'object' || type == 'function');
          }
          function isObjectLike(value) {
            return value != null && typeof value == 'object';
          }
          var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;
          function isMatch(object, source) {
            return object === source || baseIsMatch(object, source, getMatchData(source));
          }
          function isMatchWith(object, source, customizer) {
            customizer = typeof customizer == 'function' ? customizer : undefined2;
            return baseIsMatch(object, source, getMatchData(source), customizer);
          }
          function isNaN(value) {
            return isNumber(value) && value != +value;
          }
          function isNative(value) {
            if (isMaskable(value)) {
              throw new Error2(CORE_ERROR_TEXT);
            }
            return baseIsNative(value);
          }
          function isNull(value) {
            return value === null;
          }
          function isNil3(value) {
            return value == null;
          }
          function isNumber(value) {
            return typeof value == 'number' || (isObjectLike(value) && baseGetTag(value) == numberTag);
          }
          function isPlainObject(value) {
            if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
              return false;
            }
            var proto = getPrototype(value);
            if (proto === null) {
              return true;
            }
            var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
            return typeof Ctor == 'function' && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
          }
          var isRegExp = nodeIsRegExp ? baseUnary(nodeIsRegExp) : baseIsRegExp;
          function isSafeInteger(value) {
            return isInteger(value) && value >= -MAX_SAFE_INTEGER && value <= MAX_SAFE_INTEGER;
          }
          var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;
          function isString2(value) {
            return (
              typeof value == 'string' || (!isArray(value) && isObjectLike(value) && baseGetTag(value) == stringTag)
            );
          }
          function isSymbol(value) {
            return typeof value == 'symbol' || (isObjectLike(value) && baseGetTag(value) == symbolTag);
          }
          var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
          function isUndefined(value) {
            return value === undefined2;
          }
          function isWeakMap(value) {
            return isObjectLike(value) && getTag2(value) == weakMapTag;
          }
          function isWeakSet(value) {
            return isObjectLike(value) && baseGetTag(value) == weakSetTag;
          }
          var lt = createRelationalOperation(baseLt);
          var lte = createRelationalOperation(function (value, other) {
            return value <= other;
          });
          function toArray(value) {
            if (!value) {
              return [];
            }
            if (isArrayLike(value)) {
              return isString2(value) ? stringToArray(value) : copyArray(value);
            }
            if (symIterator && value[symIterator]) {
              return iteratorToArray(value[symIterator]());
            }
            var tag = getTag2(value),
              func = tag == mapTag ? mapToArray : tag == setTag ? setToArray : values;
            return func(value);
          }
          function toFinite(value) {
            if (!value) {
              return value === 0 ? value : 0;
            }
            value = toNumber(value);
            if (value === INFINITY || value === -INFINITY) {
              var sign = value < 0 ? -1 : 1;
              return sign * MAX_INTEGER;
            }
            return value === value ? value : 0;
          }
          function toInteger(value) {
            var result2 = toFinite(value),
              remainder = result2 % 1;
            return result2 === result2 ? (remainder ? result2 - remainder : result2) : 0;
          }
          function toLength(value) {
            return value ? baseClamp(toInteger(value), 0, MAX_ARRAY_LENGTH) : 0;
          }
          function toNumber(value) {
            if (typeof value == 'number') {
              return value;
            }
            if (isSymbol(value)) {
              return NAN;
            }
            if (isObject2(value)) {
              var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
              value = isObject2(other) ? other + '' : other;
            }
            if (typeof value != 'string') {
              return value === 0 ? value : +value;
            }
            value = baseTrim(value);
            var isBinary = reIsBinary.test(value);
            return isBinary || reIsOctal.test(value)
              ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
              : reIsBadHex.test(value)
                ? NAN
                : +value;
          }
          function toPlainObject(value) {
            return copyObject(value, keysIn(value));
          }
          function toSafeInteger(value) {
            return value ? baseClamp(toInteger(value), -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER) : value === 0 ? value : 0;
          }
          function toString(value) {
            return value == null ? '' : baseToString(value);
          }
          var assign = createAssigner(function (object, source) {
            if (isPrototype(source) || isArrayLike(source)) {
              copyObject(source, keys(source), object);
              return;
            }
            for (var key in source) {
              if (hasOwnProperty.call(source, key)) {
                assignValue(object, key, source[key]);
              }
            }
          });
          var assignIn = createAssigner(function (object, source) {
            copyObject(source, keysIn(source), object);
          });
          var assignInWith = createAssigner(function (object, source, srcIndex, customizer) {
            copyObject(source, keysIn(source), object, customizer);
          });
          var assignWith = createAssigner(function (object, source, srcIndex, customizer) {
            copyObject(source, keys(source), object, customizer);
          });
          var at = flatRest(baseAt);
          function create2(prototype, properties) {
            var result2 = baseCreate(prototype);
            return properties == null ? result2 : baseAssign(result2, properties);
          }
          var defaults2 = baseRest(function (object, sources) {
            object = Object2(object);
            var index = -1;
            var length = sources.length;
            var guard = length > 2 ? sources[2] : undefined2;
            if (guard && isIterateeCall(sources[0], sources[1], guard)) {
              length = 1;
            }
            while (++index < length) {
              var source = sources[index];
              var props = keysIn(source);
              var propsIndex = -1;
              var propsLength = props.length;
              while (++propsIndex < propsLength) {
                var key = props[propsIndex];
                var value = object[key];
                if (value === undefined2 || (eq(value, objectProto[key]) && !hasOwnProperty.call(object, key))) {
                  object[key] = source[key];
                }
              }
            }
            return object;
          });
          var defaultsDeep = baseRest(function (args) {
            args.push(undefined2, customDefaultsMerge);
            return apply(mergeWith, undefined2, args);
          });
          function findKey(object, predicate) {
            return baseFindKey(object, getIteratee(predicate, 3), baseForOwn);
          }
          function findLastKey(object, predicate) {
            return baseFindKey(object, getIteratee(predicate, 3), baseForOwnRight);
          }
          function forIn(object, iteratee2) {
            return object == null ? object : baseFor(object, getIteratee(iteratee2, 3), keysIn);
          }
          function forInRight(object, iteratee2) {
            return object == null ? object : baseForRight(object, getIteratee(iteratee2, 3), keysIn);
          }
          function forOwn(object, iteratee2) {
            return object && baseForOwn(object, getIteratee(iteratee2, 3));
          }
          function forOwnRight(object, iteratee2) {
            return object && baseForOwnRight(object, getIteratee(iteratee2, 3));
          }
          function functions(object) {
            return object == null ? [] : baseFunctions(object, keys(object));
          }
          function functionsIn(object) {
            return object == null ? [] : baseFunctions(object, keysIn(object));
          }
          function get2(object, path, defaultValue) {
            var result2 = object == null ? undefined2 : baseGet(object, path);
            return result2 === undefined2 ? defaultValue : result2;
          }
          function has2(object, path) {
            return object != null && hasPath(object, path, baseHas);
          }
          function hasIn(object, path) {
            return object != null && hasPath(object, path, baseHasIn);
          }
          var invert = createInverter(function (result2, value, key) {
            if (value != null && typeof value.toString != 'function') {
              value = nativeObjectToString.call(value);
            }
            result2[value] = key;
          }, constant(identity));
          var invertBy = createInverter(function (result2, value, key) {
            if (value != null && typeof value.toString != 'function') {
              value = nativeObjectToString.call(value);
            }
            if (hasOwnProperty.call(result2, value)) {
              result2[value].push(key);
            } else {
              result2[value] = [key];
            }
          }, getIteratee);
          var invoke = baseRest(baseInvoke);
          function keys(object) {
            return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
          }
          function keysIn(object) {
            return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
          }
          function mapKeys(object, iteratee2) {
            var result2 = {};
            iteratee2 = getIteratee(iteratee2, 3);
            baseForOwn(object, function (value, key, object2) {
              baseAssignValue(result2, iteratee2(value, key, object2), value);
            });
            return result2;
          }
          function mapValues(object, iteratee2) {
            var result2 = {};
            iteratee2 = getIteratee(iteratee2, 3);
            baseForOwn(object, function (value, key, object2) {
              baseAssignValue(result2, key, iteratee2(value, key, object2));
            });
            return result2;
          }
          var merge = createAssigner(function (object, source, srcIndex) {
            baseMerge(object, source, srcIndex);
          });
          var mergeWith = createAssigner(function (object, source, srcIndex, customizer) {
            baseMerge(object, source, srcIndex, customizer);
          });
          var omit = flatRest(function (object, paths) {
            var result2 = {};
            if (object == null) {
              return result2;
            }
            var isDeep = false;
            paths = arrayMap(paths, function (path) {
              path = castPath(path, object);
              isDeep || (isDeep = path.length > 1);
              return path;
            });
            copyObject(object, getAllKeysIn(object), result2);
            if (isDeep) {
              result2 = baseClone(result2, CLONE_DEEP_FLAG | CLONE_FLAT_FLAG | CLONE_SYMBOLS_FLAG, customOmitClone);
            }
            var length = paths.length;
            while (length--) {
              baseUnset(result2, paths[length]);
            }
            return result2;
          });
          function omitBy(object, predicate) {
            return pickBy(object, negate(getIteratee(predicate)));
          }
          var pick = flatRest(function (object, paths) {
            return object == null ? {} : basePick(object, paths);
          });
          function pickBy(object, predicate) {
            if (object == null) {
              return {};
            }
            var props = arrayMap(getAllKeysIn(object), function (prop) {
              return [prop];
            });
            predicate = getIteratee(predicate);
            return basePickBy(object, props, function (value, path) {
              return predicate(value, path[0]);
            });
          }
          function result(object, path, defaultValue) {
            path = castPath(path, object);
            var index = -1,
              length = path.length;
            if (!length) {
              length = 1;
              object = undefined2;
            }
            while (++index < length) {
              var value = object == null ? undefined2 : object[toKey(path[index])];
              if (value === undefined2) {
                index = length;
                value = defaultValue;
              }
              object = isFunction2(value) ? value.call(object) : value;
            }
            return object;
          }
          function set2(object, path, value) {
            return object == null ? object : baseSet(object, path, value);
          }
          function setWith(object, path, value, customizer) {
            customizer = typeof customizer == 'function' ? customizer : undefined2;
            return object == null ? object : baseSet(object, path, value, customizer);
          }
          var toPairs = createToPairs(keys);
          var toPairsIn = createToPairs(keysIn);
          function transform(object, iteratee2, accumulator) {
            var isArr = isArray(object),
              isArrLike = isArr || isBuffer(object) || isTypedArray(object);
            iteratee2 = getIteratee(iteratee2, 4);
            if (accumulator == null) {
              var Ctor = object && object.constructor;
              if (isArrLike) {
                accumulator = isArr ? new Ctor() : [];
              } else if (isObject2(object)) {
                accumulator = isFunction2(Ctor) ? baseCreate(getPrototype(object)) : {};
              } else {
                accumulator = {};
              }
            }
            (isArrLike ? arrayEach : baseForOwn)(object, function (value, index, object2) {
              return iteratee2(accumulator, value, index, object2);
            });
            return accumulator;
          }
          function unset(object, path) {
            return object == null ? true : baseUnset(object, path);
          }
          function update(object, path, updater) {
            return object == null ? object : baseUpdate(object, path, castFunction(updater));
          }
          function updateWith(object, path, updater, customizer) {
            customizer = typeof customizer == 'function' ? customizer : undefined2;
            return object == null ? object : baseUpdate(object, path, castFunction(updater), customizer);
          }
          function values(object) {
            return object == null ? [] : baseValues(object, keys(object));
          }
          function valuesIn(object) {
            return object == null ? [] : baseValues(object, keysIn(object));
          }
          function clamp(number, lower, upper) {
            if (upper === undefined2) {
              upper = lower;
              lower = undefined2;
            }
            if (upper !== undefined2) {
              upper = toNumber(upper);
              upper = upper === upper ? upper : 0;
            }
            if (lower !== undefined2) {
              lower = toNumber(lower);
              lower = lower === lower ? lower : 0;
            }
            return baseClamp(toNumber(number), lower, upper);
          }
          function inRange(number, start, end) {
            start = toFinite(start);
            if (end === undefined2) {
              end = start;
              start = 0;
            } else {
              end = toFinite(end);
            }
            number = toNumber(number);
            return baseInRange(number, start, end);
          }
          function random(lower, upper, floating) {
            if (floating && typeof floating != 'boolean' && isIterateeCall(lower, upper, floating)) {
              upper = floating = undefined2;
            }
            if (floating === undefined2) {
              if (typeof upper == 'boolean') {
                floating = upper;
                upper = undefined2;
              } else if (typeof lower == 'boolean') {
                floating = lower;
                lower = undefined2;
              }
            }
            if (lower === undefined2 && upper === undefined2) {
              lower = 0;
              upper = 1;
            } else {
              lower = toFinite(lower);
              if (upper === undefined2) {
                upper = lower;
                lower = 0;
              } else {
                upper = toFinite(upper);
              }
            }
            if (lower > upper) {
              var temp = lower;
              lower = upper;
              upper = temp;
            }
            if (floating || lower % 1 || upper % 1) {
              var rand = nativeRandom();
              return nativeMin(
                lower + rand * (upper - lower + freeParseFloat('1e-' + ((rand + '').length - 1))),
                upper
              );
            }
            return baseRandom(lower, upper);
          }
          var camelCase = createCompounder(function (result2, word, index) {
            word = word.toLowerCase();
            return result2 + (index ? capitalize(word) : word);
          });
          function capitalize(string) {
            return upperFirst(toString(string).toLowerCase());
          }
          function deburr(string) {
            string = toString(string);
            return string && string.replace(reLatin, deburrLetter).replace(reComboMark, '');
          }
          function endsWith(string, target, position) {
            string = toString(string);
            target = baseToString(target);
            var length = string.length;
            position = position === undefined2 ? length : baseClamp(toInteger(position), 0, length);
            var end = position;
            position -= target.length;
            return position >= 0 && string.slice(position, end) == target;
          }
          function escape(string) {
            string = toString(string);
            return string && reHasUnescapedHtml.test(string) ? string.replace(reUnescapedHtml, escapeHtmlChar) : string;
          }
          function escapeRegExp(string) {
            string = toString(string);
            return string && reHasRegExpChar.test(string) ? string.replace(reRegExpChar, '\\$&') : string;
          }
          var kebabCase = createCompounder(function (result2, word, index) {
            return result2 + (index ? '-' : '') + word.toLowerCase();
          });
          var lowerCase = createCompounder(function (result2, word, index) {
            return result2 + (index ? ' ' : '') + word.toLowerCase();
          });
          var lowerFirst = createCaseFirst('toLowerCase');
          function pad(string, length, chars) {
            string = toString(string);
            length = toInteger(length);
            var strLength = length ? stringSize(string) : 0;
            if (!length || strLength >= length) {
              return string;
            }
            var mid = (length - strLength) / 2;
            return createPadding(nativeFloor(mid), chars) + string + createPadding(nativeCeil(mid), chars);
          }
          function padEnd(string, length, chars) {
            string = toString(string);
            length = toInteger(length);
            var strLength = length ? stringSize(string) : 0;
            return length && strLength < length ? string + createPadding(length - strLength, chars) : string;
          }
          function padStart(string, length, chars) {
            string = toString(string);
            length = toInteger(length);
            var strLength = length ? stringSize(string) : 0;
            return length && strLength < length ? createPadding(length - strLength, chars) + string : string;
          }
          function parseInt2(string, radix, guard) {
            if (guard || radix == null) {
              radix = 0;
            } else if (radix) {
              radix = +radix;
            }
            return nativeParseInt(toString(string).replace(reTrimStart, ''), radix || 0);
          }
          function repeat(string, n, guard) {
            if (guard ? isIterateeCall(string, n, guard) : n === undefined2) {
              n = 1;
            } else {
              n = toInteger(n);
            }
            return baseRepeat(toString(string), n);
          }
          function replace() {
            var args = arguments,
              string = toString(args[0]);
            return args.length < 3 ? string : string.replace(args[1], args[2]);
          }
          var snakeCase = createCompounder(function (result2, word, index) {
            return result2 + (index ? '_' : '') + word.toLowerCase();
          });
          function split2(string, separator, limit) {
            if (limit && typeof limit != 'number' && isIterateeCall(string, separator, limit)) {
              separator = limit = undefined2;
            }
            limit = limit === undefined2 ? MAX_ARRAY_LENGTH : limit >>> 0;
            if (!limit) {
              return [];
            }
            string = toString(string);
            if (string && (typeof separator == 'string' || (separator != null && !isRegExp(separator)))) {
              separator = baseToString(separator);
              if (!separator && hasUnicode(string)) {
                return castSlice(stringToArray(string), 0, limit);
              }
            }
            return string.split(separator, limit);
          }
          var startCase = createCompounder(function (result2, word, index) {
            return result2 + (index ? ' ' : '') + upperFirst(word);
          });
          function startsWith(string, target, position) {
            string = toString(string);
            position = position == null ? 0 : baseClamp(toInteger(position), 0, string.length);
            target = baseToString(target);
            return string.slice(position, position + target.length) == target;
          }
          function template(string, options, guard) {
            var settings = lodash.templateSettings;
            if (guard && isIterateeCall(string, options, guard)) {
              options = undefined2;
            }
            string = toString(string);
            options = assignInWith({}, options, settings, customDefaultsAssignIn);
            var imports = assignInWith({}, options.imports, settings.imports, customDefaultsAssignIn),
              importsKeys = keys(imports),
              importsValues = baseValues(imports, importsKeys);
            var isEscaping,
              isEvaluating,
              index = 0,
              interpolate = options.interpolate || reNoMatch,
              source = "__p += '";
            var reDelimiters = RegExp2(
              (options.escape || reNoMatch).source +
                '|' +
                interpolate.source +
                '|' +
                (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source +
                '|' +
                (options.evaluate || reNoMatch).source +
                '|$',
              'g'
            );
            var sourceURL =
              '//# sourceURL=' +
              (hasOwnProperty.call(options, 'sourceURL')
                ? (options.sourceURL + '').replace(/\s/g, ' ')
                : 'lodash.templateSources[' + ++templateCounter + ']') +
              '\n';
            string.replace(
              reDelimiters,
              function (match2, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
                interpolateValue || (interpolateValue = esTemplateValue);
                source += string.slice(index, offset).replace(reUnescapedString, escapeStringChar);
                if (escapeValue) {
                  isEscaping = true;
                  source += "' +\n__e(" + escapeValue + ") +\n'";
                }
                if (evaluateValue) {
                  isEvaluating = true;
                  source += "';\n" + evaluateValue + ";\n__p += '";
                }
                if (interpolateValue) {
                  source += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'";
                }
                index = offset + match2.length;
                return match2;
              }
            );
            source += "';\n";
            var variable = hasOwnProperty.call(options, 'variable') && options.variable;
            if (!variable) {
              source = 'with (obj) {\n' + source + '\n}\n';
            } else if (reForbiddenIdentifierChars.test(variable)) {
              throw new Error2(INVALID_TEMPL_VAR_ERROR_TEXT);
            }
            source = (isEvaluating ? source.replace(reEmptyStringLeading, '') : source)
              .replace(reEmptyStringMiddle, '$1')
              .replace(reEmptyStringTrailing, '$1;');
            source =
              'function(' +
              (variable || 'obj') +
              ') {\n' +
              (variable ? '' : 'obj || (obj = {});\n') +
              "var __t, __p = ''" +
              (isEscaping ? ', __e = _.escape' : '') +
              (isEvaluating
                ? ", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n"
                : ';\n') +
              source +
              'return __p\n}';
            var result2 = attempt(function () {
              return Function2(importsKeys, sourceURL + 'return ' + source).apply(undefined2, importsValues);
            });
            result2.source = source;
            if (isError(result2)) {
              throw result2;
            }
            return result2;
          }
          function toLower(value) {
            return toString(value).toLowerCase();
          }
          function toUpper(value) {
            return toString(value).toUpperCase();
          }
          function trim(string, chars, guard) {
            string = toString(string);
            if (string && (guard || chars === undefined2)) {
              return baseTrim(string);
            }
            if (!string || !(chars = baseToString(chars))) {
              return string;
            }
            var strSymbols = stringToArray(string),
              chrSymbols = stringToArray(chars),
              start = charsStartIndex(strSymbols, chrSymbols),
              end = charsEndIndex(strSymbols, chrSymbols) + 1;
            return castSlice(strSymbols, start, end).join('');
          }
          function trimEnd(string, chars, guard) {
            string = toString(string);
            if (string && (guard || chars === undefined2)) {
              return string.slice(0, trimmedEndIndex(string) + 1);
            }
            if (!string || !(chars = baseToString(chars))) {
              return string;
            }
            var strSymbols = stringToArray(string),
              end = charsEndIndex(strSymbols, stringToArray(chars)) + 1;
            return castSlice(strSymbols, 0, end).join('');
          }
          function trimStart(string, chars, guard) {
            string = toString(string);
            if (string && (guard || chars === undefined2)) {
              return string.replace(reTrimStart, '');
            }
            if (!string || !(chars = baseToString(chars))) {
              return string;
            }
            var strSymbols = stringToArray(string),
              start = charsStartIndex(strSymbols, stringToArray(chars));
            return castSlice(strSymbols, start).join('');
          }
          function truncate(string, options) {
            var length = DEFAULT_TRUNC_LENGTH,
              omission = DEFAULT_TRUNC_OMISSION;
            if (isObject2(options)) {
              var separator = 'separator' in options ? options.separator : separator;
              length = 'length' in options ? toInteger(options.length) : length;
              omission = 'omission' in options ? baseToString(options.omission) : omission;
            }
            string = toString(string);
            var strLength = string.length;
            if (hasUnicode(string)) {
              var strSymbols = stringToArray(string);
              strLength = strSymbols.length;
            }
            if (length >= strLength) {
              return string;
            }
            var end = length - stringSize(omission);
            if (end < 1) {
              return omission;
            }
            var result2 = strSymbols ? castSlice(strSymbols, 0, end).join('') : string.slice(0, end);
            if (separator === undefined2) {
              return result2 + omission;
            }
            if (strSymbols) {
              end += result2.length - end;
            }
            if (isRegExp(separator)) {
              if (string.slice(end).search(separator)) {
                var match2,
                  substring = result2;
                if (!separator.global) {
                  separator = RegExp2(separator.source, toString(reFlags.exec(separator)) + 'g');
                }
                separator.lastIndex = 0;
                while ((match2 = separator.exec(substring))) {
                  var newEnd = match2.index;
                }
                result2 = result2.slice(0, newEnd === undefined2 ? end : newEnd);
              }
            } else if (string.indexOf(baseToString(separator), end) != end) {
              var index = result2.lastIndexOf(separator);
              if (index > -1) {
                result2 = result2.slice(0, index);
              }
            }
            return result2 + omission;
          }
          function unescape(string) {
            string = toString(string);
            return string && reHasEscapedHtml.test(string) ? string.replace(reEscapedHtml, unescapeHtmlChar) : string;
          }
          var upperCase = createCompounder(function (result2, word, index) {
            return result2 + (index ? ' ' : '') + word.toUpperCase();
          });
          var upperFirst = createCaseFirst('toUpperCase');
          function words(string, pattern, guard) {
            string = toString(string);
            pattern = guard ? undefined2 : pattern;
            if (pattern === undefined2) {
              return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
            }
            return string.match(pattern) || [];
          }
          var attempt = baseRest(function (func, args) {
            try {
              return apply(func, undefined2, args);
            } catch (e) {
              return isError(e) ? e : new Error2(e);
            }
          });
          var bindAll = flatRest(function (object, methodNames) {
            arrayEach(methodNames, function (key) {
              key = toKey(key);
              baseAssignValue(object, key, bind(object[key], object));
            });
            return object;
          });
          function cond(pairs) {
            var length = pairs == null ? 0 : pairs.length,
              toIteratee = getIteratee();
            pairs = !length
              ? []
              : arrayMap(pairs, function (pair) {
                  if (typeof pair[1] != 'function') {
                    throw new TypeError2(FUNC_ERROR_TEXT);
                  }
                  return [toIteratee(pair[0]), pair[1]];
                });
            return baseRest(function (args) {
              var index = -1;
              while (++index < length) {
                var pair = pairs[index];
                if (apply(pair[0], this, args)) {
                  return apply(pair[1], this, args);
                }
              }
            });
          }
          function conforms(source) {
            return baseConforms(baseClone(source, CLONE_DEEP_FLAG));
          }
          function constant(value) {
            return function () {
              return value;
            };
          }
          function defaultTo(value, defaultValue) {
            return value == null || value !== value ? defaultValue : value;
          }
          var flow = createFlow();
          var flowRight = createFlow(true);
          function identity(value) {
            return value;
          }
          function iteratee(func) {
            return baseIteratee(typeof func == 'function' ? func : baseClone(func, CLONE_DEEP_FLAG));
          }
          function matches(source) {
            return baseMatches(baseClone(source, CLONE_DEEP_FLAG));
          }
          function matchesProperty(path, srcValue) {
            return baseMatchesProperty(path, baseClone(srcValue, CLONE_DEEP_FLAG));
          }
          var method = baseRest(function (path, args) {
            return function (object) {
              return baseInvoke(object, path, args);
            };
          });
          var methodOf = baseRest(function (object, args) {
            return function (path) {
              return baseInvoke(object, path, args);
            };
          });
          function mixin(object, source, options) {
            var props = keys(source),
              methodNames = baseFunctions(source, props);
            if (options == null && !(isObject2(source) && (methodNames.length || !props.length))) {
              options = source;
              source = object;
              object = this;
              methodNames = baseFunctions(source, keys(source));
            }
            var chain2 = !(isObject2(options) && 'chain' in options) || !!options.chain,
              isFunc = isFunction2(object);
            arrayEach(methodNames, function (methodName) {
              var func = source[methodName];
              object[methodName] = func;
              if (isFunc) {
                object.prototype[methodName] = function () {
                  var chainAll = this.__chain__;
                  if (chain2 || chainAll) {
                    var result2 = object(this.__wrapped__),
                      actions = (result2.__actions__ = copyArray(this.__actions__));
                    actions.push({ func: func, args: arguments, thisArg: object });
                    result2.__chain__ = chainAll;
                    return result2;
                  }
                  return func.apply(object, arrayPush([this.value()], arguments));
                };
              }
            });
            return object;
          }
          function noConflict() {
            if (root._ === this) {
              root._ = oldDash;
            }
            return this;
          }
          function noop() {}
          function nthArg(n) {
            n = toInteger(n);
            return baseRest(function (args) {
              return baseNth(args, n);
            });
          }
          var over = createOver(arrayMap);
          var overEvery = createOver(arrayEvery);
          var overSome = createOver(arraySome);
          function property(path) {
            return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
          }
          function propertyOf(object) {
            return function (path) {
              return object == null ? undefined2 : baseGet(object, path);
            };
          }
          var range = createRange();
          var rangeRight = createRange(true);
          function stubArray() {
            return [];
          }
          function stubFalse() {
            return false;
          }
          function stubObject() {
            return {};
          }
          function stubString() {
            return '';
          }
          function stubTrue() {
            return true;
          }
          function times(n, iteratee2) {
            n = toInteger(n);
            if (n < 1 || n > MAX_SAFE_INTEGER) {
              return [];
            }
            var index = MAX_ARRAY_LENGTH,
              length = nativeMin(n, MAX_ARRAY_LENGTH);
            iteratee2 = getIteratee(iteratee2);
            n -= MAX_ARRAY_LENGTH;
            var result2 = baseTimes(length, iteratee2);
            while (++index < n) {
              iteratee2(index);
            }
            return result2;
          }
          function toPath(value) {
            if (isArray(value)) {
              return arrayMap(value, toKey);
            }
            return isSymbol(value) ? [value] : copyArray(stringToPath(toString(value)));
          }
          function uniqueId(prefix) {
            var id = ++idCounter;
            return toString(prefix) + id;
          }
          var add2 = createMathOperation(function (augend, addend) {
            return augend + addend;
          }, 0);
          var ceil = createRound('ceil');
          var divide = createMathOperation(function (dividend, divisor) {
            return dividend / divisor;
          }, 1);
          var floor = createRound('floor');
          function max(array) {
            return array && array.length ? baseExtremum(array, identity, baseGt) : undefined2;
          }
          function maxBy(array, iteratee2) {
            return array && array.length ? baseExtremum(array, getIteratee(iteratee2, 2), baseGt) : undefined2;
          }
          function mean(array) {
            return baseMean(array, identity);
          }
          function meanBy(array, iteratee2) {
            return baseMean(array, getIteratee(iteratee2, 2));
          }
          function min(array) {
            return array && array.length ? baseExtremum(array, identity, baseLt) : undefined2;
          }
          function minBy(array, iteratee2) {
            return array && array.length ? baseExtremum(array, getIteratee(iteratee2, 2), baseLt) : undefined2;
          }
          var multiply = createMathOperation(function (multiplier, multiplicand) {
            return multiplier * multiplicand;
          }, 1);
          var round = createRound('round');
          var subtract = createMathOperation(function (minuend, subtrahend) {
            return minuend - subtrahend;
          }, 0);
          function sum(array) {
            return array && array.length ? baseSum(array, identity) : 0;
          }
          function sumBy(array, iteratee2) {
            return array && array.length ? baseSum(array, getIteratee(iteratee2, 2)) : 0;
          }
          lodash.after = after;
          lodash.ary = ary;
          lodash.assign = assign;
          lodash.assignIn = assignIn;
          lodash.assignInWith = assignInWith;
          lodash.assignWith = assignWith;
          lodash.at = at;
          lodash.before = before;
          lodash.bind = bind;
          lodash.bindAll = bindAll;
          lodash.bindKey = bindKey;
          lodash.castArray = castArray;
          lodash.chain = chain;
          lodash.chunk = chunk;
          lodash.compact = compact;
          lodash.concat = concat;
          lodash.cond = cond;
          lodash.conforms = conforms;
          lodash.constant = constant;
          lodash.countBy = countBy;
          lodash.create = create2;
          lodash.curry = curry;
          lodash.curryRight = curryRight;
          lodash.debounce = debounce2;
          lodash.defaults = defaults2;
          lodash.defaultsDeep = defaultsDeep;
          lodash.defer = defer2;
          lodash.delay = delay;
          lodash.difference = difference;
          lodash.differenceBy = differenceBy;
          lodash.differenceWith = differenceWith;
          lodash.drop = drop;
          lodash.dropRight = dropRight;
          lodash.dropRightWhile = dropRightWhile;
          lodash.dropWhile = dropWhile;
          lodash.fill = fill;
          lodash.filter = filter;
          lodash.flatMap = flatMap;
          lodash.flatMapDeep = flatMapDeep;
          lodash.flatMapDepth = flatMapDepth;
          lodash.flatten = flatten;
          lodash.flattenDeep = flattenDeep;
          lodash.flattenDepth = flattenDepth;
          lodash.flip = flip;
          lodash.flow = flow;
          lodash.flowRight = flowRight;
          lodash.fromPairs = fromPairs;
          lodash.functions = functions;
          lodash.functionsIn = functionsIn;
          lodash.groupBy = groupBy;
          lodash.initial = initial;
          lodash.intersection = intersection;
          lodash.intersectionBy = intersectionBy;
          lodash.intersectionWith = intersectionWith;
          lodash.invert = invert;
          lodash.invertBy = invertBy;
          lodash.invokeMap = invokeMap;
          lodash.iteratee = iteratee;
          lodash.keyBy = keyBy;
          lodash.keys = keys;
          lodash.keysIn = keysIn;
          lodash.map = map;
          lodash.mapKeys = mapKeys;
          lodash.mapValues = mapValues;
          lodash.matches = matches;
          lodash.matchesProperty = matchesProperty;
          lodash.memoize = memoize2;
          lodash.merge = merge;
          lodash.mergeWith = mergeWith;
          lodash.method = method;
          lodash.methodOf = methodOf;
          lodash.mixin = mixin;
          lodash.negate = negate;
          lodash.nthArg = nthArg;
          lodash.omit = omit;
          lodash.omitBy = omitBy;
          lodash.once = once;
          lodash.orderBy = orderBy;
          lodash.over = over;
          lodash.overArgs = overArgs;
          lodash.overEvery = overEvery;
          lodash.overSome = overSome;
          lodash.partial = partial;
          lodash.partialRight = partialRight;
          lodash.partition = partition;
          lodash.pick = pick;
          lodash.pickBy = pickBy;
          lodash.property = property;
          lodash.propertyOf = propertyOf;
          lodash.pull = pull;
          lodash.pullAll = pullAll;
          lodash.pullAllBy = pullAllBy;
          lodash.pullAllWith = pullAllWith;
          lodash.pullAt = pullAt;
          lodash.range = range;
          lodash.rangeRight = rangeRight;
          lodash.rearg = rearg;
          lodash.reject = reject;
          lodash.remove = remove2;
          lodash.rest = rest;
          lodash.reverse = reverse;
          lodash.sampleSize = sampleSize;
          lodash.set = set2;
          lodash.setWith = setWith;
          lodash.shuffle = shuffle;
          lodash.slice = slice;
          lodash.sortBy = sortBy;
          lodash.sortedUniq = sortedUniq;
          lodash.sortedUniqBy = sortedUniqBy;
          lodash.split = split2;
          lodash.spread = spread;
          lodash.tail = tail;
          lodash.take = take;
          lodash.takeRight = takeRight;
          lodash.takeRightWhile = takeRightWhile;
          lodash.takeWhile = takeWhile;
          lodash.tap = tap;
          lodash.throttle = throttle;
          lodash.thru = thru;
          lodash.toArray = toArray;
          lodash.toPairs = toPairs;
          lodash.toPairsIn = toPairsIn;
          lodash.toPath = toPath;
          lodash.toPlainObject = toPlainObject;
          lodash.transform = transform;
          lodash.unary = unary;
          lodash.union = union;
          lodash.unionBy = unionBy;
          lodash.unionWith = unionWith;
          lodash.uniq = uniq;
          lodash.uniqBy = uniqBy;
          lodash.uniqWith = uniqWith;
          lodash.unset = unset;
          lodash.unzip = unzip;
          lodash.unzipWith = unzipWith;
          lodash.update = update;
          lodash.updateWith = updateWith;
          lodash.values = values;
          lodash.valuesIn = valuesIn;
          lodash.without = without;
          lodash.words = words;
          lodash.wrap = wrap;
          lodash.xor = xor;
          lodash.xorBy = xorBy;
          lodash.xorWith = xorWith;
          lodash.zip = zip;
          lodash.zipObject = zipObject;
          lodash.zipObjectDeep = zipObjectDeep;
          lodash.zipWith = zipWith;
          lodash.entries = toPairs;
          lodash.entriesIn = toPairsIn;
          lodash.extend = assignIn;
          lodash.extendWith = assignInWith;
          mixin(lodash, lodash);
          lodash.add = add2;
          lodash.attempt = attempt;
          lodash.camelCase = camelCase;
          lodash.capitalize = capitalize;
          lodash.ceil = ceil;
          lodash.clamp = clamp;
          lodash.clone = clone;
          lodash.cloneDeep = cloneDeep;
          lodash.cloneDeepWith = cloneDeepWith;
          lodash.cloneWith = cloneWith;
          lodash.conformsTo = conformsTo;
          lodash.deburr = deburr;
          lodash.defaultTo = defaultTo;
          lodash.divide = divide;
          lodash.endsWith = endsWith;
          lodash.eq = eq;
          lodash.escape = escape;
          lodash.escapeRegExp = escapeRegExp;
          lodash.every = every;
          lodash.find = find;
          lodash.findIndex = findIndex;
          lodash.findKey = findKey;
          lodash.findLast = findLast;
          lodash.findLastIndex = findLastIndex;
          lodash.findLastKey = findLastKey;
          lodash.floor = floor;
          lodash.forEach = forEach;
          lodash.forEachRight = forEachRight;
          lodash.forIn = forIn;
          lodash.forInRight = forInRight;
          lodash.forOwn = forOwn;
          lodash.forOwnRight = forOwnRight;
          lodash.get = get2;
          lodash.gt = gt;
          lodash.gte = gte;
          lodash.has = has2;
          lodash.hasIn = hasIn;
          lodash.head = head;
          lodash.identity = identity;
          lodash.includes = includes;
          lodash.indexOf = indexOf;
          lodash.inRange = inRange;
          lodash.invoke = invoke;
          lodash.isArguments = isArguments;
          lodash.isArray = isArray;
          lodash.isArrayBuffer = isArrayBuffer;
          lodash.isArrayLike = isArrayLike;
          lodash.isArrayLikeObject = isArrayLikeObject;
          lodash.isBoolean = isBoolean2;
          lodash.isBuffer = isBuffer;
          lodash.isDate = isDate;
          lodash.isElement = isElement;
          lodash.isEmpty = isEmpty;
          lodash.isEqual = isEqual;
          lodash.isEqualWith = isEqualWith;
          lodash.isError = isError;
          lodash.isFinite = isFinite;
          lodash.isFunction = isFunction2;
          lodash.isInteger = isInteger;
          lodash.isLength = isLength;
          lodash.isMap = isMap;
          lodash.isMatch = isMatch;
          lodash.isMatchWith = isMatchWith;
          lodash.isNaN = isNaN;
          lodash.isNative = isNative;
          lodash.isNil = isNil3;
          lodash.isNull = isNull;
          lodash.isNumber = isNumber;
          lodash.isObject = isObject2;
          lodash.isObjectLike = isObjectLike;
          lodash.isPlainObject = isPlainObject;
          lodash.isRegExp = isRegExp;
          lodash.isSafeInteger = isSafeInteger;
          lodash.isSet = isSet;
          lodash.isString = isString2;
          lodash.isSymbol = isSymbol;
          lodash.isTypedArray = isTypedArray;
          lodash.isUndefined = isUndefined;
          lodash.isWeakMap = isWeakMap;
          lodash.isWeakSet = isWeakSet;
          lodash.join = join;
          lodash.kebabCase = kebabCase;
          lodash.last = last;
          lodash.lastIndexOf = lastIndexOf;
          lodash.lowerCase = lowerCase;
          lodash.lowerFirst = lowerFirst;
          lodash.lt = lt;
          lodash.lte = lte;
          lodash.max = max;
          lodash.maxBy = maxBy;
          lodash.mean = mean;
          lodash.meanBy = meanBy;
          lodash.min = min;
          lodash.minBy = minBy;
          lodash.stubArray = stubArray;
          lodash.stubFalse = stubFalse;
          lodash.stubObject = stubObject;
          lodash.stubString = stubString;
          lodash.stubTrue = stubTrue;
          lodash.multiply = multiply;
          lodash.nth = nth;
          lodash.noConflict = noConflict;
          lodash.noop = noop;
          lodash.now = now;
          lodash.pad = pad;
          lodash.padEnd = padEnd;
          lodash.padStart = padStart;
          lodash.parseInt = parseInt2;
          lodash.random = random;
          lodash.reduce = reduce;
          lodash.reduceRight = reduceRight;
          lodash.repeat = repeat;
          lodash.replace = replace;
          lodash.result = result;
          lodash.round = round;
          lodash.runInContext = runInContext2;
          lodash.sample = sample;
          lodash.size = size;
          lodash.snakeCase = snakeCase;
          lodash.some = some;
          lodash.sortedIndex = sortedIndex;
          lodash.sortedIndexBy = sortedIndexBy;
          lodash.sortedIndexOf = sortedIndexOf;
          lodash.sortedLastIndex = sortedLastIndex;
          lodash.sortedLastIndexBy = sortedLastIndexBy;
          lodash.sortedLastIndexOf = sortedLastIndexOf;
          lodash.startCase = startCase;
          lodash.startsWith = startsWith;
          lodash.subtract = subtract;
          lodash.sum = sum;
          lodash.sumBy = sumBy;
          lodash.template = template;
          lodash.times = times;
          lodash.toFinite = toFinite;
          lodash.toInteger = toInteger;
          lodash.toLength = toLength;
          lodash.toLower = toLower;
          lodash.toNumber = toNumber;
          lodash.toSafeInteger = toSafeInteger;
          lodash.toString = toString;
          lodash.toUpper = toUpper;
          lodash.trim = trim;
          lodash.trimEnd = trimEnd;
          lodash.trimStart = trimStart;
          lodash.truncate = truncate;
          lodash.unescape = unescape;
          lodash.uniqueId = uniqueId;
          lodash.upperCase = upperCase;
          lodash.upperFirst = upperFirst;
          lodash.each = forEach;
          lodash.eachRight = forEachRight;
          lodash.first = head;
          mixin(
            lodash,
            (function () {
              var source = {};
              baseForOwn(lodash, function (func, methodName) {
                if (!hasOwnProperty.call(lodash.prototype, methodName)) {
                  source[methodName] = func;
                }
              });
              return source;
            })(),
            { chain: false }
          );
          lodash.VERSION = VERSION;
          arrayEach(['bind', 'bindKey', 'curry', 'curryRight', 'partial', 'partialRight'], function (methodName) {
            lodash[methodName].placeholder = lodash;
          });
          arrayEach(['drop', 'take'], function (methodName, index) {
            LazyWrapper.prototype[methodName] = function (n) {
              n = n === undefined2 ? 1 : nativeMax(toInteger(n), 0);
              var result2 = this.__filtered__ && !index ? new LazyWrapper(this) : this.clone();
              if (result2.__filtered__) {
                result2.__takeCount__ = nativeMin(n, result2.__takeCount__);
              } else {
                result2.__views__.push({
                  size: nativeMin(n, MAX_ARRAY_LENGTH),
                  type: methodName + (result2.__dir__ < 0 ? 'Right' : ''),
                });
              }
              return result2;
            };
            LazyWrapper.prototype[methodName + 'Right'] = function (n) {
              return this.reverse()[methodName](n).reverse();
            };
          });
          arrayEach(['filter', 'map', 'takeWhile'], function (methodName, index) {
            var type = index + 1,
              isFilter = type == LAZY_FILTER_FLAG || type == LAZY_WHILE_FLAG;
            LazyWrapper.prototype[methodName] = function (iteratee2) {
              var result2 = this.clone();
              result2.__iteratees__.push({
                iteratee: getIteratee(iteratee2, 3),
                type: type,
              });
              result2.__filtered__ = result2.__filtered__ || isFilter;
              return result2;
            };
          });
          arrayEach(['head', 'last'], function (methodName, index) {
            var takeName = 'take' + (index ? 'Right' : '');
            LazyWrapper.prototype[methodName] = function () {
              return this[takeName](1).value()[0];
            };
          });
          arrayEach(['initial', 'tail'], function (methodName, index) {
            var dropName = 'drop' + (index ? '' : 'Right');
            LazyWrapper.prototype[methodName] = function () {
              return this.__filtered__ ? new LazyWrapper(this) : this[dropName](1);
            };
          });
          LazyWrapper.prototype.compact = function () {
            return this.filter(identity);
          };
          LazyWrapper.prototype.find = function (predicate) {
            return this.filter(predicate).head();
          };
          LazyWrapper.prototype.findLast = function (predicate) {
            return this.reverse().find(predicate);
          };
          LazyWrapper.prototype.invokeMap = baseRest(function (path, args) {
            if (typeof path == 'function') {
              return new LazyWrapper(this);
            }
            return this.map(function (value) {
              return baseInvoke(value, path, args);
            });
          });
          LazyWrapper.prototype.reject = function (predicate) {
            return this.filter(negate(getIteratee(predicate)));
          };
          LazyWrapper.prototype.slice = function (start, end) {
            start = toInteger(start);
            var result2 = this;
            if (result2.__filtered__ && (start > 0 || end < 0)) {
              return new LazyWrapper(result2);
            }
            if (start < 0) {
              result2 = result2.takeRight(-start);
            } else if (start) {
              result2 = result2.drop(start);
            }
            if (end !== undefined2) {
              end = toInteger(end);
              result2 = end < 0 ? result2.dropRight(-end) : result2.take(end - start);
            }
            return result2;
          };
          LazyWrapper.prototype.takeRightWhile = function (predicate) {
            return this.reverse().takeWhile(predicate).reverse();
          };
          LazyWrapper.prototype.toArray = function () {
            return this.take(MAX_ARRAY_LENGTH);
          };
          baseForOwn(LazyWrapper.prototype, function (func, methodName) {
            var checkIteratee = /^(?:filter|find|map|reject)|While$/.test(methodName),
              isTaker = /^(?:head|last)$/.test(methodName),
              lodashFunc = lodash[isTaker ? 'take' + (methodName == 'last' ? 'Right' : '') : methodName],
              retUnwrapped = isTaker || /^find/.test(methodName);
            if (!lodashFunc) {
              return;
            }
            lodash.prototype[methodName] = function () {
              var value = this.__wrapped__,
                args = isTaker ? [1] : arguments,
                isLazy = value instanceof LazyWrapper,
                iteratee2 = args[0],
                useLazy = isLazy || isArray(value);
              var interceptor = function (value2) {
                var result3 = lodashFunc.apply(lodash, arrayPush([value2], args));
                return isTaker && chainAll ? result3[0] : result3;
              };
              if (useLazy && checkIteratee && typeof iteratee2 == 'function' && iteratee2.length != 1) {
                isLazy = useLazy = false;
              }
              var chainAll = this.__chain__,
                isHybrid = !!this.__actions__.length,
                isUnwrapped = retUnwrapped && !chainAll,
                onlyLazy = isLazy && !isHybrid;
              if (!retUnwrapped && useLazy) {
                value = onlyLazy ? value : new LazyWrapper(this);
                var result2 = func.apply(value, args);
                result2.__actions__.push({ func: thru, args: [interceptor], thisArg: undefined2 });
                return new LodashWrapper(result2, chainAll);
              }
              if (isUnwrapped && onlyLazy) {
                return func.apply(this, args);
              }
              result2 = this.thru(interceptor);
              return isUnwrapped ? (isTaker ? result2.value()[0] : result2.value()) : result2;
            };
          });
          arrayEach(['pop', 'push', 'shift', 'sort', 'splice', 'unshift'], function (methodName) {
            var func = arrayProto[methodName],
              chainName = /^(?:push|sort|unshift)$/.test(methodName) ? 'tap' : 'thru',
              retUnwrapped = /^(?:pop|shift)$/.test(methodName);
            lodash.prototype[methodName] = function () {
              var args = arguments;
              if (retUnwrapped && !this.__chain__) {
                var value = this.value();
                return func.apply(isArray(value) ? value : [], args);
              }
              return this[chainName](function (value2) {
                return func.apply(isArray(value2) ? value2 : [], args);
              });
            };
          });
          baseForOwn(LazyWrapper.prototype, function (func, methodName) {
            var lodashFunc = lodash[methodName];
            if (lodashFunc) {
              var key = lodashFunc.name + '';
              if (!hasOwnProperty.call(realNames, key)) {
                realNames[key] = [];
              }
              realNames[key].push({ name: methodName, func: lodashFunc });
            }
          });
          realNames[createHybrid(undefined2, WRAP_BIND_KEY_FLAG).name] = [
            {
              name: 'wrapper',
              func: undefined2,
            },
          ];
          LazyWrapper.prototype.clone = lazyClone;
          LazyWrapper.prototype.reverse = lazyReverse;
          LazyWrapper.prototype.value = lazyValue;
          lodash.prototype.at = wrapperAt;
          lodash.prototype.chain = wrapperChain;
          lodash.prototype.commit = wrapperCommit;
          lodash.prototype.next = wrapperNext;
          lodash.prototype.plant = wrapperPlant;
          lodash.prototype.reverse = wrapperReverse;
          lodash.prototype.toJSON = lodash.prototype.valueOf = lodash.prototype.value = wrapperValue;
          lodash.prototype.first = lodash.prototype.head;
          if (symIterator) {
            lodash.prototype[symIterator] = wrapperToIterator;
          }
          return lodash;
        };
        var _4 = runInContext();
        if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
          root._ = _4;
          define(function () {
            return _4;
          });
        } else if (freeModule) {
          (freeModule.exports = _4)._ = _4;
          freeExports._ = _4;
        } else {
          root._ = _4;
        }
      }).call(exports);
    },
  });

  // node_modules/lodash/isObject.js
  var require_isObject = __commonJS({
    'node_modules/lodash/isObject.js'(exports, module) {
      function isObject2(value) {
        var type = typeof value;
        return value != null && (type == 'object' || type == 'function');
      }
      module.exports = isObject2;
    },
  });

  // node_modules/lodash/_freeGlobal.js
  var require_freeGlobal = __commonJS({
    'node_modules/lodash/_freeGlobal.js'(exports, module) {
      var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;
      module.exports = freeGlobal;
    },
  });

  // node_modules/lodash/_root.js
  var require_root = __commonJS({
    'node_modules/lodash/_root.js'(exports, module) {
      var freeGlobal = require_freeGlobal();
      var freeSelf = typeof self == 'object' && self && self.Object === Object && self;
      var root = freeGlobal || freeSelf || Function('return this')();
      module.exports = root;
    },
  });

  // node_modules/lodash/now.js
  var require_now = __commonJS({
    'node_modules/lodash/now.js'(exports, module) {
      var root = require_root();
      var now = function () {
        return root.Date.now();
      };
      module.exports = now;
    },
  });

  // node_modules/lodash/_trimmedEndIndex.js
  var require_trimmedEndIndex = __commonJS({
    'node_modules/lodash/_trimmedEndIndex.js'(exports, module) {
      var reWhitespace = /\s/;
      function trimmedEndIndex(string) {
        var index = string.length;
        while (index-- && reWhitespace.test(string.charAt(index))) {}
        return index;
      }
      module.exports = trimmedEndIndex;
    },
  });

  // node_modules/lodash/_baseTrim.js
  var require_baseTrim = __commonJS({
    'node_modules/lodash/_baseTrim.js'(exports, module) {
      var trimmedEndIndex = require_trimmedEndIndex();
      var reTrimStart = /^\s+/;
      function baseTrim(string) {
        return string ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, '') : string;
      }
      module.exports = baseTrim;
    },
  });

  // node_modules/lodash/_Symbol.js
  var require_Symbol = __commonJS({
    'node_modules/lodash/_Symbol.js'(exports, module) {
      var root = require_root();
      var Symbol2 = root.Symbol;
      module.exports = Symbol2;
    },
  });

  // node_modules/lodash/_getRawTag.js
  var require_getRawTag = __commonJS({
    'node_modules/lodash/_getRawTag.js'(exports, module) {
      var Symbol2 = require_Symbol();
      var objectProto = Object.prototype;
      var hasOwnProperty = objectProto.hasOwnProperty;
      var nativeObjectToString = objectProto.toString;
      var symToStringTag = Symbol2 ? Symbol2.toStringTag : void 0;
      function getRawTag(value) {
        var isOwn = hasOwnProperty.call(value, symToStringTag),
          tag = value[symToStringTag];
        try {
          value[symToStringTag] = void 0;
          var unmasked = true;
        } catch (e) {}
        var result = nativeObjectToString.call(value);
        if (unmasked) {
          if (isOwn) {
            value[symToStringTag] = tag;
          } else {
            delete value[symToStringTag];
          }
        }
        return result;
      }
      module.exports = getRawTag;
    },
  });

  // node_modules/lodash/_objectToString.js
  var require_objectToString = __commonJS({
    'node_modules/lodash/_objectToString.js'(exports, module) {
      var objectProto = Object.prototype;
      var nativeObjectToString = objectProto.toString;
      function objectToString(value) {
        return nativeObjectToString.call(value);
      }
      module.exports = objectToString;
    },
  });

  // node_modules/lodash/_baseGetTag.js
  var require_baseGetTag = __commonJS({
    'node_modules/lodash/_baseGetTag.js'(exports, module) {
      var Symbol2 = require_Symbol();
      var getRawTag = require_getRawTag();
      var objectToString = require_objectToString();
      var nullTag = '[object Null]';
      var undefinedTag = '[object Undefined]';
      var symToStringTag = Symbol2 ? Symbol2.toStringTag : void 0;
      function baseGetTag(value) {
        if (value == null) {
          return value === void 0 ? undefinedTag : nullTag;
        }
        return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
      }
      module.exports = baseGetTag;
    },
  });

  // node_modules/lodash/isObjectLike.js
  var require_isObjectLike = __commonJS({
    'node_modules/lodash/isObjectLike.js'(exports, module) {
      function isObjectLike(value) {
        return value != null && typeof value == 'object';
      }
      module.exports = isObjectLike;
    },
  });

  // node_modules/lodash/isSymbol.js
  var require_isSymbol = __commonJS({
    'node_modules/lodash/isSymbol.js'(exports, module) {
      var baseGetTag = require_baseGetTag();
      var isObjectLike = require_isObjectLike();
      var symbolTag = '[object Symbol]';
      function isSymbol(value) {
        return typeof value == 'symbol' || (isObjectLike(value) && baseGetTag(value) == symbolTag);
      }
      module.exports = isSymbol;
    },
  });

  // node_modules/lodash/toNumber.js
  var require_toNumber = __commonJS({
    'node_modules/lodash/toNumber.js'(exports, module) {
      var baseTrim = require_baseTrim();
      var isObject2 = require_isObject();
      var isSymbol = require_isSymbol();
      var NAN = 0 / 0;
      var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
      var reIsBinary = /^0b[01]+$/i;
      var reIsOctal = /^0o[0-7]+$/i;
      var freeParseInt = parseInt;
      function toNumber(value) {
        if (typeof value == 'number') {
          return value;
        }
        if (isSymbol(value)) {
          return NAN;
        }
        if (isObject2(value)) {
          var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
          value = isObject2(other) ? other + '' : other;
        }
        if (typeof value != 'string') {
          return value === 0 ? value : +value;
        }
        value = baseTrim(value);
        var isBinary = reIsBinary.test(value);
        return isBinary || reIsOctal.test(value)
          ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
          : reIsBadHex.test(value)
            ? NAN
            : +value;
      }
      module.exports = toNumber;
    },
  });

  // node_modules/lodash/debounce.js
  var require_debounce = __commonJS({
    'node_modules/lodash/debounce.js'(exports, module) {
      var isObject2 = require_isObject();
      var now = require_now();
      var toNumber = require_toNumber();
      var FUNC_ERROR_TEXT = 'Expected a function';
      var nativeMax = Math.max;
      var nativeMin = Math.min;
      function debounce2(func, wait, options) {
        var lastArgs,
          lastThis,
          maxWait,
          result,
          timerId,
          lastCallTime,
          lastInvokeTime = 0,
          leading = false,
          maxing = false,
          trailing = true;
        if (typeof func != 'function') {
          throw new TypeError(FUNC_ERROR_TEXT);
        }
        wait = toNumber(wait) || 0;
        if (isObject2(options)) {
          leading = !!options.leading;
          maxing = 'maxWait' in options;
          maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
          trailing = 'trailing' in options ? !!options.trailing : trailing;
        }
        function invokeFunc(time) {
          var args = lastArgs,
            thisArg = lastThis;
          lastArgs = lastThis = void 0;
          lastInvokeTime = time;
          result = func.apply(thisArg, args);
          return result;
        }
        function leadingEdge(time) {
          lastInvokeTime = time;
          timerId = setTimeout(timerExpired, wait);
          return leading ? invokeFunc(time) : result;
        }
        function remainingWait(time) {
          var timeSinceLastCall = time - lastCallTime,
            timeSinceLastInvoke = time - lastInvokeTime,
            timeWaiting = wait - timeSinceLastCall;
          return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
        }
        function shouldInvoke(time) {
          var timeSinceLastCall = time - lastCallTime,
            timeSinceLastInvoke = time - lastInvokeTime;
          return (
            lastCallTime === void 0 ||
            timeSinceLastCall >= wait ||
            timeSinceLastCall < 0 ||
            (maxing && timeSinceLastInvoke >= maxWait)
          );
        }
        function timerExpired() {
          var time = now();
          if (shouldInvoke(time)) {
            return trailingEdge(time);
          }
          timerId = setTimeout(timerExpired, remainingWait(time));
        }
        function trailingEdge(time) {
          timerId = void 0;
          if (trailing && lastArgs) {
            return invokeFunc(time);
          }
          lastArgs = lastThis = void 0;
          return result;
        }
        function cancel() {
          if (timerId !== void 0) {
            clearTimeout(timerId);
          }
          lastInvokeTime = 0;
          lastArgs = lastCallTime = lastThis = timerId = void 0;
        }
        function flush() {
          return timerId === void 0 ? result : trailingEdge(now());
        }
        function debounced() {
          var time = now(),
            isInvoking = shouldInvoke(time);
          lastArgs = arguments;
          lastThis = this;
          lastCallTime = time;
          if (isInvoking) {
            if (timerId === void 0) {
              return leadingEdge(lastCallTime);
            }
            if (maxing) {
              clearTimeout(timerId);
              timerId = setTimeout(timerExpired, wait);
              return invokeFunc(lastCallTime);
            }
          }
          if (timerId === void 0) {
            timerId = setTimeout(timerExpired, wait);
          }
          return result;
        }
        debounced.cancel = cancel;
        debounced.flush = flush;
        return debounced;
      }
      module.exports = debounce2;
    },
  });

  // src/app.js
  var import_observable3 = __toESM(require_observable(), 1);

  // node_modules/riot/esm/dependencies/@riotjs/util/constants.js
  var COMPONENTS_IMPLEMENTATION_MAP = /* @__PURE__ */ new Map();
  var DOM_COMPONENT_INSTANCE_PROPERTY = Symbol('riot-component');
  var PLUGINS_SET = /* @__PURE__ */ new Set();
  var PROPS_KEY = 'props';
  var STATE_KEY = 'state';
  var IS_PURE_SYMBOL = Symbol('pure');
  var IS_COMPONENT_UPDATING = Symbol('is_updating');
  var PARENT_KEY_SYMBOL = Symbol('parent');
  var ATTRIBUTES_KEY_SYMBOL = Symbol('attributes');
  var TEMPLATE_KEY_SYMBOL = Symbol('template');

  // node_modules/riot/esm/dependencies/@riotjs/util/expression-types.js
  var ATTRIBUTE = 0;
  var EVENT = 1;
  var TEXT = 2;
  var VALUE = 3;
  var REF = 4;
  var expressionTypes = {
    ATTRIBUTE,
    EVENT,
    TEXT,
    VALUE,
    REF,
  };

  // node_modules/riot/esm/dependencies/@riotjs/util/strings.js
  function dashToCamelCase(string) {
    return string.replace(/-(\w)/g, (_4, c) => c.toUpperCase());
  }

  // node_modules/riot/esm/dependencies/@riotjs/util/misc.js
  function panic(message, cause) {
    throw new Error(message, { cause });
  }
  function memoize(fn) {
    const cache = /* @__PURE__ */ new Map();
    const cached = (val) => {
      return cache.has(val) ? cache.get(val) : cache.set(val, fn.call(this, val)) && cache.get(val);
    };
    cached.cache = cache;
    return cached;
  }
  function evaluateAttributeExpressions(attributes) {
    return attributes.reduce((acc, attribute) => {
      const { value, type } = attribute;
      switch (true) {
        // ref attributes shouldn't be evaluated in the props
        case attribute.type === REF:
          break;
        // spread attribute
        case !attribute.name && type === ATTRIBUTE:
          return {
            ...acc,
            ...value,
          };
        // value attribute
        case type === VALUE:
          acc.value = attribute.value;
          break;
        // normal attributes
        default:
          acc[dashToCamelCase(attribute.name)] = attribute.value;
      }
      return acc;
    }, {});
  }

  // node_modules/riot/esm/dependencies/@riotjs/util/checks.js
  function checkType(element, type) {
    return typeof element === type;
  }
  function isSvg(el) {
    const owner = el.ownerSVGElement;
    return !!owner || owner === null;
  }
  function isTemplate(el) {
    return el.tagName.toLowerCase() === 'template';
  }
  function isFunction(value) {
    return checkType(value, 'function');
  }
  function isBoolean(value) {
    return checkType(value, 'boolean');
  }
  function isObject(value) {
    return !isNil(value) && value.constructor === Object;
  }
  function isNil(value) {
    return value === null || value === void 0;
  }

  // node_modules/riot/esm/dependencies/@riotjs/util/dom.js
  function moveChildren(source, target) {
    while (source.firstChild) target.appendChild(source.firstChild);
  }
  function cleanNode(node) {
    while (node.firstChild) node.removeChild(node.firstChild);
  }
  function clearChildren(children) {
    for (let i = 0; i < children.length; i++) removeChild(children[i]);
  }
  var removeChild = (node) => node.remove();
  var insertBefore = (newNode, refNode) =>
    refNode && refNode.parentNode && refNode.parentNode.insertBefore(newNode, refNode);
  var replaceChild = (newNode, replaced) =>
    replaced && replaced.parentNode && replaced.parentNode.replaceChild(newNode, replaced);

  // node_modules/riot/esm/dependencies/@riotjs/util/binding-types.js
  var EACH = 0;
  var IF = 1;
  var SIMPLE = 2;
  var TAG = 3;
  var SLOT = 4;
  var bindingTypes = {
    EACH,
    IF,
    SIMPLE,
    TAG,
    SLOT,
  };

  // node_modules/riot/esm/dependencies/@riotjs/util/objects.js
  function defineProperty(source, key, value, options = {}) {
    Object.defineProperty(source, key, {
      value,
      enumerable: false,
      writable: false,
      configurable: true,
      ...options,
    });
    return source;
  }

  // node_modules/riot/esm/dependencies/@riotjs/dom-bindings/dist/dom-bindings.js
  var HEAD_SYMBOL = Symbol();
  var TAIL_SYMBOL = Symbol();
  function createHeadTailPlaceholders() {
    const head = document.createTextNode('');
    const tail = document.createTextNode('');
    head[HEAD_SYMBOL] = true;
    tail[TAIL_SYMBOL] = true;
    return { head, tail };
  }
  function createTemplateMeta(componentTemplate) {
    const fragment = componentTemplate.dom.cloneNode(true);
    const { head, tail } = createHeadTailPlaceholders();
    return {
      avoidDOMInjection: true,
      fragment,
      head,
      tail,
      children: [head, ...Array.from(fragment.childNodes), tail],
    };
  }
  var udomdiff = (a, b, get2, before) => {
    const bLength = b.length;
    let aEnd = a.length;
    let bEnd = bLength;
    let aStart = 0;
    let bStart = 0;
    let map = null;
    while (aStart < aEnd || bStart < bEnd) {
      if (aEnd === aStart) {
        const node =
          bEnd < bLength ? (bStart ? get2(b[bStart - 1], -0).nextSibling : get2(b[bEnd - bStart], 0)) : before;
        while (bStart < bEnd) insertBefore(get2(b[bStart++], 1), node);
      } else if (bEnd === bStart) {
        while (aStart < aEnd) {
          if (!map || !map.has(a[aStart])) removeChild(get2(a[aStart], -1));
          aStart++;
        }
      } else if (a[aStart] === b[bStart]) {
        aStart++;
        bStart++;
      } else if (a[aEnd - 1] === b[bEnd - 1]) {
        aEnd--;
        bEnd--;
      } else if (a[aStart] === b[bEnd - 1] && b[bStart] === a[aEnd - 1]) {
        const node = get2(a[--aEnd], -1).nextSibling;
        insertBefore(get2(b[bStart++], 1), get2(a[aStart++], -1).nextSibling);
        insertBefore(get2(b[--bEnd], 1), node);
        a[aEnd] = b[bEnd];
      } else {
        if (!map) {
          map = /* @__PURE__ */ new Map();
          let i = bStart;
          while (i < bEnd) map.set(b[i], i++);
        }
        if (map.has(a[aStart])) {
          const index = map.get(a[aStart]);
          if (bStart < index && index < bEnd) {
            let i = aStart;
            let sequence = 1;
            while (++i < aEnd && i < bEnd && map.get(a[i]) === index + sequence) sequence++;
            if (sequence > index - bStart) {
              const node = get2(a[aStart], 0);
              while (bStart < index) insertBefore(get2(b[bStart++], 1), node);
            } else {
              replaceChild(get2(b[bStart++], 1), get2(a[aStart++], -1));
            }
          } else aStart++;
        } else removeChild(get2(a[aStart++], -1));
      }
    }
    return b;
  };
  var UNMOUNT_SCOPE = Symbol('unmount');
  var EachBinding = {
    // dynamic binding properties
    // childrenMap: null,
    // node: null,
    // root: null,
    // condition: null,
    // evaluate: null,
    // template: null,
    // isTemplateTag: false,
    nodes: [],
    // getKey: null,
    // indexName: null,
    // itemName: null,
    // afterPlaceholder: null,
    // placeholder: null,
    // API methods
    mount(scope, parentScope) {
      return this.update(scope, parentScope);
    },
    update(scope, parentScope) {
      const { placeholder, nodes, childrenMap } = this;
      const collection = scope === UNMOUNT_SCOPE ? null : this.evaluate(scope);
      const items = collection ? Array.from(collection) : [];
      const { newChildrenMap, batches, futureNodes } = createPatch(items, scope, parentScope, this);
      udomdiff(nodes, futureNodes, patch(Array.from(childrenMap.values()), parentScope), placeholder);
      batches.forEach((fn) => fn());
      this.childrenMap = newChildrenMap;
      this.nodes = futureNodes;
      return this;
    },
    unmount(scope, parentScope) {
      this.update(UNMOUNT_SCOPE, parentScope);
      return this;
    },
  };
  function patch(redundant, parentScope) {
    return (item, info) => {
      if (info < 0) {
        const element = redundant[redundant.length - 1];
        if (element) {
          const { template, nodes, context } = element;
          nodes.pop();
          if (!nodes.length) {
            redundant.pop();
            template.unmount(context, parentScope, null);
          }
        }
      }
      return item;
    };
  }
  function mustFilterItem(condition, context) {
    return condition ? !condition(context) : false;
  }
  function extendScope(scope, { itemName, indexName, index, item }) {
    defineProperty(scope, itemName, item);
    if (indexName) defineProperty(scope, indexName, index);
    return scope;
  }
  function createPatch(items, scope, parentScope, binding) {
    const { condition, template, childrenMap, itemName, getKey, indexName, root, isTemplateTag } = binding;
    const newChildrenMap = /* @__PURE__ */ new Map();
    const batches = [];
    const futureNodes = [];
    items.forEach((item, index) => {
      const context = extendScope(Object.create(scope), {
        itemName,
        indexName,
        index,
        item,
      });
      const key = getKey ? getKey(context) : index;
      const oldItem = childrenMap.get(key);
      const nodes = [];
      if (mustFilterItem(condition, context)) {
        return;
      }
      const mustMount = !oldItem;
      const componentTemplate = oldItem ? oldItem.template : template.clone();
      const el = componentTemplate.el || root.cloneNode();
      const meta = isTemplateTag && mustMount ? createTemplateMeta(componentTemplate) : componentTemplate.meta;
      if (mustMount) {
        batches.push(() => componentTemplate.mount(el, context, parentScope, meta));
      } else {
        batches.push(() => componentTemplate.update(context, parentScope));
      }
      if (isTemplateTag) {
        nodes.push(...meta.children);
      } else {
        nodes.push(el);
      }
      childrenMap.delete(key);
      futureNodes.push(...nodes);
      newChildrenMap.set(key, {
        nodes,
        template: componentTemplate,
        context,
        index,
      });
    });
    return {
      newChildrenMap,
      batches,
      futureNodes,
    };
  }
  function create$6(node, { evaluate, condition, itemName, indexName, getKey, template }) {
    const placeholder = document.createTextNode('');
    const root = node.cloneNode();
    insertBefore(placeholder, node);
    removeChild(node);
    return {
      ...EachBinding,
      childrenMap: /* @__PURE__ */ new Map(),
      node,
      root,
      condition,
      evaluate,
      isTemplateTag: isTemplate(root),
      template: template.createDOM(node),
      getKey,
      indexName,
      itemName,
      placeholder,
    };
  }
  var IfBinding = {
    // dynamic binding properties
    // node: null,
    // evaluate: null,
    // isTemplateTag: false,
    // placeholder: null,
    // template: null,
    // API methods
    mount(scope, parentScope) {
      return this.update(scope, parentScope);
    },
    update(scope, parentScope) {
      const value = !!this.evaluate(scope);
      const mustMount = !this.value && value;
      const mustUnmount = this.value && !value;
      const mount = () => {
        const pristine = this.node.cloneNode();
        insertBefore(pristine, this.placeholder);
        this.template = this.template.clone();
        this.template.mount(pristine, scope, parentScope);
      };
      switch (true) {
        case mustMount:
          mount();
          break;
        case mustUnmount:
          this.unmount(scope);
          break;
        default:
          if (value) this.template.update(scope, parentScope);
      }
      this.value = value;
      return this;
    },
    unmount(scope, parentScope) {
      this.template.unmount(scope, parentScope, true);
      return this;
    },
  };
  function create$5(node, { evaluate, template }) {
    const placeholder = document.createTextNode('');
    insertBefore(placeholder, node);
    removeChild(node);
    return {
      ...IfBinding,
      node,
      evaluate,
      placeholder,
      template: template.createDOM(node),
    };
  }
  var ElementProto = typeof Element === 'undefined' ? {} : Element.prototype;
  var isNativeHtmlProperty = memoize((name) => ElementProto.hasOwnProperty(name));
  function setAllAttributes(node, attributes) {
    Object.keys(attributes).forEach((name) => attributeExpression({ node, name }, attributes[name]));
  }
  function removeAllAttributes(node, newAttributes, oldAttributes) {
    const newKeys = newAttributes ? Object.keys(newAttributes) : [];
    Object.keys(oldAttributes)
      .filter((name) => !newKeys.includes(name))
      .forEach((attribute) => node.removeAttribute(attribute));
  }
  function canRenderAttribute(value) {
    return ['string', 'number', 'boolean'].includes(typeof value);
  }
  function shouldRemoveAttribute(value, isBoolean2) {
    if (isBoolean2) return !value && value !== 0;
    return typeof value === 'undefined' || value === null;
  }
  function attributeExpression({ node, name, isBoolean: isBoolean$1, value: oldValue }, value) {
    if (!name) {
      if (oldValue) {
        removeAllAttributes(node, value, oldValue);
      }
      if (value) {
        setAllAttributes(node, value);
      }
      return;
    }
    if (!isNativeHtmlProperty(name) && (isBoolean(value) || isObject(value) || isFunction(value))) {
      node[name] = value;
    }
    if (shouldRemoveAttribute(value, isBoolean$1)) {
      node.removeAttribute(name);
    } else if (canRenderAttribute(value)) {
      node.setAttribute(name, normalizeValue(name, value, isBoolean$1));
    }
  }
  function normalizeValue(name, value, isBoolean2) {
    return value === true && isBoolean2 ? name : value;
  }
  var RE_EVENTS_PREFIX = /^on/;
  var getCallbackAndOptions = (value) => (Array.isArray(value) ? value : [value, false]);
  var EventListener = {
    handleEvent(event) {
      this[event.type](event);
    },
  };
  var ListenersWeakMap = /* @__PURE__ */ new WeakMap();
  var createListener = (node) => {
    const listener = Object.create(EventListener);
    ListenersWeakMap.set(node, listener);
    return listener;
  };
  function eventExpression({ node, name }, value) {
    const normalizedEventName = name.replace(RE_EVENTS_PREFIX, '');
    const eventListener = ListenersWeakMap.get(node) || createListener(node);
    const [callback, options] = getCallbackAndOptions(value);
    const handler = eventListener[normalizedEventName];
    const mustRemoveEvent = handler && !callback;
    const mustAddEvent = callback && !handler;
    if (mustRemoveEvent) {
      node.removeEventListener(normalizedEventName, eventListener);
    }
    if (mustAddEvent) {
      node.addEventListener(normalizedEventName, eventListener, options);
    }
    eventListener[normalizedEventName] = callback;
  }
  function normalizeStringValue(value) {
    return isNil(value) ? '' : value;
  }
  var getTextNode = (node, childNodeIndex) => {
    return node.childNodes[childNodeIndex];
  };
  function textExpression({ node }, value) {
    node.data = normalizeStringValue(value);
  }
  function valueExpression({ node }, value) {
    node.value = normalizeStringValue(value);
  }
  function refExpression({ node, value: oldValue }, value) {
    if (value) value(node);
    else oldValue(null);
  }
  var expressions = {
    [ATTRIBUTE]: attributeExpression,
    [EVENT]: eventExpression,
    [TEXT]: textExpression,
    [VALUE]: valueExpression,
    [REF]: refExpression,
  };
  var Expression = {
    // Static props
    // node: null,
    // value: null,
    // API methods
    /**
     * Mount the expression evaluating its initial value
     * @param   {*} scope - argument passed to the expression to evaluate its current values
     * @returns {Expression} self
     */
    mount(scope) {
      this.value = this.evaluate(scope);
      expressions[this.type](this, this.value);
      return this;
    },
    /**
     * Update the expression if its value changed
     * @param   {*} scope - argument passed to the expression to evaluate its current values
     * @returns {Expression} self
     */
    update(scope) {
      const value = this.evaluate(scope);
      if (this.value !== value) {
        expressions[this.type](this, value);
        this.value = value;
      }
      return this;
    },
    /**
     * Expression teardown method
     * @returns {Expression} self
     */
    unmount() {
      if ([EVENT, REF].includes(this.type)) expressions[this.type](this, null);
      return this;
    },
  };
  function create$4(node, data) {
    return {
      ...Expression,
      ...data,
      node: data.type === TEXT ? getTextNode(node, data.childNodeIndex) : node,
    };
  }
  function flattenCollectionMethods(collection, methods, context) {
    return methods.reduce((acc, method) => {
      return {
        ...acc,
        [method]: (scope) => {
          return collection.map((item) => item[method](scope)) && context;
        },
      };
    }, {});
  }
  function create$3(node, { expressions: expressions2 }) {
    return flattenCollectionMethods(
      expressions2.map((expression) => create$4(node, expression)),
      ['mount', 'update', 'unmount']
    );
  }
  var extendParentScope = (attributes, scope, parentScope) => {
    if (!attributes || !attributes.length) return parentScope;
    const expressions2 = attributes.map((attr) => ({
      ...attr,
      value: attr.evaluate(scope),
    }));
    return Object.assign(Object.create(parentScope || null), evaluateAttributeExpressions(expressions2));
  };
  var findSlotById = (id, slots) => slots?.find((slot) => slot.id === id);
  var getRealParent = (scope, parentScope) => scope[PARENT_KEY_SYMBOL] || parentScope;
  var SlotBinding = {
    // dynamic binding properties
    // node: null,
    // name: null,
    attributes: [],
    // templateData: null,
    // template: null,
    getTemplateScope(scope, parentScope) {
      return extendParentScope(this.attributes, scope, parentScope);
    },
    // API methods
    mount(scope, parentScope) {
      const templateData = scope.slots ? findSlotById(this.name, scope.slots) : false;
      const { parentNode } = this.node;
      const realParent = templateData ? getRealParent(scope, parentScope) : scope;
      this.templateData = templateData?.html ? templateData : findSlotById(this.name, realParent.slots);
      this.template =
        (this.templateData && create(this.templateData.html, this.templateData.bindings).createDOM(parentNode)) || // otherwise use the optional template fallback if provided by the compiler see also https://github.com/riot/riot/issues/3014
        this.template?.clone();
      if (this.template) {
        cleanNode(this.node);
        this.template.mount(this.node, this.getTemplateScope(scope, realParent), realParent);
        this.template.children = Array.from(this.node.childNodes);
      }
      moveSlotInnerContent(this.node);
      removeChild(this.node);
      return this;
    },
    update(scope, parentScope) {
      if (this.template) {
        const realParent = this.templateData ? getRealParent(scope, parentScope) : scope;
        this.template.update(this.getTemplateScope(scope, realParent), realParent);
      }
      return this;
    },
    unmount(scope, parentScope, mustRemoveRoot) {
      if (this.template) {
        this.template.unmount(this.getTemplateScope(scope, parentScope), null, mustRemoveRoot);
      }
      return this;
    },
  };
  function moveSlotInnerContent(slot) {
    const child = slot && slot.firstChild;
    if (!child) return;
    insertBefore(child, slot);
    moveSlotInnerContent(slot);
  }
  function createSlot(node, { name, attributes, template }) {
    return {
      ...SlotBinding,
      attributes,
      template,
      node,
      name,
    };
  }
  function getTag(component, slots = [], attributes = []) {
    if (component) {
      return component({ slots, attributes });
    }
    return create(slotsToMarkup(slots), [
      ...slotBindings(slots),
      {
        // the attributes should be registered as binding
        // if we fallback to a normal template chunk
        expressions: attributes.map((attr) => {
          return {
            type: ATTRIBUTE,
            ...attr,
          };
        }),
      },
    ]);
  }
  function slotBindings(slots) {
    return slots.reduce((acc, { bindings: bindings2 }) => acc.concat(bindings2), []);
  }
  function slotsToMarkup(slots) {
    return slots.reduce((acc, slot) => {
      return acc + slot.html;
    }, '');
  }
  var TagBinding = {
    // dynamic binding properties
    // node: null,
    // evaluate: null,
    // name: null,
    // slots: null,
    // tag: null,
    // attributes: null,
    // getComponent: null,
    mount(scope) {
      return this.update(scope);
    },
    update(scope, parentScope) {
      const name = this.evaluate(scope);
      if (name && name === this.name) {
        this.tag.update(scope);
      } else {
        this.unmount(scope, parentScope, true);
        this.name = name;
        this.tag = getTag(this.getComponent(name), this.slots, this.attributes);
        this.tag.mount(this.node, scope);
      }
      return this;
    },
    unmount(scope, parentScope, keepRootTag) {
      if (this.tag) {
        this.tag.unmount(keepRootTag);
      }
      return this;
    },
  };
  function create$2(node, { evaluate, getComponent, slots, attributes }) {
    return {
      ...TagBinding,
      node,
      evaluate,
      slots,
      attributes,
      getComponent,
    };
  }
  var bindings = {
    [IF]: create$5,
    [SIMPLE]: create$3,
    [EACH]: create$6,
    [TAG]: create$2,
    [SLOT]: createSlot,
  };
  function fixTextExpressionsOffset(expressions2, textExpressionsOffset) {
    return expressions2.map((e) =>
      e.type === TEXT
        ? {
            ...e,
            childNodeIndex: e.childNodeIndex + textExpressionsOffset,
          }
        : e
    );
  }
  function create$1(root, binding, templateTagOffset) {
    const { selector, type, redundantAttribute, expressions: expressions2 } = binding;
    const node = selector ? root.querySelector(selector) : root;
    if (redundantAttribute) node.removeAttribute(redundantAttribute);
    const bindingExpressions = expressions2 || [];
    return (bindings[type] || bindings[SIMPLE])(node, {
      ...binding,
      expressions:
        templateTagOffset && !selector
          ? fixTextExpressionsOffset(bindingExpressions, templateTagOffset)
          : bindingExpressions,
    });
  }
  function createHTMLTree(html, root) {
    const template = isTemplate(root) ? root : document.createElement('template');
    template.innerHTML = html;
    return template.content;
  }
  function createSVGTree(html, container) {
    const svgNode = container.ownerDocument.importNode(
      new window.DOMParser().parseFromString(`<svg xmlns="http://www.w3.org/2000/svg">${html}</svg>`, 'application/xml')
        .documentElement,
      true
    );
    return svgNode;
  }
  function createDOMTree(root, html) {
    if (isSvg(root)) return createSVGTree(html, root);
    return createHTMLTree(html, root);
  }
  function injectDOM(el, dom) {
    switch (true) {
      case isSvg(el):
        moveChildren(dom, el);
        break;
      case isTemplate(el):
        el.parentNode.replaceChild(dom, el);
        break;
      default:
        el.appendChild(dom);
    }
  }
  function createTemplateDOM(el, html) {
    return html && (typeof html === 'string' ? createDOMTree(el, html) : html);
  }
  function getTemplateTagOffset(parentNode, el, meta) {
    const siblings = Array.from(parentNode.childNodes);
    return Math.max(siblings.indexOf(el), siblings.indexOf(meta.head) + 1, 0);
  }
  var TemplateChunk = {
    // Static props
    // bindings: null,
    // bindingsData: null,
    // html: null,
    // isTemplateTag: false,
    // fragment: null,
    // children: null,
    // dom: null,
    // el: null,
    /**
     * Create the template DOM structure that will be cloned on each mount
     * @param   {HTMLElement} el - the root node
     * @returns {TemplateChunk} self
     */
    createDOM(el) {
      this.dom = this.dom || createTemplateDOM(el, this.html) || document.createDocumentFragment();
      return this;
    },
    // API methods
    /**
     * Attach the template to a DOM node
     * @param   {HTMLElement} el - target DOM node
     * @param   {*} scope - template data
     * @param   {*} parentScope - scope of the parent template tag
     * @param   {Object} meta - meta properties needed to handle the <template> tags in loops
     * @returns {TemplateChunk} self
     */
    mount(el, scope, parentScope, meta = {}) {
      if (!el) panic('Please provide DOM node to mount properly your template');
      if (this.el) this.unmount(scope);
      const { fragment, children, avoidDOMInjection } = meta;
      const { parentNode } = children ? children[0] : el;
      const isTemplateTag = isTemplate(el);
      const templateTagOffset = isTemplateTag ? getTemplateTagOffset(parentNode, el, meta) : null;
      this.createDOM(el);
      const cloneNode = fragment || this.dom.cloneNode(true);
      this.el = isTemplateTag ? parentNode : el;
      this.children = isTemplateTag ? children || Array.from(cloneNode.childNodes) : null;
      if (!avoidDOMInjection && cloneNode) injectDOM(el, cloneNode);
      this.bindings = this.bindingsData.map((binding) => create$1(this.el, binding, templateTagOffset));
      this.bindings.forEach((b) => b.mount(scope, parentScope));
      this.meta = meta;
      return this;
    },
    /**
     * Update the template with fresh data
     * @param   {*} scope - template data
     * @param   {*} parentScope - scope of the parent template tag
     * @returns {TemplateChunk} self
     */
    update(scope, parentScope) {
      this.bindings.forEach((b) => b.update(scope, parentScope));
      return this;
    },
    /**
     * Remove the template from the node where it was initially mounted
     * @param   {*} scope - template data
     * @param   {*} parentScope - scope of the parent template tag
     * @param   {boolean|null} mustRemoveRoot - if true remove the root element,
     * if false or undefined clean the root tag content, if null don't touch the DOM
     * @returns {TemplateChunk} self
     */
    unmount(scope, parentScope, mustRemoveRoot = false) {
      const el = this.el;
      if (!el) {
        return this;
      }
      this.bindings.forEach((b) => b.unmount(scope, parentScope, mustRemoveRoot));
      switch (true) {
        // pure components should handle the DOM unmount updates by themselves
        // for mustRemoveRoot === null don't touch the DOM
        case el[IS_PURE_SYMBOL] || mustRemoveRoot === null:
          break;
        // if children are declared, clear them
        // applicable for <template> and <slot/> bindings
        case Array.isArray(this.children):
          clearChildren(this.children);
          break;
        // clean the node children only
        case !mustRemoveRoot:
          cleanNode(el);
          break;
        // remove the root node only if the mustRemoveRoot is truly
        case !!mustRemoveRoot:
          removeChild(el);
          break;
      }
      this.el = null;
      return this;
    },
    /**
     * Clone the template chunk
     * @returns {TemplateChunk} a clone of this object resetting the this.el property
     */
    clone() {
      return {
        ...this,
        meta: {},
        el: null,
      };
    },
  };
  function create(html, bindings2 = []) {
    return {
      ...TemplateChunk,
      html,
      bindingsData: bindings2,
    };
  }

  // node_modules/riot/esm/dependencies/bianco.dom-to-array/index.next.js
  function domToArray(els) {
    if (!Array.isArray(els)) {
      if (
        /^\[object (HTMLCollection|NodeList|Object)\]$/.test(Object.prototype.toString.call(els)) &&
        typeof els.length === 'number'
      )
        return Array.from(els);
      else return [els];
    }
    return els;
  }

  // node_modules/riot/esm/dependencies/bianco.query/index.next.js
  function $2(selector, scope) {
    return domToArray(typeof selector === 'string' ? (scope || document).querySelectorAll(selector) : selector);
  }

  // node_modules/riot/esm/dependencies/bianco.attr/index.next.js
  function set(els, name, value) {
    const attrs = typeof name === 'object' ? name : { [name]: value };
    const props = Object.keys(attrs);
    domToArray(els).forEach((el) => {
      props.forEach((prop) => el.setAttribute(prop, attrs[prop]));
    });
    return els;
  }

  // node_modules/riot/esm/core/css-manager.js
  var CSS_BY_NAME = /* @__PURE__ */ new Map();
  var STYLE_NODE_SELECTOR = 'style[riot]';
  var getStyleNode = /* @__PURE__ */ ((style) => {
    return () => {
      if (style) return style;
      style = $2(STYLE_NODE_SELECTOR)[0] || document.createElement('style');
      set(style, 'type', 'text/css');
      if (!style.parentNode) document.head.appendChild(style);
      return style;
    };
  })();
  var cssManager = {
    CSS_BY_NAME,
    /**
     * Save a tag style to be later injected into DOM
     * @param { string } name - if it's passed we will map the css to a tagname
     * @param { string } css - css string
     * @returns {Object} self
     */
    add(name, css) {
      if (!CSS_BY_NAME.has(name)) {
        CSS_BY_NAME.set(name, css);
        this.inject();
      }
      return this;
    },
    /**
     * Inject all previously saved tag styles into DOM
     * innerHTML seems slow: http://jsperf.com/riot-insert-style
     * @returns {Object} self
     */
    inject() {
      getStyleNode().innerHTML = [...CSS_BY_NAME.values()].join('\n');
      return this;
    },
    /**
     * Remove a tag style from the DOM
     * @param {string} name a registered tagname
     * @returns {Object} self
     */
    remove(name) {
      if (CSS_BY_NAME.has(name)) {
        CSS_BY_NAME.delete(name);
        this.inject();
      }
      return this;
    },
  };

  // node_modules/riot/esm/api/pure.js
  function pure(func) {
    if (!isFunction(func)) panic('riot.pure accepts only arguments of type "function"');
    func[IS_PURE_SYMBOL] = true;
    return func;
  }

  // node_modules/riot/esm/api/__.js
  var __ = {
    cssManager,
    DOMBindings: {
      template: create,
      createBinding: create$1,
      createExpression: create$4,
      bindingTypes,
      expressionTypes,
    },
    globals: {
      PROPS_KEY,
      STATE_KEY,
      IS_COMPONENT_UPDATING,
      ATTRIBUTES_KEY_SYMBOL,
      COMPONENTS_IMPLEMENTATION_MAP,
      PLUGINS_SET,
      DOM_COMPONENT_INSTANCE_PROPERTY,
      PARENT_KEY_SYMBOL,
    },
  };

  // node_modules/@riotjs/route/index.js
  function lexer(str) {
    var tokens = [];
    var i = 0;
    while (i < str.length) {
      var char = str[i];
      if (char === '*' || char === '+' || char === '?') {
        tokens.push({ type: 'MODIFIER', index: i, value: str[i++] });
        continue;
      }
      if (char === '\\') {
        tokens.push({ type: 'ESCAPED_CHAR', index: i++, value: str[i++] });
        continue;
      }
      if (char === '{') {
        tokens.push({ type: 'OPEN', index: i, value: str[i++] });
        continue;
      }
      if (char === '}') {
        tokens.push({ type: 'CLOSE', index: i, value: str[i++] });
        continue;
      }
      if (char === ':') {
        var name = '';
        var j = i + 1;
        while (j < str.length) {
          var code = str.charCodeAt(j);
          if (
            // `0-9`
            (code >= 48 && code <= 57) || // `A-Z`
            (code >= 65 && code <= 90) || // `a-z`
            (code >= 97 && code <= 122) || // `_`
            code === 95
          ) {
            name += str[j++];
            continue;
          }
          break;
        }
        if (!name) throw new TypeError('Missing parameter name at '.concat(i));
        tokens.push({ type: 'NAME', index: i, value: name });
        i = j;
        continue;
      }
      if (char === '(') {
        var count = 1;
        var pattern = '';
        var j = i + 1;
        if (str[j] === '?') {
          throw new TypeError('Pattern cannot start with "?" at '.concat(j));
        }
        while (j < str.length) {
          if (str[j] === '\\') {
            pattern += str[j++] + str[j++];
            continue;
          }
          if (str[j] === ')') {
            count--;
            if (count === 0) {
              j++;
              break;
            }
          } else if (str[j] === '(') {
            count++;
            if (str[j + 1] !== '?') {
              throw new TypeError('Capturing groups are not allowed at '.concat(j));
            }
          }
          pattern += str[j++];
        }
        if (count) throw new TypeError('Unbalanced pattern at '.concat(i));
        if (!pattern) throw new TypeError('Missing pattern at '.concat(i));
        tokens.push({ type: 'PATTERN', index: i, value: pattern });
        i = j;
        continue;
      }
      tokens.push({ type: 'CHAR', index: i, value: str[i++] });
    }
    tokens.push({ type: 'END', index: i, value: '' });
    return tokens;
  }
  function parse(str, options) {
    if (options === void 0) {
      options = {};
    }
    var tokens = lexer(str);
    var _a = options.prefixes,
      prefixes = _a === void 0 ? './' : _a;
    var defaultPattern = '[^'.concat(escapeString(options.delimiter || '/#?'), ']+?');
    var result = [];
    var key = 0;
    var i = 0;
    var path = '';
    var tryConsume = function (type) {
      if (i < tokens.length && tokens[i].type === type) return tokens[i++].value;
    };
    var mustConsume = function (type) {
      var value2 = tryConsume(type);
      if (value2 !== void 0) return value2;
      var _a2 = tokens[i],
        nextType = _a2.type,
        index = _a2.index;
      throw new TypeError('Unexpected '.concat(nextType, ' at ').concat(index, ', expected ').concat(type));
    };
    var consumeText = function () {
      var result2 = '';
      var value2;
      while ((value2 = tryConsume('CHAR') || tryConsume('ESCAPED_CHAR'))) {
        result2 += value2;
      }
      return result2;
    };
    while (i < tokens.length) {
      var char = tryConsume('CHAR');
      var name = tryConsume('NAME');
      var pattern = tryConsume('PATTERN');
      if (name || pattern) {
        var prefix = char || '';
        if (prefixes.indexOf(prefix) === -1) {
          path += prefix;
          prefix = '';
        }
        if (path) {
          result.push(path);
          path = '';
        }
        result.push({
          name: name || key++,
          prefix,
          suffix: '',
          pattern: pattern || defaultPattern,
          modifier: tryConsume('MODIFIER') || '',
        });
        continue;
      }
      var value = char || tryConsume('ESCAPED_CHAR');
      if (value) {
        path += value;
        continue;
      }
      if (path) {
        result.push(path);
        path = '';
      }
      var open = tryConsume('OPEN');
      if (open) {
        var prefix = consumeText();
        var name_1 = tryConsume('NAME') || '';
        var pattern_1 = tryConsume('PATTERN') || '';
        var suffix = consumeText();
        mustConsume('CLOSE');
        result.push({
          name: name_1 || (pattern_1 ? key++ : ''),
          pattern: name_1 && !pattern_1 ? defaultPattern : pattern_1,
          prefix,
          suffix,
          modifier: tryConsume('MODIFIER') || '',
        });
        continue;
      }
      mustConsume('END');
    }
    return result;
  }
  function escapeString(str) {
    return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, '\\$1');
  }
  function flags(options) {
    return options && options.sensitive ? '' : 'i';
  }
  function regexpToRegexp(path, keys) {
    if (!keys) return path;
    var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
    var index = 0;
    var execResult = groupsRegex.exec(path.source);
    while (execResult) {
      keys.push({
        // Use parenthesized substring match if available, index otherwise
        name: execResult[1] || index++,
        prefix: '',
        suffix: '',
        modifier: '',
        pattern: '',
      });
      execResult = groupsRegex.exec(path.source);
    }
    return path;
  }
  function arrayToRegexp(paths, keys, options) {
    var parts = paths.map(function (path) {
      return pathToRegexp(path, keys, options).source;
    });
    return new RegExp('(?:'.concat(parts.join('|'), ')'), flags(options));
  }
  function stringToRegexp(path, keys, options) {
    return tokensToRegexp(parse(path, options), keys, options);
  }
  function tokensToRegexp(tokens, keys, options) {
    if (options === void 0) {
      options = {};
    }
    var _a = options.strict,
      strict = _a === void 0 ? false : _a,
      _b = options.start,
      start = _b === void 0 ? true : _b,
      _c = options.end,
      end = _c === void 0 ? true : _c,
      _d = options.encode,
      encode =
        _d === void 0
          ? function (x) {
              return x;
            }
          : _d,
      _e = options.delimiter,
      delimiter = _e === void 0 ? '/#?' : _e,
      _f = options.endsWith,
      endsWith = _f === void 0 ? '' : _f;
    var endsWithRe = '['.concat(escapeString(endsWith), ']|$');
    var delimiterRe = '['.concat(escapeString(delimiter), ']');
    var route = start ? '^' : '';
    for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
      var token = tokens_1[_i];
      if (typeof token === 'string') {
        route += escapeString(encode(token));
      } else {
        var prefix = escapeString(encode(token.prefix));
        var suffix = escapeString(encode(token.suffix));
        if (token.pattern) {
          if (keys) keys.push(token);
          if (prefix || suffix) {
            if (token.modifier === '+' || token.modifier === '*') {
              var mod = token.modifier === '*' ? '?' : '';
              route += '(?:'
                .concat(prefix, '((?:')
                .concat(token.pattern, ')(?:')
                .concat(suffix)
                .concat(prefix, '(?:')
                .concat(token.pattern, '))*)')
                .concat(suffix, ')')
                .concat(mod);
            } else {
              route += '(?:'.concat(prefix, '(').concat(token.pattern, ')').concat(suffix, ')').concat(token.modifier);
            }
          } else {
            if (token.modifier === '+' || token.modifier === '*') {
              route += '((?:'.concat(token.pattern, ')').concat(token.modifier, ')');
            } else {
              route += '('.concat(token.pattern, ')').concat(token.modifier);
            }
          }
        } else {
          route += '(?:'.concat(prefix).concat(suffix, ')').concat(token.modifier);
        }
      }
    }
    if (end) {
      if (!strict) route += ''.concat(delimiterRe, '?');
      route += !options.endsWith ? '$' : '(?='.concat(endsWithRe, ')');
    } else {
      var endToken = tokens[tokens.length - 1];
      var isEndDelimited =
        typeof endToken === 'string' ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
      if (!strict) {
        route += '(?:'.concat(delimiterRe, '(?=').concat(endsWithRe, '))?');
      }
      if (!isEndDelimited) {
        route += '(?='.concat(delimiterRe, '|').concat(endsWithRe, ')');
      }
    }
    return new RegExp(route, flags(options));
  }
  function pathToRegexp(path, keys, options) {
    if (path instanceof RegExp) return regexpToRegexp(path, keys);
    if (Array.isArray(path)) return arrayToRegexp(path, keys, options);
    return stringToRegexp(path, keys, options);
  }
  var CANCEL = Symbol();
  ruit.cancel = () => CANCEL;
  ruit.compose = (...tasks) => ruit(...tasks.reverse());
  function ruit(...tasks) {
    return new Promise((resolve, reject) => {
      return (function run(queue, result) {
        if (!queue.length) return resolve(result);
        const [task, ...rest] = queue;
        const value = typeof task === 'function' ? task(result) : task;
        const done = (v) => run(rest, v);
        if (value != null) {
          if (value === CANCEL) return;
          if (value.then) return value.then(done, reject);
        }
        return Promise.resolve(done(value));
      })(tasks);
    });
  }
  var API_METHODS = /* @__PURE__ */ new Set();
  var UNSUBSCRIBE_SYMBOL = Symbol();
  var UNSUBSCRIBE_METHOD = 'off';
  var CANCEL_METHOD = 'cancel';
  function createStream(modifiers) {
    const stream = (function* stream2() {
      while (true) {
        const input = yield;
        yield ruit(input, ...modifiers);
      }
    })();
    stream.next();
    return stream;
  }
  function dispatch(callbacks, value) {
    callbacks.forEach((f) => {
      if (f(value) === UNSUBSCRIBE_SYMBOL) callbacks.delete(f);
    });
    return callbacks;
  }
  function panic$1(message) {
    throw new Error(message);
  }
  erre.install = function (name, fn) {
    if (!name || typeof name !== 'string') panic$1('Please provide a name (as string) for your erre plugin');
    if (!fn || typeof fn !== 'function') panic$1('Please provide a function for your erre plugin');
    if (API_METHODS.has(name)) {
      panic$1(`The ${name} is already part of the erre API, please provide a different name`);
    } else {
      erre[name] = fn;
      API_METHODS.add(name);
    }
    return erre;
  };
  erre.install(CANCEL_METHOD, ruit.cancel);
  erre.install(UNSUBSCRIBE_METHOD, () => UNSUBSCRIBE_SYMBOL);
  function erre(...fns) {
    const [success, error, end, modifiers] = [
        /* @__PURE__ */ new Set(),
        /* @__PURE__ */ new Set(),
        /* @__PURE__ */ new Set(),
        new Set(fns),
      ],
      generator = createStream(modifiers),
      stream = Object.create(generator),
      addToCollection = (collection) => (fn) => collection.add(fn) && stream,
      deleteFromCollection = (collection) => (fn) =>
        collection.delete(fn) ? stream : panic$1("Couldn't remove handler passed by reference");
    return Object.assign(stream, {
      on: Object.freeze({
        value: addToCollection(success),
        error: addToCollection(error),
        end: addToCollection(end),
      }),
      off: Object.freeze({
        value: deleteFromCollection(success),
        error: deleteFromCollection(error),
        end: deleteFromCollection(end),
      }),
      connect: addToCollection(modifiers),
      push(input) {
        const { value, done } = stream.next(input);
        if (!done) {
          value.then(
            (res) => dispatch(success, res),
            (err) => dispatch(error, err)
          );
        }
        return stream;
      },
      end() {
        generator.return();
        dispatch(end);
        [success, error, end, modifiers].forEach((el) => el.clear());
        return stream;
      },
      fork() {
        return erre(...modifiers);
      },
      next(input) {
        const result = generator.next(input);
        generator.next();
        return result;
      },
    });
  }
  var isString = (str) => typeof str === 'string';
  var parseURL = (...args) => new URL(...args);
  var replaceBase = (path) => path.replace(defaults.base, '');
  var matchOrSkip = (pathRegExp) => (path) => (match(path, pathRegExp) ? path : erre.cancel());
  var joinStreams = (dispatcherStream, receiverStream) => {
    dispatcherStream.on.value(receiverStream.push);
    receiverStream.on.end(() => {
      dispatcherStream.off.value(receiverStream.push);
    });
    return receiverStream;
  };
  var panic$2 = (error) => {
    if (defaults.silentErrors) return;
    throw new Error(error);
  };
  var filterStrings = (str) => (isString(str) ? str : erre.cancel());
  var router = erre(filterStrings).on.error(panic$2);
  var mergeOptions = (options) => ({ ...defaults, ...options });
  var defaults = {
    base: 'https://localhost',
    silentErrors: false,
    // pathToRegexp options
    sensitive: false,
    strict: false,
    end: true,
    start: true,
    delimiter: '/#?',
    encode: void 0,
    endsWith: void 0,
    prefixes: './',
  };
  var configure = (options) => {
    Object.entries(options).forEach(([key, value]) => {
      if (Object.hasOwn(defaults, key)) defaults[key] = value;
    });
    return defaults;
  };
  var toRegexp = (path, keys, options) => pathToRegexp(path, keys, mergeOptions(options));
  var toURL = (path, pathRegExp, options = {}) => {
    const { base } = mergeOptions(options);
    const [, ...params] = pathRegExp.exec(path);
    const url = parseURL(path, base);
    url.params = params.reduce((acc, param, index) => {
      const key = options.keys && options.keys[index];
      if (key) acc[key.name] = param ? decodeURIComponent(param) : param;
      return acc;
    }, {});
    return url;
  };
  var match = (path, pathRegExp) => pathRegExp.test(path);
  var createURLStreamPipe = (pathRegExp, options) => [
    decodeURI,
    replaceBase,
    matchOrSkip(pathRegExp),
    (path) => toURL(path, pathRegExp, options),
  ];
  function createRoute(path, options) {
    const keys = [];
    const pathRegExp = pathToRegexp(path, keys, options);
    const URLStream = erre(
      ...createURLStreamPipe(pathRegExp, {
        ...options,
        keys,
      })
    );
    return joinStreams(router, URLStream).on.error(panic$2);
  }
  var WINDOW_EVENTS = 'popstate';
  var CLICK_EVENT = 'click';
  var DOWNLOAD_LINK_ATTRIBUTE = 'download';
  var HREF_LINK_ATTRIBUTE = 'href';
  var TARGET_SELF_LINK_ATTRIBUTE = '_self';
  var LINK_TAG_NAME = 'A';
  var HASH = '#';
  var SLASH = '/';
  var PATH_ATTRIBUTE = 'path';
  var RE_ORIGIN = /^.+?\/\/+[^/]+/;
  function domToArray2(els) {
    if (!Array.isArray(els)) {
      if (
        /^\[object (HTMLCollection|NodeList|Object)\]$/.test(Object.prototype.toString.call(els)) &&
        typeof els.length === 'number'
      )
        return Array.from(els);
      else return [els];
    }
    return els;
  }
  function $3(selector, scope) {
    return domToArray2(typeof selector === 'string' ? document.querySelectorAll(selector) : selector);
  }
  var getCurrentRoute = ((currentRoute) => {
    router.on.value((r) => (currentRoute = r));
    return () => {
      return currentRoute;
    };
  })(null);
  var normalize = (values) => (values.length === 1 ? values[0] : values);
  function parseNodes(els, name, method) {
    const names = typeof name === 'string' ? [name] : name;
    return normalize(
      domToArray2(els).map((el) => {
        return normalize(names.map((n) => el[method](n)));
      })
    );
  }
  function get(els, name) {
    return parseNodes(els, name, 'getAttribute');
  }
  function has(els, name) {
    return parseNodes(els, name, 'hasAttribute');
  }
  function dashToCamelCase2(string) {
    return string.replace(/-(\w)/g, (_4, c) => c.toUpperCase());
  }
  function isNil2(value) {
    return value === null || value === void 0;
  }
  var getGlobal = () => getWindow() || global;
  var getWindow = () => (typeof window === 'undefined' ? null : window);
  var getDocument = () => (typeof document === 'undefined' ? null : document);
  var getHistory = () => (typeof history === 'undefined' ? null : history);
  var getLocation = () => {
    const win = getWindow();
    return win ? win.location : {};
  };
  var defer = (() => {
    const globalScope = getGlobal();
    return globalScope.requestAnimationFrame || globalScope.setTimeout;
  })();
  var cancelDefer = (() => {
    const globalScope = getGlobal();
    return globalScope.cancelAnimationFrame || globalScope.clearTimeout;
  })();
  var getAttribute = (attributes, name, context) => {
    if (!attributes) return null;
    const normalizedAttributes = attributes.flatMap((attr) =>
      isNil2(attr.name)
        ? // add support for spread attributes https://github.com/riot/route/issues/178
          Object.entries(attr.evaluate(context)).map(([key, value]) => ({
            // evaluate each value of the spread attribute and store it into the array
            name: key,
            // create a nested evaluate function pointing to the original value of the spread object
            evaluate: () => value,
          }))
        : attr
    );
    return normalizedAttributes.find((a) => dashToCamelCase2(a.name) === name);
  };
  var createDefaultSlot = (attributes = []) => {
    const { template, bindingTypes: bindingTypes2, expressionTypes: expressionTypes2 } = __.DOMBindings;
    return template(null, [
      {
        type: bindingTypes2.SLOT,
        name: 'default',
        attributes: attributes.map((attr) => ({
          ...attr,
          type: expressionTypes2.ATTRIBUTE,
        })),
      },
    ]);
  };
  var isValidQuerySelectorString = (selector) => /^([a-zA-Z0-9-_*#.:[\]\s>+~()='"]|\\.)+$/.test(selector);
  function compose(...fns) {
    return fns.reduce(
      (f, g) =>
        (...args) =>
          f(g(...args))
    );
  }
  var getInitialRouteValue = (pathToRegexp2, path, options) => {
    const route = compose(...createURLStreamPipe(pathToRegexp2, options).reverse())(path);
    return route.params ? route : null;
  };
  var clearDOMBetweenNodes = (first, last, includeBoundaries) => {
    const clear = (node) => {
      if (!node || (node === last && !includeBoundaries)) return;
      const { nextSibling } = node;
      node.remove();
      clear(nextSibling);
    };
    clear(includeBoundaries ? first : first.nextSibling);
  };
  var routeHoc$1 = ({ slots, attributes }) => {
    const placeholders = {
      before: document.createTextNode(''),
      after: document.createTextNode(''),
    };
    return {
      mount(el, context) {
        const currentRoute = getCurrentRoute();
        const path = getAttribute(attributes, PATH_ATTRIBUTE, context)?.evaluate(context) || get(el, PATH_ATTRIBUTE);
        const pathToRegexp2 = toRegexp(path, []);
        const state = {
          pathToRegexp: pathToRegexp2,
          route:
            currentRoute && match(currentRoute, pathToRegexp2)
              ? getInitialRouteValue(pathToRegexp2, currentRoute, {})
              : null,
        };
        this.el = el;
        this.slot = createDefaultSlot([
          {
            isBoolean: false,
            name: 'route',
            evaluate: () => this.state.route,
          },
        ]);
        this.context = context;
        this.state = state;
        this.boundOnBeforeRoute = this.onBeforeRoute.bind(this);
        this.boundOnRoute = this.onRoute.bind(this);
        router.on.value(this.boundOnBeforeRoute);
        this.stream = createRoute(path).on.value(this.boundOnRoute);
        el.replaceWith(placeholders.before);
        placeholders.before.parentNode.insertBefore(placeholders.after, placeholders.before.nextSibling);
        if (state.route) this.mountSlot();
      },
      update(context) {
        this.context = context;
        if (this.state.route) this.slot.update({}, context);
      },
      mountSlot() {
        const { route } = this.state;
        placeholders.before.parentNode.insertBefore(this.el, placeholders.before.nextSibling);
        this.callLifecycleProperty('onBeforeMount', route);
        this.slot.mount(
          this.el,
          {
            slots,
          },
          this.context
        );
        this.callLifecycleProperty('onMounted', route);
      },
      clearDOM(includeBoundaries) {
        clearDOMBetweenNodes(placeholders.before, placeholders.after, includeBoundaries);
      },
      unmount() {
        router.off.value(this.boundOnBeforeRoute);
        this.slot.unmount({}, this.context, true);
        this.clearDOM(true);
        this.stream.end();
      },
      onBeforeRoute(path) {
        const { route } = this.state;
        if (!route || match(path, this.state.pathToRegexp)) return;
        this.callLifecycleProperty('onBeforeUnmount', route);
        this.slot.unmount({}, this.context, true);
        this.clearDOM(false);
        this.state.route = null;
        this.callLifecycleProperty('onUnmounted', route);
      },
      onRoute(route) {
        const prevRoute = this.state.route;
        this.state.route = route;
        if (prevRoute) {
          this.callLifecycleProperty('onBeforeUpdate', route);
          this.slot.update({}, this.context);
          this.callLifecycleProperty('onUpdated', route);
        } else this.mountSlot();
        if (route.hash && isValidQuerySelectorString(route.hash)) $3(route.hash)?.[0].scrollIntoView();
      },
      callLifecycleProperty(method, ...params) {
        const attr = getAttribute(attributes, method, this.context);
        if (attr) attr.evaluate(this.context)(...params);
      },
    };
  };
  var routeHoc = {
    css: null,
    exports: pure(routeHoc$1),
    template: null,
    name: 'route-hoc',
  };
  var normalizeInitialSlash = (str) => (str[0] === SLASH ? str : `${SLASH}${str}`);
  var removeTrailingSlash = (str) => (str[str.length - 1] === SLASH ? str.substr(0, str.length - 1) : str);
  var normalizeBase = (base) => {
    const win = getWindow();
    const loc = win.location;
    const root = loc ? `${loc.protocol}//${loc.host}` : '';
    const { pathname } = loc ? loc : {};
    switch (true) {
      // pure root url + pathname
      case Boolean(base) === false:
        return removeTrailingSlash(`${root}${pathname || ''}`);
      // full path base
      case /(www|http(s)?:)/.test(base):
        return base;
      // hash navigation
      case base[0] === HASH:
        return `${root}${pathname && pathname !== SLASH ? pathname : ''}${base}`;
      // root url with trailing slash
      case base === SLASH:
        return removeTrailingSlash(root);
      // custom pathname
      default:
        return removeTrailingSlash(`${root}${normalizeInitialSlash(base)}`);
    }
  };
  function setBase(base) {
    configure({ base: normalizeBase(base) });
  }
  function panic2(message, cause) {
    throw new Error(message, { cause });
  }
  var split = (l) => l.split(/\s/);
  function manageEvents(els, evList, cb, method, options) {
    els = domToArray2(els);
    split(evList).forEach((e) => {
      els.forEach((el) => el[method](e, cb, options || false));
    });
  }
  function add(els, evList, cb, options) {
    manageEvents(els, evList, cb, 'addEventListener', options);
    return els;
  }
  function remove(els, evList, cb, options) {
    manageEvents(els, evList, cb, 'removeEventListener', options);
    return els;
  }
  var onWindowEvent = () => router.push(normalizePath(String(getLocation().href)));
  var onRouterPush = (path) => {
    const url = path.includes(defaults.base) ? path : defaults.base + path;
    const loc = getLocation();
    const hist = getHistory();
    const doc = getDocument();
    if (hist && url !== loc.href) {
      hist.pushState(null, doc.title, url);
    }
  };
  var getLinkElement = (node) => (node && !isLinkNode(node) ? getLinkElement(node.parentNode) : node);
  var isLinkNode = (node) => node.nodeName === LINK_TAG_NAME;
  var isCrossOriginLink = (path) => path.indexOf(getLocation().href.match(RE_ORIGIN)[0]) === -1;
  var isTargetSelfLink = (el) => el.target && el.target !== TARGET_SELF_LINK_ATTRIBUTE;
  var isEventForbidden = (event) =>
    (event.which && event.which !== 1) || // not left click
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey || // or meta keys
    event.defaultPrevented;
  var isForbiddenLink = (el) =>
    !el ||
    !isLinkNode(el) || // not A tag
    has(el, DOWNLOAD_LINK_ATTRIBUTE) || // has download attr
    !has(el, HREF_LINK_ATTRIBUTE) || // has no href attr
    isTargetSelfLink(el) ||
    isCrossOriginLink(el.href);
  var normalizePath = (path) => path.replace(defaults.base, '');
  var isInBase = (path) => !defaults.base || path.includes(defaults.base);
  var onClick = (event) => {
    if (isEventForbidden(event)) return;
    const el = getLinkElement(event.target);
    if (isForbiddenLink(el) || !isInBase(el.href)) return;
    event.preventDefault();
    router.push(normalizePath(el.href));
  };
  function initDomListeners(container) {
    const win = getWindow();
    const root = container || getDocument();
    if (win) {
      add(win, WINDOW_EVENTS, onWindowEvent);
      add(root, CLICK_EVENT, onClick);
    }
    router.on.value(onRouterPush);
    return () => {
      if (win) {
        remove(win, WINDOW_EVENTS, onWindowEvent);
        remove(root, CLICK_EVENT, onClick);
      }
      router.off.value(onRouterPush);
    };
  }
  var BASE_ATTRIBUTE_NAME = 'base';
  var INITIAL_ROUTE = 'initialRoute';
  var ON_STARTED_ATTRIBUTE_NAME = 'onStarted';
  var routerHoc$1 = ({ slots, attributes, props }) => {
    if (routerHoc$1.wasInitialized) panic2('Multiple <router> components are not supported');
    return {
      slot: null,
      el: null,
      teardown: null,
      mount(el, context) {
        const initialRouteAttr = getAttribute(attributes, INITIAL_ROUTE, context);
        const initialRoute = initialRouteAttr ? initialRouteAttr.evaluate(context) : null;
        const currentRoute = getCurrentRoute();
        const onFirstRoute = () => {
          this.createSlot(context);
          router.off.value(onFirstRoute);
        };
        routerHoc$1.wasInitialized = true;
        this.el = el;
        this.teardown = initDomListeners(this.root);
        this.setBase(context);
        if (currentRoute && !initialRoute) {
          this.createSlot(context);
        } else {
          router.on.value(onFirstRoute);
          router.push(initialRoute || window.location.href);
        }
      },
      createSlot(context) {
        if (!slots || !slots.length) return;
        const onStartedAttr = getAttribute(attributes, ON_STARTED_ATTRIBUTE_NAME, context);
        this.slot = createDefaultSlot();
        this.slot.mount(
          this.el,
          {
            slots,
          },
          context
        );
        if (onStartedAttr) {
          onStartedAttr.evaluate(context)(getCurrentRoute());
        }
      },
      update(context) {
        this.setBase(context);
        if (this.slot) {
          cancelDefer(this.deferred);
          this.deferred = defer(() => {
            this.slot.update({}, context);
          });
        }
      },
      unmount(...args) {
        this.teardown();
        routerHoc$1.wasInitialized = false;
        if (this.slot) {
          this.slot.unmount(...args);
        }
      },
      getBase(context) {
        const baseAttr = getAttribute(attributes, BASE_ATTRIBUTE_NAME, context);
        return baseAttr ? baseAttr.evaluate(context) : this.el.getAttribute(BASE_ATTRIBUTE_NAME) || '/';
      },
      setBase(context) {
        setBase(props ? props.base : this.getBase(context));
      },
    };
  };
  routerHoc$1.wasInitialized = false;
  var routerHoc = {
    css: null,
    exports: pure(routerHoc$1),
    template: null,
    name: 'router-hoc',
  };

  // src/app.js
  var import_lodash3 = __toESM(require_lodash(), 1);
  var import_debounce = __toESM(require_debounce(), 1);

  // src/presenters.js
  var import_lodash = __toESM(require_lodash(), 1);
  function setTransformPos(elem, x, y) {
    var style = 'translate(' + x + 'px,' + y + 'px) translateZ(0)';
    elem.style.transform = style;
    elem.style['-ms-transform'] = style;
    elem.style['-webkit-transform'] = style;
  }
  function updateUserState($user, elem_user, user) {
    setTransformPos(elem_user, user.worldX, user.worldY);
    if (user.done) {
      $user.addClass('leaving');
    }
  }
  function presentStats($parent, world) {
    var elem_transportedcounter = $parent.find('.transportedcounter').get(0),
      elem_elapsedtime = $parent.find('.elapsedtime').get(0),
      elem_transportedpersec = $parent.find('.transportedpersec').get(0),
      elem_avgwaittime = $parent.find('.avgwaittime').get(0),
      elem_maxwaittime = $parent.find('.maxwaittime').get(0),
      elem_movecount = $parent.find('.movecount').get(0);
    world.on('stats_display_changed', function updateStats() {
      elem_transportedcounter.textContent = world.transportedCounter;
      elem_elapsedtime.textContent = world.elapsedTime.toFixed(0) + 's';
      elem_transportedpersec.textContent = world.transportedPerSec.toPrecision(3);
      elem_avgwaittime.textContent = world.avgWaitTime.toFixed(1) + 's';
      elem_maxwaittime.textContent = world.maxWaitTime.toFixed(1) + 's';
      elem_movecount.textContent = world.moveCount;
    });
    world.trigger('stats_display_changed');
  }
  function presentChallenge($parent, challenge, app, world, worldController, challengeNum, challengeTempl) {
    var $challenge = $(
      (void 0)(challengeTempl, {
        challenge,
        num: challengeNum,
        timeScale: worldController.timeScale.toFixed(0) + 'x',
        startButtonText: world.challengeEnded
          ? "<i class='fa fa-repeat'></i> Restart"
          : worldController.isPaused
            ? 'Start'
            : 'Pause',
      })
    );
    $parent.html($challenge);
    $parent.find('.startstop').on('click', function () {
      app.startStopOrRestart();
    });
    $parent.find('.timescale_increase').on('click', function (e) {
      e.preventDefault();
      if (worldController.timeScale < 40) {
        var timeScale = Math.round(worldController.timeScale * 1.618);
        worldController.setTimeScale(timeScale);
      }
    });
    $parent.find('.timescale_decrease').on('click', function (e) {
      e.preventDefault();
      var timeScale = Math.round(worldController.timeScale / 1.618);
      worldController.setTimeScale(timeScale);
    });
  }
  function presentFeedback($parent, feedbackTempl, world, title, message, url) {
    $parent.html(
      (void 0)(feedbackTempl, {
        title,
        message,
        url,
        paddingTop: world.floors.length * world.floorHeight * 0.2,
      })
    );
    if (!url) {
      $parent.find('a').remove();
    }
  }
  function presentWorld($world, world, floorTempl, elevatorTempl, elevatorButtonTempl, userTempl) {
    $world.css('height', world.floorHeight * world.floors.length);
    $world.append(
      import_lodash.default.map(world.floors, function (f) {
        var $floor = $((void 0)(floorTempl, f));
        var $up = $floor.find('.up');
        var $down = $floor.find('.down');
        f.on('buttonstate_change', function (buttonStates) {
          $up.toggleClass('activated', buttonStates.up !== '');
          $down.toggleClass('activated', buttonStates.down !== '');
        });
        $up.on('click', function () {
          f.pressUpButton();
        });
        $down.on('click', function () {
          f.pressDownButton();
        });
        return $floor;
      })
    );
    $world.find('.floor').first().find('.down').addClass('invisible');
    $world.find('.floor').last().find('.up').addClass('invisible');
    function renderElevatorButtons(states) {
      return import_lodash.default
        .map(states, function (b, i) {
          return (void 0)(elevatorButtonTempl, { floorNum: i });
        })
        .join('');
    }
    function setUpElevator(e) {
      var $elevator = $((void 0)(elevatorTempl, { e }));
      var elem_elevator = $elevator.get(0);
      $elevator.find('.buttonindicator').html(renderElevatorButtons(e.buttonStates));
      var $buttons = import_lodash.default.map($elevator.find('.buttonindicator').children(), function (c) {
        return $(c);
      });
      var elem_floorindicator = $elevator.find('.floorindicator > span').get(0);
      $elevator.on('click', '.buttonpress', function () {
        e.pressFloorButton(parseInt($(this).text()));
      });
      e.on('new_display_state', function updateElevatorPosition() {
        setTransformPos(elem_elevator, e.worldX, e.worldY);
      });
      e.on('new_current_floor', function update_current_floor(floor) {
        elem_floorindicator.textContent = floor;
      });
      e.on('floor_buttons_changed', function update_floor_buttons(states, indexChanged) {
        $buttons[indexChanged].toggleClass('activated', states[indexChanged]);
      });
      e.on('indicatorstate_change', function indicatorstate_change(indicatorStates) {
        $elevator.find('.up').toggleClass('activated', indicatorStates.up);
        $elevator.find('.down').toggleClass('activated', indicatorStates.down);
      });
      e.trigger('new_state', e);
      e.trigger('new_display_state', e);
      e.trigger('new_current_floor', e.currentFloor);
      return $elevator;
    }
    $world.append(
      import_lodash.default.map(world.elevators, function (e) {
        return setUpElevator(e);
      })
    );
    world.on('new_user', function (user) {
      var $user = $((void 0)(userTempl, { u: user, state: user.done ? 'leaving' : '' }));
      var elem_user = $user.get(0);
      user.on('new_display_state', function () {
        updateUserState($user, elem_user, user);
      });
      user.on('removed', function () {
        $user.remove();
      });
      $world.append($user);
    });
  }
  function presentCodeStatus($parent, templ, error) {
    console.log(error);
    var errorDisplay = error ? 'block' : 'none';
    var successDisplay = error ? 'none' : 'block';
    var errorMessage = error;
    if (error && error.stack) {
      errorMessage = error.stack;
      errorMessage = errorMessage.replace(/\n/g, '<br>');
    }
    var status = (void 0)(templ, {
      errorMessage,
      errorDisplay,
      successDisplay,
    });
    $parent.html(status);
  }

  // src/types.js
  var typeDeclarations = `interface Solution {
    init: (elevators: Elevator[], floors: Floor[]) => void;
    update: (dt: number, elevators: Elevator[], floors: Floor[]) => void;
}
interface Elevator {
    /**
     * Queue the elevator to go to specified floor number.
     * If you specify true as second argument, the elevator will go to that floor directly, and then go to any other queued floors.
     */
    goToFloor(floor: number, forceNow?: boolean): void;
    /**
     * Clear the destination queue and stop the elevator if it is moving.
     * Note that you normally don't need to stop elevators - it is intended for advanced solutions with in-transit rescheduling logic.
     * Also, note that the elevator will probably not stop at a floor, so passengers will not get out.
     */
    stop(): void;
    /**
     * Gets the floor number that the elevator currently is on.
     */
    currentFloor(): number;
    /**
     * Gets or sets the going up indicator, which will affect passenger behaviour when stopping at floors.
     */
    goingUpIndicator(): boolean;
    goingUpIndicator(state: boolean): Elevator;
    /**
     * Gets or sets the going down indicator, which will affect passenger behaviour when stopping at floors.
     */
    goingDownIndicator(): boolean;
    goingDownIndicator(state: boolean): Elevator;
    /**
     * Gets the maximum number of passengers that can occupy the elevator at the same time.
     */
    maxPassengerCount(): number;
    /**
     * Gets the load factor of the elevator. 0 means empty, 1 means full. Varies with passenger weights, which vary - not an exact measure.
     */
    loadFactor(): number;
    /**
     * Gets the direction the elevator is currently going to move toward. Can be "up", "down" or "stopped".
     */
    destinationDirection(): "up" | "down" | "stopped";
    /**
     * The current destination queue, meaning the floor numbers the elevator is scheduled to go to.
     * Can be modified and emptied if desired. Note that you need to call checkDestinationQueue() for the change to take effect immediately.
     */
    destinationQueue: number[];
    /**
     * Checks the destination queue for any new destinations to go to.
     * Note that you only need to call this if you modify the destination queue explicitly.
     */
    checkDestinationQueue(): void;
    /**
     * Gets the currently pressed floor numbers as an array.
     */
    getPressedFloors(): number[];
    /**
     * Triggered when the elevator has completed all its tasks and is not doing anything.
     */
    on(event: "idle", callback: () => void): Elevator;
    /**
     * Triggered when a passenger has pressed a button inside the elevator.
     */
    on(event: "floor_button_pressed", callback: (floorNum: number) => void): Elevator;
    /**
     * Triggered slightly before the elevator will pass a floor. A good time to decide whether to stop at that floor.
     * Note that this event is not triggered for the destination floor. Direction is either "up" or "down".
     */
    on(event: "passing_floor", callback: (floorNum: number, direction: "up" | "down") => void): Elevator;
    /**
     * Triggered when the elevator has arrived at a floor.
     */
    on(event: "stopped_at_floor", callback: (floorNum: number) => void): Elevator;
}
interface Floor {
    /**
     * Gets the floor number of the floor object.
     */
    floorNum(): number;
    /**
     * Triggered when someone has pressed the up button at a floor.
     * Note that passengers will press the button again if they fail to enter an elevator.
     */
    on(event: "up_button_pressed", callback: () => void): Floor;
    /**
     * Triggered when someone has pressed the down button at a floor.
     * Note that passengers will press the button again if they fail to enter an elevator.
     */
    on(event: "down_button_pressed", callback: () => void): Floor;
}`;

  // src/world.js
  var import_observable2 = __toESM(require_observable(), 1);
  var import_lodash2 = __toESM(require_lodash(), 1);

  // src/floor.js
  var import_observable = __toESM(require_observable(), 1);
  var asFloor = function (obj, floorLevel, yPosition, errorHandler) {
    var floor = (0, import_observable.default)(obj);
    floor.level = floorLevel;
    floor.yPosition = yPosition;
    floor.buttonStates = { up: '', down: '' };
    var tryTrigger = function (event, arg1, arg2, arg3, arg4) {
      try {
        floor.trigger(event, arg1, arg2, arg3, arg4);
      } catch (e) {
        errorHandler(e);
      }
    };
    floor.pressUpButton = function () {
      var prev = floor.buttonStates.up;
      floor.buttonStates.up = 'activated';
      if (prev !== floor.buttonStates.up) {
        tryTrigger('buttonstate_change', floor.buttonStates);
        tryTrigger('up_button_pressed', floor);
      }
    };
    floor.pressDownButton = function () {
      var prev = floor.buttonStates.down;
      floor.buttonStates.down = 'activated';
      if (prev !== floor.buttonStates.down) {
        tryTrigger('buttonstate_change', floor.buttonStates);
        tryTrigger('down_button_pressed', floor);
      }
    };
    floor.elevatorAvailable = function (elevator) {
      if (elevator.goingUpIndicator && floor.buttonStates.up) {
        floor.buttonStates.up = '';
        tryTrigger('buttonstate_change', floor.buttonStates);
      }
      if (elevator.goingDownIndicator && floor.buttonStates.down) {
        floor.buttonStates.down = '';
        tryTrigger('buttonstate_change', floor.buttonStates);
      }
    };
    floor.getSpawnPosY = function () {
      return floor.yPosition + 30;
    };
    floor.floorNum = function () {
      return floor.level;
    };
    return floor;
  };
  var floor_default = asFloor;

  // src/world.js
  var createWorldCreator = function () {
    var creator = {};
    creator.createFloors = function (floorCount, floorHeight, errorHandler) {
      var floors = import_lodash2.default.map(import_lodash2.default.range(floorCount), function (e, i) {
        var yPos = (floorCount - 1 - i) * floorHeight;
        var floor = floor_default({}, i, yPos, errorHandler);
        return floor;
      });
      return floors;
    };
    creator.createElevators = function (elevatorCount, floorCount, floorHeight, elevatorCapacities) {
      elevatorCapacities = elevatorCapacities || [4];
      var currentX = 200;
      var elevators = import_lodash2.default.map(import_lodash2.default.range(elevatorCount), function (e, i) {
        var elevator = new Elevator(2.6, floorCount, floorHeight, elevatorCapacities[i % elevatorCapacities.length]);
        elevator.moveTo(currentX, null);
        elevator.setFloorPosition(0);
        elevator.updateDisplayPosition();
        currentX += 20 + elevator.width;
        return elevator;
      });
      return elevators;
    };
    creator.createRandomUser = function () {
      var weight = import_lodash2.default.random(55, 100);
      var user = new User(weight);
      if (import_lodash2.default.random(40) === 0) {
        user.displayType = 'child';
      } else if (import_lodash2.default.random(1) === 0) {
        user.displayType = 'female';
      } else {
        user.displayType = 'male';
      }
      return user;
    };
    creator.spawnUserRandomly = function (floorCount, floorHeight, floors) {
      var user = creator.createRandomUser();
      user.moveTo(105 + import_lodash2.default.random(40), 0);
      var currentFloor = import_lodash2.default.random(1) === 0 ? 0 : import_lodash2.default.random(floorCount - 1);
      var destinationFloor;
      if (currentFloor === 0) {
        destinationFloor = import_lodash2.default.random(1, floorCount - 1);
      } else {
        if (import_lodash2.default.random(10) === 0) {
          destinationFloor = (currentFloor + import_lodash2.default.random(1, floorCount - 1)) % floorCount;
        } else {
          destinationFloor = 0;
        }
      }
      user.appearOnFloor(floors[currentFloor], destinationFloor);
      return user;
    };
    creator.createWorld = function (options) {
      console.log('Creating world with options', options);
      var defaultOptions = { floorHeight: 50, floorCount: 4, elevatorCount: 2, spawnRate: 0.5 };
      options = import_lodash2.default.defaults(import_lodash2.default.clone(options), defaultOptions);
      var world = { floorHeight: options.floorHeight, transportedCounter: 0 };
      (0, import_observable2.default)(world);
      var handleUserCodeError = function (e) {
        world.trigger('usercode_error', e);
      };
      world.floors = creator.createFloors(options.floorCount, world.floorHeight, handleUserCodeError);
      world.elevators = creator.createElevators(
        options.elevatorCount,
        options.floorCount,
        world.floorHeight,
        options.elevatorCapacities
      );
      world.elevatorInterfaces = import_lodash2.default.map(world.elevators, function (e) {
        return asElevatorInterface({}, e, options.floorCount, handleUserCodeError);
      });
      world.users = [];
      world.transportedCounter = 0;
      world.transportedPerSec = 0;
      world.moveCount = 0;
      world.elapsedTime = 0;
      world.maxWaitTime = 0;
      world.avgWaitTime = 0;
      world.challengeEnded = false;
      var recalculateStats = function () {
        world.transportedPerSec = world.transportedCounter / world.elapsedTime;
        world.moveCount = import_lodash2.default.reduce(
          world.elevators,
          function (sum, elevator) {
            return sum + elevator.moveCount;
          },
          0
        );
        world.trigger('stats_changed');
      };
      var registerUser = function (user) {
        world.users.push(user);
        user.updateDisplayPosition(true);
        user.spawnTimestamp = world.elapsedTime;
        world.trigger('new_user', user);
        user.on('exited_elevator', function () {
          world.transportedCounter++;
          world.maxWaitTime = Math.max(world.maxWaitTime, world.elapsedTime - user.spawnTimestamp);
          world.avgWaitTime =
            (world.avgWaitTime * (world.transportedCounter - 1) + (world.elapsedTime - user.spawnTimestamp)) /
            world.transportedCounter;
          recalculateStats();
        });
        user.updateDisplayPosition(true);
      };
      var handleElevAvailability = function (elevator) {
        for (var i2 = 0, len = world.floors.length; i2 < len; ++i2) {
          var floor = world.floors[i2];
          if (elevator.currentFloor === i2) {
            floor.elevatorAvailable(elevator);
          }
        }
        for (var users = world.users, i2 = 0, len = users.length; i2 < len; ++i2) {
          var user = users[i2];
          if (user.currentFloor === elevator.currentFloor) {
            user.elevatorAvailable(elevator, world.floors[elevator.currentFloor]);
          }
        }
      };
      for (var i = 0; i < world.elevators.length; ++i) {
        world.elevators[i].on('entrance_available', handleElevAvailability);
      }
      var handleButtonRepressing = function (eventName, floor) {
        for (
          var i2 = 0, len = world.elevators.length, offset = import_lodash2.default.random(len - 1);
          i2 < len;
          ++i2
        ) {
          var elevIndex = (i2 + offset) % len;
          var elevator = world.elevators[elevIndex];
          if (
            (eventName === 'up_button_pressed' && elevator.goingUpIndicator) ||
            (eventName === 'down_button_pressed' && elevator.goingDownIndicator)
          ) {
            if (
              elevator.currentFloor === floor.level &&
              elevator.isOnAFloor() &&
              !elevator.isMoving &&
              !elevator.isFull()
            ) {
              world.elevatorInterfaces[elevIndex].goToFloor(floor.level, true);
              return;
            }
          }
        }
      };
      for (var i = 0; i < world.floors.length; ++i) {
        world.floors[i].on('up_button_pressed down_button_pressed', handleButtonRepressing);
      }
      var elapsedSinceSpawn = 1.001 / options.spawnRate;
      var elapsedSinceStatsUpdate = 0;
      world.update = function (dt) {
        world.elapsedTime += dt;
        elapsedSinceSpawn += dt;
        elapsedSinceStatsUpdate += dt;
        while (elapsedSinceSpawn > 1 / options.spawnRate) {
          elapsedSinceSpawn -= 1 / options.spawnRate;
          registerUser(creator.spawnUserRandomly(options.floorCount, world.floorHeight, world.floors));
        }
        for (var i2 = 0, len = world.elevators.length; i2 < len; ++i2) {
          var e = world.elevators[i2];
          e.update(dt);
          e.updateElevatorMovement(dt);
        }
        for (var users = world.users, i2 = 0, len = users.length; i2 < len; ++i2) {
          var u = users[i2];
          u.update(dt);
          world.maxWaitTime = Math.max(world.maxWaitTime, world.elapsedTime - u.spawnTimestamp);
        }
        for (var users = world.users, i2 = world.users.length - 1; i2 >= 0; i2--) {
          var u = users[i2];
          if (u.removeMe) {
            users.splice(i2, 1);
          }
        }
        recalculateStats();
      };
      world.updateDisplayPositions = function () {
        for (var i2 = 0, len = world.elevators.length; i2 < len; ++i2) {
          world.elevators[i2].updateDisplayPosition();
        }
        for (var users = world.users, i2 = 0, len = users.length; i2 < len; ++i2) {
          users[i2].updateDisplayPosition();
        }
      };
      world.unWind = function () {
        console.log('Unwinding', world);
        import_lodash2.default.each(
          world.elevators.concat(world.elevatorInterfaces).concat(world.users).concat(world.floors).concat([world]),
          function (obj) {
            obj.off('*');
          }
        );
        world.challengeEnded = true;
        world.elevators = world.elevatorInterfaces = world.users = world.floors = [];
      };
      world.init = function () {
        for (var i2 = 0; i2 < world.elevatorInterfaces.length; ++i2) {
          world.elevatorInterfaces[i2].checkDestinationQueue();
        }
      };
      return world;
    };
    return creator;
  };
  var createWorldController = function (dtMax) {
    var controller = (0, import_observable2.default)({});
    controller.timeScale = 1;
    controller.isPaused = true;
    controller.start = function (world, codeObj, animationFrameRequester, autoStart) {
      controller.isPaused = true;
      var lastT = null;
      var firstUpdate = true;
      world.on('usercode_error', controller.handleUserCodeError);
      var updater = function (t) {
        if (!controller.isPaused && !world.challengeEnded && lastT !== null) {
          if (firstUpdate) {
            firstUpdate = false;
            try {
              codeObj.init(world.elevatorInterfaces, world.floors);
              world.init();
            } catch (e) {
              controller.handleUserCodeError(e);
            }
          }
          var dt = t - lastT;
          var scaledDt = dt * 1e-3 * controller.timeScale;
          scaledDt = Math.min(scaledDt, dtMax * 3 * controller.timeScale);
          try {
            codeObj.update(scaledDt, world.elevatorInterfaces, world.floors);
          } catch (e) {
            controller.handleUserCodeError(e);
          }
          while (scaledDt > 0 && !world.challengeEnded) {
            var thisDt = Math.min(dtMax, scaledDt);
            world.update(thisDt);
            scaledDt -= dtMax;
          }
          world.updateDisplayPositions();
          world.trigger('stats_display_changed');
        }
        lastT = t;
        if (!world.challengeEnded) {
          animationFrameRequester(updater);
        }
      };
      if (autoStart) {
        controller.setPaused(false);
      }
      animationFrameRequester(updater);
    };
    controller.handleUserCodeError = function (e) {
      controller.setPaused(true);
      console.log('Usercode error on update', e);
      controller.trigger('usercode_error', e);
    };
    controller.setPaused = function (paused) {
      controller.isPaused = paused;
      controller.trigger('timescale_changed');
    };
    controller.setTimeScale = function (timeScale) {
      controller.timeScale = timeScale;
      controller.trigger('timescale_changed');
    };
    return controller;
  };

  // src/app.js
  var createEditorAsync = () =>
    new Promise((resolve, reject) => {
      var lsKey = 'elevatorCrushCode_v5';
      __require.config({
        paths: { vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.29.1/min/vs/' },
      });
      window.MonacoEnvironment = {
        getWorkerUrl: function (workerId, label) {
          return `data:text/javascript;charset=utf-8,${encodeURIComponent(`
                self.MonacoEnvironment = { baseUrl: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.29.1/min/" };
                importScripts("https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.29.1/min/vs/base/worker/workerMain.min.js");`)}`;
        },
      };
      __require(['vs/editor/editor.main'], function () {
        const cm = monaco.editor.create(document.getElementById('editor'), {
          theme: 'vs-dark',
          folding: false,
          minimap: { enabled: false },
          language: 'javascript',
          value: '// code goes here\n',
        });
        monaco.languages.typescript.javascriptDefaults.addExtraLib(typeDeclarations);
        var reset = function () {
          cm.setValue($('#default-elev-implementation').text().trim());
        };
        var saveCode = function () {
          localStorage.setItem(lsKey, cm.getValue());
          $('#save_message').text('Code saved ' + /* @__PURE__ */ new Date().toTimeString());
          returnObj.trigger('change');
        };
        var existingCode = localStorage.getItem(lsKey);
        if (existingCode) {
          cm.setValue(existingCode);
        } else {
          reset();
        }
        $('#button_save').click(function () {
          saveCode();
          cm.focus();
        });
        $('#button_reset').click(function () {
          if (confirm('Do you really want to reset to the default implementation?')) {
            localStorage.setItem('develevateBackupCode', cm.getValue());
            reset();
          }
          cm.focus();
        });
        $('#button_resetundo').click(function () {
          if (confirm('Do you want to bring back the code as before the last reset?')) {
            cm.setValue(localStorage.getItem('develevateBackupCode') || '');
          }
          cm.focus();
        });
        var returnObj = (0, import_observable3.default)({});
        var autoSaver = (0, import_debounce.default)(saveCode, 1e3);
        cm.onDidChangeModelContent = autoSaver;
        returnObj.getCodeObj = function () {
          console.log('Getting code...');
          var code = cm.getValue();
          var obj;
          try {
            obj = getCodeObjFromCode(code);
            returnObj.trigger('code_success');
          } catch (e) {
            returnObj.trigger('usercode_error', e);
            return null;
          }
          return obj;
        };
        returnObj.setCode = function (code) {
          cm.setValue(code);
        };
        returnObj.getCode = function () {
          return cm.getValue();
        };
        returnObj.setDevTestCode = function () {
          cm.setValue($('#devtest-elev-implementation').text().trim());
        };
        $('#button_apply').click(function () {
          returnObj.trigger('apply_code');
        });
        resolve(returnObj);
      });
    });
  var createParamsUrl = function (current, overrides) {
    return (
      '#' +
      import_lodash3.default
        .map(import_lodash3.default.merge(current, overrides), function (val, key) {
          return key + '=' + val;
        })
        .join(',')
    );
  };
  $(function () {
    var tsKey = 'elevatorTimeScale';
    createEditorAsync().then((editor) => {
      var params = {};
      var $world = $('.innerworld');
      var $stats = $('.statscontainer');
      var $feedback = $('.feedbackcontainer');
      var $challenge = $('.challenge');
      var $codestatus = $('.codestatus');
      var floorTempl = document.getElementById('floor-template').innerHTML.trim();
      var elevatorTempl = document.getElementById('elevator-template').innerHTML.trim();
      var elevatorButtonTempl = document.getElementById('elevatorbutton-template').innerHTML.trim();
      var userTempl = document.getElementById('user-template').innerHTML.trim();
      var challengeTempl = document.getElementById('challenge-template').innerHTML.trim();
      var feedbackTempl = document.getElementById('feedback-template').innerHTML.trim();
      var codeStatusTempl = document.getElementById('codestatus-template').innerHTML.trim();
      var app = (0, import_observable3.default)({});
      app.worldController = createWorldController(1 / 60);
      app.worldController.on('usercode_error', function (e) {
        console.log('World raised code error', e);
        editor.trigger('usercode_error', e);
      });
      console.log(app.worldController);
      app.worldCreator = createWorldCreator();
      app.world = void 0;
      app.currentChallengeIndex = 0;
      app.startStopOrRestart = function () {
        if (app.world.challengeEnded) {
          app.startChallenge(app.currentChallengeIndex);
        } else {
          app.worldController.setPaused(!app.worldController.isPaused);
        }
      };
      app.startChallenge = function (challengeIndex, autoStart) {
        if (typeof app.world !== 'undefined') {
          app.world.unWind();
        }
        app.currentChallengeIndex = challengeIndex;
        app.world = app.worldCreator.createWorld(challenges[challengeIndex].options);
        window.world = app.world;
        clearAll([$world, $feedback]);
        presentStats($stats, app.world);
        presentChallenge(
          $challenge,
          challenges[challengeIndex],
          app,
          app.world,
          app.worldController,
          challengeIndex + 1,
          challengeTempl
        );
        presentWorld($world, app.world, floorTempl, elevatorTempl, elevatorButtonTempl, userTempl);
        app.worldController.on('timescale_changed', function () {
          localStorage.setItem(tsKey, app.worldController.timeScale);
          presentChallenge(
            $challenge,
            challenges[challengeIndex],
            app,
            app.world,
            app.worldController,
            challengeIndex + 1,
            challengeTempl
          );
        });
        app.world.on('stats_changed', function () {
          var challengeStatus = challenges[challengeIndex].condition.evaluate(app.world);
          if (challengeStatus !== null) {
            app.world.challengeEnded = true;
            app.worldController.setPaused(true);
            if (challengeStatus) {
              presentFeedback(
                $feedback,
                feedbackTempl,
                app.world,
                'Success!',
                'Challenge completed',
                createParamsUrl(params, { challenge: challengeIndex + 2 })
              );
            } else {
              presentFeedback(
                $feedback,
                feedbackTempl,
                app.world,
                'Challenge failed',
                'Maybe your program needs an improvement?',
                ''
              );
            }
          }
        });
        var codeObj = editor.getCodeObj();
        console.log('Starting...');
        app.worldController.start(app.world, codeObj, window.requestAnimationFrame, autoStart);
      };
      editor.on('apply_code', function () {
        app.startChallenge(app.currentChallengeIndex, true);
      });
      editor.on('code_success', function () {
        presentCodeStatus($codestatus, codeStatusTempl);
      });
      editor.on('usercode_error', function (error) {
        presentCodeStatus($codestatus, codeStatusTempl, error);
      });
      editor.on('change', function () {
        $('#fitness_message').addClass('faded');
        var codeStr = editor.getCode();
      });
      editor.trigger('change');
      createRoute(function (path) {
        params = import_lodash3.default.reduce(
          path.split(','),
          function (result, p) {
            var match2 = p.match(/(\w+)=(\w+$)/);
            if (match2) {
              result[match2[1]] = match2[2];
            }
            return result;
          },
          {}
        );
        var requestedChallenge = 0;
        var autoStart = false;
        var timeScale = parseFloat(localStorage.getItem(tsKey)) || 2;
        import_lodash3.default.each(params, function (val, key) {
          if (key === 'challenge') {
            requestedChallenge = import_lodash3.default.parseInt(val) - 1;
            if (requestedChallenge < 0 || requestedChallenge >= challenges.length) {
              console.log('Invalid challenge index', requestedChallenge);
              console.log('Defaulting to first challenge');
              requestedChallenge = 0;
            }
          } else if (key === 'autostart') {
            autoStart = val === 'false' ? false : true;
          } else if (key === 'timescale') {
            timeScale = parseFloat(val);
          } else if (key === 'devtest') {
            editor.setDevTestCode();
          } else if (key === 'fullscreen') {
            makeDemoFullscreen();
          }
        });
        app.worldController.setTimeScale(timeScale);
        app.startChallenge(requestedChallenge, autoStart);
      });
    });
  });
})();
/*! Bundled license information:

lodash/lodash.js:
  (**
   * @license
   * Lodash <https://lodash.com/>
   * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
   * Released under MIT license <https://lodash.com/license>
   * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
   * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
   *)

riot/esm/dependencies/@riotjs/util/constants.js:
riot/esm/dependencies/@riotjs/util/expression-types.js:
riot/esm/dependencies/@riotjs/util/strings.js:
riot/esm/dependencies/@riotjs/util/misc.js:
riot/esm/dependencies/@riotjs/util/checks.js:
riot/esm/dependencies/@riotjs/util/dom.js:
riot/esm/dependencies/@riotjs/util/binding-types.js:
riot/esm/dependencies/@riotjs/util/objects.js:
riot/esm/dependencies/@riotjs/dom-bindings/dist/dom-bindings.js:
riot/esm/dependencies/bianco.dom-to-array/index.next.js:
riot/esm/dependencies/bianco.query/index.next.js:
riot/esm/dependencies/bianco.attr/index.next.js:
  (* Riot WIP, @license MIT *)

riot/esm/core/css-manager.js:
riot/esm/api/pure.js:
riot/esm/api/__.js:
riot/esm/riot.js:
  (* Riot v9.4.9, @license MIT *)
*/
//# sourceMappingURL=bundle.js.map
