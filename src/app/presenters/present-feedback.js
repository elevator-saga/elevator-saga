import * as riot from 'riot';
import World from '../../models/world';

/**
 * Renders feedback content into the given parent element using a Riot template.
 *
 * @param {jQuery} $parent - The jQuery element to render the feedback into.
 * @param {string} feedbackTempl - The Riot template string for rendering feedback.
 * @param {World} world - The world object containing floor information.
 * @param {Array} world.floors - Array of floor objects.
 * @param {number} world.floorHeight - The height of each floor.
 * @param {string} title - The title to display in the feedback.
 * @param {string} message - The message to display in the feedback.
 * @param {string} [url] - Optional URL to include in the feedback. If not provided, any anchor tags are removed.
 */
export function presentFeedback($parent, feedbackTempl, world, title, message, url) {
  $parent.html(
    riot.render(feedbackTempl, {
      title: title,
      message: message,
      url: url,
      paddingTop: world.floors.length * world.floorHeight * 0.2,
    })
  );
  if (!url) {
    $parent.find('a').remove();
  }
}
