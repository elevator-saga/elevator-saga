import * as riot from 'riot';

/**
 * Renders the code status (success or error) into the given parent element using the provided template.
 *
 * @param {Object} $parent - The parent element (jQuery-like object) where the status will be rendered.
 * @param {string} templ - The Riot.js template string used for rendering the status.
 * @param {Error|string|null} error - The error object or message to display. If null or falsy, success is shown.
 */
export function presentCodeStatus($parent, templ, error) {
  if (error) {
    console.log(error);
  }

  let errorDisplay = error ? 'block' : 'none';
  let successDisplay = error ? 'none' : 'block';
  let errorMessage = error;
  if (error && error.stack) {
    errorMessage = error.stack;
    errorMessage = errorMessage.replace(/\n/g, '<br>');
  }
  const status = riot.render(templ, {
    errorMessage: errorMessage,
    errorDisplay: errorDisplay,
    successDisplay: successDisplay,
  });
  $parent.html(status);
}
