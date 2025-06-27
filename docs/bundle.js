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

  // node_modules/riot-observable/dist/observable.js
  var require_observable = __commonJS({
    'node_modules/riot-observable/dist/observable.js'(exports, module) {
      (function (window2, undefined2) {
        var observable2 = function (el) {
          el = el || {};
          var callbacks = {},
            slice = Array.prototype.slice;
          Object.defineProperties(el, {
            /**
             * Listen to the given `event` ands
             * execute the `callback` each time an event is triggered.
             * @param  { String } event - event id
             * @param  { Function } fn - callback function
             * @returns { Object } el
             */
            on: {
              value: function (event, fn) {
                if (typeof fn == 'function') (callbacks[event] = callbacks[event] || []).push(fn);
                return el;
              },
              enumerable: false,
              writable: false,
              configurable: false,
            },
            /**
             * Removes the given `event` listeners
             * @param   { String } event - event id
             * @param   { Function } fn - callback function
             * @returns { Object } el
             */
            off: {
              value: function (event, fn) {
                if (event == '*' && !fn) callbacks = {};
                else {
                  if (fn) {
                    var arr = callbacks[event];
                    for (var i = 0, cb; (cb = arr && arr[i]); ++i) {
                      if (cb == fn) arr.splice(i--, 1);
                    }
                  } else delete callbacks[event];
                }
                return el;
              },
              enumerable: false,
              writable: false,
              configurable: false,
            },
            /**
             * Listen to the given `event` and
             * execute the `callback` at most once
             * @param   { String } event - event id
             * @param   { Function } fn - callback function
             * @returns { Object } el
             */
            one: {
              value: function (event, fn) {
                function on() {
                  el.off(event, on);
                  fn.apply(el, arguments);
                }
                return el.on(event, on);
              },
              enumerable: false,
              writable: false,
              configurable: false,
            },
            /**
             * Execute all callback functions that listen to
             * the given `event`
             * @param   { String } event - event id
             * @returns { Object } el
             */
            trigger: {
              value: function (event) {
                var arglen = arguments.length - 1,
                  args = new Array(arglen),
                  fns,
                  fn,
                  i;
                for (i = 0; i < arglen; i++) {
                  args[i] = arguments[i + 1];
                }
                fns = slice.call(callbacks[event] || [], 0);
                for (i = 0; (fn = fns[i]); ++i) {
                  fn.apply(el, args);
                }
                if (callbacks['*'] && event != '*') el.trigger.apply(el, ['*', event].concat(args));
                return el;
              },
              enumerable: false,
              writable: false,
              configurable: false,
            },
          });
          return el;
        };
        if (typeof exports === 'object') module.exports = observable2;
        else if (typeof define === 'function' && define.amd)
          define(function () {
            return observable2;
          });
        else window2.observable = observable2;
      })(typeof window != 'undefined' ? window : void 0);
    },
  });

  // src/app.js
  var import_riot_observable = __toESM(require_observable(), 1);
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
        var returnObj = (0, import_riot_observable.default)({});
        var autoSaver = _.debounce(saveCode, 1e3);
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
      _.map(_.merge(current, overrides), function (val, key) {
        return key + '=' + val;
      }).join(',')
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
      var app = (0, import_riot_observable.default)({});
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
      (void 0)(function (path) {
        params = _.reduce(
          path.split(','),
          function (result, p) {
            var match = p.match(/(\w+)=(\w+$)/);
            if (match) {
              result[match[1]] = match[2];
            }
            return result;
          },
          {}
        );
        var requestedChallenge = 0;
        var autoStart = false;
        var timeScale = parseFloat(localStorage.getItem(tsKey)) || 2;
        _.each(params, function (val, key) {
          if (key === 'challenge') {
            requestedChallenge = _.parseInt(val) - 1;
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
//# sourceMappingURL=bundle.js.map
