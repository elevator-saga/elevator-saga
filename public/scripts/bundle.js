(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined") return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x + '" is not supported');
  });
  var __commonJS = (cb, mod) => function __require2() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/@riotjs/observable/dist/observable.js
  var require_observable = __commonJS({
    "node_modules/@riotjs/observable/dist/observable.js"(exports, module) {
      (function(window2, undefined2) {
        const ALL_CALLBACKS = "*";
        const define = Object.defineProperties;
        const entries = Object.entries;
        const on = (callbacks, el) => (event, fn) => {
          if (callbacks.has(event)) {
            callbacks.get(event).add(fn);
          } else {
            callbacks.set(event, (/* @__PURE__ */ new Set()).add(fn));
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
        const trigger = (callbacks, el) => (event, ...args) => {
          const fns = callbacks.get(event);
          if (fns) fns.forEach((fn) => fn.apply(el, args));
          if (callbacks.get(ALL_CALLBACKS) && event !== ALL_CALLBACKS) {
            el.trigger(ALL_CALLBACKS, event, ...args);
          }
          return el;
        };
        const observable8 = function(el) {
          const callbacks = /* @__PURE__ */ new Map();
          const methods = { on, off, one, trigger };
          el = el || {};
          define(
            el,
            entries(methods).reduce((acc, [key, method]) => {
              acc[key] = {
                value: method(callbacks, el),
                enumerable: false,
                writable: false,
                configurable: false
              };
              return acc;
            }, {})
          );
          return el;
        };
        if (typeof exports === "object")
          module.exports = observable8;
        else if (typeof define === "function" && define.amd)
          define(function() {
            return observable8;
          });
        else
          window2.observable = observable8;
      })(typeof window != "undefined" ? window : void 0);
    }
  });

  // node_modules/lodash/isObject.js
  var require_isObject = __commonJS({
    "node_modules/lodash/isObject.js"(exports, module) {
      function isObject2(value) {
        var type = typeof value;
        return value != null && (type == "object" || type == "function");
      }
      module.exports = isObject2;
    }
  });

  // node_modules/lodash/_freeGlobal.js
  var require_freeGlobal = __commonJS({
    "node_modules/lodash/_freeGlobal.js"(exports, module) {
      var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
      module.exports = freeGlobal;
    }
  });

  // node_modules/lodash/_root.js
  var require_root = __commonJS({
    "node_modules/lodash/_root.js"(exports, module) {
      var freeGlobal = require_freeGlobal();
      var freeSelf = typeof self == "object" && self && self.Object === Object && self;
      var root = freeGlobal || freeSelf || Function("return this")();
      module.exports = root;
    }
  });

  // node_modules/lodash/now.js
  var require_now = __commonJS({
    "node_modules/lodash/now.js"(exports, module) {
      var root = require_root();
      var now = function() {
        return root.Date.now();
      };
      module.exports = now;
    }
  });

  // node_modules/lodash/_trimmedEndIndex.js
  var require_trimmedEndIndex = __commonJS({
    "node_modules/lodash/_trimmedEndIndex.js"(exports, module) {
      var reWhitespace = /\s/;
      function trimmedEndIndex(string) {
        var index = string.length;
        while (index-- && reWhitespace.test(string.charAt(index))) {
        }
        return index;
      }
      module.exports = trimmedEndIndex;
    }
  });

  // node_modules/lodash/_baseTrim.js
  var require_baseTrim = __commonJS({
    "node_modules/lodash/_baseTrim.js"(exports, module) {
      var trimmedEndIndex = require_trimmedEndIndex();
      var reTrimStart = /^\s+/;
      function baseTrim(string) {
        return string ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, "") : string;
      }
      module.exports = baseTrim;
    }
  });

  // node_modules/lodash/_Symbol.js
  var require_Symbol = __commonJS({
    "node_modules/lodash/_Symbol.js"(exports, module) {
      var root = require_root();
      var Symbol2 = root.Symbol;
      module.exports = Symbol2;
    }
  });

  // node_modules/lodash/_getRawTag.js
  var require_getRawTag = __commonJS({
    "node_modules/lodash/_getRawTag.js"(exports, module) {
      var Symbol2 = require_Symbol();
      var objectProto = Object.prototype;
      var hasOwnProperty = objectProto.hasOwnProperty;
      var nativeObjectToString = objectProto.toString;
      var symToStringTag = Symbol2 ? Symbol2.toStringTag : void 0;
      function getRawTag(value) {
        var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
        try {
          value[symToStringTag] = void 0;
          var unmasked = true;
        } catch (e) {
        }
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
    }
  });

  // node_modules/lodash/_objectToString.js
  var require_objectToString = __commonJS({
    "node_modules/lodash/_objectToString.js"(exports, module) {
      var objectProto = Object.prototype;
      var nativeObjectToString = objectProto.toString;
      function objectToString(value) {
        return nativeObjectToString.call(value);
      }
      module.exports = objectToString;
    }
  });

  // node_modules/lodash/_baseGetTag.js
  var require_baseGetTag = __commonJS({
    "node_modules/lodash/_baseGetTag.js"(exports, module) {
      var Symbol2 = require_Symbol();
      var getRawTag = require_getRawTag();
      var objectToString = require_objectToString();
      var nullTag = "[object Null]";
      var undefinedTag = "[object Undefined]";
      var symToStringTag = Symbol2 ? Symbol2.toStringTag : void 0;
      function baseGetTag(value) {
        if (value == null) {
          return value === void 0 ? undefinedTag : nullTag;
        }
        return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
      }
      module.exports = baseGetTag;
    }
  });

  // node_modules/lodash/isObjectLike.js
  var require_isObjectLike = __commonJS({
    "node_modules/lodash/isObjectLike.js"(exports, module) {
      function isObjectLike(value) {
        return value != null && typeof value == "object";
      }
      module.exports = isObjectLike;
    }
  });

  // node_modules/lodash/isSymbol.js
  var require_isSymbol = __commonJS({
    "node_modules/lodash/isSymbol.js"(exports, module) {
      var baseGetTag = require_baseGetTag();
      var isObjectLike = require_isObjectLike();
      var symbolTag = "[object Symbol]";
      function isSymbol(value) {
        return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag;
      }
      module.exports = isSymbol;
    }
  });

  // node_modules/lodash/toNumber.js
  var require_toNumber = __commonJS({
    "node_modules/lodash/toNumber.js"(exports, module) {
      var baseTrim = require_baseTrim();
      var isObject2 = require_isObject();
      var isSymbol = require_isSymbol();
      var NAN = 0 / 0;
      var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
      var reIsBinary = /^0b[01]+$/i;
      var reIsOctal = /^0o[0-7]+$/i;
      var freeParseInt = parseInt;
      function toNumber(value) {
        if (typeof value == "number") {
          return value;
        }
        if (isSymbol(value)) {
          return NAN;
        }
        if (isObject2(value)) {
          var other = typeof value.valueOf == "function" ? value.valueOf() : value;
          value = isObject2(other) ? other + "" : other;
        }
        if (typeof value != "string") {
          return value === 0 ? value : +value;
        }
        value = baseTrim(value);
        var isBinary = reIsBinary.test(value);
        return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
      }
      module.exports = toNumber;
    }
  });

  // node_modules/lodash/debounce.js
  var require_debounce = __commonJS({
    "node_modules/lodash/debounce.js"(exports, module) {
      var isObject2 = require_isObject();
      var now = require_now();
      var toNumber = require_toNumber();
      var FUNC_ERROR_TEXT = "Expected a function";
      var nativeMax = Math.max;
      var nativeMin = Math.min;
      function debounce2(func, wait, options) {
        var lastArgs, lastThis, maxWait, result, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
        if (typeof func != "function") {
          throw new TypeError(FUNC_ERROR_TEXT);
        }
        wait = toNumber(wait) || 0;
        if (isObject2(options)) {
          leading = !!options.leading;
          maxing = "maxWait" in options;
          maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
          trailing = "trailing" in options ? !!options.trailing : trailing;
        }
        function invokeFunc(time) {
          var args = lastArgs, thisArg = lastThis;
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
          var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, timeWaiting = wait - timeSinceLastCall;
          return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
        }
        function shouldInvoke(time) {
          var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
          return lastCallTime === void 0 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
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
          var time = now(), isInvoking = shouldInvoke(time);
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
    }
  });

  // node_modules/lodash/_arrayEach.js
  var require_arrayEach = __commonJS({
    "node_modules/lodash/_arrayEach.js"(exports, module) {
      function arrayEach(array, iteratee) {
        var index = -1, length = array == null ? 0 : array.length;
        while (++index < length) {
          if (iteratee(array[index], index, array) === false) {
            break;
          }
        }
        return array;
      }
      module.exports = arrayEach;
    }
  });

  // node_modules/lodash/_createBaseFor.js
  var require_createBaseFor = __commonJS({
    "node_modules/lodash/_createBaseFor.js"(exports, module) {
      function createBaseFor(fromRight) {
        return function(object, iteratee, keysFunc) {
          var index = -1, iterable = Object(object), props = keysFunc(object), length = props.length;
          while (length--) {
            var key = props[fromRight ? length : ++index];
            if (iteratee(iterable[key], key, iterable) === false) {
              break;
            }
          }
          return object;
        };
      }
      module.exports = createBaseFor;
    }
  });

  // node_modules/lodash/_baseFor.js
  var require_baseFor = __commonJS({
    "node_modules/lodash/_baseFor.js"(exports, module) {
      var createBaseFor = require_createBaseFor();
      var baseFor = createBaseFor();
      module.exports = baseFor;
    }
  });

  // node_modules/lodash/_baseTimes.js
  var require_baseTimes = __commonJS({
    "node_modules/lodash/_baseTimes.js"(exports, module) {
      function baseTimes(n, iteratee) {
        var index = -1, result = Array(n);
        while (++index < n) {
          result[index] = iteratee(index);
        }
        return result;
      }
      module.exports = baseTimes;
    }
  });

  // node_modules/lodash/_baseIsArguments.js
  var require_baseIsArguments = __commonJS({
    "node_modules/lodash/_baseIsArguments.js"(exports, module) {
      var baseGetTag = require_baseGetTag();
      var isObjectLike = require_isObjectLike();
      var argsTag = "[object Arguments]";
      function baseIsArguments(value) {
        return isObjectLike(value) && baseGetTag(value) == argsTag;
      }
      module.exports = baseIsArguments;
    }
  });

  // node_modules/lodash/isArguments.js
  var require_isArguments = __commonJS({
    "node_modules/lodash/isArguments.js"(exports, module) {
      var baseIsArguments = require_baseIsArguments();
      var isObjectLike = require_isObjectLike();
      var objectProto = Object.prototype;
      var hasOwnProperty = objectProto.hasOwnProperty;
      var propertyIsEnumerable = objectProto.propertyIsEnumerable;
      var isArguments = baseIsArguments(/* @__PURE__ */ function() {
        return arguments;
      }()) ? baseIsArguments : function(value) {
        return isObjectLike(value) && hasOwnProperty.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
      };
      module.exports = isArguments;
    }
  });

  // node_modules/lodash/isArray.js
  var require_isArray = __commonJS({
    "node_modules/lodash/isArray.js"(exports, module) {
      var isArray = Array.isArray;
      module.exports = isArray;
    }
  });

  // node_modules/lodash/stubFalse.js
  var require_stubFalse = __commonJS({
    "node_modules/lodash/stubFalse.js"(exports, module) {
      function stubFalse() {
        return false;
      }
      module.exports = stubFalse;
    }
  });

  // node_modules/lodash/isBuffer.js
  var require_isBuffer = __commonJS({
    "node_modules/lodash/isBuffer.js"(exports, module) {
      var root = require_root();
      var stubFalse = require_stubFalse();
      var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
      var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
      var moduleExports = freeModule && freeModule.exports === freeExports;
      var Buffer2 = moduleExports ? root.Buffer : void 0;
      var nativeIsBuffer = Buffer2 ? Buffer2.isBuffer : void 0;
      var isBuffer = nativeIsBuffer || stubFalse;
      module.exports = isBuffer;
    }
  });

  // node_modules/lodash/_isIndex.js
  var require_isIndex = __commonJS({
    "node_modules/lodash/_isIndex.js"(exports, module) {
      var MAX_SAFE_INTEGER = 9007199254740991;
      var reIsUint = /^(?:0|[1-9]\d*)$/;
      function isIndex(value, length) {
        var type = typeof value;
        length = length == null ? MAX_SAFE_INTEGER : length;
        return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
      }
      module.exports = isIndex;
    }
  });

  // node_modules/lodash/isLength.js
  var require_isLength = __commonJS({
    "node_modules/lodash/isLength.js"(exports, module) {
      var MAX_SAFE_INTEGER = 9007199254740991;
      function isLength(value) {
        return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
      }
      module.exports = isLength;
    }
  });

  // node_modules/lodash/_baseIsTypedArray.js
  var require_baseIsTypedArray = __commonJS({
    "node_modules/lodash/_baseIsTypedArray.js"(exports, module) {
      var baseGetTag = require_baseGetTag();
      var isLength = require_isLength();
      var isObjectLike = require_isObjectLike();
      var argsTag = "[object Arguments]";
      var arrayTag = "[object Array]";
      var boolTag = "[object Boolean]";
      var dateTag = "[object Date]";
      var errorTag = "[object Error]";
      var funcTag = "[object Function]";
      var mapTag = "[object Map]";
      var numberTag = "[object Number]";
      var objectTag = "[object Object]";
      var regexpTag = "[object RegExp]";
      var setTag = "[object Set]";
      var stringTag = "[object String]";
      var weakMapTag = "[object WeakMap]";
      var arrayBufferTag = "[object ArrayBuffer]";
      var dataViewTag = "[object DataView]";
      var float32Tag = "[object Float32Array]";
      var float64Tag = "[object Float64Array]";
      var int8Tag = "[object Int8Array]";
      var int16Tag = "[object Int16Array]";
      var int32Tag = "[object Int32Array]";
      var uint8Tag = "[object Uint8Array]";
      var uint8ClampedTag = "[object Uint8ClampedArray]";
      var uint16Tag = "[object Uint16Array]";
      var uint32Tag = "[object Uint32Array]";
      var typedArrayTags = {};
      typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
      typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
      function baseIsTypedArray(value) {
        return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
      }
      module.exports = baseIsTypedArray;
    }
  });

  // node_modules/lodash/_baseUnary.js
  var require_baseUnary = __commonJS({
    "node_modules/lodash/_baseUnary.js"(exports, module) {
      function baseUnary(func) {
        return function(value) {
          return func(value);
        };
      }
      module.exports = baseUnary;
    }
  });

  // node_modules/lodash/_nodeUtil.js
  var require_nodeUtil = __commonJS({
    "node_modules/lodash/_nodeUtil.js"(exports, module) {
      var freeGlobal = require_freeGlobal();
      var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
      var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
      var moduleExports = freeModule && freeModule.exports === freeExports;
      var freeProcess = moduleExports && freeGlobal.process;
      var nodeUtil = function() {
        try {
          var types = freeModule && freeModule.require && freeModule.require("util").types;
          if (types) {
            return types;
          }
          return freeProcess && freeProcess.binding && freeProcess.binding("util");
        } catch (e) {
        }
      }();
      module.exports = nodeUtil;
    }
  });

  // node_modules/lodash/isTypedArray.js
  var require_isTypedArray = __commonJS({
    "node_modules/lodash/isTypedArray.js"(exports, module) {
      var baseIsTypedArray = require_baseIsTypedArray();
      var baseUnary = require_baseUnary();
      var nodeUtil = require_nodeUtil();
      var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
      var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
      module.exports = isTypedArray;
    }
  });

  // node_modules/lodash/_arrayLikeKeys.js
  var require_arrayLikeKeys = __commonJS({
    "node_modules/lodash/_arrayLikeKeys.js"(exports, module) {
      var baseTimes = require_baseTimes();
      var isArguments = require_isArguments();
      var isArray = require_isArray();
      var isBuffer = require_isBuffer();
      var isIndex = require_isIndex();
      var isTypedArray = require_isTypedArray();
      var objectProto = Object.prototype;
      var hasOwnProperty = objectProto.hasOwnProperty;
      function arrayLikeKeys(value, inherited) {
        var isArr = isArray(value), isArg = !isArr && isArguments(value), isBuff = !isArr && !isArg && isBuffer(value), isType = !isArr && !isArg && !isBuff && isTypedArray(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length = result.length;
        for (var key in value) {
          if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
          (key == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
          isBuff && (key == "offset" || key == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
          isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || // Skip index properties.
          isIndex(key, length)))) {
            result.push(key);
          }
        }
        return result;
      }
      module.exports = arrayLikeKeys;
    }
  });

  // node_modules/lodash/_isPrototype.js
  var require_isPrototype = __commonJS({
    "node_modules/lodash/_isPrototype.js"(exports, module) {
      var objectProto = Object.prototype;
      function isPrototype(value) {
        var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto;
        return value === proto;
      }
      module.exports = isPrototype;
    }
  });

  // node_modules/lodash/_overArg.js
  var require_overArg = __commonJS({
    "node_modules/lodash/_overArg.js"(exports, module) {
      function overArg(func, transform) {
        return function(arg) {
          return func(transform(arg));
        };
      }
      module.exports = overArg;
    }
  });

  // node_modules/lodash/_nativeKeys.js
  var require_nativeKeys = __commonJS({
    "node_modules/lodash/_nativeKeys.js"(exports, module) {
      var overArg = require_overArg();
      var nativeKeys = overArg(Object.keys, Object);
      module.exports = nativeKeys;
    }
  });

  // node_modules/lodash/_baseKeys.js
  var require_baseKeys = __commonJS({
    "node_modules/lodash/_baseKeys.js"(exports, module) {
      var isPrototype = require_isPrototype();
      var nativeKeys = require_nativeKeys();
      var objectProto = Object.prototype;
      var hasOwnProperty = objectProto.hasOwnProperty;
      function baseKeys(object) {
        if (!isPrototype(object)) {
          return nativeKeys(object);
        }
        var result = [];
        for (var key in Object(object)) {
          if (hasOwnProperty.call(object, key) && key != "constructor") {
            result.push(key);
          }
        }
        return result;
      }
      module.exports = baseKeys;
    }
  });

  // node_modules/lodash/isFunction.js
  var require_isFunction = __commonJS({
    "node_modules/lodash/isFunction.js"(exports, module) {
      var baseGetTag = require_baseGetTag();
      var isObject2 = require_isObject();
      var asyncTag = "[object AsyncFunction]";
      var funcTag = "[object Function]";
      var genTag = "[object GeneratorFunction]";
      var proxyTag = "[object Proxy]";
      function isFunction2(value) {
        if (!isObject2(value)) {
          return false;
        }
        var tag = baseGetTag(value);
        return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
      }
      module.exports = isFunction2;
    }
  });

  // node_modules/lodash/isArrayLike.js
  var require_isArrayLike = __commonJS({
    "node_modules/lodash/isArrayLike.js"(exports, module) {
      var isFunction2 = require_isFunction();
      var isLength = require_isLength();
      function isArrayLike(value) {
        return value != null && isLength(value.length) && !isFunction2(value);
      }
      module.exports = isArrayLike;
    }
  });

  // node_modules/lodash/keys.js
  var require_keys = __commonJS({
    "node_modules/lodash/keys.js"(exports, module) {
      var arrayLikeKeys = require_arrayLikeKeys();
      var baseKeys = require_baseKeys();
      var isArrayLike = require_isArrayLike();
      function keys(object) {
        return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
      }
      module.exports = keys;
    }
  });

  // node_modules/lodash/_baseForOwn.js
  var require_baseForOwn = __commonJS({
    "node_modules/lodash/_baseForOwn.js"(exports, module) {
      var baseFor = require_baseFor();
      var keys = require_keys();
      function baseForOwn(object, iteratee) {
        return object && baseFor(object, iteratee, keys);
      }
      module.exports = baseForOwn;
    }
  });

  // node_modules/lodash/_createBaseEach.js
  var require_createBaseEach = __commonJS({
    "node_modules/lodash/_createBaseEach.js"(exports, module) {
      var isArrayLike = require_isArrayLike();
      function createBaseEach(eachFunc, fromRight) {
        return function(collection, iteratee) {
          if (collection == null) {
            return collection;
          }
          if (!isArrayLike(collection)) {
            return eachFunc(collection, iteratee);
          }
          var length = collection.length, index = fromRight ? length : -1, iterable = Object(collection);
          while (fromRight ? index-- : ++index < length) {
            if (iteratee(iterable[index], index, iterable) === false) {
              break;
            }
          }
          return collection;
        };
      }
      module.exports = createBaseEach;
    }
  });

  // node_modules/lodash/_baseEach.js
  var require_baseEach = __commonJS({
    "node_modules/lodash/_baseEach.js"(exports, module) {
      var baseForOwn = require_baseForOwn();
      var createBaseEach = require_createBaseEach();
      var baseEach = createBaseEach(baseForOwn);
      module.exports = baseEach;
    }
  });

  // node_modules/lodash/identity.js
  var require_identity = __commonJS({
    "node_modules/lodash/identity.js"(exports, module) {
      function identity(value) {
        return value;
      }
      module.exports = identity;
    }
  });

  // node_modules/lodash/_castFunction.js
  var require_castFunction = __commonJS({
    "node_modules/lodash/_castFunction.js"(exports, module) {
      var identity = require_identity();
      function castFunction(value) {
        return typeof value == "function" ? value : identity;
      }
      module.exports = castFunction;
    }
  });

  // node_modules/lodash/forEach.js
  var require_forEach = __commonJS({
    "node_modules/lodash/forEach.js"(exports, module) {
      var arrayEach = require_arrayEach();
      var baseEach = require_baseEach();
      var castFunction = require_castFunction();
      var isArray = require_isArray();
      function forEach(collection, iteratee) {
        var func = isArray(collection) ? arrayEach : baseEach;
        return func(collection, castFunction(iteratee));
      }
      module.exports = forEach;
    }
  });

  // node_modules/lodash/each.js
  var require_each = __commonJS({
    "node_modules/lodash/each.js"(exports, module) {
      module.exports = require_forEach();
    }
  });

  // node_modules/lodash/_arrayMap.js
  var require_arrayMap = __commonJS({
    "node_modules/lodash/_arrayMap.js"(exports, module) {
      function arrayMap(array, iteratee) {
        var index = -1, length = array == null ? 0 : array.length, result = Array(length);
        while (++index < length) {
          result[index] = iteratee(array[index], index, array);
        }
        return result;
      }
      module.exports = arrayMap;
    }
  });

  // node_modules/lodash/_listCacheClear.js
  var require_listCacheClear = __commonJS({
    "node_modules/lodash/_listCacheClear.js"(exports, module) {
      function listCacheClear() {
        this.__data__ = [];
        this.size = 0;
      }
      module.exports = listCacheClear;
    }
  });

  // node_modules/lodash/eq.js
  var require_eq = __commonJS({
    "node_modules/lodash/eq.js"(exports, module) {
      function eq(value, other) {
        return value === other || value !== value && other !== other;
      }
      module.exports = eq;
    }
  });

  // node_modules/lodash/_assocIndexOf.js
  var require_assocIndexOf = __commonJS({
    "node_modules/lodash/_assocIndexOf.js"(exports, module) {
      var eq = require_eq();
      function assocIndexOf(array, key) {
        var length = array.length;
        while (length--) {
          if (eq(array[length][0], key)) {
            return length;
          }
        }
        return -1;
      }
      module.exports = assocIndexOf;
    }
  });

  // node_modules/lodash/_listCacheDelete.js
  var require_listCacheDelete = __commonJS({
    "node_modules/lodash/_listCacheDelete.js"(exports, module) {
      var assocIndexOf = require_assocIndexOf();
      var arrayProto = Array.prototype;
      var splice = arrayProto.splice;
      function listCacheDelete(key) {
        var data = this.__data__, index = assocIndexOf(data, key);
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
      module.exports = listCacheDelete;
    }
  });

  // node_modules/lodash/_listCacheGet.js
  var require_listCacheGet = __commonJS({
    "node_modules/lodash/_listCacheGet.js"(exports, module) {
      var assocIndexOf = require_assocIndexOf();
      function listCacheGet(key) {
        var data = this.__data__, index = assocIndexOf(data, key);
        return index < 0 ? void 0 : data[index][1];
      }
      module.exports = listCacheGet;
    }
  });

  // node_modules/lodash/_listCacheHas.js
  var require_listCacheHas = __commonJS({
    "node_modules/lodash/_listCacheHas.js"(exports, module) {
      var assocIndexOf = require_assocIndexOf();
      function listCacheHas(key) {
        return assocIndexOf(this.__data__, key) > -1;
      }
      module.exports = listCacheHas;
    }
  });

  // node_modules/lodash/_listCacheSet.js
  var require_listCacheSet = __commonJS({
    "node_modules/lodash/_listCacheSet.js"(exports, module) {
      var assocIndexOf = require_assocIndexOf();
      function listCacheSet(key, value) {
        var data = this.__data__, index = assocIndexOf(data, key);
        if (index < 0) {
          ++this.size;
          data.push([key, value]);
        } else {
          data[index][1] = value;
        }
        return this;
      }
      module.exports = listCacheSet;
    }
  });

  // node_modules/lodash/_ListCache.js
  var require_ListCache = __commonJS({
    "node_modules/lodash/_ListCache.js"(exports, module) {
      var listCacheClear = require_listCacheClear();
      var listCacheDelete = require_listCacheDelete();
      var listCacheGet = require_listCacheGet();
      var listCacheHas = require_listCacheHas();
      var listCacheSet = require_listCacheSet();
      function ListCache(entries) {
        var index = -1, length = entries == null ? 0 : entries.length;
        this.clear();
        while (++index < length) {
          var entry = entries[index];
          this.set(entry[0], entry[1]);
        }
      }
      ListCache.prototype.clear = listCacheClear;
      ListCache.prototype["delete"] = listCacheDelete;
      ListCache.prototype.get = listCacheGet;
      ListCache.prototype.has = listCacheHas;
      ListCache.prototype.set = listCacheSet;
      module.exports = ListCache;
    }
  });

  // node_modules/lodash/_stackClear.js
  var require_stackClear = __commonJS({
    "node_modules/lodash/_stackClear.js"(exports, module) {
      var ListCache = require_ListCache();
      function stackClear() {
        this.__data__ = new ListCache();
        this.size = 0;
      }
      module.exports = stackClear;
    }
  });

  // node_modules/lodash/_stackDelete.js
  var require_stackDelete = __commonJS({
    "node_modules/lodash/_stackDelete.js"(exports, module) {
      function stackDelete(key) {
        var data = this.__data__, result = data["delete"](key);
        this.size = data.size;
        return result;
      }
      module.exports = stackDelete;
    }
  });

  // node_modules/lodash/_stackGet.js
  var require_stackGet = __commonJS({
    "node_modules/lodash/_stackGet.js"(exports, module) {
      function stackGet(key) {
        return this.__data__.get(key);
      }
      module.exports = stackGet;
    }
  });

  // node_modules/lodash/_stackHas.js
  var require_stackHas = __commonJS({
    "node_modules/lodash/_stackHas.js"(exports, module) {
      function stackHas(key) {
        return this.__data__.has(key);
      }
      module.exports = stackHas;
    }
  });

  // node_modules/lodash/_coreJsData.js
  var require_coreJsData = __commonJS({
    "node_modules/lodash/_coreJsData.js"(exports, module) {
      var root = require_root();
      var coreJsData = root["__core-js_shared__"];
      module.exports = coreJsData;
    }
  });

  // node_modules/lodash/_isMasked.js
  var require_isMasked = __commonJS({
    "node_modules/lodash/_isMasked.js"(exports, module) {
      var coreJsData = require_coreJsData();
      var maskSrcKey = function() {
        var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
        return uid ? "Symbol(src)_1." + uid : "";
      }();
      function isMasked(func) {
        return !!maskSrcKey && maskSrcKey in func;
      }
      module.exports = isMasked;
    }
  });

  // node_modules/lodash/_toSource.js
  var require_toSource = __commonJS({
    "node_modules/lodash/_toSource.js"(exports, module) {
      var funcProto = Function.prototype;
      var funcToString = funcProto.toString;
      function toSource(func) {
        if (func != null) {
          try {
            return funcToString.call(func);
          } catch (e) {
          }
          try {
            return func + "";
          } catch (e) {
          }
        }
        return "";
      }
      module.exports = toSource;
    }
  });

  // node_modules/lodash/_baseIsNative.js
  var require_baseIsNative = __commonJS({
    "node_modules/lodash/_baseIsNative.js"(exports, module) {
      var isFunction2 = require_isFunction();
      var isMasked = require_isMasked();
      var isObject2 = require_isObject();
      var toSource = require_toSource();
      var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
      var reIsHostCtor = /^\[object .+?Constructor\]$/;
      var funcProto = Function.prototype;
      var objectProto = Object.prototype;
      var funcToString = funcProto.toString;
      var hasOwnProperty = objectProto.hasOwnProperty;
      var reIsNative = RegExp(
        "^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
      );
      function baseIsNative(value) {
        if (!isObject2(value) || isMasked(value)) {
          return false;
        }
        var pattern = isFunction2(value) ? reIsNative : reIsHostCtor;
        return pattern.test(toSource(value));
      }
      module.exports = baseIsNative;
    }
  });

  // node_modules/lodash/_getValue.js
  var require_getValue = __commonJS({
    "node_modules/lodash/_getValue.js"(exports, module) {
      function getValue(object, key) {
        return object == null ? void 0 : object[key];
      }
      module.exports = getValue;
    }
  });

  // node_modules/lodash/_getNative.js
  var require_getNative = __commonJS({
    "node_modules/lodash/_getNative.js"(exports, module) {
      var baseIsNative = require_baseIsNative();
      var getValue = require_getValue();
      function getNative(object, key) {
        var value = getValue(object, key);
        return baseIsNative(value) ? value : void 0;
      }
      module.exports = getNative;
    }
  });

  // node_modules/lodash/_Map.js
  var require_Map = __commonJS({
    "node_modules/lodash/_Map.js"(exports, module) {
      var getNative = require_getNative();
      var root = require_root();
      var Map2 = getNative(root, "Map");
      module.exports = Map2;
    }
  });

  // node_modules/lodash/_nativeCreate.js
  var require_nativeCreate = __commonJS({
    "node_modules/lodash/_nativeCreate.js"(exports, module) {
      var getNative = require_getNative();
      var nativeCreate = getNative(Object, "create");
      module.exports = nativeCreate;
    }
  });

  // node_modules/lodash/_hashClear.js
  var require_hashClear = __commonJS({
    "node_modules/lodash/_hashClear.js"(exports, module) {
      var nativeCreate = require_nativeCreate();
      function hashClear() {
        this.__data__ = nativeCreate ? nativeCreate(null) : {};
        this.size = 0;
      }
      module.exports = hashClear;
    }
  });

  // node_modules/lodash/_hashDelete.js
  var require_hashDelete = __commonJS({
    "node_modules/lodash/_hashDelete.js"(exports, module) {
      function hashDelete(key) {
        var result = this.has(key) && delete this.__data__[key];
        this.size -= result ? 1 : 0;
        return result;
      }
      module.exports = hashDelete;
    }
  });

  // node_modules/lodash/_hashGet.js
  var require_hashGet = __commonJS({
    "node_modules/lodash/_hashGet.js"(exports, module) {
      var nativeCreate = require_nativeCreate();
      var HASH_UNDEFINED = "__lodash_hash_undefined__";
      var objectProto = Object.prototype;
      var hasOwnProperty = objectProto.hasOwnProperty;
      function hashGet(key) {
        var data = this.__data__;
        if (nativeCreate) {
          var result = data[key];
          return result === HASH_UNDEFINED ? void 0 : result;
        }
        return hasOwnProperty.call(data, key) ? data[key] : void 0;
      }
      module.exports = hashGet;
    }
  });

  // node_modules/lodash/_hashHas.js
  var require_hashHas = __commonJS({
    "node_modules/lodash/_hashHas.js"(exports, module) {
      var nativeCreate = require_nativeCreate();
      var objectProto = Object.prototype;
      var hasOwnProperty = objectProto.hasOwnProperty;
      function hashHas(key) {
        var data = this.__data__;
        return nativeCreate ? data[key] !== void 0 : hasOwnProperty.call(data, key);
      }
      module.exports = hashHas;
    }
  });

  // node_modules/lodash/_hashSet.js
  var require_hashSet = __commonJS({
    "node_modules/lodash/_hashSet.js"(exports, module) {
      var nativeCreate = require_nativeCreate();
      var HASH_UNDEFINED = "__lodash_hash_undefined__";
      function hashSet(key, value) {
        var data = this.__data__;
        this.size += this.has(key) ? 0 : 1;
        data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED : value;
        return this;
      }
      module.exports = hashSet;
    }
  });

  // node_modules/lodash/_Hash.js
  var require_Hash = __commonJS({
    "node_modules/lodash/_Hash.js"(exports, module) {
      var hashClear = require_hashClear();
      var hashDelete = require_hashDelete();
      var hashGet = require_hashGet();
      var hashHas = require_hashHas();
      var hashSet = require_hashSet();
      function Hash(entries) {
        var index = -1, length = entries == null ? 0 : entries.length;
        this.clear();
        while (++index < length) {
          var entry = entries[index];
          this.set(entry[0], entry[1]);
        }
      }
      Hash.prototype.clear = hashClear;
      Hash.prototype["delete"] = hashDelete;
      Hash.prototype.get = hashGet;
      Hash.prototype.has = hashHas;
      Hash.prototype.set = hashSet;
      module.exports = Hash;
    }
  });

  // node_modules/lodash/_mapCacheClear.js
  var require_mapCacheClear = __commonJS({
    "node_modules/lodash/_mapCacheClear.js"(exports, module) {
      var Hash = require_Hash();
      var ListCache = require_ListCache();
      var Map2 = require_Map();
      function mapCacheClear() {
        this.size = 0;
        this.__data__ = {
          "hash": new Hash(),
          "map": new (Map2 || ListCache)(),
          "string": new Hash()
        };
      }
      module.exports = mapCacheClear;
    }
  });

  // node_modules/lodash/_isKeyable.js
  var require_isKeyable = __commonJS({
    "node_modules/lodash/_isKeyable.js"(exports, module) {
      function isKeyable(value) {
        var type = typeof value;
        return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
      }
      module.exports = isKeyable;
    }
  });

  // node_modules/lodash/_getMapData.js
  var require_getMapData = __commonJS({
    "node_modules/lodash/_getMapData.js"(exports, module) {
      var isKeyable = require_isKeyable();
      function getMapData(map5, key) {
        var data = map5.__data__;
        return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
      }
      module.exports = getMapData;
    }
  });

  // node_modules/lodash/_mapCacheDelete.js
  var require_mapCacheDelete = __commonJS({
    "node_modules/lodash/_mapCacheDelete.js"(exports, module) {
      var getMapData = require_getMapData();
      function mapCacheDelete(key) {
        var result = getMapData(this, key)["delete"](key);
        this.size -= result ? 1 : 0;
        return result;
      }
      module.exports = mapCacheDelete;
    }
  });

  // node_modules/lodash/_mapCacheGet.js
  var require_mapCacheGet = __commonJS({
    "node_modules/lodash/_mapCacheGet.js"(exports, module) {
      var getMapData = require_getMapData();
      function mapCacheGet(key) {
        return getMapData(this, key).get(key);
      }
      module.exports = mapCacheGet;
    }
  });

  // node_modules/lodash/_mapCacheHas.js
  var require_mapCacheHas = __commonJS({
    "node_modules/lodash/_mapCacheHas.js"(exports, module) {
      var getMapData = require_getMapData();
      function mapCacheHas(key) {
        return getMapData(this, key).has(key);
      }
      module.exports = mapCacheHas;
    }
  });

  // node_modules/lodash/_mapCacheSet.js
  var require_mapCacheSet = __commonJS({
    "node_modules/lodash/_mapCacheSet.js"(exports, module) {
      var getMapData = require_getMapData();
      function mapCacheSet(key, value) {
        var data = getMapData(this, key), size = data.size;
        data.set(key, value);
        this.size += data.size == size ? 0 : 1;
        return this;
      }
      module.exports = mapCacheSet;
    }
  });

  // node_modules/lodash/_MapCache.js
  var require_MapCache = __commonJS({
    "node_modules/lodash/_MapCache.js"(exports, module) {
      var mapCacheClear = require_mapCacheClear();
      var mapCacheDelete = require_mapCacheDelete();
      var mapCacheGet = require_mapCacheGet();
      var mapCacheHas = require_mapCacheHas();
      var mapCacheSet = require_mapCacheSet();
      function MapCache(entries) {
        var index = -1, length = entries == null ? 0 : entries.length;
        this.clear();
        while (++index < length) {
          var entry = entries[index];
          this.set(entry[0], entry[1]);
        }
      }
      MapCache.prototype.clear = mapCacheClear;
      MapCache.prototype["delete"] = mapCacheDelete;
      MapCache.prototype.get = mapCacheGet;
      MapCache.prototype.has = mapCacheHas;
      MapCache.prototype.set = mapCacheSet;
      module.exports = MapCache;
    }
  });

  // node_modules/lodash/_stackSet.js
  var require_stackSet = __commonJS({
    "node_modules/lodash/_stackSet.js"(exports, module) {
      var ListCache = require_ListCache();
      var Map2 = require_Map();
      var MapCache = require_MapCache();
      var LARGE_ARRAY_SIZE = 200;
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
      module.exports = stackSet;
    }
  });

  // node_modules/lodash/_Stack.js
  var require_Stack = __commonJS({
    "node_modules/lodash/_Stack.js"(exports, module) {
      var ListCache = require_ListCache();
      var stackClear = require_stackClear();
      var stackDelete = require_stackDelete();
      var stackGet = require_stackGet();
      var stackHas = require_stackHas();
      var stackSet = require_stackSet();
      function Stack(entries) {
        var data = this.__data__ = new ListCache(entries);
        this.size = data.size;
      }
      Stack.prototype.clear = stackClear;
      Stack.prototype["delete"] = stackDelete;
      Stack.prototype.get = stackGet;
      Stack.prototype.has = stackHas;
      Stack.prototype.set = stackSet;
      module.exports = Stack;
    }
  });

  // node_modules/lodash/_setCacheAdd.js
  var require_setCacheAdd = __commonJS({
    "node_modules/lodash/_setCacheAdd.js"(exports, module) {
      var HASH_UNDEFINED = "__lodash_hash_undefined__";
      function setCacheAdd(value) {
        this.__data__.set(value, HASH_UNDEFINED);
        return this;
      }
      module.exports = setCacheAdd;
    }
  });

  // node_modules/lodash/_setCacheHas.js
  var require_setCacheHas = __commonJS({
    "node_modules/lodash/_setCacheHas.js"(exports, module) {
      function setCacheHas(value) {
        return this.__data__.has(value);
      }
      module.exports = setCacheHas;
    }
  });

  // node_modules/lodash/_SetCache.js
  var require_SetCache = __commonJS({
    "node_modules/lodash/_SetCache.js"(exports, module) {
      var MapCache = require_MapCache();
      var setCacheAdd = require_setCacheAdd();
      var setCacheHas = require_setCacheHas();
      function SetCache(values) {
        var index = -1, length = values == null ? 0 : values.length;
        this.__data__ = new MapCache();
        while (++index < length) {
          this.add(values[index]);
        }
      }
      SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
      SetCache.prototype.has = setCacheHas;
      module.exports = SetCache;
    }
  });

  // node_modules/lodash/_arraySome.js
  var require_arraySome = __commonJS({
    "node_modules/lodash/_arraySome.js"(exports, module) {
      function arraySome(array, predicate) {
        var index = -1, length = array == null ? 0 : array.length;
        while (++index < length) {
          if (predicate(array[index], index, array)) {
            return true;
          }
        }
        return false;
      }
      module.exports = arraySome;
    }
  });

  // node_modules/lodash/_cacheHas.js
  var require_cacheHas = __commonJS({
    "node_modules/lodash/_cacheHas.js"(exports, module) {
      function cacheHas(cache, key) {
        return cache.has(key);
      }
      module.exports = cacheHas;
    }
  });

  // node_modules/lodash/_equalArrays.js
  var require_equalArrays = __commonJS({
    "node_modules/lodash/_equalArrays.js"(exports, module) {
      var SetCache = require_SetCache();
      var arraySome = require_arraySome();
      var cacheHas = require_cacheHas();
      var COMPARE_PARTIAL_FLAG = 1;
      var COMPARE_UNORDERED_FLAG = 2;
      function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
        var isPartial = bitmask & COMPARE_PARTIAL_FLAG, arrLength = array.length, othLength = other.length;
        if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
          return false;
        }
        var arrStacked = stack.get(array);
        var othStacked = stack.get(other);
        if (arrStacked && othStacked) {
          return arrStacked == other && othStacked == array;
        }
        var index = -1, result = true, seen = bitmask & COMPARE_UNORDERED_FLAG ? new SetCache() : void 0;
        stack.set(array, other);
        stack.set(other, array);
        while (++index < arrLength) {
          var arrValue = array[index], othValue = other[index];
          if (customizer) {
            var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
          }
          if (compared !== void 0) {
            if (compared) {
              continue;
            }
            result = false;
            break;
          }
          if (seen) {
            if (!arraySome(other, function(othValue2, othIndex) {
              if (!cacheHas(seen, othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack))) {
                return seen.push(othIndex);
              }
            })) {
              result = false;
              break;
            }
          } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
            result = false;
            break;
          }
        }
        stack["delete"](array);
        stack["delete"](other);
        return result;
      }
      module.exports = equalArrays;
    }
  });

  // node_modules/lodash/_Uint8Array.js
  var require_Uint8Array = __commonJS({
    "node_modules/lodash/_Uint8Array.js"(exports, module) {
      var root = require_root();
      var Uint8Array2 = root.Uint8Array;
      module.exports = Uint8Array2;
    }
  });

  // node_modules/lodash/_mapToArray.js
  var require_mapToArray = __commonJS({
    "node_modules/lodash/_mapToArray.js"(exports, module) {
      function mapToArray(map5) {
        var index = -1, result = Array(map5.size);
        map5.forEach(function(value, key) {
          result[++index] = [key, value];
        });
        return result;
      }
      module.exports = mapToArray;
    }
  });

  // node_modules/lodash/_setToArray.js
  var require_setToArray = __commonJS({
    "node_modules/lodash/_setToArray.js"(exports, module) {
      function setToArray(set2) {
        var index = -1, result = Array(set2.size);
        set2.forEach(function(value) {
          result[++index] = value;
        });
        return result;
      }
      module.exports = setToArray;
    }
  });

  // node_modules/lodash/_equalByTag.js
  var require_equalByTag = __commonJS({
    "node_modules/lodash/_equalByTag.js"(exports, module) {
      var Symbol2 = require_Symbol();
      var Uint8Array2 = require_Uint8Array();
      var eq = require_eq();
      var equalArrays = require_equalArrays();
      var mapToArray = require_mapToArray();
      var setToArray = require_setToArray();
      var COMPARE_PARTIAL_FLAG = 1;
      var COMPARE_UNORDERED_FLAG = 2;
      var boolTag = "[object Boolean]";
      var dateTag = "[object Date]";
      var errorTag = "[object Error]";
      var mapTag = "[object Map]";
      var numberTag = "[object Number]";
      var regexpTag = "[object RegExp]";
      var setTag = "[object Set]";
      var stringTag = "[object String]";
      var symbolTag = "[object Symbol]";
      var arrayBufferTag = "[object ArrayBuffer]";
      var dataViewTag = "[object DataView]";
      var symbolProto = Symbol2 ? Symbol2.prototype : void 0;
      var symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
      function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
        switch (tag) {
          case dataViewTag:
            if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
              return false;
            }
            object = object.buffer;
            other = other.buffer;
          case arrayBufferTag:
            if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array2(object), new Uint8Array2(other))) {
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
            return object == other + "";
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
            var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
            stack["delete"](object);
            return result;
          case symbolTag:
            if (symbolValueOf) {
              return symbolValueOf.call(object) == symbolValueOf.call(other);
            }
        }
        return false;
      }
      module.exports = equalByTag;
    }
  });

  // node_modules/lodash/_arrayPush.js
  var require_arrayPush = __commonJS({
    "node_modules/lodash/_arrayPush.js"(exports, module) {
      function arrayPush(array, values) {
        var index = -1, length = values.length, offset = array.length;
        while (++index < length) {
          array[offset + index] = values[index];
        }
        return array;
      }
      module.exports = arrayPush;
    }
  });

  // node_modules/lodash/_baseGetAllKeys.js
  var require_baseGetAllKeys = __commonJS({
    "node_modules/lodash/_baseGetAllKeys.js"(exports, module) {
      var arrayPush = require_arrayPush();
      var isArray = require_isArray();
      function baseGetAllKeys(object, keysFunc, symbolsFunc) {
        var result = keysFunc(object);
        return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
      }
      module.exports = baseGetAllKeys;
    }
  });

  // node_modules/lodash/_arrayFilter.js
  var require_arrayFilter = __commonJS({
    "node_modules/lodash/_arrayFilter.js"(exports, module) {
      function arrayFilter(array, predicate) {
        var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
        while (++index < length) {
          var value = array[index];
          if (predicate(value, index, array)) {
            result[resIndex++] = value;
          }
        }
        return result;
      }
      module.exports = arrayFilter;
    }
  });

  // node_modules/lodash/stubArray.js
  var require_stubArray = __commonJS({
    "node_modules/lodash/stubArray.js"(exports, module) {
      function stubArray() {
        return [];
      }
      module.exports = stubArray;
    }
  });

  // node_modules/lodash/_getSymbols.js
  var require_getSymbols = __commonJS({
    "node_modules/lodash/_getSymbols.js"(exports, module) {
      var arrayFilter = require_arrayFilter();
      var stubArray = require_stubArray();
      var objectProto = Object.prototype;
      var propertyIsEnumerable = objectProto.propertyIsEnumerable;
      var nativeGetSymbols = Object.getOwnPropertySymbols;
      var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
        if (object == null) {
          return [];
        }
        object = Object(object);
        return arrayFilter(nativeGetSymbols(object), function(symbol) {
          return propertyIsEnumerable.call(object, symbol);
        });
      };
      module.exports = getSymbols;
    }
  });

  // node_modules/lodash/_getAllKeys.js
  var require_getAllKeys = __commonJS({
    "node_modules/lodash/_getAllKeys.js"(exports, module) {
      var baseGetAllKeys = require_baseGetAllKeys();
      var getSymbols = require_getSymbols();
      var keys = require_keys();
      function getAllKeys(object) {
        return baseGetAllKeys(object, keys, getSymbols);
      }
      module.exports = getAllKeys;
    }
  });

  // node_modules/lodash/_equalObjects.js
  var require_equalObjects = __commonJS({
    "node_modules/lodash/_equalObjects.js"(exports, module) {
      var getAllKeys = require_getAllKeys();
      var COMPARE_PARTIAL_FLAG = 1;
      var objectProto = Object.prototype;
      var hasOwnProperty = objectProto.hasOwnProperty;
      function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
        var isPartial = bitmask & COMPARE_PARTIAL_FLAG, objProps = getAllKeys(object), objLength = objProps.length, othProps = getAllKeys(other), othLength = othProps.length;
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
        var result = true;
        stack.set(object, other);
        stack.set(other, object);
        var skipCtor = isPartial;
        while (++index < objLength) {
          key = objProps[index];
          var objValue = object[key], othValue = other[key];
          if (customizer) {
            var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
          }
          if (!(compared === void 0 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
            result = false;
            break;
          }
          skipCtor || (skipCtor = key == "constructor");
        }
        if (result && !skipCtor) {
          var objCtor = object.constructor, othCtor = other.constructor;
          if (objCtor != othCtor && ("constructor" in object && "constructor" in other) && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
            result = false;
          }
        }
        stack["delete"](object);
        stack["delete"](other);
        return result;
      }
      module.exports = equalObjects;
    }
  });

  // node_modules/lodash/_DataView.js
  var require_DataView = __commonJS({
    "node_modules/lodash/_DataView.js"(exports, module) {
      var getNative = require_getNative();
      var root = require_root();
      var DataView = getNative(root, "DataView");
      module.exports = DataView;
    }
  });

  // node_modules/lodash/_Promise.js
  var require_Promise = __commonJS({
    "node_modules/lodash/_Promise.js"(exports, module) {
      var getNative = require_getNative();
      var root = require_root();
      var Promise2 = getNative(root, "Promise");
      module.exports = Promise2;
    }
  });

  // node_modules/lodash/_Set.js
  var require_Set = __commonJS({
    "node_modules/lodash/_Set.js"(exports, module) {
      var getNative = require_getNative();
      var root = require_root();
      var Set2 = getNative(root, "Set");
      module.exports = Set2;
    }
  });

  // node_modules/lodash/_WeakMap.js
  var require_WeakMap = __commonJS({
    "node_modules/lodash/_WeakMap.js"(exports, module) {
      var getNative = require_getNative();
      var root = require_root();
      var WeakMap2 = getNative(root, "WeakMap");
      module.exports = WeakMap2;
    }
  });

  // node_modules/lodash/_getTag.js
  var require_getTag = __commonJS({
    "node_modules/lodash/_getTag.js"(exports, module) {
      var DataView = require_DataView();
      var Map2 = require_Map();
      var Promise2 = require_Promise();
      var Set2 = require_Set();
      var WeakMap2 = require_WeakMap();
      var baseGetTag = require_baseGetTag();
      var toSource = require_toSource();
      var mapTag = "[object Map]";
      var objectTag = "[object Object]";
      var promiseTag = "[object Promise]";
      var setTag = "[object Set]";
      var weakMapTag = "[object WeakMap]";
      var dataViewTag = "[object DataView]";
      var dataViewCtorString = toSource(DataView);
      var mapCtorString = toSource(Map2);
      var promiseCtorString = toSource(Promise2);
      var setCtorString = toSource(Set2);
      var weakMapCtorString = toSource(WeakMap2);
      var getTag2 = baseGetTag;
      if (DataView && getTag2(new DataView(new ArrayBuffer(1))) != dataViewTag || Map2 && getTag2(new Map2()) != mapTag || Promise2 && getTag2(Promise2.resolve()) != promiseTag || Set2 && getTag2(new Set2()) != setTag || WeakMap2 && getTag2(new WeakMap2()) != weakMapTag) {
        getTag2 = function(value) {
          var result = baseGetTag(value), Ctor = result == objectTag ? value.constructor : void 0, ctorString = Ctor ? toSource(Ctor) : "";
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
          return result;
        };
      }
      module.exports = getTag2;
    }
  });

  // node_modules/lodash/_baseIsEqualDeep.js
  var require_baseIsEqualDeep = __commonJS({
    "node_modules/lodash/_baseIsEqualDeep.js"(exports, module) {
      var Stack = require_Stack();
      var equalArrays = require_equalArrays();
      var equalByTag = require_equalByTag();
      var equalObjects = require_equalObjects();
      var getTag2 = require_getTag();
      var isArray = require_isArray();
      var isBuffer = require_isBuffer();
      var isTypedArray = require_isTypedArray();
      var COMPARE_PARTIAL_FLAG = 1;
      var argsTag = "[object Arguments]";
      var arrayTag = "[object Array]";
      var objectTag = "[object Object]";
      var objectProto = Object.prototype;
      var hasOwnProperty = objectProto.hasOwnProperty;
      function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
        var objIsArr = isArray(object), othIsArr = isArray(other), objTag = objIsArr ? arrayTag : getTag2(object), othTag = othIsArr ? arrayTag : getTag2(other);
        objTag = objTag == argsTag ? objectTag : objTag;
        othTag = othTag == argsTag ? objectTag : othTag;
        var objIsObj = objTag == objectTag, othIsObj = othTag == objectTag, isSameTag = objTag == othTag;
        if (isSameTag && isBuffer(object)) {
          if (!isBuffer(other)) {
            return false;
          }
          objIsArr = true;
          objIsObj = false;
        }
        if (isSameTag && !objIsObj) {
          stack || (stack = new Stack());
          return objIsArr || isTypedArray(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
        }
        if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
          var objIsWrapped = objIsObj && hasOwnProperty.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty.call(other, "__wrapped__");
          if (objIsWrapped || othIsWrapped) {
            var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
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
      module.exports = baseIsEqualDeep;
    }
  });

  // node_modules/lodash/_baseIsEqual.js
  var require_baseIsEqual = __commonJS({
    "node_modules/lodash/_baseIsEqual.js"(exports, module) {
      var baseIsEqualDeep = require_baseIsEqualDeep();
      var isObjectLike = require_isObjectLike();
      function baseIsEqual(value, other, bitmask, customizer, stack) {
        if (value === other) {
          return true;
        }
        if (value == null || other == null || !isObjectLike(value) && !isObjectLike(other)) {
          return value !== value && other !== other;
        }
        return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
      }
      module.exports = baseIsEqual;
    }
  });

  // node_modules/lodash/_baseIsMatch.js
  var require_baseIsMatch = __commonJS({
    "node_modules/lodash/_baseIsMatch.js"(exports, module) {
      var Stack = require_Stack();
      var baseIsEqual = require_baseIsEqual();
      var COMPARE_PARTIAL_FLAG = 1;
      var COMPARE_UNORDERED_FLAG = 2;
      function baseIsMatch(object, source, matchData, customizer) {
        var index = matchData.length, length = index, noCustomizer = !customizer;
        if (object == null) {
          return !length;
        }
        object = Object(object);
        while (index--) {
          var data = matchData[index];
          if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) {
            return false;
          }
        }
        while (++index < length) {
          data = matchData[index];
          var key = data[0], objValue = object[key], srcValue = data[1];
          if (noCustomizer && data[2]) {
            if (objValue === void 0 && !(key in object)) {
              return false;
            }
          } else {
            var stack = new Stack();
            if (customizer) {
              var result = customizer(objValue, srcValue, key, object, source, stack);
            }
            if (!(result === void 0 ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack) : result)) {
              return false;
            }
          }
        }
        return true;
      }
      module.exports = baseIsMatch;
    }
  });

  // node_modules/lodash/_isStrictComparable.js
  var require_isStrictComparable = __commonJS({
    "node_modules/lodash/_isStrictComparable.js"(exports, module) {
      var isObject2 = require_isObject();
      function isStrictComparable(value) {
        return value === value && !isObject2(value);
      }
      module.exports = isStrictComparable;
    }
  });

  // node_modules/lodash/_getMatchData.js
  var require_getMatchData = __commonJS({
    "node_modules/lodash/_getMatchData.js"(exports, module) {
      var isStrictComparable = require_isStrictComparable();
      var keys = require_keys();
      function getMatchData(object) {
        var result = keys(object), length = result.length;
        while (length--) {
          var key = result[length], value = object[key];
          result[length] = [key, value, isStrictComparable(value)];
        }
        return result;
      }
      module.exports = getMatchData;
    }
  });

  // node_modules/lodash/_matchesStrictComparable.js
  var require_matchesStrictComparable = __commonJS({
    "node_modules/lodash/_matchesStrictComparable.js"(exports, module) {
      function matchesStrictComparable(key, srcValue) {
        return function(object) {
          if (object == null) {
            return false;
          }
          return object[key] === srcValue && (srcValue !== void 0 || key in Object(object));
        };
      }
      module.exports = matchesStrictComparable;
    }
  });

  // node_modules/lodash/_baseMatches.js
  var require_baseMatches = __commonJS({
    "node_modules/lodash/_baseMatches.js"(exports, module) {
      var baseIsMatch = require_baseIsMatch();
      var getMatchData = require_getMatchData();
      var matchesStrictComparable = require_matchesStrictComparable();
      function baseMatches(source) {
        var matchData = getMatchData(source);
        if (matchData.length == 1 && matchData[0][2]) {
          return matchesStrictComparable(matchData[0][0], matchData[0][1]);
        }
        return function(object) {
          return object === source || baseIsMatch(object, source, matchData);
        };
      }
      module.exports = baseMatches;
    }
  });

  // node_modules/lodash/_isKey.js
  var require_isKey = __commonJS({
    "node_modules/lodash/_isKey.js"(exports, module) {
      var isArray = require_isArray();
      var isSymbol = require_isSymbol();
      var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/;
      var reIsPlainProp = /^\w*$/;
      function isKey(value, object) {
        if (isArray(value)) {
          return false;
        }
        var type = typeof value;
        if (type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol(value)) {
          return true;
        }
        return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
      }
      module.exports = isKey;
    }
  });

  // node_modules/lodash/memoize.js
  var require_memoize = __commonJS({
    "node_modules/lodash/memoize.js"(exports, module) {
      var MapCache = require_MapCache();
      var FUNC_ERROR_TEXT = "Expected a function";
      function memoize2(func, resolver) {
        if (typeof func != "function" || resolver != null && typeof resolver != "function") {
          throw new TypeError(FUNC_ERROR_TEXT);
        }
        var memoized = function() {
          var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
          if (cache.has(key)) {
            return cache.get(key);
          }
          var result = func.apply(this, args);
          memoized.cache = cache.set(key, result) || cache;
          return result;
        };
        memoized.cache = new (memoize2.Cache || MapCache)();
        return memoized;
      }
      memoize2.Cache = MapCache;
      module.exports = memoize2;
    }
  });

  // node_modules/lodash/_memoizeCapped.js
  var require_memoizeCapped = __commonJS({
    "node_modules/lodash/_memoizeCapped.js"(exports, module) {
      var memoize2 = require_memoize();
      var MAX_MEMOIZE_SIZE = 500;
      function memoizeCapped(func) {
        var result = memoize2(func, function(key) {
          if (cache.size === MAX_MEMOIZE_SIZE) {
            cache.clear();
          }
          return key;
        });
        var cache = result.cache;
        return result;
      }
      module.exports = memoizeCapped;
    }
  });

  // node_modules/lodash/_stringToPath.js
  var require_stringToPath = __commonJS({
    "node_modules/lodash/_stringToPath.js"(exports, module) {
      var memoizeCapped = require_memoizeCapped();
      var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
      var reEscapeChar = /\\(\\)?/g;
      var stringToPath = memoizeCapped(function(string) {
        var result = [];
        if (string.charCodeAt(0) === 46) {
          result.push("");
        }
        string.replace(rePropName, function(match2, number, quote, subString) {
          result.push(quote ? subString.replace(reEscapeChar, "$1") : number || match2);
        });
        return result;
      });
      module.exports = stringToPath;
    }
  });

  // node_modules/lodash/_baseToString.js
  var require_baseToString = __commonJS({
    "node_modules/lodash/_baseToString.js"(exports, module) {
      var Symbol2 = require_Symbol();
      var arrayMap = require_arrayMap();
      var isArray = require_isArray();
      var isSymbol = require_isSymbol();
      var INFINITY = 1 / 0;
      var symbolProto = Symbol2 ? Symbol2.prototype : void 0;
      var symbolToString = symbolProto ? symbolProto.toString : void 0;
      function baseToString(value) {
        if (typeof value == "string") {
          return value;
        }
        if (isArray(value)) {
          return arrayMap(value, baseToString) + "";
        }
        if (isSymbol(value)) {
          return symbolToString ? symbolToString.call(value) : "";
        }
        var result = value + "";
        return result == "0" && 1 / value == -INFINITY ? "-0" : result;
      }
      module.exports = baseToString;
    }
  });

  // node_modules/lodash/toString.js
  var require_toString = __commonJS({
    "node_modules/lodash/toString.js"(exports, module) {
      var baseToString = require_baseToString();
      function toString(value) {
        return value == null ? "" : baseToString(value);
      }
      module.exports = toString;
    }
  });

  // node_modules/lodash/_castPath.js
  var require_castPath = __commonJS({
    "node_modules/lodash/_castPath.js"(exports, module) {
      var isArray = require_isArray();
      var isKey = require_isKey();
      var stringToPath = require_stringToPath();
      var toString = require_toString();
      function castPath(value, object) {
        if (isArray(value)) {
          return value;
        }
        return isKey(value, object) ? [value] : stringToPath(toString(value));
      }
      module.exports = castPath;
    }
  });

  // node_modules/lodash/_toKey.js
  var require_toKey = __commonJS({
    "node_modules/lodash/_toKey.js"(exports, module) {
      var isSymbol = require_isSymbol();
      var INFINITY = 1 / 0;
      function toKey(value) {
        if (typeof value == "string" || isSymbol(value)) {
          return value;
        }
        var result = value + "";
        return result == "0" && 1 / value == -INFINITY ? "-0" : result;
      }
      module.exports = toKey;
    }
  });

  // node_modules/lodash/_baseGet.js
  var require_baseGet = __commonJS({
    "node_modules/lodash/_baseGet.js"(exports, module) {
      var castPath = require_castPath();
      var toKey = require_toKey();
      function baseGet(object, path) {
        path = castPath(path, object);
        var index = 0, length = path.length;
        while (object != null && index < length) {
          object = object[toKey(path[index++])];
        }
        return index && index == length ? object : void 0;
      }
      module.exports = baseGet;
    }
  });

  // node_modules/lodash/get.js
  var require_get = __commonJS({
    "node_modules/lodash/get.js"(exports, module) {
      var baseGet = require_baseGet();
      function get2(object, path, defaultValue) {
        var result = object == null ? void 0 : baseGet(object, path);
        return result === void 0 ? defaultValue : result;
      }
      module.exports = get2;
    }
  });

  // node_modules/lodash/_baseHasIn.js
  var require_baseHasIn = __commonJS({
    "node_modules/lodash/_baseHasIn.js"(exports, module) {
      function baseHasIn(object, key) {
        return object != null && key in Object(object);
      }
      module.exports = baseHasIn;
    }
  });

  // node_modules/lodash/_hasPath.js
  var require_hasPath = __commonJS({
    "node_modules/lodash/_hasPath.js"(exports, module) {
      var castPath = require_castPath();
      var isArguments = require_isArguments();
      var isArray = require_isArray();
      var isIndex = require_isIndex();
      var isLength = require_isLength();
      var toKey = require_toKey();
      function hasPath(object, path, hasFunc) {
        path = castPath(path, object);
        var index = -1, length = path.length, result = false;
        while (++index < length) {
          var key = toKey(path[index]);
          if (!(result = object != null && hasFunc(object, key))) {
            break;
          }
          object = object[key];
        }
        if (result || ++index != length) {
          return result;
        }
        length = object == null ? 0 : object.length;
        return !!length && isLength(length) && isIndex(key, length) && (isArray(object) || isArguments(object));
      }
      module.exports = hasPath;
    }
  });

  // node_modules/lodash/hasIn.js
  var require_hasIn = __commonJS({
    "node_modules/lodash/hasIn.js"(exports, module) {
      var baseHasIn = require_baseHasIn();
      var hasPath = require_hasPath();
      function hasIn(object, path) {
        return object != null && hasPath(object, path, baseHasIn);
      }
      module.exports = hasIn;
    }
  });

  // node_modules/lodash/_baseMatchesProperty.js
  var require_baseMatchesProperty = __commonJS({
    "node_modules/lodash/_baseMatchesProperty.js"(exports, module) {
      var baseIsEqual = require_baseIsEqual();
      var get2 = require_get();
      var hasIn = require_hasIn();
      var isKey = require_isKey();
      var isStrictComparable = require_isStrictComparable();
      var matchesStrictComparable = require_matchesStrictComparable();
      var toKey = require_toKey();
      var COMPARE_PARTIAL_FLAG = 1;
      var COMPARE_UNORDERED_FLAG = 2;
      function baseMatchesProperty(path, srcValue) {
        if (isKey(path) && isStrictComparable(srcValue)) {
          return matchesStrictComparable(toKey(path), srcValue);
        }
        return function(object) {
          var objValue = get2(object, path);
          return objValue === void 0 && objValue === srcValue ? hasIn(object, path) : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
        };
      }
      module.exports = baseMatchesProperty;
    }
  });

  // node_modules/lodash/_baseProperty.js
  var require_baseProperty = __commonJS({
    "node_modules/lodash/_baseProperty.js"(exports, module) {
      function baseProperty(key) {
        return function(object) {
          return object == null ? void 0 : object[key];
        };
      }
      module.exports = baseProperty;
    }
  });

  // node_modules/lodash/_basePropertyDeep.js
  var require_basePropertyDeep = __commonJS({
    "node_modules/lodash/_basePropertyDeep.js"(exports, module) {
      var baseGet = require_baseGet();
      function basePropertyDeep(path) {
        return function(object) {
          return baseGet(object, path);
        };
      }
      module.exports = basePropertyDeep;
    }
  });

  // node_modules/lodash/property.js
  var require_property = __commonJS({
    "node_modules/lodash/property.js"(exports, module) {
      var baseProperty = require_baseProperty();
      var basePropertyDeep = require_basePropertyDeep();
      var isKey = require_isKey();
      var toKey = require_toKey();
      function property(path) {
        return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
      }
      module.exports = property;
    }
  });

  // node_modules/lodash/_baseIteratee.js
  var require_baseIteratee = __commonJS({
    "node_modules/lodash/_baseIteratee.js"(exports, module) {
      var baseMatches = require_baseMatches();
      var baseMatchesProperty = require_baseMatchesProperty();
      var identity = require_identity();
      var isArray = require_isArray();
      var property = require_property();
      function baseIteratee(value) {
        if (typeof value == "function") {
          return value;
        }
        if (value == null) {
          return identity;
        }
        if (typeof value == "object") {
          return isArray(value) ? baseMatchesProperty(value[0], value[1]) : baseMatches(value);
        }
        return property(value);
      }
      module.exports = baseIteratee;
    }
  });

  // node_modules/lodash/_baseMap.js
  var require_baseMap = __commonJS({
    "node_modules/lodash/_baseMap.js"(exports, module) {
      var baseEach = require_baseEach();
      var isArrayLike = require_isArrayLike();
      function baseMap(collection, iteratee) {
        var index = -1, result = isArrayLike(collection) ? Array(collection.length) : [];
        baseEach(collection, function(value, key, collection2) {
          result[++index] = iteratee(value, key, collection2);
        });
        return result;
      }
      module.exports = baseMap;
    }
  });

  // node_modules/lodash/map.js
  var require_map = __commonJS({
    "node_modules/lodash/map.js"(exports, module) {
      var arrayMap = require_arrayMap();
      var baseIteratee = require_baseIteratee();
      var baseMap = require_baseMap();
      var isArray = require_isArray();
      function map5(collection, iteratee) {
        var func = isArray(collection) ? arrayMap : baseMap;
        return func(collection, baseIteratee(iteratee, 3));
      }
      module.exports = map5;
    }
  });

  // node_modules/lodash/_defineProperty.js
  var require_defineProperty = __commonJS({
    "node_modules/lodash/_defineProperty.js"(exports, module) {
      var getNative = require_getNative();
      var defineProperty2 = function() {
        try {
          var func = getNative(Object, "defineProperty");
          func({}, "", {});
          return func;
        } catch (e) {
        }
      }();
      module.exports = defineProperty2;
    }
  });

  // node_modules/lodash/_baseAssignValue.js
  var require_baseAssignValue = __commonJS({
    "node_modules/lodash/_baseAssignValue.js"(exports, module) {
      var defineProperty2 = require_defineProperty();
      function baseAssignValue(object, key, value) {
        if (key == "__proto__" && defineProperty2) {
          defineProperty2(object, key, {
            "configurable": true,
            "enumerable": true,
            "value": value,
            "writable": true
          });
        } else {
          object[key] = value;
        }
      }
      module.exports = baseAssignValue;
    }
  });

  // node_modules/lodash/_assignMergeValue.js
  var require_assignMergeValue = __commonJS({
    "node_modules/lodash/_assignMergeValue.js"(exports, module) {
      var baseAssignValue = require_baseAssignValue();
      var eq = require_eq();
      function assignMergeValue(object, key, value) {
        if (value !== void 0 && !eq(object[key], value) || value === void 0 && !(key in object)) {
          baseAssignValue(object, key, value);
        }
      }
      module.exports = assignMergeValue;
    }
  });

  // node_modules/lodash/_cloneBuffer.js
  var require_cloneBuffer = __commonJS({
    "node_modules/lodash/_cloneBuffer.js"(exports, module) {
      var root = require_root();
      var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
      var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
      var moduleExports = freeModule && freeModule.exports === freeExports;
      var Buffer2 = moduleExports ? root.Buffer : void 0;
      var allocUnsafe = Buffer2 ? Buffer2.allocUnsafe : void 0;
      function cloneBuffer(buffer, isDeep) {
        if (isDeep) {
          return buffer.slice();
        }
        var length = buffer.length, result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
        buffer.copy(result);
        return result;
      }
      module.exports = cloneBuffer;
    }
  });

  // node_modules/lodash/_cloneArrayBuffer.js
  var require_cloneArrayBuffer = __commonJS({
    "node_modules/lodash/_cloneArrayBuffer.js"(exports, module) {
      var Uint8Array2 = require_Uint8Array();
      function cloneArrayBuffer(arrayBuffer) {
        var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
        new Uint8Array2(result).set(new Uint8Array2(arrayBuffer));
        return result;
      }
      module.exports = cloneArrayBuffer;
    }
  });

  // node_modules/lodash/_cloneTypedArray.js
  var require_cloneTypedArray = __commonJS({
    "node_modules/lodash/_cloneTypedArray.js"(exports, module) {
      var cloneArrayBuffer = require_cloneArrayBuffer();
      function cloneTypedArray(typedArray, isDeep) {
        var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
        return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
      }
      module.exports = cloneTypedArray;
    }
  });

  // node_modules/lodash/_copyArray.js
  var require_copyArray = __commonJS({
    "node_modules/lodash/_copyArray.js"(exports, module) {
      function copyArray(source, array) {
        var index = -1, length = source.length;
        array || (array = Array(length));
        while (++index < length) {
          array[index] = source[index];
        }
        return array;
      }
      module.exports = copyArray;
    }
  });

  // node_modules/lodash/_baseCreate.js
  var require_baseCreate = __commonJS({
    "node_modules/lodash/_baseCreate.js"(exports, module) {
      var isObject2 = require_isObject();
      var objectCreate = Object.create;
      var baseCreate = /* @__PURE__ */ function() {
        function object() {
        }
        return function(proto) {
          if (!isObject2(proto)) {
            return {};
          }
          if (objectCreate) {
            return objectCreate(proto);
          }
          object.prototype = proto;
          var result = new object();
          object.prototype = void 0;
          return result;
        };
      }();
      module.exports = baseCreate;
    }
  });

  // node_modules/lodash/_getPrototype.js
  var require_getPrototype = __commonJS({
    "node_modules/lodash/_getPrototype.js"(exports, module) {
      var overArg = require_overArg();
      var getPrototype = overArg(Object.getPrototypeOf, Object);
      module.exports = getPrototype;
    }
  });

  // node_modules/lodash/_initCloneObject.js
  var require_initCloneObject = __commonJS({
    "node_modules/lodash/_initCloneObject.js"(exports, module) {
      var baseCreate = require_baseCreate();
      var getPrototype = require_getPrototype();
      var isPrototype = require_isPrototype();
      function initCloneObject(object) {
        return typeof object.constructor == "function" && !isPrototype(object) ? baseCreate(getPrototype(object)) : {};
      }
      module.exports = initCloneObject;
    }
  });

  // node_modules/lodash/isArrayLikeObject.js
  var require_isArrayLikeObject = __commonJS({
    "node_modules/lodash/isArrayLikeObject.js"(exports, module) {
      var isArrayLike = require_isArrayLike();
      var isObjectLike = require_isObjectLike();
      function isArrayLikeObject(value) {
        return isObjectLike(value) && isArrayLike(value);
      }
      module.exports = isArrayLikeObject;
    }
  });

  // node_modules/lodash/isPlainObject.js
  var require_isPlainObject = __commonJS({
    "node_modules/lodash/isPlainObject.js"(exports, module) {
      var baseGetTag = require_baseGetTag();
      var getPrototype = require_getPrototype();
      var isObjectLike = require_isObjectLike();
      var objectTag = "[object Object]";
      var funcProto = Function.prototype;
      var objectProto = Object.prototype;
      var funcToString = funcProto.toString;
      var hasOwnProperty = objectProto.hasOwnProperty;
      var objectCtorString = funcToString.call(Object);
      function isPlainObject(value) {
        if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
          return false;
        }
        var proto = getPrototype(value);
        if (proto === null) {
          return true;
        }
        var Ctor = hasOwnProperty.call(proto, "constructor") && proto.constructor;
        return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
      }
      module.exports = isPlainObject;
    }
  });

  // node_modules/lodash/_safeGet.js
  var require_safeGet = __commonJS({
    "node_modules/lodash/_safeGet.js"(exports, module) {
      function safeGet(object, key) {
        if (key === "constructor" && typeof object[key] === "function") {
          return;
        }
        if (key == "__proto__") {
          return;
        }
        return object[key];
      }
      module.exports = safeGet;
    }
  });

  // node_modules/lodash/_assignValue.js
  var require_assignValue = __commonJS({
    "node_modules/lodash/_assignValue.js"(exports, module) {
      var baseAssignValue = require_baseAssignValue();
      var eq = require_eq();
      var objectProto = Object.prototype;
      var hasOwnProperty = objectProto.hasOwnProperty;
      function assignValue(object, key, value) {
        var objValue = object[key];
        if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) || value === void 0 && !(key in object)) {
          baseAssignValue(object, key, value);
        }
      }
      module.exports = assignValue;
    }
  });

  // node_modules/lodash/_copyObject.js
  var require_copyObject = __commonJS({
    "node_modules/lodash/_copyObject.js"(exports, module) {
      var assignValue = require_assignValue();
      var baseAssignValue = require_baseAssignValue();
      function copyObject(source, props, object, customizer) {
        var isNew = !object;
        object || (object = {});
        var index = -1, length = props.length;
        while (++index < length) {
          var key = props[index];
          var newValue = customizer ? customizer(object[key], source[key], key, object, source) : void 0;
          if (newValue === void 0) {
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
      module.exports = copyObject;
    }
  });

  // node_modules/lodash/_nativeKeysIn.js
  var require_nativeKeysIn = __commonJS({
    "node_modules/lodash/_nativeKeysIn.js"(exports, module) {
      function nativeKeysIn(object) {
        var result = [];
        if (object != null) {
          for (var key in Object(object)) {
            result.push(key);
          }
        }
        return result;
      }
      module.exports = nativeKeysIn;
    }
  });

  // node_modules/lodash/_baseKeysIn.js
  var require_baseKeysIn = __commonJS({
    "node_modules/lodash/_baseKeysIn.js"(exports, module) {
      var isObject2 = require_isObject();
      var isPrototype = require_isPrototype();
      var nativeKeysIn = require_nativeKeysIn();
      var objectProto = Object.prototype;
      var hasOwnProperty = objectProto.hasOwnProperty;
      function baseKeysIn(object) {
        if (!isObject2(object)) {
          return nativeKeysIn(object);
        }
        var isProto = isPrototype(object), result = [];
        for (var key in object) {
          if (!(key == "constructor" && (isProto || !hasOwnProperty.call(object, key)))) {
            result.push(key);
          }
        }
        return result;
      }
      module.exports = baseKeysIn;
    }
  });

  // node_modules/lodash/keysIn.js
  var require_keysIn = __commonJS({
    "node_modules/lodash/keysIn.js"(exports, module) {
      var arrayLikeKeys = require_arrayLikeKeys();
      var baseKeysIn = require_baseKeysIn();
      var isArrayLike = require_isArrayLike();
      function keysIn(object) {
        return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
      }
      module.exports = keysIn;
    }
  });

  // node_modules/lodash/toPlainObject.js
  var require_toPlainObject = __commonJS({
    "node_modules/lodash/toPlainObject.js"(exports, module) {
      var copyObject = require_copyObject();
      var keysIn = require_keysIn();
      function toPlainObject(value) {
        return copyObject(value, keysIn(value));
      }
      module.exports = toPlainObject;
    }
  });

  // node_modules/lodash/_baseMergeDeep.js
  var require_baseMergeDeep = __commonJS({
    "node_modules/lodash/_baseMergeDeep.js"(exports, module) {
      var assignMergeValue = require_assignMergeValue();
      var cloneBuffer = require_cloneBuffer();
      var cloneTypedArray = require_cloneTypedArray();
      var copyArray = require_copyArray();
      var initCloneObject = require_initCloneObject();
      var isArguments = require_isArguments();
      var isArray = require_isArray();
      var isArrayLikeObject = require_isArrayLikeObject();
      var isBuffer = require_isBuffer();
      var isFunction2 = require_isFunction();
      var isObject2 = require_isObject();
      var isPlainObject = require_isPlainObject();
      var isTypedArray = require_isTypedArray();
      var safeGet = require_safeGet();
      var toPlainObject = require_toPlainObject();
      function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
        var objValue = safeGet(object, key), srcValue = safeGet(source, key), stacked = stack.get(srcValue);
        if (stacked) {
          assignMergeValue(object, key, stacked);
          return;
        }
        var newValue = customizer ? customizer(objValue, srcValue, key + "", object, source, stack) : void 0;
        var isCommon = newValue === void 0;
        if (isCommon) {
          var isArr = isArray(srcValue), isBuff = !isArr && isBuffer(srcValue), isTyped = !isArr && !isBuff && isTypedArray(srcValue);
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
          stack["delete"](srcValue);
        }
        assignMergeValue(object, key, newValue);
      }
      module.exports = baseMergeDeep;
    }
  });

  // node_modules/lodash/_baseMerge.js
  var require_baseMerge = __commonJS({
    "node_modules/lodash/_baseMerge.js"(exports, module) {
      var Stack = require_Stack();
      var assignMergeValue = require_assignMergeValue();
      var baseFor = require_baseFor();
      var baseMergeDeep = require_baseMergeDeep();
      var isObject2 = require_isObject();
      var keysIn = require_keysIn();
      var safeGet = require_safeGet();
      function baseMerge(object, source, srcIndex, customizer, stack) {
        if (object === source) {
          return;
        }
        baseFor(source, function(srcValue, key) {
          stack || (stack = new Stack());
          if (isObject2(srcValue)) {
            baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
          } else {
            var newValue = customizer ? customizer(safeGet(object, key), srcValue, key + "", object, source, stack) : void 0;
            if (newValue === void 0) {
              newValue = srcValue;
            }
            assignMergeValue(object, key, newValue);
          }
        }, keysIn);
      }
      module.exports = baseMerge;
    }
  });

  // node_modules/lodash/_apply.js
  var require_apply = __commonJS({
    "node_modules/lodash/_apply.js"(exports, module) {
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
      module.exports = apply;
    }
  });

  // node_modules/lodash/_overRest.js
  var require_overRest = __commonJS({
    "node_modules/lodash/_overRest.js"(exports, module) {
      var apply = require_apply();
      var nativeMax = Math.max;
      function overRest(func, start, transform) {
        start = nativeMax(start === void 0 ? func.length - 1 : start, 0);
        return function() {
          var args = arguments, index = -1, length = nativeMax(args.length - start, 0), array = Array(length);
          while (++index < length) {
            array[index] = args[start + index];
          }
          index = -1;
          var otherArgs = Array(start + 1);
          while (++index < start) {
            otherArgs[index] = args[index];
          }
          otherArgs[start] = transform(array);
          return apply(func, this, otherArgs);
        };
      }
      module.exports = overRest;
    }
  });

  // node_modules/lodash/constant.js
  var require_constant = __commonJS({
    "node_modules/lodash/constant.js"(exports, module) {
      function constant(value) {
        return function() {
          return value;
        };
      }
      module.exports = constant;
    }
  });

  // node_modules/lodash/_baseSetToString.js
  var require_baseSetToString = __commonJS({
    "node_modules/lodash/_baseSetToString.js"(exports, module) {
      var constant = require_constant();
      var defineProperty2 = require_defineProperty();
      var identity = require_identity();
      var baseSetToString = !defineProperty2 ? identity : function(func, string) {
        return defineProperty2(func, "toString", {
          "configurable": true,
          "enumerable": false,
          "value": constant(string),
          "writable": true
        });
      };
      module.exports = baseSetToString;
    }
  });

  // node_modules/lodash/_shortOut.js
  var require_shortOut = __commonJS({
    "node_modules/lodash/_shortOut.js"(exports, module) {
      var HOT_COUNT = 800;
      var HOT_SPAN = 16;
      var nativeNow = Date.now;
      function shortOut(func) {
        var count = 0, lastCalled = 0;
        return function() {
          var stamp = nativeNow(), remaining = HOT_SPAN - (stamp - lastCalled);
          lastCalled = stamp;
          if (remaining > 0) {
            if (++count >= HOT_COUNT) {
              return arguments[0];
            }
          } else {
            count = 0;
          }
          return func.apply(void 0, arguments);
        };
      }
      module.exports = shortOut;
    }
  });

  // node_modules/lodash/_setToString.js
  var require_setToString = __commonJS({
    "node_modules/lodash/_setToString.js"(exports, module) {
      var baseSetToString = require_baseSetToString();
      var shortOut = require_shortOut();
      var setToString = shortOut(baseSetToString);
      module.exports = setToString;
    }
  });

  // node_modules/lodash/_baseRest.js
  var require_baseRest = __commonJS({
    "node_modules/lodash/_baseRest.js"(exports, module) {
      var identity = require_identity();
      var overRest = require_overRest();
      var setToString = require_setToString();
      function baseRest(func, start) {
        return setToString(overRest(func, start, identity), func + "");
      }
      module.exports = baseRest;
    }
  });

  // node_modules/lodash/_isIterateeCall.js
  var require_isIterateeCall = __commonJS({
    "node_modules/lodash/_isIterateeCall.js"(exports, module) {
      var eq = require_eq();
      var isArrayLike = require_isArrayLike();
      var isIndex = require_isIndex();
      var isObject2 = require_isObject();
      function isIterateeCall(value, index, object) {
        if (!isObject2(object)) {
          return false;
        }
        var type = typeof index;
        if (type == "number" ? isArrayLike(object) && isIndex(index, object.length) : type == "string" && index in object) {
          return eq(object[index], value);
        }
        return false;
      }
      module.exports = isIterateeCall;
    }
  });

  // node_modules/lodash/_createAssigner.js
  var require_createAssigner = __commonJS({
    "node_modules/lodash/_createAssigner.js"(exports, module) {
      var baseRest = require_baseRest();
      var isIterateeCall = require_isIterateeCall();
      function createAssigner(assigner) {
        return baseRest(function(object, sources) {
          var index = -1, length = sources.length, customizer = length > 1 ? sources[length - 1] : void 0, guard = length > 2 ? sources[2] : void 0;
          customizer = assigner.length > 3 && typeof customizer == "function" ? (length--, customizer) : void 0;
          if (guard && isIterateeCall(sources[0], sources[1], guard)) {
            customizer = length < 3 ? void 0 : customizer;
            length = 1;
          }
          object = Object(object);
          while (++index < length) {
            var source = sources[index];
            if (source) {
              assigner(object, source, index, customizer);
            }
          }
          return object;
        });
      }
      module.exports = createAssigner;
    }
  });

  // node_modules/lodash/merge.js
  var require_merge = __commonJS({
    "node_modules/lodash/merge.js"(exports, module) {
      var baseMerge = require_baseMerge();
      var createAssigner = require_createAssigner();
      var merge2 = createAssigner(function(object, source, srcIndex) {
        baseMerge(object, source, srcIndex);
      });
      module.exports = merge2;
    }
  });

  // node_modules/lodash/parseInt.js
  var require_parseInt = __commonJS({
    "node_modules/lodash/parseInt.js"(exports, module) {
      var root = require_root();
      var toString = require_toString();
      var reTrimStart = /^\s+/;
      var nativeParseInt = root.parseInt;
      function parseInt3(string, radix, guard) {
        if (guard || radix == null) {
          radix = 0;
        } else if (radix) {
          radix = +radix;
        }
        return nativeParseInt(toString(string).replace(reTrimStart, ""), radix || 0);
      }
      module.exports = parseInt3;
    }
  });

  // node_modules/lodash/_arrayReduce.js
  var require_arrayReduce = __commonJS({
    "node_modules/lodash/_arrayReduce.js"(exports, module) {
      function arrayReduce(array, iteratee, accumulator, initAccum) {
        var index = -1, length = array == null ? 0 : array.length;
        if (initAccum && length) {
          accumulator = array[++index];
        }
        while (++index < length) {
          accumulator = iteratee(accumulator, array[index], index, array);
        }
        return accumulator;
      }
      module.exports = arrayReduce;
    }
  });

  // node_modules/lodash/_baseReduce.js
  var require_baseReduce = __commonJS({
    "node_modules/lodash/_baseReduce.js"(exports, module) {
      function baseReduce(collection, iteratee, accumulator, initAccum, eachFunc) {
        eachFunc(collection, function(value, index, collection2) {
          accumulator = initAccum ? (initAccum = false, value) : iteratee(accumulator, value, index, collection2);
        });
        return accumulator;
      }
      module.exports = baseReduce;
    }
  });

  // node_modules/lodash/reduce.js
  var require_reduce = __commonJS({
    "node_modules/lodash/reduce.js"(exports, module) {
      var arrayReduce = require_arrayReduce();
      var baseEach = require_baseEach();
      var baseIteratee = require_baseIteratee();
      var baseReduce = require_baseReduce();
      var isArray = require_isArray();
      function reduce4(collection, iteratee, accumulator) {
        var func = isArray(collection) ? arrayReduce : baseReduce, initAccum = arguments.length < 3;
        return func(collection, baseIteratee(iteratee, 4), accumulator, initAccum, baseEach);
      }
      module.exports = reduce4;
    }
  });

  // node_modules/lodash/_baseRandom.js
  var require_baseRandom = __commonJS({
    "node_modules/lodash/_baseRandom.js"(exports, module) {
      var nativeFloor = Math.floor;
      var nativeRandom = Math.random;
      function baseRandom(lower, upper) {
        return lower + nativeFloor(nativeRandom() * (upper - lower + 1));
      }
      module.exports = baseRandom;
    }
  });

  // node_modules/lodash/toFinite.js
  var require_toFinite = __commonJS({
    "node_modules/lodash/toFinite.js"(exports, module) {
      var toNumber = require_toNumber();
      var INFINITY = 1 / 0;
      var MAX_INTEGER = 17976931348623157e292;
      function toFinite(value) {
        if (!value) {
          return value === 0 ? value : 0;
        }
        value = toNumber(value);
        if (value === INFINITY || value === -INFINITY) {
          var sign2 = value < 0 ? -1 : 1;
          return sign2 * MAX_INTEGER;
        }
        return value === value ? value : 0;
      }
      module.exports = toFinite;
    }
  });

  // node_modules/lodash/random.js
  var require_random = __commonJS({
    "node_modules/lodash/random.js"(exports, module) {
      var baseRandom = require_baseRandom();
      var isIterateeCall = require_isIterateeCall();
      var toFinite = require_toFinite();
      var freeParseFloat = parseFloat;
      var nativeMin = Math.min;
      var nativeRandom = Math.random;
      function random3(lower, upper, floating) {
        if (floating && typeof floating != "boolean" && isIterateeCall(lower, upper, floating)) {
          upper = floating = void 0;
        }
        if (floating === void 0) {
          if (typeof upper == "boolean") {
            floating = upper;
            upper = void 0;
          } else if (typeof lower == "boolean") {
            floating = lower;
            lower = void 0;
          }
        }
        if (lower === void 0 && upper === void 0) {
          lower = 0;
          upper = 1;
        } else {
          lower = toFinite(lower);
          if (upper === void 0) {
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
          return nativeMin(lower + rand * (upper - lower + freeParseFloat("1e-" + ((rand + "").length - 1))), upper);
        }
        return baseRandom(lower, upper);
      }
      module.exports = random3;
    }
  });

  // node_modules/lodash/_baseRange.js
  var require_baseRange = __commonJS({
    "node_modules/lodash/_baseRange.js"(exports, module) {
      var nativeCeil = Math.ceil;
      var nativeMax = Math.max;
      function baseRange(start, end, step, fromRight) {
        var index = -1, length = nativeMax(nativeCeil((end - start) / (step || 1)), 0), result = Array(length);
        while (length--) {
          result[fromRight ? length : ++index] = start;
          start += step;
        }
        return result;
      }
      module.exports = baseRange;
    }
  });

  // node_modules/lodash/_createRange.js
  var require_createRange = __commonJS({
    "node_modules/lodash/_createRange.js"(exports, module) {
      var baseRange = require_baseRange();
      var isIterateeCall = require_isIterateeCall();
      var toFinite = require_toFinite();
      function createRange(fromRight) {
        return function(start, end, step) {
          if (step && typeof step != "number" && isIterateeCall(start, end, step)) {
            end = step = void 0;
          }
          start = toFinite(start);
          if (end === void 0) {
            end = start;
            start = 0;
          } else {
            end = toFinite(end);
          }
          step = step === void 0 ? start < end ? 1 : -1 : toFinite(step);
          return baseRange(start, end, step, fromRight);
        };
      }
      module.exports = createRange;
    }
  });

  // node_modules/lodash/range.js
  var require_range = __commonJS({
    "node_modules/lodash/range.js"(exports, module) {
      var createRange = require_createRange();
      var range3 = createRange();
      module.exports = range3;
    }
  });

  // node_modules/lodash/head.js
  var require_head = __commonJS({
    "node_modules/lodash/head.js"(exports, module) {
      function head(array) {
        return array && array.length ? array[0] : void 0;
      }
      module.exports = head;
    }
  });

  // node_modules/lodash/first.js
  var require_first = __commonJS({
    "node_modules/lodash/first.js"(exports, module) {
      module.exports = require_head();
    }
  });

  // node_modules/lodash/last.js
  var require_last = __commonJS({
    "node_modules/lodash/last.js"(exports, module) {
      function last2(array) {
        var length = array == null ? 0 : array.length;
        return length ? array[length - 1] : void 0;
      }
      module.exports = last2;
    }
  });

  // node_modules/lodash/_baseSlice.js
  var require_baseSlice = __commonJS({
    "node_modules/lodash/_baseSlice.js"(exports, module) {
      function baseSlice(array, start, end) {
        var index = -1, length = array.length;
        if (start < 0) {
          start = -start > length ? 0 : length + start;
        }
        end = end > length ? length : end;
        if (end < 0) {
          end += length;
        }
        length = start > end ? 0 : end - start >>> 0;
        start >>>= 0;
        var result = Array(length);
        while (++index < length) {
          result[index] = array[index + start];
        }
        return result;
      }
      module.exports = baseSlice;
    }
  });

  // node_modules/lodash/tail.js
  var require_tail = __commonJS({
    "node_modules/lodash/tail.js"(exports, module) {
      var baseSlice = require_baseSlice();
      function tail2(array) {
        var length = array == null ? 0 : array.length;
        return length ? baseSlice(array, 1, length) : [];
      }
      module.exports = tail2;
    }
  });

  // src/app/app.js
  var import_observable7 = __toESM(require_observable(), 1);

  // node_modules/riot/esm/dependencies/@riotjs/util/constants.js
  var COMPONENTS_IMPLEMENTATION_MAP = /* @__PURE__ */ new Map();
  var DOM_COMPONENT_INSTANCE_PROPERTY = Symbol("riot-component");
  var PLUGINS_SET = /* @__PURE__ */ new Set();
  var PROPS_KEY = "props";
  var STATE_KEY = "state";
  var IS_PURE_SYMBOL = Symbol("pure");
  var IS_COMPONENT_UPDATING = Symbol("is_updating");
  var PARENT_KEY_SYMBOL = Symbol("parent");
  var ATTRIBUTES_KEY_SYMBOL = Symbol("attributes");
  var TEMPLATE_KEY_SYMBOL = Symbol("template");

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
    REF
  };

  // node_modules/riot/esm/dependencies/@riotjs/util/strings.js
  function dashToCamelCase(string) {
    return string.replace(/-(\w)/g, (_, c) => c.toUpperCase());
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
        case (!attribute.name && type === ATTRIBUTE):
          return {
            ...acc,
            ...value
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
    return el.tagName.toLowerCase() === "template";
  }
  function isFunction(value) {
    return checkType(value, "function");
  }
  function isBoolean(value) {
    return checkType(value, "boolean");
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
  var insertBefore = (newNode, refNode) => refNode && refNode.parentNode && refNode.parentNode.insertBefore(newNode, refNode);
  var replaceChild = (newNode, replaced) => replaced && replaced.parentNode && replaced.parentNode.replaceChild(newNode, replaced);

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
    SLOT
  };

  // node_modules/riot/esm/dependencies/@riotjs/util/objects.js
  function defineProperty(source, key, value, options = {}) {
    Object.defineProperty(source, key, {
      value,
      enumerable: false,
      writable: false,
      configurable: true,
      ...options
    });
    return source;
  }

  // node_modules/riot/esm/dependencies/@riotjs/dom-bindings/dist/dom-bindings.js
  var HEAD_SYMBOL = Symbol();
  var TAIL_SYMBOL = Symbol();
  function createHeadTailPlaceholders() {
    const head = document.createTextNode("");
    const tail2 = document.createTextNode("");
    head[HEAD_SYMBOL] = true;
    tail2[TAIL_SYMBOL] = true;
    return { head, tail: tail2 };
  }
  function createTemplateMeta(componentTemplate) {
    const fragment = componentTemplate.dom.cloneNode(true);
    const { head, tail: tail2 } = createHeadTailPlaceholders();
    return {
      avoidDOMInjection: true,
      fragment,
      head,
      tail: tail2,
      children: [head, ...Array.from(fragment.childNodes), tail2]
    };
  }
  var udomdiff = (a, b, get2, before) => {
    const bLength = b.length;
    let aEnd = a.length;
    let bEnd = bLength;
    let aStart = 0;
    let bStart = 0;
    let map5 = null;
    while (aStart < aEnd || bStart < bEnd) {
      if (aEnd === aStart) {
        const node = bEnd < bLength ? bStart ? get2(b[bStart - 1], -0).nextSibling : get2(b[bEnd - bStart], 0) : before;
        while (bStart < bEnd) insertBefore(get2(b[bStart++], 1), node);
      } else if (bEnd === bStart) {
        while (aStart < aEnd) {
          if (!map5 || !map5.has(a[aStart])) removeChild(get2(a[aStart], -1));
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
        if (!map5) {
          map5 = /* @__PURE__ */ new Map();
          let i = bStart;
          while (i < bEnd) map5.set(b[i], i++);
        }
        if (map5.has(a[aStart])) {
          const index = map5.get(a[aStart]);
          if (bStart < index && index < bEnd) {
            let i = aStart;
            let sequence = 1;
            while (++i < aEnd && i < bEnd && map5.get(a[i]) === index + sequence)
              sequence++;
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
  var UNMOUNT_SCOPE = Symbol("unmount");
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
      const { newChildrenMap, batches, futureNodes } = createPatch(
        items,
        scope,
        parentScope,
        this
      );
      udomdiff(
        nodes,
        futureNodes,
        patch(Array.from(childrenMap.values()), parentScope),
        placeholder
      );
      batches.forEach((fn) => fn());
      this.childrenMap = newChildrenMap;
      this.nodes = futureNodes;
      return this;
    },
    unmount(scope, parentScope) {
      this.update(UNMOUNT_SCOPE, parentScope);
      return this;
    }
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
    const {
      condition,
      template,
      childrenMap,
      itemName,
      getKey,
      indexName,
      root,
      isTemplateTag
    } = binding;
    const newChildrenMap = /* @__PURE__ */ new Map();
    const batches = [];
    const futureNodes = [];
    items.forEach((item, index) => {
      const context = extendScope(Object.create(scope), {
        itemName,
        indexName,
        index,
        item
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
        batches.push(
          () => componentTemplate.mount(el, context, parentScope, meta)
        );
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
        index
      });
    });
    return {
      newChildrenMap,
      batches,
      futureNodes
    };
  }
  function create$6(node, { evaluate, condition, itemName, indexName, getKey, template }) {
    const placeholder = document.createTextNode("");
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
      placeholder
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
    }
  };
  function create$5(node, { evaluate, template }) {
    const placeholder = document.createTextNode("");
    insertBefore(placeholder, node);
    removeChild(node);
    return {
      ...IfBinding,
      node,
      evaluate,
      placeholder,
      template: template.createDOM(node)
    };
  }
  var ElementProto = typeof Element === "undefined" ? {} : Element.prototype;
  var isNativeHtmlProperty = memoize(
    (name) => ElementProto.hasOwnProperty(name)
    // eslint-disable-line
  );
  function setAllAttributes(node, attributes) {
    Object.keys(attributes).forEach(
      (name) => attributeExpression({ node, name }, attributes[name])
    );
  }
  function removeAllAttributes(node, newAttributes, oldAttributes) {
    const newKeys = newAttributes ? Object.keys(newAttributes) : [];
    Object.keys(oldAttributes).filter((name) => !newKeys.includes(name)).forEach((attribute) => node.removeAttribute(attribute));
  }
  function canRenderAttribute(value) {
    return ["string", "number", "boolean"].includes(typeof value);
  }
  function shouldRemoveAttribute(value, isBoolean2) {
    if (isBoolean2) return !value && value !== 0;
    return typeof value === "undefined" || value === null;
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
  var getCallbackAndOptions = (value) => Array.isArray(value) ? value : [value, false];
  var EventListener = {
    handleEvent(event) {
      this[event.type](event);
    }
  };
  var ListenersWeakMap = /* @__PURE__ */ new WeakMap();
  var createListener = (node) => {
    const listener = Object.create(EventListener);
    ListenersWeakMap.set(node, listener);
    return listener;
  };
  function eventExpression({ node, name }, value) {
    const normalizedEventName = name.replace(RE_EVENTS_PREFIX, "");
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
    return isNil(value) ? "" : value;
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
    [REF]: refExpression
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
    }
  };
  function create$4(node, data) {
    return {
      ...Expression,
      ...data,
      node: data.type === TEXT ? getTextNode(node, data.childNodeIndex) : node
    };
  }
  function flattenCollectionMethods(collection, methods, context) {
    return methods.reduce((acc, method) => {
      return {
        ...acc,
        [method]: (scope) => {
          return collection.map((item) => item[method](scope)) && context;
        }
      };
    }, {});
  }
  function create$3(node, { expressions: expressions2 }) {
    return flattenCollectionMethods(
      expressions2.map((expression) => create$4(node, expression)),
      ["mount", "update", "unmount"]
    );
  }
  var extendParentScope = (attributes, scope, parentScope) => {
    if (!attributes || !attributes.length) return parentScope;
    const expressions2 = attributes.map((attr) => ({
      ...attr,
      value: attr.evaluate(scope)
    }));
    return Object.assign(
      Object.create(parentScope || null),
      evaluateAttributeExpressions(expressions2)
    );
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
      this.template = this.templateData && create(this.templateData.html, this.templateData.bindings).createDOM(
        parentNode
      ) || // otherwise use the optional template fallback if provided by the compiler see also https://github.com/riot/riot/issues/3014
      this.template?.clone();
      if (this.template) {
        cleanNode(this.node);
        this.template.mount(
          this.node,
          this.getTemplateScope(scope, realParent),
          realParent
        );
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
        this.template.unmount(
          this.getTemplateScope(scope, parentScope),
          null,
          mustRemoveRoot
        );
      }
      return this;
    }
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
      name
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
            ...attr
          };
        })
      }
    ]);
  }
  function slotBindings(slots) {
    return slots.reduce((acc, { bindings: bindings2 }) => acc.concat(bindings2), []);
  }
  function slotsToMarkup(slots) {
    return slots.reduce((acc, slot) => {
      return acc + slot.html;
    }, "");
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
    }
  };
  function create$2(node, { evaluate, getComponent, slots, attributes }) {
    return {
      ...TagBinding,
      node,
      evaluate,
      slots,
      attributes,
      getComponent
    };
  }
  var bindings = {
    [IF]: create$5,
    [SIMPLE]: create$3,
    [EACH]: create$6,
    [TAG]: create$2,
    [SLOT]: createSlot
  };
  function fixTextExpressionsOffset(expressions2, textExpressionsOffset) {
    return expressions2.map(
      (e) => e.type === TEXT ? {
        ...e,
        childNodeIndex: e.childNodeIndex + textExpressionsOffset
      } : e
    );
  }
  function create$1(root, binding, templateTagOffset) {
    const { selector, type, redundantAttribute, expressions: expressions2 } = binding;
    const node = selector ? root.querySelector(selector) : root;
    if (redundantAttribute) node.removeAttribute(redundantAttribute);
    const bindingExpressions = expressions2 || [];
    return (bindings[type] || bindings[SIMPLE])(node, {
      ...binding,
      expressions: templateTagOffset && !selector ? fixTextExpressionsOffset(bindingExpressions, templateTagOffset) : bindingExpressions
    });
  }
  function createHTMLTree(html, root) {
    const template = isTemplate(root) ? root : document.createElement("template");
    template.innerHTML = html;
    return template.content;
  }
  function createSVGTree(html, container) {
    const svgNode = container.ownerDocument.importNode(
      new window.DOMParser().parseFromString(
        `<svg xmlns="http://www.w3.org/2000/svg">${html}</svg>`,
        "application/xml"
      ).documentElement,
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
    return html && (typeof html === "string" ? createDOMTree(el, html) : html);
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
      if (!el) panic("Please provide DOM node to mount properly your template");
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
      this.bindings = this.bindingsData.map(
        (binding) => create$1(this.el, binding, templateTagOffset)
      );
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
        case (el[IS_PURE_SYMBOL] || mustRemoveRoot === null):
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
        el: null
      };
    }
  };
  function create(html, bindings2 = []) {
    return {
      ...TemplateChunk,
      html,
      bindingsData: bindings2
    };
  }

  // node_modules/riot/esm/dependencies/bianco.dom-to-array/index.next.js
  function domToArray(els) {
    if (!Array.isArray(els)) {
      if (/^\[object (HTMLCollection|NodeList|Object)\]$/.test(Object.prototype.toString.call(els)) && typeof els.length === "number")
        return Array.from(els);
      else
        return [els];
    }
    return els;
  }

  // node_modules/riot/esm/dependencies/bianco.query/index.next.js
  function $2(selector, scope) {
    return domToArray(
      typeof selector === "string" ? (scope || document).querySelectorAll(selector) : selector
    );
  }

  // node_modules/riot/esm/dependencies/bianco.attr/index.next.js
  function set(els, name, value) {
    const attrs = typeof name === "object" ? name : { [name]: value };
    const props = Object.keys(attrs);
    domToArray(els).forEach((el) => {
      props.forEach((prop) => el.setAttribute(prop, attrs[prop]));
    });
    return els;
  }

  // node_modules/riot/esm/core/css-manager.js
  var CSS_BY_NAME = /* @__PURE__ */ new Map();
  var STYLE_NODE_SELECTOR = "style[riot]";
  var getStyleNode = /* @__PURE__ */ ((style) => {
    return () => {
      if (style) return style;
      style = $2(STYLE_NODE_SELECTOR)[0] || document.createElement("style");
      set(style, "type", "text/css");
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
      getStyleNode().innerHTML = [...CSS_BY_NAME.values()].join("\n");
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
    }
  };

  // node_modules/riot/esm/api/pure.js
  function pure(func) {
    if (!isFunction(func))
      panic('riot.pure accepts only arguments of type "function"');
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
      expressionTypes
    },
    globals: {
      PROPS_KEY,
      STATE_KEY,
      IS_COMPONENT_UPDATING,
      ATTRIBUTES_KEY_SYMBOL,
      COMPONENTS_IMPLEMENTATION_MAP,
      PLUGINS_SET,
      DOM_COMPONENT_INSTANCE_PROPERTY,
      PARENT_KEY_SYMBOL
    }
  };

  // node_modules/@riotjs/route/index.js
  function lexer(str) {
    var tokens = [];
    var i = 0;
    while (i < str.length) {
      var char = str[i];
      if (char === "*" || char === "+" || char === "?") {
        tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
        continue;
      }
      if (char === "\\") {
        tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
        continue;
      }
      if (char === "{") {
        tokens.push({ type: "OPEN", index: i, value: str[i++] });
        continue;
      }
      if (char === "}") {
        tokens.push({ type: "CLOSE", index: i, value: str[i++] });
        continue;
      }
      if (char === ":") {
        var name = "";
        var j = i + 1;
        while (j < str.length) {
          var code2 = str.charCodeAt(j);
          if (
            // `0-9`
            code2 >= 48 && code2 <= 57 || // `A-Z`
            code2 >= 65 && code2 <= 90 || // `a-z`
            code2 >= 97 && code2 <= 122 || // `_`
            code2 === 95
          ) {
            name += str[j++];
            continue;
          }
          break;
        }
        if (!name)
          throw new TypeError("Missing parameter name at ".concat(i));
        tokens.push({ type: "NAME", index: i, value: name });
        i = j;
        continue;
      }
      if (char === "(") {
        var count = 1;
        var pattern = "";
        var j = i + 1;
        if (str[j] === "?") {
          throw new TypeError('Pattern cannot start with "?" at '.concat(j));
        }
        while (j < str.length) {
          if (str[j] === "\\") {
            pattern += str[j++] + str[j++];
            continue;
          }
          if (str[j] === ")") {
            count--;
            if (count === 0) {
              j++;
              break;
            }
          } else if (str[j] === "(") {
            count++;
            if (str[j + 1] !== "?") {
              throw new TypeError("Capturing groups are not allowed at ".concat(j));
            }
          }
          pattern += str[j++];
        }
        if (count)
          throw new TypeError("Unbalanced pattern at ".concat(i));
        if (!pattern)
          throw new TypeError("Missing pattern at ".concat(i));
        tokens.push({ type: "PATTERN", index: i, value: pattern });
        i = j;
        continue;
      }
      tokens.push({ type: "CHAR", index: i, value: str[i++] });
    }
    tokens.push({ type: "END", index: i, value: "" });
    return tokens;
  }
  function parse(str, options) {
    if (options === void 0) {
      options = {};
    }
    var tokens = lexer(str);
    var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a;
    var defaultPattern = "[^".concat(escapeString(options.delimiter || "/#?"), "]+?");
    var result = [];
    var key = 0;
    var i = 0;
    var path = "";
    var tryConsume = function(type) {
      if (i < tokens.length && tokens[i].type === type)
        return tokens[i++].value;
    };
    var mustConsume = function(type) {
      var value2 = tryConsume(type);
      if (value2 !== void 0)
        return value2;
      var _a2 = tokens[i], nextType = _a2.type, index = _a2.index;
      throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
    };
    var consumeText = function() {
      var result2 = "";
      var value2;
      while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
        result2 += value2;
      }
      return result2;
    };
    while (i < tokens.length) {
      var char = tryConsume("CHAR");
      var name = tryConsume("NAME");
      var pattern = tryConsume("PATTERN");
      if (name || pattern) {
        var prefix = char || "";
        if (prefixes.indexOf(prefix) === -1) {
          path += prefix;
          prefix = "";
        }
        if (path) {
          result.push(path);
          path = "";
        }
        result.push({
          name: name || key++,
          prefix,
          suffix: "",
          pattern: pattern || defaultPattern,
          modifier: tryConsume("MODIFIER") || ""
        });
        continue;
      }
      var value = char || tryConsume("ESCAPED_CHAR");
      if (value) {
        path += value;
        continue;
      }
      if (path) {
        result.push(path);
        path = "";
      }
      var open = tryConsume("OPEN");
      if (open) {
        var prefix = consumeText();
        var name_1 = tryConsume("NAME") || "";
        var pattern_1 = tryConsume("PATTERN") || "";
        var suffix = consumeText();
        mustConsume("CLOSE");
        result.push({
          name: name_1 || (pattern_1 ? key++ : ""),
          pattern: name_1 && !pattern_1 ? defaultPattern : pattern_1,
          prefix,
          suffix,
          modifier: tryConsume("MODIFIER") || ""
        });
        continue;
      }
      mustConsume("END");
    }
    return result;
  }
  function escapeString(str) {
    return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
  }
  function flags(options) {
    return options && options.sensitive ? "" : "i";
  }
  function regexpToRegexp(path, keys) {
    if (!keys)
      return path;
    var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
    var index = 0;
    var execResult = groupsRegex.exec(path.source);
    while (execResult) {
      keys.push({
        // Use parenthesized substring match if available, index otherwise
        name: execResult[1] || index++,
        prefix: "",
        suffix: "",
        modifier: "",
        pattern: ""
      });
      execResult = groupsRegex.exec(path.source);
    }
    return path;
  }
  function arrayToRegexp(paths, keys, options) {
    var parts = paths.map(function(path) {
      return pathToRegexp(path, keys, options).source;
    });
    return new RegExp("(?:".concat(parts.join("|"), ")"), flags(options));
  }
  function stringToRegexp(path, keys, options) {
    return tokensToRegexp(parse(path, options), keys, options);
  }
  function tokensToRegexp(tokens, keys, options) {
    if (options === void 0) {
      options = {};
    }
    var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function(x) {
      return x;
    } : _d, _e = options.delimiter, delimiter = _e === void 0 ? "/#?" : _e, _f = options.endsWith, endsWith = _f === void 0 ? "" : _f;
    var endsWithRe = "[".concat(escapeString(endsWith), "]|$");
    var delimiterRe = "[".concat(escapeString(delimiter), "]");
    var route = start ? "^" : "";
    for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
      var token = tokens_1[_i];
      if (typeof token === "string") {
        route += escapeString(encode(token));
      } else {
        var prefix = escapeString(encode(token.prefix));
        var suffix = escapeString(encode(token.suffix));
        if (token.pattern) {
          if (keys)
            keys.push(token);
          if (prefix || suffix) {
            if (token.modifier === "+" || token.modifier === "*") {
              var mod = token.modifier === "*" ? "?" : "";
              route += "(?:".concat(prefix, "((?:").concat(token.pattern, ")(?:").concat(suffix).concat(prefix, "(?:").concat(token.pattern, "))*)").concat(suffix, ")").concat(mod);
            } else {
              route += "(?:".concat(prefix, "(").concat(token.pattern, ")").concat(suffix, ")").concat(token.modifier);
            }
          } else {
            if (token.modifier === "+" || token.modifier === "*") {
              route += "((?:".concat(token.pattern, ")").concat(token.modifier, ")");
            } else {
              route += "(".concat(token.pattern, ")").concat(token.modifier);
            }
          }
        } else {
          route += "(?:".concat(prefix).concat(suffix, ")").concat(token.modifier);
        }
      }
    }
    if (end) {
      if (!strict)
        route += "".concat(delimiterRe, "?");
      route += !options.endsWith ? "$" : "(?=".concat(endsWithRe, ")");
    } else {
      var endToken = tokens[tokens.length - 1];
      var isEndDelimited = typeof endToken === "string" ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
      if (!strict) {
        route += "(?:".concat(delimiterRe, "(?=").concat(endsWithRe, "))?");
      }
      if (!isEndDelimited) {
        route += "(?=".concat(delimiterRe, "|").concat(endsWithRe, ")");
      }
    }
    return new RegExp(route, flags(options));
  }
  function pathToRegexp(path, keys, options) {
    if (path instanceof RegExp)
      return regexpToRegexp(path, keys);
    if (Array.isArray(path))
      return arrayToRegexp(path, keys, options);
    return stringToRegexp(path, keys, options);
  }
  var CANCEL = Symbol();
  ruit.cancel = () => CANCEL;
  ruit.compose = (...tasks) => ruit(...tasks.reverse());
  function ruit(...tasks) {
    return new Promise((resolve, reject) => {
      return function run(queue, result) {
        if (!queue.length) return resolve(result);
        const [task, ...rest] = queue;
        const value = typeof task === "function" ? task(result) : task;
        const done = (v) => run(rest, v);
        if (value != null) {
          if (value === CANCEL) return;
          if (value.then) return value.then(done, reject);
        }
        return Promise.resolve(done(value));
      }(tasks);
    });
  }
  var API_METHODS = /* @__PURE__ */ new Set();
  var UNSUBSCRIBE_SYMBOL = Symbol();
  var UNSUBSCRIBE_METHOD = "off";
  var CANCEL_METHOD = "cancel";
  function createStream(modifiers) {
    const stream = function* stream2() {
      while (true) {
        const input = yield;
        yield ruit(input, ...modifiers);
      }
    }();
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
  erre.install = function(name, fn) {
    if (!name || typeof name !== "string")
      panic$1("Please provide a name (as string) for your erre plugin");
    if (!fn || typeof fn !== "function")
      panic$1("Please provide a function for your erre plugin");
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
    const [success, error, end, modifiers] = [/* @__PURE__ */ new Set(), /* @__PURE__ */ new Set(), /* @__PURE__ */ new Set(), new Set(fns)], generator = createStream(modifiers), stream = Object.create(generator), addToCollection = (collection) => (fn) => collection.add(fn) && stream, deleteFromCollection = (collection) => (fn) => collection.delete(fn) ? stream : panic$1("Couldn't remove handler passed by reference");
    return Object.assign(stream, {
      on: Object.freeze({
        value: addToCollection(success),
        error: addToCollection(error),
        end: addToCollection(end)
      }),
      off: Object.freeze({
        value: deleteFromCollection(success),
        error: deleteFromCollection(error),
        end: deleteFromCollection(end)
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
      }
    });
  }
  var isString = (str) => typeof str === "string";
  var parseURL = (...args) => new URL(...args);
  var replaceBase = (path) => path.replace(defaults.base, "");
  var matchOrSkip = (pathRegExp) => (path) => match(path, pathRegExp) ? path : erre.cancel();
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
  var filterStrings = (str) => isString(str) ? str : erre.cancel();
  var router = erre(filterStrings).on.error(panic$2);
  var mergeOptions = (options) => ({ ...defaults, ...options });
  var defaults = {
    base: "https://localhost",
    silentErrors: false,
    // pathToRegexp options
    sensitive: false,
    strict: false,
    end: true,
    start: true,
    delimiter: "/#?",
    encode: void 0,
    endsWith: void 0,
    prefixes: "./"
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
    (path) => toURL(path, pathRegExp, options)
  ];
  function createRoute(path, options) {
    const keys = [];
    const pathRegExp = pathToRegexp(path, keys, options);
    const URLStream = erre(...createURLStreamPipe(pathRegExp, {
      ...options,
      keys
    }));
    return joinStreams(router, URLStream).on.error(panic$2);
  }
  var WINDOW_EVENTS = "popstate";
  var CLICK_EVENT = "click";
  var DOWNLOAD_LINK_ATTRIBUTE = "download";
  var HREF_LINK_ATTRIBUTE = "href";
  var TARGET_SELF_LINK_ATTRIBUTE = "_self";
  var LINK_TAG_NAME = "A";
  var HASH = "#";
  var SLASH = "/";
  var PATH_ATTRIBUTE = "path";
  var RE_ORIGIN = /^.+?\/\/+[^/]+/;
  function domToArray2(els) {
    if (!Array.isArray(els)) {
      if (/^\[object (HTMLCollection|NodeList|Object)\]$/.test(Object.prototype.toString.call(els)) && typeof els.length === "number")
        return Array.from(els);
      else
        return [els];
    }
    return els;
  }
  function $3(selector, scope) {
    return domToArray2(
      typeof selector === "string" ? document.querySelectorAll(selector) : selector
    );
  }
  var getCurrentRoute = ((currentRoute) => {
    router.on.value((r) => currentRoute = r);
    return () => {
      return currentRoute;
    };
  })(null);
  var normalize = (values) => values.length === 1 ? values[0] : values;
  function parseNodes(els, name, method) {
    const names = typeof name === "string" ? [name] : name;
    return normalize(domToArray2(els).map((el) => {
      return normalize(names.map((n) => el[method](n)));
    }));
  }
  function get(els, name) {
    return parseNodes(els, name, "getAttribute");
  }
  function has(els, name) {
    return parseNodes(els, name, "hasAttribute");
  }
  function dashToCamelCase2(string) {
    return string.replace(/-(\w)/g, (_, c) => c.toUpperCase());
  }
  function isNil2(value) {
    return value === null || value === void 0;
  }
  var getGlobal = () => getWindow() || global;
  var getWindow = () => typeof window === "undefined" ? null : window;
  var getDocument = () => typeof document === "undefined" ? null : document;
  var getHistory = () => typeof history === "undefined" ? null : history;
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
    const normalizedAttributes = attributes.flatMap(
      (attr) => isNil2(attr.name) ? (
        // add support for spread attributes https://github.com/riot/route/issues/178
        Object.entries(attr.evaluate(context)).map(([key, value]) => ({
          // evaluate each value of the spread attribute and store it into the array
          name: key,
          // create a nested evaluate function pointing to the original value of the spread object
          evaluate: () => value
        }))
      ) : attr
    );
    return normalizedAttributes.find((a) => dashToCamelCase2(a.name) === name);
  };
  var createDefaultSlot = (attributes = []) => {
    const { template, bindingTypes: bindingTypes2, expressionTypes: expressionTypes2 } = __.DOMBindings;
    return template(null, [
      {
        type: bindingTypes2.SLOT,
        name: "default",
        attributes: attributes.map((attr) => ({
          ...attr,
          type: expressionTypes2.ATTRIBUTE
        }))
      }
    ]);
  };
  var isValidQuerySelectorString = (selector) => /^([a-zA-Z0-9-_*#.:[\]\s>+~()='"]|\\.)+$/.test(selector);
  function compose(...fns) {
    return fns.reduce((f, g) => (...args) => f(g(...args)));
  }
  var getInitialRouteValue = (pathToRegexp2, path, options) => {
    const route = compose(
      ...createURLStreamPipe(pathToRegexp2, options).reverse()
    )(path);
    return route.params ? route : null;
  };
  var clearDOMBetweenNodes = (first2, last2, includeBoundaries) => {
    const clear = (node) => {
      if (!node || node === last2 && !includeBoundaries) return;
      const { nextSibling } = node;
      node.remove();
      clear(nextSibling);
    };
    clear(includeBoundaries ? first2 : first2.nextSibling);
  };
  var routeHoc$1 = ({ slots, attributes }) => {
    const placeholders = {
      before: document.createTextNode(""),
      after: document.createTextNode("")
    };
    return {
      mount(el, context) {
        const currentRoute = getCurrentRoute();
        const path = getAttribute(attributes, PATH_ATTRIBUTE, context)?.evaluate(context) || get(el, PATH_ATTRIBUTE);
        const pathToRegexp2 = toRegexp(path, []);
        const state = {
          pathToRegexp: pathToRegexp2,
          route: currentRoute && match(currentRoute, pathToRegexp2) ? getInitialRouteValue(pathToRegexp2, currentRoute, {}) : null
        };
        this.el = el;
        this.slot = createDefaultSlot([
          {
            isBoolean: false,
            name: "route",
            evaluate: () => this.state.route
          }
        ]);
        this.context = context;
        this.state = state;
        this.boundOnBeforeRoute = this.onBeforeRoute.bind(this);
        this.boundOnRoute = this.onRoute.bind(this);
        router.on.value(this.boundOnBeforeRoute);
        this.stream = createRoute(path).on.value(this.boundOnRoute);
        el.replaceWith(placeholders.before);
        placeholders.before.parentNode.insertBefore(
          placeholders.after,
          placeholders.before.nextSibling
        );
        if (state.route) this.mountSlot();
      },
      update(context) {
        this.context = context;
        if (this.state.route) this.slot.update({}, context);
      },
      mountSlot() {
        const { route } = this.state;
        placeholders.before.parentNode.insertBefore(
          this.el,
          placeholders.before.nextSibling
        );
        this.callLifecycleProperty("onBeforeMount", route);
        this.slot.mount(
          this.el,
          {
            slots
          },
          this.context
        );
        this.callLifecycleProperty("onMounted", route);
      },
      clearDOM(includeBoundaries) {
        clearDOMBetweenNodes(
          placeholders.before,
          placeholders.after,
          includeBoundaries
        );
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
        this.callLifecycleProperty("onBeforeUnmount", route);
        this.slot.unmount({}, this.context, true);
        this.clearDOM(false);
        this.state.route = null;
        this.callLifecycleProperty("onUnmounted", route);
      },
      onRoute(route) {
        const prevRoute = this.state.route;
        this.state.route = route;
        if (prevRoute) {
          this.callLifecycleProperty("onBeforeUpdate", route);
          this.slot.update({}, this.context);
          this.callLifecycleProperty("onUpdated", route);
        } else this.mountSlot();
        if (route.hash && isValidQuerySelectorString(route.hash))
          $3(route.hash)?.[0].scrollIntoView();
      },
      callLifecycleProperty(method, ...params) {
        const attr = getAttribute(attributes, method, this.context);
        if (attr) attr.evaluate(this.context)(...params);
      }
    };
  };
  var routeHoc = {
    css: null,
    exports: pure(
      routeHoc$1
    ),
    template: null,
    name: "route-hoc"
  };
  var normalizeInitialSlash = (str) => str[0] === SLASH ? str : `${SLASH}${str}`;
  var removeTrailingSlash = (str) => str[str.length - 1] === SLASH ? str.substr(0, str.length - 1) : str;
  var normalizeBase = (base) => {
    const win = getWindow();
    const loc = win.location;
    const root = loc ? `${loc.protocol}//${loc.host}` : "";
    const { pathname } = loc ? loc : {};
    switch (true) {
      // pure root url + pathname
      case Boolean(base) === false:
        return removeTrailingSlash(`${root}${pathname || ""}`);
      // full path base
      case /(www|http(s)?:)/.test(base):
        return base;
      // hash navigation
      case base[0] === HASH:
        return `${root}${pathname && pathname !== SLASH ? pathname : ""}${base}`;
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
    manageEvents(els, evList, cb, "addEventListener", options);
    return els;
  }
  function remove(els, evList, cb, options) {
    manageEvents(els, evList, cb, "removeEventListener", options);
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
  var getLinkElement = (node) => node && !isLinkNode(node) ? getLinkElement(node.parentNode) : node;
  var isLinkNode = (node) => node.nodeName === LINK_TAG_NAME;
  var isCrossOriginLink = (path) => path.indexOf(getLocation().href.match(RE_ORIGIN)[0]) === -1;
  var isTargetSelfLink = (el) => el.target && el.target !== TARGET_SELF_LINK_ATTRIBUTE;
  var isEventForbidden = (event) => event.which && event.which !== 1 || // not left click
  event.metaKey || event.ctrlKey || event.shiftKey || // or meta keys
  event.defaultPrevented;
  var isForbiddenLink = (el) => !el || !isLinkNode(el) || // not A tag
  has(el, DOWNLOAD_LINK_ATTRIBUTE) || // has download attr
  !has(el, HREF_LINK_ATTRIBUTE) || // has no href attr
  isTargetSelfLink(el) || isCrossOriginLink(el.href);
  var normalizePath = (path) => path.replace(defaults.base, "");
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
  var BASE_ATTRIBUTE_NAME = "base";
  var INITIAL_ROUTE = "initialRoute";
  var ON_STARTED_ATTRIBUTE_NAME = "onStarted";
  var routerHoc$1 = ({ slots, attributes, props }) => {
    if (routerHoc$1.wasInitialized)
      panic2("Multiple <router> components are not supported");
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
        const onStartedAttr = getAttribute(
          attributes,
          ON_STARTED_ATTRIBUTE_NAME,
          context
        );
        this.slot = createDefaultSlot();
        this.slot.mount(
          this.el,
          {
            slots
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
        return baseAttr ? baseAttr.evaluate(context) : this.el.getAttribute(BASE_ATTRIBUTE_NAME) || "/";
      },
      setBase(context) {
        setBase(props ? props.base : this.getBase(context));
      }
    };
  };
  routerHoc$1.wasInitialized = false;
  var routerHoc = {
    css: null,
    exports: pure(
      routerHoc$1
    ),
    template: null,
    name: "router-hoc"
  };

  // src/app/app.js
  var import_debounce = __toESM(require_debounce(), 1);
  var import_each3 = __toESM(require_each(), 1);
  var import_map4 = __toESM(require_map(), 1);
  var import_merge = __toESM(require_merge(), 1);
  var import_parseInt = __toESM(require_parseInt(), 1);
  var import_reduce3 = __toESM(require_reduce(), 1);

  // src/app/challenges.js
  function requireUserCountWithinTime(userCount, timeLimit) {
    return {
      description: "Transport <span class='emphasis-color'>" + userCount + "</span> people in <span class='emphasis-color'>" + timeLimit.toFixed(0) + "</span> seconds or less",
      evaluate: function(world) {
        if (world.elapsedTime >= timeLimit || world.transportedCounter >= userCount) {
          return world.elapsedTime <= timeLimit && world.transportedCounter >= userCount;
        } else {
          return null;
        }
      }
    };
  }
  function requireUserCountWithMaxWaitTime(userCount, maxWaitTime) {
    return {
      description: "Transport <span class='emphasis-color'>" + userCount + "</span> people and let no one wait more than <span class='emphasis-color'>" + maxWaitTime.toFixed(1) + "</span> seconds",
      evaluate: function(world) {
        if (world.maxWaitTime >= maxWaitTime || world.transportedCounter >= userCount) {
          return world.maxWaitTime <= maxWaitTime && world.transportedCounter >= userCount;
        } else {
          return null;
        }
      }
    };
  }
  function requireUserCountWithinTimeWithMaxWaitTime(userCount, timeLimit, maxWaitTime) {
    return {
      description: "Transport <span class='emphasis-color'>" + userCount + "</span> people in <span class='emphasis-color'>" + timeLimit.toFixed(0) + "</span> seconds or less and let no one wait more than <span class='emphasis-color'>" + maxWaitTime.toFixed(1) + "</span> seconds",
      evaluate: function(world) {
        if (world.elapsedTime >= timeLimit || world.maxWaitTime >= maxWaitTime || world.transportedCounter >= userCount) {
          return world.elapsedTime <= timeLimit && world.maxWaitTime <= maxWaitTime && world.transportedCounter >= userCount;
        } else {
          return null;
        }
      }
    };
  }
  function requireUserCountWithinMoves(userCount, moveLimit) {
    return {
      description: "Transport <span class='emphasis-color'>" + userCount + "</span> people using <span class='emphasis-color'>" + moveLimit + "</span> elevator moves or less",
      evaluate: function(world) {
        if (world.moveCount >= moveLimit || world.transportedCounter >= userCount) {
          return world.moveCount <= moveLimit && world.transportedCounter >= userCount;
        } else {
          return null;
        }
      }
    };
  }
  function requireDemo() {
    return {
      description: "Perpetual demo",
      evaluate: function() {
        return null;
      }
    };
  }
  var challenges = [
    {
      options: { floorCount: 3, elevatorCount: 1, spawnRate: 0.3 },
      condition: requireUserCountWithinTime(15, 60)
    },
    {
      options: { floorCount: 5, elevatorCount: 1, spawnRate: 0.4 },
      condition: requireUserCountWithinTime(20, 60)
    },
    {
      options: { floorCount: 5, elevatorCount: 1, spawnRate: 0.5, elevatorCapacities: [6] },
      condition: requireUserCountWithinTime(23, 60)
    },
    {
      options: { floorCount: 8, elevatorCount: 2, spawnRate: 0.6 },
      condition: requireUserCountWithinTime(28, 60)
    },
    {
      options: { floorCount: 6, elevatorCount: 4, spawnRate: 1.7 },
      condition: requireUserCountWithinTime(100, 68)
    },
    {
      options: { floorCount: 4, elevatorCount: 2, spawnRate: 0.8 },
      condition: requireUserCountWithinMoves(40, 60)
    },
    {
      options: { floorCount: 3, elevatorCount: 3, spawnRate: 3 },
      condition: requireUserCountWithinMoves(100, 63)
    },
    {
      options: { floorCount: 6, elevatorCount: 2, spawnRate: 0.4, elevatorCapacities: [5] },
      condition: requireUserCountWithMaxWaitTime(50, 21)
    },
    {
      options: { floorCount: 7, elevatorCount: 3, spawnRate: 0.6 },
      condition: requireUserCountWithMaxWaitTime(50, 20)
    },
    {
      options: { floorCount: 13, elevatorCount: 2, spawnRate: 1.1, elevatorCapacities: [4, 10] },
      condition: requireUserCountWithinTime(50, 70)
    },
    {
      options: { floorCount: 9, elevatorCount: 5, spawnRate: 1.1 },
      condition: requireUserCountWithMaxWaitTime(60, 19)
    },
    {
      options: { floorCount: 9, elevatorCount: 5, spawnRate: 1.1 },
      condition: requireUserCountWithMaxWaitTime(80, 17)
    },
    {
      options: { floorCount: 9, elevatorCount: 5, spawnRate: 1.1, elevatorCapacities: [5] },
      condition: requireUserCountWithMaxWaitTime(100, 15)
    },
    {
      options: { floorCount: 9, elevatorCount: 5, spawnRate: 1, elevatorCapacities: [6] },
      condition: requireUserCountWithMaxWaitTime(110, 15)
    },
    {
      options: { floorCount: 8, elevatorCount: 6, spawnRate: 0.9 },
      condition: requireUserCountWithMaxWaitTime(120, 14)
    },
    {
      options: { floorCount: 12, elevatorCount: 4, spawnRate: 1.4, elevatorCapacities: [5, 10] },
      condition: requireUserCountWithinTime(70, 80)
    },
    {
      options: { floorCount: 21, elevatorCount: 5, spawnRate: 1.9, elevatorCapacities: [10] },
      condition: requireUserCountWithinTime(110, 80)
    },
    {
      options: { floorCount: 21, elevatorCount: 8, spawnRate: 1.5, elevatorCapacities: [6, 8] },
      condition: requireUserCountWithinTimeWithMaxWaitTime(2675, 1800, 45)
    },
    {
      options: { floorCount: 21, elevatorCount: 8, spawnRate: 1.5, elevatorCapacities: [6, 8] },
      condition: requireDemo()
    }
  ];

  // src/app/presenters.js
  var import_each2 = __toESM(require_each(), 1);
  var import_map3 = __toESM(require_map(), 1);

  // src/models/base.js
  (function() {
    const f = function() {
    };
    if (!console) {
      console = {
        log: f,
        info: f,
        warn: f,
        debug: f,
        error: f
      };
    }
  })();
  function limitNumber(num, min, max) {
    return Math.min(max, Math.max(num, min));
  }
  function epsilonEquals(a, b) {
    return Math.abs(a - b) < 1e-8;
  }
  function sign(x) {
    x = +x;
    if (x === 0 || isNaN(x)) {
      return x;
    }
    return x > 0 ? 1 : -1;
  }
  if (typeof Math.sign === "undefined") {
    Math.sign = sign;
  }
  function deprecationWarning2(name) {
    console.warn("You are using a deprecated feature scheduled for removal: " + name);
  }
  function newGuard(obj2, type) {
    if (!(obj2 instanceof type)) {
      throw "Incorrect instantiation, got " + typeof obj2 + " but expected " + type;
    }
  }
  function createBoolPassthroughFunction(owner, obj2, objPropertyName) {
    return function(val) {
      if (typeof val !== "undefined") {
        obj2[objPropertyName] = val ? true : false;
        obj2.trigger("change:" + objPropertyName, obj2[objPropertyName]);
        return owner;
      } else {
        return obj2[objPropertyName];
      }
    };
  }
  function distanceNeededToAchieveSpeed(currentSpeed, targetSpeed, acceleration) {
    const requiredDistance = (Math.pow(targetSpeed, 2) - Math.pow(currentSpeed, 2)) / (2 * acceleration);
    return requiredDistance;
  }
  function accelerationNeededToAchieveChangeDistance(currentSpeed, targetSpeed, distance) {
    const requiredAcceleration = 0.5 * ((Math.pow(targetSpeed, 2) - Math.pow(currentSpeed, 2)) / distance);
    return requiredAcceleration;
  }
  function createFrameRequester(timeStep) {
    let currentCb = null;
    let requester = {};
    requester.currentT = 0;
    requester.register = function(cb) {
      currentCb = cb;
    };
    requester.trigger = function() {
      requester.currentT += timeStep;
      if (currentCb !== null) {
        currentCb(requester.currentT);
      }
    };
    return requester;
  }
  function getCodeObjFromCode2(code) {
    if (code.trim().substr(0, 1) == "{" && code.trim().substr(-1, 1) == "}") {
      code = "(" + code + ")";
    }
    let obj = eval(code);
    if (typeof obj.init !== "function") {
      throw "Code must contain an init function";
    }
    if (typeof obj.update !== "function") {
      throw "Code must contain an update function";
    }
    return obj;
  }

  // src/models/movable.js
  var import_observable = __toESM(require_observable(), 1);
  function linearInterpolate(value0, value1, x) {
    return value0 + (value1 - value0) * x;
  }
  function powInterpolate(value0, value1, x, a) {
    return value0 + (value1 - value0) * Math.pow(x, a) / (Math.pow(x, a) + Math.pow(1 - x, a));
  }
  function coolInterpolate(value0, value1, x) {
    return powInterpolate(value0, value1, x, 1.3);
  }
  var DEFAULT_INTERPOLATOR = coolInterpolate;
  var _tmpPosStorage = [0, 0];
  var Movable = class _Movable {
    constructor() {
      (0, import_observable.default)(this);
      newGuard(this, _Movable);
      this.x = 0;
      this.y = 0;
      this.parent = null;
      this.worldX = 0;
      this.worldY = 0;
      this.currentTask = null;
      this.trigger("new_state", this);
    }
    /**
     * Updates the display position of the object by retrieving its current world position.
     * If the position has changed or if `forceTrigger` is true, triggers a 'new_display_state' event.
     *
     * @param {boolean} [forceTrigger] - If true, forces the trigger of the 'new_display_state' event even if the position hasn't changed.
     */
    updateDisplayPosition(forceTrigger) {
      this.getWorldPosition(_tmpPosStorage);
      const oldX = this.worldX;
      const oldY = this.worldY;
      this.worldX = _tmpPosStorage[0];
      this.worldY = _tmpPosStorage[1];
      if (oldX !== this.worldX || oldY !== this.worldY || forceTrigger === true) {
        this.trigger("new_display_state", this);
      }
    }
    /**
     * Moves the object to the specified coordinates.
     * If a coordinate is null, it will not be updated.
     * Triggers a 'new_state' event after moving.
     *
     * @param {number|null} newX - The new x-coordinate, or null to leave unchanged.
     * @param {number|null} newY - The new y-coordinate, or null to leave unchanged.
     */
    moveTo(newX, newY) {
      if (newX !== null) {
        this.x = newX;
      }
      if (newY !== null) {
        this.y = newY;
      }
      this.trigger("new_state", this);
    }
    /**
     * Instantly moves the object to the specified coordinates and triggers a 'new_state' event.
     *
     * @param {number} newX - The new x-coordinate to move to.
     * @param {number} newY - The new y-coordinate to move to.
     */
    moveToFast(newX, newY) {
      this.x = newX;
      this.y = newY;
      this.trigger("new_state", this);
    }
    /**
     * Checks if the movable object is currently busy with a task.
     * @returns {boolean} Returns true if there is a current task assigned, otherwise false.
     */
    isBusy() {
      return this.currentTask !== null;
    }
    /**
     * Ensures that the movable object is not currently busy.
     * If the object is busy, logs an error and throws an exception.
     *
     * @throws {Object} Throws an object with a message and the current object if it is busy.
     */
    makeSureNotBusy() {
      if (this.isBusy()) {
        console.error("Attempt to use movable while it was busy", this);
        throw { message: "Object is busy - you should use callback", obj: this };
      }
    }
    /**
     * Pauses the execution of the current task for a specified number of milliseconds.
     * Once the wait time has elapsed, an optional callback function is invoked.
     *
     * @param {number} millis - The number of milliseconds to wait.
     * @param {Function} [cb] - Optional callback to execute after waiting.
     */
    wait(millis, cb) {
      this.makeSureNotBusy();
      let timeSpent = 0;
      const self2 = this;
      self2.currentTask = function waitTask(dt) {
        timeSpent += dt;
        if (timeSpent > millis) {
          self2.currentTask = null;
          if (cb) {
            cb();
          }
        }
      };
    }
    /**
     * Moves the object smoothly from its current position to the specified (newX, newY) over a given duration.
     * The movement is interpolated using the provided interpolator function.
     *
     * @param {number|null} newX - The target X coordinate. If null, the current X is used.
     * @param {number|null} newY - The target Y coordinate. If null, the current Y is used.
     * @param {number} timeToSpend - The total time (in seconds or ms, depending on context) to spend moving.
     * @param {function} [interpolator=DEFAULT_INTERPOLATOR] - Function to interpolate between start and end values.
     *        Signature: (start: number, end: number, factor: number) => number
     * @param {function} [cb] - Optional callback to invoke when movement is complete.
     */
    moveToOverTime(newX, newY, timeToSpend, interpolator, cb) {
      this.makeSureNotBusy();
      this.currentTask = true;
      if (newX === null) {
        newX = this.x;
      }
      if (newY === null) {
        newY = this.y;
      }
      if (typeof interpolator === "undefined") {
        interpolator = DEFAULT_INTERPOLATOR;
      }
      const origX = this.x;
      const origY = this.y;
      let timeSpent = 0;
      const self2 = this;
      self2.currentTask = function moveToOverTimeTask(dt) {
        timeSpent = Math.min(timeToSpend, timeSpent + dt);
        if (timeSpent === timeToSpend) {
          self2.moveToFast(newX, newY);
          self2.currentTask = null;
          if (cb) {
            cb();
          }
        } else {
          const factor = timeSpent / timeToSpend;
          self2.moveToFast(interpolator(origX, newX, factor), interpolator(origY, newY, factor));
        }
      };
    }
    /**
     * Updates the state of the movable object by executing the current task, if any.
     *
     * @param {number} dt - The time delta in milliseconds since the last update.
     */
    update(dt) {
      if (this.currentTask !== null) {
        this.currentTask(dt);
      }
    }
    /**
     * Calculates the world position of the current object by traversing up its parent hierarchy,
     * accumulating the x and y offsets, and stores the result in the provided storage array.
     *
     * @param {number[]} storage - An array where the resulting world x and y coordinates will be stored at indices 0 and 1.
     */
    getWorldPosition(storage) {
      let resultX = this.x;
      let resultY = this.y;
      let currentParent = this.parent;
      while (currentParent !== null) {
        resultX += currentParent.x;
        resultY += currentParent.y;
        currentParent = currentParent.parent;
      }
      storage[0] = resultX;
      storage[1] = resultY;
    }
    /**
     * Sets the parent of this movable object, updating its position accordingly.
     *
     * If the new parent is `null`, the object is detached from its current parent and its world position is preserved.
     * If a new parent is provided, the object's position is updated to maintain its world position relative to the new parent.
     *
     * @param {Object|null} movableParent - The new parent object, or `null` to remove the parent.
     */
    setParent(movableParent) {
      const objWorld = [0, 0];
      if (movableParent === null) {
        if (this.parent !== null) {
          this.getWorldPosition(objWorld);
          this.parent = null;
          this.moveToFast(objWorld[0], objWorld[1]);
        }
      } else {
        this.getWorldPosition(objWorld);
        const parentWorld = [0, 0];
        movableParent.getWorldPosition(parentWorld);
        this.parent = movableParent;
        this.moveToFast(objWorld[0] - parentWorld[0], objWorld[1] - parentWorld[1]);
      }
    }
  };

  // src/models/user.js
  var User = class _User extends Movable {
    constructor(weight) {
      super();
      newGuard(this, _User);
      this.weight = weight;
      this.currentFloor = 0;
      this.destinationFloor = 0;
      this.done = false;
      this.removeMe = false;
    }
    /**
     * Makes the user appear on a specified floor and sets their destination floor.
     *
     * @param {Object} floor - The floor object where the user will appear.
     * @param {number} destinationFloorNum - The number of the floor the user wants to go to.
     */
    appearOnFloor(floor, destinationFloorNum) {
      const floorPosY = floor.getSpawnPosY();
      this.currentFloor = floor.level;
      this.destinationFloor = destinationFloorNum;
      this.moveTo(null, floorPosY);
      this.pressFloorButton(floor);
    }
    /**
     * Simulates pressing the appropriate floor button (up or down) based on the elevator's current and destination floors.
     *
     * @param {Object} floor - The floor object representing the target floor.
     * @param {Function} floor.pressUpButton - Method to simulate pressing the up button on the floor.
     * @param {Function} floor.pressDownButton - Method to simulate pressing the down button on the floor.
     */
    pressFloorButton(floor) {
      if (this.destinationFloor < this.currentFloor) {
        floor.pressDownButton();
      } else {
        floor.pressUpButton();
      }
    }
    /**
     * Handles the process of a user exiting an elevator at a specified floor.
     * If the elevator is at the user's destination floor, the user exits,
     * updates their state, triggers relevant events, animates their movement,
     * and cleans up event listeners.
     *
     * @param {number} floorNum - The floor number where the exit is attempted.
     * @param {Object} elevator - The elevator instance the user is exiting from.
     */
    handleExit(floorNum, elevator) {
      if (elevator.currentFloor === this.destinationFloor) {
        elevator.userExiting(this);
        this.currentFloor = elevator.currentFloor;
        this.setParent(null);
        const destination = this.x + 100;
        this.done = true;
        this.trigger("exited_elevator", elevator);
        this.trigger("new_state");
        this.trigger("new_display_state");
        const self2 = this;
        this.moveToOverTime(destination, null, 1 + Math.random() * 0.5, linearInterpolate, function lastMove() {
          self2.removeMe = true;
          self2.trigger("removed");
          self2.off("*");
        });
        elevator.off("exit_available", this.exitAvailableHandler);
      }
    }
    /**
     * Handles the logic for when an elevator becomes available for the user.
     *
     * - Checks if the user is eligible to enter the elevator.
     * - Determines if the elevator is suitable for the user's travel.
     * - If suitable and available, the user enters the elevator, triggers relevant events,
     *   and sets up handlers for exiting.
     * - If not available, the user presses the floor button to request the elevator.
     *
     * @param {Object} elevator - The elevator instance being considered.
     * @param {number} floor - The floor number where the elevator is available.
     */
    elevatorAvailable(elevator, floor) {
      if (this.done || this.parent !== null || this.isBusy()) {
        return;
      }
      if (!elevator.isSuitableForTravelBetween(this.currentFloor, this.destinationFloor)) {
        return;
      }
      const pos = elevator.userEntering(this);
      if (pos) {
        this.setParent(elevator);
        this.trigger("entered_elevator", elevator);
        const self2 = this;
        this.moveToOverTime(pos[0], pos[1], 1, void 0, function() {
          elevator.pressFloorButton(self2.destinationFloor);
        });
        this.exitAvailableHandler = function(floorNum, elevator2) {
          self2.handleExit(elevator2.currentFloor, elevator2);
        };
        elevator.on("exit_available", this.exitAvailableHandler);
      } else {
        this.pressFloorButton(floor);
      }
    }
  };

  // src/models/world.js
  var import_observable4 = __toESM(require_observable(), 1);
  var import_each = __toESM(require_each(), 1);
  var import_map2 = __toESM(require_map(), 1);
  var import_random2 = __toESM(require_random(), 1);
  var import_range2 = __toESM(require_range(), 1);
  var import_reduce2 = __toESM(require_reduce(), 1);

  // src/models/elevator.js
  var import_map = __toESM(require_map(), 1);
  var import_random = __toESM(require_random(), 1);
  var import_range = __toESM(require_range(), 1);
  var import_reduce = __toESM(require_reduce(), 1);
  function newElevStateHandler(elevator) {
    elevator.handleNewState();
  }
  var Elevator = class _Elevator extends Movable {
    /**
     * Creates an instance of Elevator.
     * Initializes the elevator with its properties, user slots, and event handlers.
     * @param {Object} options - Configuration options for the elevator.
     * @param {number} options.speedFloorsPerSec - The speed of the elevator in floors per second.
     * @param {number} options.floorCount - The total number of floors the elevator serves.
     * @param {number} options.floorHeight - The height of each floor in pixels.
     * @param {number} [options.maxUsers=4] - The maximum number of users the elevator can carry. Defaults to 4.
     */
    constructor(options) {
      super();
      newGuard(this, _Elevator);
      this.ACCELERATION = options.floorHeight * 2.1;
      this.DECELERATION = options.floorHeight * 2.6;
      this.MAXSPEED = options.floorHeight * options.speedFloorsPerSec;
      this.floorCount = options.floorCount;
      this.floorHeight = options.floorHeight;
      this.maxUsers = options.maxUsers || 4;
      this.destinationY = 0;
      this.velocityY = 0;
      this.isMoving = false;
      this.goingDownIndicator = true;
      this.goingUpIndicator = true;
      this.currentFloor = 0;
      this.previousTruncFutureFloorIfStopped = 0;
      this.buttonStates = (0, import_map.default)((0, import_range.default)(this.floorCount), function(e, i) {
        return false;
      });
      this.moveCount = 0;
      this.removed = false;
      this.userSlots = (0, import_map.default)((0, import_range.default)(this.maxUsers), function(user, i) {
        return { pos: [2 + i * 10, 30], user: null };
      });
      this.width = this.maxUsers * 10;
      this.destinationY = this.getYPosOfFloor(this.currentFloor);
      this.on("new_state", newElevStateHandler);
      this.on("change:goingUpIndicator", () => {
        this.trigger("indicatorstate_change", {
          up: this.goingUpIndicator,
          down: this.goingDownIndicator
        });
      });
      this.on("change:goingDownIndicator", () => {
        this.trigger("indicatorstate_change", {
          up: this.goingUpIndicator,
          down: this.goingDownIndicator
        });
      });
    }
    /**
     * Sets the elevator to a specific floor position.
     * @param {number} floor - The floor number to set the elevator to.
     * @throws Will throw an error if the elevator is busy.
     */
    setFloorPosition(floor) {
      const destination = this.getYPosOfFloor(floor);
      this.currentFloor = floor;
      this.previousTruncFutureFloorIfStopped = floor;
      this.moveTo(null, destination);
    }
    /**
     * Attempts to assign a user to a random available slot in the elevator.
     * Starts searching from a random offset to distribute users more evenly.
     *
     * @param {Object} user - The user object to be assigned to a slot.
     * @returns {(Object|boolean)} The position of the assigned slot if successful, or false if no slots are available.
     */
    userEntering(user) {
      const randomOffset = (0, import_random.default)(this.userSlots.length - 1);
      for (let i = 0; i < this.userSlots.length; i++) {
        const slot = this.userSlots[(i + randomOffset) % this.userSlots.length];
        if (slot.user === null) {
          slot.user = user;
          return slot.pos;
        }
      }
      return false;
    }
    /**
     * Handles the pressing of a floor button.
     *
     * Ensures the floor number is within valid bounds, updates the button state,
     * and triggers relevant events if the button was not previously pressed.
     *
     * @param {number} floorNumber - The floor number whose button is being pressed.
     */
    pressFloorButton(floorNumber) {
      floorNumber = limitNumber(floorNumber, 0, this.floorCount - 1);
      const prev = this.buttonStates[floorNumber];
      this.buttonStates[floorNumber] = true;
      if (!prev) {
        this.trigger("floor_button_pressed", floorNumber);
        this.trigger("floor_buttons_changed", this.buttonStates, floorNumber);
      }
    }
    /**
     * Marks the specified user as exiting the elevator by setting their slot to null.
     *
     * @param {Object} user - The user object to be removed from the elevator slots.
     */
    userExiting(user) {
      for (let i = 0; i < this.userSlots.length; i++) {
        const slot = this.userSlots[i];
        if (slot.user === user) {
          slot.user = null;
        }
      }
    }
    /**
     * Updates the elevator's vertical movement based on the current velocity, acceleration, and destination.
     * Handles acceleration, deceleration, and stopping logic to ensure smooth movement and accurate arrival at the destination.
     *
     * @param {number} dt - The time delta (in seconds) since the last update.
     *
     * @throws {Error} (potentially) if the elevator is busy and has a nonzero velocity (not currently implemented).
     */
    updateElevatorMovement(dt) {
      if (this.isBusy()) {
        return;
      }
      this.velocityY = limitNumber(this.velocityY, -this.MAXSPEED, this.MAXSPEED);
      this.moveTo(null, this.y + this.velocityY * dt);
      const destinationDiff = this.destinationY - this.y;
      const directionSign = Math.sign(destinationDiff);
      const velocitySign = Math.sign(this.velocityY);
      let acceleration = 0;
      if (destinationDiff !== 0) {
        if (directionSign === velocitySign) {
          const distanceNeededToStop = distanceNeededToAchieveSpeed(this.velocityY, 0, this.DECELERATION);
          if (distanceNeededToStop * 1.05 < -Math.abs(destinationDiff)) {
            const requiredDeceleration = accelerationNeededToAchieveChangeDistance(this.velocityY, 0, destinationDiff);
            const deceleration = Math.min(this.DECELERATION * 1.1, Math.abs(requiredDeceleration));
            this.velocityY -= directionSign * deceleration * dt;
          } else {
            acceleration = Math.min(Math.abs(destinationDiff * 5), this.ACCELERATION);
            this.velocityY += directionSign * acceleration * dt;
          }
        } else if (velocitySign === 0) {
          acceleration = Math.min(Math.abs(destinationDiff * 5), this.ACCELERATION);
          this.velocityY += directionSign * acceleration * dt;
        } else {
          this.velocityY -= velocitySign * this.DECELERATION * dt;
          if (Math.sign(this.velocityY) !== velocitySign) {
            this.velocityY = 0;
          }
        }
      }
      if (this.isMoving && Math.abs(destinationDiff) < 0.5 && Math.abs(this.velocityY) < 3) {
        this.moveTo(null, this.destinationY);
        this.velocityY = 0;
        this.isMoving = false;
        this.handleDestinationArrival();
      }
    }
    /**
     * Handles the elevator's arrival at a destination floor.
     *
     * Triggers the 'stopped' event with the exact current floor.
     * If the elevator is on a floor, it:
     * - Updates the button state for the current floor.
     * - Triggers 'floor_buttons_changed' with updated button states and current floor.
     * - Triggers 'stopped_at_floor' for the current floor.
     * - Triggers 'exit_available' to allow passengers to exit.
     * - Triggers 'entrance_available' to allow new passengers to enter.
     */
    handleDestinationArrival() {
      this.trigger("stopped", this.getExactCurrentFloor());
      if (this.isOnAFloor()) {
        this.buttonStates[this.currentFloor] = false;
        this.trigger("floor_buttons_changed", this.buttonStates, this.currentFloor);
        this.trigger("stopped_at_floor", this.currentFloor);
        this.trigger("exit_available", this.currentFloor, this);
        this.trigger("entrance_available", this);
      }
    }
    /**
     * Commands the elevator to move to the specified floor.
     * Ensures the elevator is not currently busy before initiating movement.
     *
     * @param {number} floor - The floor number to which the elevator should move.
     * @throws {Error} If the elevator is currently busy and cannot accept new commands.
     */
    goToFloor(floor) {
      this.makeSureNotBusy();
      this.isMoving = true;
      this.destinationY = this.getYPosOfFloor(floor);
    }
    /**
     * Returns the index of the first pressed floor button.
     * Iterates through the buttonStates array and returns the index of the first element that is truthy.
     * If no button is pressed, returns 0.
     *
     * @returns {number} The index of the first pressed floor button, or 0 if none are pressed.
     */
    getFirstPressedFloor() {
      deprecationWarning("getFirstPressedFloor");
      for (let i = 0; i < this.buttonStates.length; i++) {
        if (this.buttonStates[i]) {
          return i;
        }
      }
      return 0;
    }
    /**
     * Returns an array of floor numbers for which the elevator's buttons are currently pressed.
     *
     * Iterates through the `buttonStates` array and collects the indices (representing floor numbers)
     * where the button state is truthy (pressed).
     *
     * @returns {number[]} An array of floor numbers with pressed buttons.
     */
    getPressedFloors() {
      const arr = [];
      for (let i = 0; i < this.buttonStates.length; i++) {
        if (this.buttonStates[i]) {
          arr.push(i);
        }
      }
      return arr;
    }
    /**
     * Determines if the elevator is suitable for travel between two floors based on its current direction indicators.
     *
     * @param {number} fromFloorNum - The floor number where the travel starts.
     * @param {number} toFloorNum - The floor number where the travel ends.
     * @returns {boolean} - Returns true if the elevator is suitable for the requested travel direction, otherwise false.
     */
    isSuitableForTravelBetween(fromFloorNum, toFloorNum) {
      if (fromFloorNum > toFloorNum) {
        return this.goingDownIndicator;
      }
      if (fromFloorNum < toFloorNum) {
        return this.goingUpIndicator;
      }
      return true;
    }
    /**
     * Calculates the Y position of a given floor number.
     *
     * @param {number} floorNum - The floor number for which to calculate the Y position (0-based).
     * @returns {number} The Y coordinate of the specified floor.
     */
    getYPosOfFloor(floorNum) {
      return (this.floorCount - 1) * this.floorHeight - floorNum * this.floorHeight;
    }
    /**
     * Calculates the exact floor number corresponding to a given Y position.
     *
     * @param {number} y - The Y position to convert to a floor number.
     * @returns {number} The exact (possibly fractional) floor number for the given Y position.
     */
    getExactFloorOfYPos(y) {
      return ((this.floorCount - 1) * this.floorHeight - y) / this.floorHeight;
    }
    /**
     * Returns the exact current floor of the elevator based on its current Y position.
     *
     * @returns {number} The exact floor number corresponding to the elevator's current Y position.
     */
    getExactCurrentFloor() {
      return this.getExactFloorOfYPos(this.y);
    }
    /**
     * Returns the destination floor number based on the elevator's destination Y position.
     *
     * @returns {number} The floor number corresponding to the elevator's destination Y position.
     */
    getDestinationFloor() {
      return this.getExactFloorOfYPos(this.destinationY);
    }
    /**
     * Returns the current floor number rounded to the nearest integer.
     * Utilizes the exact current floor value and rounds it to the closest whole number.
     *
     * @returns {number} The rounded current floor number.
     */
    getRoundedCurrentFloor() {
      return Math.round(this.getExactCurrentFloor());
    }
    /**
     * Calculates the exact floor the elevator will be at if it stops immediately,
     * taking into account the current velocity and deceleration.
     *
     * @returns {number} The exact floor (as a floating-point number) where the elevator would stop.
     */
    getExactFutureFloorIfStopped() {
      const distanceNeededToStop = distanceNeededToAchieveSpeed(this.velocityY, 0, this.DECELERATION);
      return this.getExactFloorOfYPos(this.y - Math.sign(this.velocityY) * distanceNeededToStop);
    }
    /**
     * Determines if the elevator is currently moving towards the specified floor.
     *
     * @param {number} floorNum - The floor number to check against the elevator's current trajectory.
     * @returns {boolean} True if the elevator is moving and heading towards the given floor, false otherwise.
     */
    isApproachingFloor(floorNum) {
      const floorYPos = this.getYPosOfFloor(floorNum);
      const elevToFloor = floorYPos - this.y;
      return this.velocityY !== 0 && Math.sign(this.velocityY) === Math.sign(elevToFloor);
    }
    /**
     * Determines whether the elevator is currently positioned exactly on a floor.
     *
     * @returns {boolean} True if the elevator's exact current floor is equal to its rounded current floor, otherwise false.
     */
    isOnAFloor() {
      return epsilonEquals(this.getExactCurrentFloor(), this.getRoundedCurrentFloor());
    }
    /**
     * Calculates the current load factor of the elevator.
     * The load factor is determined by summing the weights of all users currently in the elevator
     * and dividing by the maximum possible load (maxUsers * 100).
     *
     * @returns {number} The load factor as a decimal between 0 and 1.
     */
    getLoadFactor() {
      const load = (0, import_reduce.default)(
        this.userSlots,
        function(sum, slot) {
          return sum + (slot.user ? slot.user.weight : 0);
        },
        0
      );
      return load / (this.maxUsers * 100);
    }
    /**
     * Checks if all user slots in the elevator are occupied.
     *
     * @returns {boolean} Returns true if every slot has a user, otherwise false.
     */
    isFull() {
      for (let i = 0; i < this.userSlots.length; i++) {
        if (this.userSlots[i].user === null) {
          return false;
        }
      }
      return true;
    }
    /**
     * Checks if all user slots are empty.
     * @returns {boolean} Returns true if all user slots are empty (i.e., no user is present), otherwise false.
     */
    isEmpty() {
      for (let i = 0; i < this.userSlots.length; i++) {
        if (this.userSlots[i].user !== null) {
          return false;
        }
      }
      return true;
    }
    /**
     * Handles the elevator's state update when its position or movement changes.
     *
     * - Updates the current floor if the elevator has moved to a new floor, increments the move count,
     *   and triggers the 'new_current_floor' event.
     * - Checks if the truncated future floor (if the elevator stopped now) has changed since the last check.
     *   If so, determines if the elevator is passing a floor (not the destination) and triggers the
     *   'passing_floor' event with the floor number and direction ('up' or 'down').
     * - Updates the previous truncated future floor for the next state check.
     *
     * @fires Elevator#new_current_floor - Triggered when the elevator arrives at a new floor.
     * @fires Elevator#passing_floor - Triggered when the elevator passes a floor (not the destination).
     */
    handleNewState() {
      const currentFloor = this.getRoundedCurrentFloor();
      if (currentFloor !== this.currentFloor) {
        this.moveCount++;
        this.currentFloor = currentFloor;
        this.trigger("new_current_floor", this.currentFloor);
      }
      const futureTruncFloorIfStopped = Math.trunc(this.getExactFutureFloorIfStopped());
      if (futureTruncFloorIfStopped !== this.previousTruncFutureFloorIfStopped) {
        const floorBeingPassed = Math.round(this.getExactFutureFloorIfStopped());
        if (this.getDestinationFloor() !== floorBeingPassed && this.isApproachingFloor(floorBeingPassed)) {
          const direction = this.velocityY > 0 ? "down" : "up";
          this.trigger("passing_floor", floorBeingPassed, direction);
        }
      }
      this.previousTruncFutureFloorIfStopped = futureTruncFloorIfStopped;
    }
  };

  // src/models/elevator-facade.js
  var import_observable2 = __toESM(require_observable(), 1);
  var import_first = __toESM(require_first(), 1);
  var import_last = __toESM(require_last(), 1);
  var import_tail = __toESM(require_tail(), 1);
  var ElevatorFacade = class {
    constructor(options) {
      this.elevator = options.elevator;
      this.floorCount = options.floorCount;
      this.errorHandler = options.errorHandler;
      this.destinationQueue = [];
      this.goingUpIndicator = createBoolPassthroughFunction(this, this.elevator, "goingUpIndicator");
      this.goingDownIndicator = createBoolPassthroughFunction(this, this.elevator, "goingDownIndicator");
      (0, import_observable2.default)(this);
      this.elevator.on("stopped", (position) => {
        if (this.destinationQueue.length && epsilonEquals((0, import_first.default)(this.destinationQueue), position)) {
          this.destinationQueue = (0, import_tail.default)(this.destinationQueue);
          if (this.elevator.isOnAFloor()) {
            this.elevator.wait(1, () => {
              this.checkDestinationQueue();
            });
          } else {
            this.checkDestinationQueue();
          }
        }
      });
      this.elevator.on("passing_floor", (floorNum, direction) => {
        this._tryTrigger("passing_floor", floorNum, direction);
      });
      this.elevator.on("stopped_at_floor", (floorNum) => {
        this._tryTrigger("stopped_at_floor", floorNum);
      });
      this.elevator.on("floor_button_pressed", (floorNum) => {
        this._tryTrigger("floor_button_pressed", floorNum);
      });
    }
    _tryTrigger(event, arg1, arg2, arg3, arg4) {
      try {
        this.trigger(event, arg1, arg2, arg3, arg4);
      } catch (e) {
        this.errorHandler(e);
      }
    }
    /**
     * Checks the elevator's destination queue and directs the elevator to the next floor if it is not busy.
     * If the destination queue is empty, triggers the 'idle' event.
     *
     * @returns {void}
     */
    checkDestinationQueue() {
      if (!this.elevator.isBusy()) {
        if (this.destinationQueue.length) {
          this.elevator.goToFloor((0, import_first.default)(this.destinationQueue));
        } else {
          this._tryTrigger("idle");
        }
      }
    }
    /**
     * Adds a floor number to the elevator's destination queue, optionally forcing it to the front.
     * Prevents adding immediately duplicate destinations.
     *
     * @param {number} floorNum - The target floor number to go to.
     * @param {boolean} [forceNow=false] - If true, adds the floor to the front of the queue; otherwise, adds to the end.
     */
    goToFloor(floorNum, forceNow) {
      floorNum = limitNumber(Number(floorNum), 0, this.floorCount - 1);
      if (this.destinationQueue.length) {
        const adjacentElement = forceNow ? (0, import_first.default)(this.destinationQueue) : (0, import_last.default)(this.destinationQueue);
        if (epsilonEquals(floorNum, adjacentElement)) {
          return;
        }
      }
      this.destinationQueue[forceNow ? "unshift" : "push"](floorNum);
      this.checkDestinationQueue();
    }
    /**
     * Stops the elevator by clearing its destination queue.
     * If the elevator is not busy, it sends the elevator to its current exact future floor.
     *
     * @returns {void}
     */
    stop() {
      this.destinationQueue = [];
      if (!this.elevator.isBusy()) {
        this.elevator.goToFloor(this.elevator.getExactFutureFloorIfStopped());
      }
    }
    /**
     * Returns the first floor button that was pressed inside the elevator.
     *
     * @deprecated This method is undocumented and will be removed in future versions.
     * @returns {number|undefined} The number of the first pressed floor, or undefined if no floor is pressed.
     */
    getFirstPressedFloor() {
      return this.elevator.getFirstPressedFloor();
    }
    // Undocumented and deprecated, will be removed
    /**
     * Returns an array of floor numbers that have been requested by passengers inside the elevator.
     * These are the floors for which the corresponding buttons have been pressed.
     *
     * @returns {number[]} An array of floor numbers currently pressed inside the elevator.
     */
    getPressedFloors() {
      return this.elevator.getPressedFloors();
    }
    /**
     * Returns the current floor number of the elevator.
     * @returns {number} The current floor the elevator is on.
     */
    currentFloor() {
      return this.elevator.currentFloor;
    }
    /**
     * Returns the maximum number of passengers the elevator can carry.
     * @returns {number} The maximum passenger count for the elevator.
     */
    maxPassengerCount() {
      return this.elevator.maxUsers;
    }
    /**
     * Returns the current load factor of the elevator.
     * The load factor is a value between 0 and 1 representing how full the elevator is.
     *
     * @returns {number} The current load factor of the elevator.
     */
    loadFactor() {
      return this.elevator.getLoadFactor();
    }
    /**
     * Determines the direction the elevator should move to reach its destination.
     *
     * @returns {string} Returns 'up' if the destination is above the current position,
     *                   'down' if the destination is below, or 'stopped' if already at the destination.
     */
    destinationDirection() {
      if (this.elevator.destinationY === this.elevator.y) {
        return "stopped";
      }
      return this.elevator.destinationY > this.elevator.y ? "down" : "up";
    }
  };

  // src/models/floor.js
  var import_observable3 = __toESM(require_observable(), 1);
  var Floor = class {
    /**
     * Creates an instance of Floor.
     * Initializes the floor with a level, Y position, and an error handler for event triggering.
     * @param {Object} options - Configuration options for the floor.
     * @param {number} options.floorLevel - The floor number/level.
     * @param {number} options.yPosition - The vertical position of the floor.
     * @param {Function} options.errorHandler - Function to handle errors during event triggering.
     */
    constructor(options) {
      if (!options || typeof options.errorHandler !== "function") {
        throw new Error("errorHandler must be provided and be a function.");
      }
      this.level = options.floorLevel;
      this.yPosition = options.yPosition;
      this.buttonStates = { up: "", down: "" };
      this._errorHandler = options.errorHandler;
      (0, import_observable3.default)(this);
    }
    /**
     * Attempts to trigger a specified event with up to four arguments.
     * If an error occurs during the trigger, it is handled by the internal error handler.
     *
     * @param {string} event - The name of the event to trigger.
     * @param {*} [arg1] - The first argument to pass to the event handler.
     * @param {*} [arg2] - The second argument to pass to the event handler.
     * @param {*} [arg3] - The third argument to pass to the event handler.
     * @param {*} [arg4] - The fourth argument to pass to the event handler.
     */
    _tryTrigger(event, arg1, arg2, arg3, arg4) {
      try {
        this.trigger(event, arg1, arg2, arg3, arg4);
      } catch (e) {
        this._errorHandler(e);
      }
    }
    /**
     * Activates the "up" button on the floor, updating its state and triggering relevant events if the state changes.
     *
     * Triggers:
     * - 'buttonstate_change' with the updated button states if the "up" button was not already activated.
     * - 'up_button_pressed' with the current floor instance if the "up" button was not already activated.
     */
    pressUpButton() {
      const prev = this.buttonStates.up;
      this.buttonStates.up = "activated";
      if (prev !== this.buttonStates.up) {
        this._tryTrigger("buttonstate_change", this.buttonStates);
        this._tryTrigger("up_button_pressed", this);
      }
    }
    /**
     * Activates the "down" button on the floor, updating its state to 'activated'.
     * If the button state changes, triggers the 'buttonstate_change' and 'down_button_pressed' events.
     *
     * @fires buttonstate_change - Triggered when the button state changes.
     * @fires down_button_pressed - Triggered when the down button is pressed.
     */
    pressDownButton() {
      const prev = this.buttonStates.down;
      this.buttonStates.down = "activated";
      if (prev !== this.buttonStates.down) {
        this._tryTrigger("buttonstate_change", this.buttonStates);
        this._tryTrigger("down_button_pressed", this);
      }
    }
    /**
     * Handles the availability of an elevator at the floor.
     * If the elevator is going in the direction of a pressed button (up or down),
     * resets the corresponding button state and triggers a 'buttonstate_change' event.
     *
     * @param {Object} elevator - The elevator object.
     * @param {boolean} elevator.goingUpIndicator - Indicates if the elevator is going up.
     * @param {boolean} elevator.goingDownIndicator - Indicates if the elevator is going down.
     */
    elevatorAvailable(elevator) {
      if (elevator.goingUpIndicator && this.buttonStates.up) {
        this.buttonStates.up = "";
        this._tryTrigger("buttonstate_change", this.buttonStates);
      }
      if (elevator.goingDownIndicator && this.buttonStates.down) {
        this.buttonStates.down = "";
        this._tryTrigger("buttonstate_change", this.buttonStates);
      }
    }
    /**
     * Calculates and returns the Y-coordinate for spawning an object on the floor.
     * Adds an offset of 30 to the current floor's Y position.
     *
     * @returns {number} The Y-coordinate for the spawn position.
     */
    getSpawnPosY() {
      return this.yPosition + 30;
    }
    /**
     * Returns the floor number (level) of this floor.
     * @returns {number} The floor number.
     */
    floorNum() {
      return this.level;
    }
  };

  // src/models/world.js
  var World = class _World {
    /**
     * @param {Object} options - World configuration options.
     * @param {number} options.floorHeight
     * @param {number} options.floorCount
     * @param {number} options.elevatorCount
     * @param {number} options.spawnRate
     * @param {Array<number>} [options.elevatorCapacities]
     */
    constructor(options) {
      const defaultOptions = { ...options, floorHeight: 50, floorCount: 4, elevatorCount: 2, spawnRate: 0.5 };
      this.floorCount = defaultOptions.floorCount;
      this.spawnRate = defaultOptions.spawnRate;
      this.floorHeight = defaultOptions.floorHeight;
      this.transportedCounter = 0;
      this.transportedPerSec = 0;
      this.moveCount = 0;
      this.elapsedTime = 0;
      this.maxWaitTime = 0;
      this.avgWaitTime = 0;
      this.challengeEnded = false;
      this.users = [];
      (0, import_observable4.default)(this);
      this._handleUserCodeError = (e) => this.trigger("usercode_error", e);
      this.floors = this.createFloors(defaultOptions.floorCount, this.floorHeight, this._handleUserCodeError);
      this.elevators = this.createElevators(
        defaultOptions.elevatorCount,
        defaultOptions.floorCount,
        this.floorHeight,
        defaultOptions.elevatorCapacities
      );
      this.facades = (0, import_map2.default)(
        this.elevators,
        (elevator) => new ElevatorFacade({}, elevator, defaultOptions.floorCount, this._handleUserCodeError)
      );
      for (let i = 0; i < this.elevators.length; ++i) {
        this.elevators[i].on("entrance_available", (elevator) => this.handleElevAvailability(elevator));
      }
      for (let i = 0; i < this.floors.length; ++i) {
        this.floors[i].on(
          "up_button_pressed down_button_pressed",
          (eventName, floor) => this.handleButtonRepressing(eventName, floor)
        );
      }
    }
    /**
     * Create an array of Floor instances.
     * Floors are positioned from top (highest index) to bottom (lowest index),
     * so the highest floor appears at the top of the display.
     *
     * @param {number} floorCount - The number of floors to create.
     * @param {number} floorHeight - The height of each floor.
     * @param {Function} errorHandler - Function to handle errors during event triggering.
     *
     * @returns {Array<Floor>} An array of Floor instances.
     */
    createFloors(floorCount, floorHeight, errorHandler) {
      return (0, import_map2.default)((0, import_range2.default)(floorCount), (i) => {
        const yPos = (floorCount - 1 - i) * floorHeight;
        return new Floor({ floorLevel: i, yPosition: yPos, errorHandler });
      });
    }
    /**
     * Create an array of Elevator instances.
     * Elevators are positioned horizontally with a gap of 20 pixels between them.
     * @param {number} elevatorCount - The number of elevators to create.
     * @param {number} floorCount - The total number of floors in the building.
     * @param {number} floorHeight - The height of each floor.
     * @param {Array<number>} [elevatorCapacities] - Optional array specifying the capacity of each elevator.
     * If not provided, defaults to a single capacity of 4
     *
     * @returns {Array<Elevator>} An array of Elevator instances.
     */
    createElevators(elevatorCount, floorCount, floorHeight, elevatorCapacities) {
      elevatorCapacities = elevatorCapacities || [4];
      let currentX = 200;
      return (0, import_map2.default)((0, import_range2.default)(elevatorCount), (e, i) => {
        const elevator = new Elevator({
          speedFloorsPerSec: 2.6,
          floorCount,
          floorHeight,
          maxUsers: elevatorCapacities[i % elevatorCapacities.length]
        });
        elevator.moveTo(currentX, null);
        elevator.setFloorPosition(0);
        elevator.updateDisplayPosition();
        currentX += 20 + elevator.width;
        return elevator;
      });
    }
    /**
     * Create a random user for the simulation.
     * The user will have a random weight between 55 and 100 kg.
     * The display type is randomly assigned
     * to 'child', 'female', or 'male'.
     *
     * @returns {User} A new User instance with random attributes.
     */
    createRandomUser() {
      const weight = (0, import_random2.default)(55, 100);
      const user = new User(weight);
      if ((0, import_random2.default)(40) === 0) {
        user.displayType = "child";
      } else if ((0, import_random2.default)(1) === 0) {
        user.displayType = "female";
      } else {
        user.displayType = "male";
      }
      return user;
    }
    /**
     * Spawn a user randomly on a floor with a random destination.
     */
    spawnUserRandomly() {
      const user = _World.createRandomUser();
      user.moveTo(105 + (0, import_random2.default)(40), 0);
      const floorCount = this.floorCount;
      const currentFloor = (0, import_random2.default)(1) === 0 ? 0 : (0, import_random2.default)(floorCount - 1);
      let destinationFloor;
      if (currentFloor === 0) {
        destinationFloor = (0, import_random2.default)(1, floorCount - 1);
      } else {
        if ((0, import_random2.default)(10) === 0) {
          destinationFloor = (currentFloor + (0, import_random2.default)(1, floorCount - 1)) % floorCount;
        } else {
          destinationFloor = 0;
        }
      }
      user.appearOnFloor(this.floors[currentFloor], destinationFloor);
      return user;
    }
    /**
     * Register a user in the world and wire up events.
     * @param {User} user
     */
    registerUser(user) {
      this.users.push(user);
      user.updateDisplayPosition(true);
      user.spawnTimestamp = this.elapsedTime;
      this.trigger("new_user", user);
      user.on("exited_elevator", () => {
        this.transportedCounter++;
        this.maxWaitTime = Math.max(this.maxWaitTime, this.elapsedTime - user.spawnTimestamp);
        this.avgWaitTime = (this.avgWaitTime * (this.transportedCounter - 1) + (this.elapsedTime - user.spawnTimestamp)) / this.transportedCounter;
        this.recalculateStats();
      });
      user.updateDisplayPosition(true);
    }
    /**
     * Recalculate world statistics.
     */
    recalculateStats() {
      this.transportedPerSec = this.transportedCounter / this.elapsedTime;
      this.moveCount = (0, import_reduce2.default)(this.elevators, (sum, elevator) => sum + elevator.moveCount, 0);
      this.trigger("stats_changed");
    }
    /**
     * Handle elevator availability for floors and users.
     * @param {Elevator} elevator
     */
    handleElevAvailability(elevator) {
      for (let i = 0, len = this.floors.length; i < len; ++i) {
        const floor = this.floors[i];
        if (elevator.currentFloor === i) {
          floor.elevatorAvailable(elevator);
        }
      }
      for (let users = this.users, i = 0, len = users.length; i < len; ++i) {
        const user = users[i];
        if (user.currentFloor === elevator.currentFloor) {
          user.elevatorAvailable(elevator, this.floors[elevator.currentFloor]);
        }
      }
    }
    /**
     * Handle button repressing logic for floors and elevators.
     */
    handleButtonRepressing(eventName, floor) {
      for (let i = 0, len = this.elevators.length, offset = (0, import_random2.default)(len - 1); i < len; ++i) {
        const elevIndex = (i + offset) % len;
        const elevator = this.elevators[elevIndex];
        if (eventName === "up_button_pressed" && elevator.goingUpIndicator || eventName === "down_button_pressed" && elevator.goingDownIndicator) {
          if (elevator.currentFloor === floor.level && elevator.isOnAFloor() && !elevator.isMoving && !elevator.isFull()) {
            this.facades[elevIndex].goToFloor(floor.level, true);
            return;
          }
        }
      }
    }
    /**
     * Main update function for the simulation.
     * @param {number} dt - Delta time in seconds.
     */
    update(dt) {
      this.elapsedTime += dt;
      this._elapsedSinceSpawn = (this._elapsedSinceSpawn || 1.001 / this.spawnRate) + dt;
      this._elapsedSinceStatsUpdate = (this._elapsedSinceStatsUpdate || 0) + dt;
      while (this._elapsedSinceSpawn > 1 / this.spawnRate) {
        this._elapsedSinceSpawn -= 1 / this.spawnRate;
        this.registerUser(this.spawnUserRandomly());
      }
      for (let i = 0, len = this.elevators.length; i < len; ++i) {
        const e = this.elevators[i];
        e.update(dt);
        e.updateElevatorMovement(dt);
      }
      for (let users = this.users, i = 0, len = users.length; i < len; ++i) {
        const u = users[i];
        u.update(dt);
        this.maxWaitTime = Math.max(this.maxWaitTime, this.elapsedTime - u.spawnTimestamp);
      }
      for (let users = this.users, i = users.length - 1; i >= 0; i--) {
        const u = users[i];
        if (u.removeMe) {
          users.splice(i, 1);
        }
      }
      this.recalculateStats();
    }
    /**
     * Update display positions for all elevators and users.
     */
    updateDisplayPositions() {
      for (let i = 0, len = this.elevators.length; i < len; ++i) {
        this.elevators[i].updateDisplayPosition();
      }
      for (let users = this.users, i = 0, len = users.length; i < len; ++i) {
        users[i].updateDisplayPosition();
      }
    }
    /**
     * Unwind the world, removing all event listeners and clearing arrays.
     */
    unWind() {
      (0, import_each.default)(this.elevators.concat(this.facades).concat(this.users).concat(this.floors).concat([this]), (obj2) => {
        obj2.off("*");
      });
      this.challengeEnded = true;
      this.elevators = this.facades = this.users = this.floors = [];
    }
    /**
     * Initialize the world (checks elevator queues).
     */
    init() {
      for (let i = 0; i < this.facades.length; ++i) {
        this.facades[i].checkDestinationQueue();
      }
    }
  };

  // src/app/presenters.js
  function clearAll($elems) {
    (0, import_each2.default)($elems, function($elem) {
      $elem.empty();
    });
  }
  function setTransformPos(elem, x, y) {
    const style = "translate(" + x + "px," + y + "px) translateZ(0)";
    elem.style.transform = style;
    elem.style["-ms-transform"] = style;
    elem.style["-webkit-transform"] = style;
  }
  function updateUserState($user, elem_user, user) {
    setTransformPos(elem_user, user.worldX, user.worldY);
    if (user.done) {
      $user.addClass("leaving");
    }
  }
  function presentStats($parent, world) {
    const elem_transportedcounter = $parent.find(".transportedcounter").get(0), elem_elapsedtime = $parent.find(".elapsedtime").get(0), elem_transportedpersec = $parent.find(".transportedpersec").get(0), elem_avgwaittime = $parent.find(".avgwaittime").get(0), elem_maxwaittime = $parent.find(".maxwaittime").get(0), elem_movecount = $parent.find(".movecount").get(0);
    world.on("stats_display_changed", function updateStats() {
      elem_transportedcounter.textContent = world.transportedCounter;
      elem_elapsedtime.textContent = world.elapsedTime.toFixed(0) + "s";
      elem_transportedpersec.textContent = world.transportedPerSec.toPrecision(3);
      elem_avgwaittime.textContent = world.avgWaitTime.toFixed(1) + "s";
      elem_maxwaittime.textContent = world.maxWaitTime.toFixed(1) + "s";
      elem_movecount.textContent = world.moveCount;
    });
    world.trigger("stats_display_changed");
  }
  function presentChallenge($parent, challenge, app, world, worldController, challengeNum, challengeTempl) {
    const $challenge = $(
      (void 0)(challengeTempl, {
        challenge,
        num: challengeNum,
        timeScale: worldController.timeScale.toFixed(0) + "x",
        startButtonText: world.challengeEnded ? "<i class='fa fa-repeat'></i> Restart" : worldController.isPaused ? "Start" : "Pause"
      })
    );
    $parent.html($challenge);
    $parent.find(".startstop").on("click", function() {
      app.startStopOrRestart();
    });
    $parent.find(".timescale_increase").on("click", function(e) {
      e.preventDefault();
      if (worldController.timeScale < 40) {
        const timeScale = Math.round(worldController.timeScale * 1.618);
        worldController.setTimeScale(timeScale);
      }
    });
    $parent.find(".timescale_decrease").on("click", function(e) {
      e.preventDefault();
      const timeScale = Math.round(worldController.timeScale / 1.618);
      worldController.setTimeScale(timeScale);
    });
  }
  function presentFeedback($parent, feedbackTempl, world, title, message, url) {
    $parent.html(
      (void 0)(feedbackTempl, {
        title,
        message,
        url,
        paddingTop: world.floors.length * world.floorHeight * 0.2
      })
    );
    if (!url) {
      $parent.find("a").remove();
    }
  }
  function presentWorld($world, world, floorTempl, elevatorTempl, elevatorButtonTempl, userTempl) {
    $world.css("height", world.floorHeight * world.floors.length);
    $world.append(
      (0, import_map3.default)(world.floors, function(f) {
        const $floor = $((void 0)(floorTempl, f));
        const $up = $floor.find(".up");
        const $down = $floor.find(".down");
        f.on("buttonstate_change", function(buttonStates) {
          $up.toggleClass("activated", buttonStates.up !== "");
          $down.toggleClass("activated", buttonStates.down !== "");
        });
        $up.on("click", function() {
          f.pressUpButton();
        });
        $down.on("click", function() {
          f.pressDownButton();
        });
        return $floor;
      })
    );
    $world.find(".floor").first().find(".down").addClass("invisible");
    $world.find(".floor").last().find(".up").addClass("invisible");
    function renderElevatorButtons(states) {
      return (0, import_map3.default)(states, function(b, i) {
        return (void 0)(elevatorButtonTempl, { floorNum: i });
      }).join("");
    }
    function setUpElevator(e) {
      const $elevator = $((void 0)(elevatorTempl, { e }));
      const elem_elevator = $elevator.get(0);
      $elevator.find(".buttonindicator").html(renderElevatorButtons(e.buttonStates));
      const $buttons = (0, import_map3.default)($elevator.find(".buttonindicator").children(), function(c) {
        return $(c);
      });
      const elem_floorindicator = $elevator.find(".floorindicator > span").get(0);
      $elevator.on("click", ".buttonpress", function() {
        e.pressFloorButton(parseInt($(this).text()));
      });
      e.on("new_display_state", function updateElevatorPosition() {
        setTransformPos(elem_elevator, e.worldX, e.worldY);
      });
      e.on("new_current_floor", function update_current_floor(floor) {
        elem_floorindicator.textContent = floor;
      });
      e.on("floor_buttons_changed", function update_floor_buttons(states, indexChanged) {
        $buttons[indexChanged].toggleClass("activated", states[indexChanged]);
      });
      e.on("indicatorstate_change", function indicatorstate_change(indicatorStates) {
        $elevator.find(".up").toggleClass("activated", indicatorStates.up);
        $elevator.find(".down").toggleClass("activated", indicatorStates.down);
      });
      e.trigger("new_state", e);
      e.trigger("new_display_state", e);
      e.trigger("new_current_floor", e.currentFloor);
      return $elevator;
    }
    $world.append(
      (0, import_map3.default)(world.elevators, function(e) {
        return setUpElevator(e);
      })
    );
    world.on("new_user", function(user) {
      const $user = $((void 0)(userTempl, { u: user, state: user.done ? "leaving" : "" }));
      const elem_user = $user.get(0);
      user.on("new_display_state", function() {
        updateUserState($user, elem_user, user);
      });
      user.on("removed", function() {
        $user.remove();
      });
      $world.append($user);
    });
  }
  function presentCodeStatus($parent, templ, error) {
    console.log(error);
    let errorDisplay = error ? "block" : "none";
    let successDisplay = error ? "none" : "block";
    let errorMessage = error;
    if (error && error.stack) {
      errorMessage = error.stack;
      errorMessage = errorMessage.replace(/\n/g, "<br>");
    }
    const status = (void 0)(templ, {
      errorMessage,
      errorDisplay,
      successDisplay
    });
    $parent.html(status);
  }

  // src/app/simulation.js
  var import_observable6 = __toESM(require_observable(), 1);

  // src/models/world-controller.js
  var import_observable5 = __toESM(require_observable(), 1);
  var WorldController = class {
    /**
     * @param {number} dtMax - Maximum delta time per update.
     */
    constructor(dtMax) {
      (0, import_observable5.default)(this);
      this.dtMax = dtMax;
      this.timeScale = 1;
      this.isPaused = true;
    }
    /**
     * Start the simulation loop.
     * @param {World} world
     * @param {Object} codeObj - User code object with init/update methods.
     * @param {Function} animationFrameRequester - Function to request animation frames.
     * @param {boolean} autoStart - Whether to start immediately.
     */
    start(world, codeObj, animationFrameRequester, autoStart) {
      this.isPaused = true;
      let lastT = null;
      let firstUpdate = true;
      world.on("usercode_error", this.handleUserCodeError.bind(this));
      const updater = (t) => {
        if (!this.isPaused && !world.challengeEnded && lastT !== null) {
          if (firstUpdate) {
            firstUpdate = false;
            try {
              codeObj.init(world.facades, world.floors);
              world.init();
            } catch (e) {
              this.handleUserCodeError(e);
            }
          }
          let dt = t - lastT;
          let scaledDt = dt * 1e-3 * this.timeScale;
          scaledDt = Math.min(scaledDt, this.dtMax * 3 * this.timeScale);
          try {
            codeObj.update(scaledDt, world.facades, world.floors);
          } catch (e) {
            this.handleUserCodeError(e);
          }
          while (scaledDt > 0 && !world.challengeEnded) {
            const thisDt = Math.min(this.dtMax, scaledDt);
            world.update(thisDt);
            scaledDt -= this.dtMax;
          }
          world.updateDisplayPositions();
          world.trigger("stats_display_changed");
        }
        lastT = t;
        if (!world.challengeEnded) {
          animationFrameRequester(updater);
        }
      };
      if (autoStart) {
        this.setPaused(false);
      }
      animationFrameRequester(updater);
    }
    /**
     * Handle user code errors.
     * @param {Error} e
     */
    handleUserCodeError(e) {
      this.setPaused(true);
      console.log("Usercode error on update", e);
      this.trigger("usercode_error", e);
    }
    /**
     * Pause or resume the simulation.
     * @param {boolean} paused
     */
    setPaused(paused) {
      this.isPaused = paused;
      this.trigger("timescale_changed");
    }
    /**
     * Set the simulation time scale.
     * @param {number} timeScale
     */
    setTimeScale(timeScale) {
      this.timeScale = timeScale;
      this.trigger("timescale_changed");
    }
  };

  // src/app/simulation.js
  var Simulation = class {
    /**
     * @param {Object} deps - Dependency injection for UI and editor.
     * @param {Object} deps.editor - Code editor interface.
     * @param {Array} deps.challenges - Array of challenge definitions.
     * @param {Function} deps.clearAll - UI clear function.
     * @param {Function} deps.presentStats - UI stats presenter.
     * @param {Function} deps.presentChallenge - UI challenge presenter.
     * @param {Function} deps.presentWorld - UI world presenter.
     * @param {Function} deps.presentFeedback - UI feedback presenter.
     * @param {Object} deps.templates - UI templates.
     * @param {Object} deps.params - URL params.
     * @param {Function} deps.createParamsUrl - URL param creator.
     * @param {string} deps.tsKey - LocalStorage key for timescale.
     * @param {Object} deps.$world - World DOM element.
     * @param {Object} deps.$feedback - Feedback DOM element.
     * @param {Object} deps.$stats - Stats DOM element.
     * @param {Object} deps.$challenge - Challenge DOM element.
     */
    constructor({
      editor,
      challenges: challenges2,
      clearAll: clearAll2,
      presentStats: presentStats2,
      presentChallenge: presentChallenge2,
      presentWorld: presentWorld2,
      presentFeedback: presentFeedback2,
      templates,
      params,
      createParamsUrl: createParamsUrl2,
      tsKey,
      $world,
      $feedback,
      $stats,
      $challenge
    }) {
      (0, import_observable6.default)(this);
      this.editor = editor;
      this.challenges = challenges2;
      this.clearAll = clearAll2;
      this.presentStats = presentStats2;
      this.presentChallenge = presentChallenge2;
      this.presentWorld = presentWorld2;
      this.presentFeedback = presentFeedback2;
      this.templates = templates;
      this.params = params;
      this.createParamsUrl = createParamsUrl2;
      this.tsKey = tsKey;
      this.$world = $world;
      this.$feedback = $feedback;
      this.$stats = $stats;
      this.$challenge = $challenge;
      this.currentChallengeIndex = 0;
      this.worldController = new WorldController(1 / 60);
      this.worldController.on("usercode_error", (e) => {
        console.log("World raised code error", e);
        this.editor.trigger("usercode_error", e);
      });
    }
    /**
     * Start, stop, or restart the simulation.
     */
    startStopOrRestart() {
      if (this.world && this.world.challengeEnded) {
        this.startChallenge(this.currentChallengeIndex);
      } else {
        this.worldController.setPaused(!this.worldController.isPaused);
      }
    }
    /**
     * Start a challenge by index.
     * @param {number} challengeIndex
     * @param {boolean} [autoStart]
     */
    startChallenge(challengeIndex, autoStart) {
      if (typeof this.world !== "undefined") {
        this.world.unWind();
      }
      this.currentChallengeIndex = challengeIndex;
      this.world = new World(this.challenges[challengeIndex].options);
      window.world = this.world;
      this.clearAll([this.$world, this.$feedback]);
      this.presentStats(this.$stats, this.world);
      this.presentChallenge(
        this.$challenge,
        this.challenges[challengeIndex],
        this,
        this.world,
        this.worldController,
        challengeIndex + 1,
        this.templates.challengeTempl
      );
      this.presentWorld(
        this.$world,
        this.world,
        this.templates.floorTempl,
        this.templates.elevatorTempl,
        this.templates.elevatorButtonTempl,
        this.templates.userTempl
      );
      this.worldController.on("timescale_changed", () => {
        localStorage.setItem(this.tsKey, this.worldController.timeScale);
        this.presentChallenge(
          this.$challenge,
          this.challenges[challengeIndex],
          this,
          this.world,
          this.worldController,
          challengeIndex + 1,
          this.templates.challengeTempl
        );
      });
      this.world.on("stats_changed", () => {
        const challengeStatus = this.challenges[challengeIndex].condition.evaluate(this.world);
        if (challengeStatus !== null) {
          this.world.challengeEnded = true;
          this.worldController.setPaused(true);
          if (challengeStatus) {
            this.presentFeedback(
              this.$feedback,
              this.templates.feedbackTempl,
              this.world,
              "Success!",
              "Challenge completed",
              this.createParamsUrl(this.params, { challenge: challengeIndex + 2 })
            );
          } else {
            this.presentFeedback(
              this.$feedback,
              this.templates.feedbackTempl,
              this.world,
              "Challenge failed",
              "Maybe your program needs an improvement?",
              ""
            );
          }
        }
      });
      const codeObj = this.editor.getCodeObj();
      console.log("Starting...");
      this.worldController.start(this.world, codeObj, window.requestAnimationFrame, autoStart);
    }
  };

  // src/app/types.js
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

  // src/app/app.js
  var createEditorAsync = () => new Promise((resolve, reject) => {
    const lsKey = "elevatorCrushCode_v5";
    __require.config({
      paths: { vs: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.29.1/min/vs/" }
    });
    window.MonacoEnvironment = {
      getWorkerUrl: function(workerId, label) {
        return `data:text/javascript;charset=utf-8,${encodeURIComponent(`
                self.MonacoEnvironment = { baseUrl: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.29.1/min/" };
                importScripts("https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.29.1/min/vs/base/worker/workerMain.min.js");`)}`;
      }
    };
    __require(["vs/editor/editor.main"], function() {
      const cm = monaco.editor.create(document.getElementById("editor"), {
        theme: "vs-dark",
        folding: false,
        minimap: { enabled: false },
        language: "javascript",
        value: "// code goes here\n"
      });
      monaco.languages.typescript.javascriptDefaults.addExtraLib(typeDeclarations);
      const reset = function() {
        cm.setValue($("#default-elev-implementation").text().trim());
      };
      const saveCode = function() {
        localStorage.setItem(lsKey, cm.getValue());
        $("#save_message").text("Code saved " + (/* @__PURE__ */ new Date()).toTimeString());
        returnObj.trigger("change");
      };
      const existingCode = localStorage.getItem(lsKey);
      if (existingCode) {
        cm.setValue(existingCode);
      } else {
        reset();
      }
      $("#button_save").click(function() {
        saveCode();
        cm.focus();
      });
      $("#button_reset").click(function() {
        if (confirm("Do you really want to reset to the default implementation?")) {
          localStorage.setItem("develevateBackupCode", cm.getValue());
          reset();
        }
        cm.focus();
      });
      $("#button_resetundo").click(function() {
        if (confirm("Do you want to bring back the code as before the last reset?")) {
          cm.setValue(localStorage.getItem("develevateBackupCode") || "");
        }
        cm.focus();
      });
      const returnObj = (0, import_observable7.default)({});
      const autoSaver = (0, import_debounce.default)(saveCode, 1e3);
      cm.onDidChangeModelContent = autoSaver;
      returnObj.getCodeObj = function() {
        console.log("Getting code...");
        const code2 = cm.getValue();
        let obj2;
        try {
          obj2 = getCodeObjFromCode(code2);
          returnObj.trigger("code_success");
        } catch (e) {
          returnObj.trigger("usercode_error", e);
          return null;
        }
        return obj2;
      };
      returnObj.setCode = function(code2) {
        cm.setValue(code2);
      };
      returnObj.getCode = function() {
        return cm.getValue();
      };
      returnObj.setDevTestCode = function() {
        cm.setValue($("#devtest-elev-implementation").text().trim());
      };
      $("#button_apply").click(function() {
        returnObj.trigger("apply_code");
      });
      resolve(returnObj);
    });
  });
  var createParamsUrl = function(current, overrides) {
    return "#" + (0, import_map4.default)((0, import_merge.default)(current, overrides), function(val, key) {
      return key + "=" + val;
    }).join(",");
  };
  $(function() {
    const tsKey = "elevatorTimeScale";
    createEditorAsync().then((editor) => {
      let params = {};
      const $world = $(".innerworld");
      const $stats = $(".statscontainer");
      const $feedback = $(".feedbackcontainer");
      const $challenge = $(".challenge");
      const $codestatus = $(".codestatus");
      const sim = new Simulation({
        editor,
        challenges,
        clearAll,
        presentStats,
        presentChallenge,
        presentWorld,
        presentFeedback,
        templates: {
          floorTempl: document.getElementById("floor-template").innerHTML.trim(),
          elevatorTempl: document.getElementById("elevator-template").innerHTML.trim(),
          elevatorButtonTempl: document.getElementById("elevatorbutton-template").innerHTML.trim(),
          userTempl: document.getElementById("user-template").innerHTML.trim(),
          challengeTempl: document.getElementById("challenge-template").innerHTML.trim(),
          feedbackTempl: document.getElementById("feedback-template").innerHTML.trim(),
          codeStatusTempl: document.getElementById("codestatus-template").innerHTML.trim()
        },
        params,
        createParamsUrl,
        tsKey,
        $world,
        $feedback,
        $stats,
        $challenge
      });
      editor.on("apply_code", function() {
        sim.startChallenge(sim.currentChallengeIndex, true);
      });
      editor.on("code_success", function() {
        presentCodeStatus($codestatus, codeStatusTempl);
      });
      editor.on("usercode_error", function(error) {
        presentCodeStatus($codestatus, codeStatusTempl, error);
      });
      editor.on("change", function() {
        $("#fitness_message").addClass("faded");
      });
      editor.trigger("change");
      createRoute(function(path) {
        params = (0, import_reduce3.default)(
          path.split(","),
          function(result, p) {
            const match2 = p.match(/(\w+)=(\w+$)/);
            if (match2) {
              result[match2[1]] = match2[2];
            }
            return result;
          },
          {}
        );
        let requestedChallenge = 0;
        let autoStart = false;
        let timeScale = parseFloat(localStorage.getItem(tsKey)) || 2;
        (0, import_each3.default)(params, function(val, key) {
          if (key === "challenge") {
            requestedChallenge = (0, import_parseInt.default)(val) - 1;
            if (requestedChallenge < 0 || requestedChallenge >= challenges.length) {
              console.log("Invalid challenge index", requestedChallenge);
              console.log("Defaulting to first challenge");
              requestedChallenge = 0;
            }
          } else if (key === "autostart") {
            autoStart = val === "false" ? false : true;
          } else if (key === "timescale") {
            timeScale = parseFloat(val);
          } else if (key === "devtest") {
            editor.setDevTestCode();
          } else if (key === "fullscreen") {
            makeDemoFullscreen();
          }
        });
        sim.worldController.setTimeScale(timeScale);
        sim.startChallenge(requestedChallenge, autoStart);
      });
    });
  });
})();
/*! Bundled license information:

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
