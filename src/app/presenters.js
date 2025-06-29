import each from 'lodash/each';
import map from 'lodash/map';
import * as riot from 'riot';
import User from '../models/user';
import World from '../models/world';

/**
 * Removes all child elements from each element in the provided collection.
 *
 * @param {jQuery[]} $elems - An array or collection of jQuery elements to be cleared.
 */
export function clearAll($elems) {
  each($elems, function ($elem) {
    $elem.empty();
  });
}

/**
 * Sets the CSS transform property of an element to position it at the specified (x, y) coordinates,
 * including a translateZ(0) for hardware acceleration. Applies vendor prefixes for compatibility.
 *
 * @param {HTMLElement} elem - The DOM element to transform.
 * @param {number} x - The x-coordinate in pixels to translate the element to.
 * @param {number} y - The y-coordinate in pixels to translate the element to.
 */
export function setTransformPos(elem, x, y) {
  const style = 'translate(' + x + 'px,' + y + 'px) translateZ(0)';
  elem.style.transform = style;
  elem.style['-ms-transform'] = style;
  elem.style['-webkit-transform'] = style;
}

/**
 * Updates the visual state of a user element based on the user's current state.
 *
 * @param {jQuery} $user - The jQuery-wrapped DOM element representing the user.
 * @param {HTMLElement} elem_user - The raw DOM element for the user.
 * @param {User} user - The user object containing state and position.
 * @param {number} user.worldX - The X coordinate of the user in the world.
 * @param {number} user.worldY - The Y coordinate of the user in the world.
 * @param {boolean} user.done - Whether the user has completed their action.
 */
export function updateUserState($user, elem_user, user) {
  setTransformPos(elem_user, user.worldX, user.worldY);
  if (user.done) {
    $user.addClass('leaving');
  }
}

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
 *   @function world.trigger - Triggers an event.
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
  world.trigger('stats_display_changed');
}

/**
 * Renders and initializes the challenge UI in the given parent element.
 *
 * @param {jQuery} $parent - The parent jQuery element where the challenge UI will be rendered.
 * @param {Object} challenge - The challenge data object.
 * @param {Object} app - The main application object, providing control methods.
 * @param {World} world - The current world state object.
 * @param {Object} worldController - Controller for managing world state and time scale.
 * @param {number} challengeNum - The current challenge number.
 * @param {string} challengeTempl - The Riot.js template string for rendering the challenge UI.
 */
export function presentChallenge($parent, challenge, app, world, worldController, challengeNum, challengeTempl) {
  const $challenge = $(
    riot.render(challengeTempl, {
      challenge: challenge,
      num: challengeNum,
      timeScale: worldController.timeScale.toFixed(0) + 'x',
      startButtonText: world.challengeEnded
        ? "<i class='fa fa-repeat'></i> Restart"
        : worldController.isPaused
          ? 'Start'
          : 'Pause',
    })
  );
  $parent.html($challenge);

  $parent.find('.startstop').on('click', function () {
    app.startStopOrRestart();
  });
  $parent.find('.timescale_increase').on('click', function (e) {
    e.preventDefault();
    if (worldController.timeScale < 40) {
      const timeScale = Math.round(worldController.timeScale * 1.618);
      worldController.setTimeScale(timeScale);
    }
  });
  $parent.find('.timescale_decrease').on('click', function (e) {
    e.preventDefault();
    const timeScale = Math.round(worldController.timeScale / 1.618);
    worldController.setTimeScale(timeScale);
  });
}

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

/**
 * Renders and manages the interactive world view for the elevator simulation.
 *
 * @param {jQuery} $world - The jQuery element representing the world container.
 * @param {World} world - The world model containing floors, elevators, and related state.
 * @param {string} floorTempl - Riot.js template string for rendering a floor.
 * @param {string} elevatorTempl - Riot.js template string for rendering an elevator.
 * @param {string} elevatorButtonTempl - Riot.js template string for rendering elevator buttons.
 * @param {string} userTempl - Riot.js template string for rendering a user.
 *
 * @fires floor#buttonstate_change - When a floor's up/down button state changes.
 * @fires elevator#new_display_state - When an elevator's position should be updated.
 * @fires elevator#new_current_floor - When an elevator's current floor changes.
 * @fires elevator#floor_buttons_changed - When an elevator's floor button states change.
 * @fires elevator#indicatorstate_change - When an elevator's up/down indicator state changes.
 * @fires world#new_user - When a new user is added to the world.
 * @fires user#new_display_state - When a user's display state should be updated.
 * @fires user#removed - When a user is removed from the world.
 */
export function presentWorld($world, world, floorTempl, elevatorTempl, elevatorButtonTempl, userTempl) {
  $world.css('height', world.floorHeight * world.floors.length);

  $world.append(
    map(world.floors, function (f) {
      const $floor = $(riot.render(floorTempl, f));
      const $up = $floor.find('.up');
      const $down = $floor.find('.down');
      f.on('buttonstate_change', function (buttonStates) {
        $up.toggleClass('activated', buttonStates.up !== '');
        $down.toggleClass('activated', buttonStates.down !== '');
      });
      $up.on('click', function () {
        f.pressUpButton();
      });
      $down.on('click', function () {
        f.pressDownButton();
      });
      return $floor;
    })
  );
  $world.find('.floor').first().find('.down').addClass('invisible');
  $world.find('.floor').last().find('.up').addClass('invisible');

  function renderElevatorButtons(states) {
    // This is a rarely executed inner-inner loop, does not need efficiency
    return map(states, function (b, i) {
      return riot.render(elevatorButtonTempl, { floorNum: i });
    }).join('');
  }

  function setUpElevator(e) {
    const $elevator = $(riot.render(elevatorTempl, { e: e }));
    const elem_elevator = $elevator.get(0);
    $elevator.find('.buttonindicator').html(renderElevatorButtons(e.buttonStates));
    const $buttons = map($elevator.find('.buttonindicator').children(), function (c) {
      return $(c);
    });
    const elem_floorindicator = $elevator.find('.floorindicator > span').get(0);

    $elevator.on('click', '.buttonpress', function () {
      e.pressFloorButton(parseInt($(this).text()));
    });
    e.on('new_display_state', function updateElevatorPosition() {
      setTransformPos(elem_elevator, e.worldX, e.worldY);
    });
    e.on('new_current_floor', function update_current_floor(floor) {
      elem_floorindicator.textContent = floor;
    });
    e.on('floor_buttons_changed', function update_floor_buttons(states, indexChanged) {
      $buttons[indexChanged].toggleClass('activated', states[indexChanged]);
    });
    e.on('indicatorstate_change', function indicatorstate_change(indicatorStates) {
      $elevator.find('.up').toggleClass('activated', indicatorStates.up);
      $elevator.find('.down').toggleClass('activated', indicatorStates.down);
    });
    e.trigger('new_state', e);
    e.trigger('new_display_state', e);
    e.trigger('new_current_floor', e.currentFloor);
    return $elevator;
  }

  $world.append(
    map(world.elevators, function (e) {
      return setUpElevator(e);
    })
  );

  world.on('new_user', function (user) {
    const $user = $(riot.render(userTempl, { u: user, state: user.done ? 'leaving' : '' }));
    const elem_user = $user.get(0);

    user.on('new_display_state', function () {
      updateUserState($user, elem_user, user);
    });
    user.on('removed', function () {
      $user.remove();
    });
    $world.append($user);
  });
}

/**
 * Renders the code status (success or error) into the given parent element using the provided template.
 *
 * @param {Object} $parent - The parent element (jQuery-like object) where the status will be rendered.
 * @param {string} templ - The Riot.js template string used for rendering the status.
 * @param {Error|string|null} error - The error object or message to display. If null or falsy, success is shown.
 */
export function presentCodeStatus($parent, templ, error) {
  console.log(error);
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

/**
 * Sets the demo view to fullscreen by hiding all elements inside the container
 * except for the element with the class 'world', and adjusts the layout styles
 * of the HTML, body, container, and 'world' elements to occupy the full viewport.
 */
export function makeDemoFullscreen() {
  $('body .container > *').not('.world').css('visibility', 'hidden');
  $('html, body, body .container, .world').css({ width: '100%', margin: '0', padding: 0 });
}
