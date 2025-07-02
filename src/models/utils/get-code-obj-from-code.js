/**
 * Parses a string of code into an object with `init` and `update` methods.
 * The code should be a valid JavaScript object literal or function.
 * @param {string} code - The code string to parse.
 * @returns {Object} - An object containing the parsed code with `init` and `update` methods.
 * @throws Will throw an error if the code does not contain `init` or `update` functions.
 */
export function getCodeObjFromCode(code) {
  if (code.trim().substr(0, 1) == '{' && code.trim().substr(-1, 1) == '}') {
    code = '(' + code + ')';
  }
  let obj = eval(code);

  if (typeof obj.init !== 'function') {
    throw 'Code must contain an init function';
  }

  if (typeof obj.update !== 'function') {
    throw 'Code must contain an update function';
  }

  return obj;
}
