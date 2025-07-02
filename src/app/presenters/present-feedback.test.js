import { presentFeedback } from './present-feedback';
import { renderTemplate } from './render-template';

jest.mock('./render-template', () => ({
  __esModule: true,
  renderTemplate: jest.fn((templ, data) => templ),
}));

describe('presentFeedback', () => {
  let $parent;
  let feedbackTempl;
  let world;

  beforeEach(() => {
    $parent = {
      html: jest.fn(),
      find: jest.fn().mockReturnThis(),
      remove: jest.fn(),
    };
    feedbackTempl = '<div>{title} {message} <a href="{url}">link</a></div>';
    world = {
      floors: [{}, {}, {}],
      floorHeight: 10,
    };
    renderTemplate.mockClear();
    $parent.html.mockClear();
    $parent.find.mockClear();
    $parent.remove.mockClear();
  });

  it('renders feedback with correct parameters and calls html', () => {
    // Arrange
    renderTemplate.mockReturnValue('<div>output</div>');

    // Act
    presentFeedback($parent, feedbackTempl, world, 'Test Title', 'Test Message', 'http://example.com');

    // Assert
    expect(renderTemplate).toHaveBeenCalledWith(feedbackTempl, {
      title: 'Test Title',
      message: 'Test Message',
      url: 'http://example.com',
      paddingTop: 3 * 10 * 0.2,
    });
    expect($parent.html).toHaveBeenCalledWith('<div>output</div>');
    expect($parent.find).not.toHaveBeenCalled();
  });

  it('removes anchor tags if url is not provided', () => {
    // Arrange
    renderTemplate.mockReturnValue('<div>output</div>');

    // Act
    presentFeedback($parent, feedbackTempl, world, 'No URL', 'No URL Message');

    // Assert
    expect(renderTemplate).toHaveBeenCalledWith(feedbackTempl, {
      title: 'No URL',
      message: 'No URL Message',
      url: undefined,
      paddingTop: 3 * 10 * 0.2,
    });
    expect($parent.html).toHaveBeenCalledWith('<div>output</div>');
    expect($parent.find).toHaveBeenCalledWith('a');
    // Since find returns $parent itself, remove should be called
    expect($parent.remove).toHaveBeenCalled();
  });

  it('handles empty floors array', () => {
    // Arrange
    world.floors = [];
    renderTemplate.mockReturnValue('<div>output</div>');

    // Act
    presentFeedback($parent, feedbackTempl, world, 'Empty', 'No Floors', 'http://example.com');

    // Assert
    expect(renderTemplate).toHaveBeenCalledWith(feedbackTempl, {
      title: 'Empty',
      message: 'No Floors',
      url: 'http://example.com',
      paddingTop: 0,
    });
    expect($parent.html).toHaveBeenCalledWith('<div>output</div>');
  });
});
