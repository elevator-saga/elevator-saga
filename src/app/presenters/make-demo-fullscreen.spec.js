import { makeDemoFullscreen } from './make-demo-fullscreen';

describe('makeDemoFullscreen', () => {
  // let $;
  let container, world, other1, other2, html, body;

  // beforeAll(() => {
  //   // Mock global $ as jQuery
  //   $ = global.$ = require('jquery')(require('jsdom').jsdom().defaultView);
  // });

  beforeEach(() => {
    // Set up DOM structure
    document.body.innerHTML = `
      <html>
        <body>
          <div class="container">
            <div class="world"></div>
            <div class="other1"></div>
            <div class="other2"></div>
          </div>
        </body>
      </html>
    `;
    html = $('html');
    body = $('body');
    container = $('.container');
    world = $('.world');
    other1 = $('.other1');
    other2 = $('.other2');
  });

  it('hides all container children except .world', () => {
    makeDemoFullscreen();
    expect(other1.css('visibility')).toBe('hidden');
    expect(other2.css('visibility')).toBe('hidden');
    expect(world.css('visibility')).not.toBe('hidden');
  });

  it('sets width, margin, and padding styles to 100%, 0, 0 on html, body, container, and .world', () => {
    makeDemoFullscreen();
    [html, body, container, world].forEach(($el) => {
      expect($el.css('width')).toBe('100%');
      expect($el.css('margin')).toBe('0px');
      expect($el.css('padding')).toBe('0px');
    });
  });
});
