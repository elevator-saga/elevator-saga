import * as riot from 'riot';
import { presentCodeStatus } from './present-code-status';

jest.mock('riot', () => ({
  render: jest.fn((templ, data) => templ),
}));

describe('presentCodeStatus', () => {
  let $parent;

  beforeEach(() => {
    $parent = { html: jest.fn() };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders success when error is null', () => {
    riot.render.mockReturnValue('<div>success</div>');
    presentCodeStatus($parent, 'template', null);

    expect(riot.render).toHaveBeenCalledWith('template', {
      errorMessage: null,
      errorDisplay: 'none',
      successDisplay: 'block',
    });
    expect($parent.html).toHaveBeenCalledWith('<div>success</div>');
  });

  it('renders error when error is a string', () => {
    riot.render.mockReturnValue('<div>error</div>');
    presentCodeStatus($parent, 'template', 'Some error');

    expect(riot.render).toHaveBeenCalledWith('template', {
      errorMessage: 'Some error',
      errorDisplay: 'block',
      successDisplay: 'none',
    });
    expect($parent.html).toHaveBeenCalledWith('<div>error</div>');
  });

  it('renders error with stack trace when error is an Error object', () => {
    riot.render.mockReturnValue('<div>error stack</div>');
    const error = new Error('Oops!');
    error.stack = 'Error: Oops!\n    at foo.js:1:1\n    at bar.js:2:2';

    presentCodeStatus($parent, 'template', error);

    expect(riot.render).toHaveBeenCalledWith('template', {
      errorMessage: 'Error: Oops!<br>    at foo.js:1:1<br>    at bar.js:2:2',
      errorDisplay: 'block',
      successDisplay: 'none',
    });
    expect($parent.html).toHaveBeenCalledWith('<div>error stack</div>');
  });

  it('renders success when error is falsy (undefined)', () => {
    riot.render.mockReturnValue('<div>success</div>');
    presentCodeStatus($parent, 'template', undefined);

    expect(riot.render).toHaveBeenCalledWith('template', {
      errorMessage: undefined,
      errorDisplay: 'none',
      successDisplay: 'block',
    });
    expect($parent.html).toHaveBeenCalledWith('<div>success</div>');
  });

  it('renders error when error is a truthy non-string, non-Error value', () => {
    riot.render.mockReturnValue('<div>error</div>');
    presentCodeStatus($parent, 'template', 123);

    expect(riot.render).toHaveBeenCalledWith('template', {
      errorMessage: 123,
      errorDisplay: 'block',
      successDisplay: 'none',
    });
    expect($parent.html).toHaveBeenCalledWith('<div>error</div>');
  });
});
