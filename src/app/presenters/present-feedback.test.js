import * as riot from 'riot';
import { presentFeedback } from './present-feedback';

jest.mock('riot', () => ({
  render: jest.fn(),
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
    riot.render.mockClear();
    $parent.html.mockClear();
    $parent.find.mockClear();
    $parent.remove.mockClear();
  });

  it('renders feedback with correct parameters and calls html', () => {
    // Arrange
    riot.render.mockReturnValue('<div>output</div>');

    // Act
    presentFeedback($parent, feedbackTempl, world, 'Test Title', 'Test Message', 'http://example.com');

    // Assert
    expect(riot.render).toHaveBeenCalledWith(feedbackTempl, {
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
    riot.render.mockReturnValue('<div>output</div>');

    // Act
    presentFeedback($parent, feedbackTempl, world, 'No URL', 'No URL Message');

    // Assert
    expect(riot.render).toHaveBeenCalledWith(feedbackTempl, {
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
    riot.render.mockReturnValue('<div>output</div>');

    // Act
    presentFeedback($parent, feedbackTempl, world, 'Empty', 'No Floors', 'http://example.com');

    // Assert
    expect(riot.render).toHaveBeenCalledWith(feedbackTempl, {
      title: 'Empty',
      message: 'No Floors',
      url: 'http://example.com',
      paddingTop: 0,
    });
    expect($parent.html).toHaveBeenCalledWith('<div>output</div>');
  });
});
