import observable from '@riotjs/observable';
import debounce from 'lodash/debounce';
import { getCodeObjFromCode } from '../models/utils';
import { typeDeclarations } from './types';

/**
 * Asynchronously creates and initializes a Monaco code editor instance with custom configuration,
 * including loading type declarations, handling code persistence via localStorage, and providing
 * UI controls for saving, resetting, and undoing code changes. Returns an observable object with
 * methods for interacting with the editor and code.
 *
 * @function
 * @returns {Promise<Object>} A promise that resolves to an observable object with methods:
 *   - getCodeObj(): Parses and returns the current code as an object, triggering events on success or error.
 *   - setCode(code: string): Sets the editor's content to the provided code.
 *   - getCode(): Returns the current code from the editor.
 *   - setDevTestCode(): Sets the editor's content to the developer test implementation.
 *   - Triggers events such as 'change', 'code_success', 'usercode_error', and 'apply_code'.
 *
 * @example
 * createEditorAsync().then(editor => {
 *   editor.setCode('// new code');
 *   const codeObj = editor.getCodeObj();
 * });
 */
export function createEditorAsync() {
  return new Promise((resolve, reject) => {
    const lsKey = 'elevatorCrushCode_v5';

    // Load Monaco Editor from CDN
    require.config({
      paths: { vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.29.1/min/vs/' },
    });
    window.MonacoEnvironment = {
      getWorkerUrl: function (workerId, label) {
        return `data:text/javascript;charset=utf-8,${encodeURIComponent(`
                self.MonacoEnvironment = { baseUrl: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.29.1/min/" };
                importScripts("https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.29.1/min/vs/base/worker/workerMain.min.js");`)}`;
      },
    };

    require(['vs/editor/editor.main'], function () {
      // Create the editor with some sample JavaScript code
      const cm = monaco.editor.create(document.getElementById('editor'), {
        theme: 'vs-dark',
        folding: false,
        minimap: { enabled: false },
        language: 'javascript',
        value: '// code goes here\n',
      });

      // Add type declarations
      monaco.languages.typescript.javascriptDefaults.addExtraLib(typeDeclarations);

      // Original setup code
      const reset = function () {
        cm.setValue($('#default-elev-implementation').text().trim());
      };
      const saveCode = function () {
        localStorage.setItem(lsKey, cm.getValue());
        $('#save_message').text('Code saved ' + new Date().toTimeString());
        returnObj.emit('change');
      };

      const existingCode = localStorage.getItem(lsKey);
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

      const returnObj = observable({});
      const autoSaver = debounce(saveCode, 1000);
      cm.onDidChangeModelContent = autoSaver;

      returnObj.getCodeObj = function () {
        console.log('Getting code...');
        const code = cm.getValue();
        let obj;
        try {
          obj = getCodeObjFromCode(code);
          returnObj.emit('code_success');
        } catch (e) {
          returnObj.emit('usercode_error', e);
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
        returnObj.emit('apply_code');
      });

      resolve(returnObj);
    });
  });
}
