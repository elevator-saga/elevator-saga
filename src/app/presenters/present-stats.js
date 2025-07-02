import World from '../../models/world';

/**
 * Updates the statistics display elements within the given parent element based on the current state of the world object.
 *
 * @param {jQuery} $parent - The jQuery-wrapped parent element containing the stats display elements.
 * @param {World} world - The world object that emits 'stats_display_changed' events and contains statistics properties:
 *   @param {number} world.transportedCounter - The total number of transported passengers.
 *   @param {number} world.elapsedTime - The elapsed time in seconds.
 *   @param {number} world.transportedPerSec - The number of passengers transported per second.
 *   @param {number} world.avgWaitTime - The average wait time in seconds.
 *   @param {number} world.maxWaitTime - The maximum wait time in seconds.
 *   @param {number} world.moveCount - The total number of moves made.
 *   @function world.on - Registers an event listener.
 *   @function world.emit - Triggers an event.
 */
export function presentStats($parent, world) {
  const elem_transportedcounter = $parent.find('.transportedcounter').get(0),
    elem_elapsedtime = $parent.find('.elapsedtime').get(0),
    elem_transportedpersec = $parent.find('.transportedpersec').get(0),
    elem_avgwaittime = $parent.find('.avgwaittime').get(0),
    elem_maxwaittime = $parent.find('.maxwaittime').get(0),
    elem_movecount = $parent.find('.movecount').get(0);

  world.on('stats_display_changed', function updateStats() {
    elem_transportedcounter.textContent = world.transportedCounter;
    elem_elapsedtime.textContent = world.elapsedTime.toFixed(0) + 's';
    elem_transportedpersec.textContent = world.transportedPerSec.toPrecision(3);
    elem_avgwaittime.textContent = world.avgWaitTime.toFixed(1) + 's';
    elem_maxwaittime.textContent = world.maxWaitTime.toFixed(1) + 's';
    elem_movecount.textContent = world.moveCount;
  });
  world.emit('stats_display_changed');
}
