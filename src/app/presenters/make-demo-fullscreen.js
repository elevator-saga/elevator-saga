/**
 * Sets the demo view to fullscreen by hiding all elements inside the container
 * except for the element with the class 'world', and adjusts the layout styles
 * of the HTML, body, container, and 'world' elements to occupy the full viewport.
 */
export function makeDemoFullscreen() {
  $('body .container > *').not('.world').css('visibility', 'hidden');
  $('html, body, body .container, .world').css({ width: '100%', margin: '0', padding: 0 });
}
