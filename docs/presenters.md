# presenters.js

Contains functions for updating and rendering the UI in Elevator Saga.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- END doctoc generated TOC please keep comment here to allow auto update -->

**Key Features:**

- Functions to clear UI elements, set transform positions, and update user/elevator state in the DOM.
- Presents stats, challenges, feedback, world state, and code status in the UI.
- Handles event binding for UI controls (start, pause, timescale, etc).
- Integrates with Riot.js for template rendering.
- Provides a function to make the demo fullscreen.

**Exports:**

- `clearAll`, `makeDemoFullscreen`, `presentChallenge`, `presentCodeStatus`, `presentFeedback`, `presentStats`,
  `presentWorld`, `setTransformPos`, `updateUserState`
