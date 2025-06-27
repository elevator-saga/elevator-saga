# floor.js

Defines the `asFloor` function, which creates observable floor objects for the simulation.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- END doctoc generated TOC please keep comment here to allow auto update -->

**Key Features:**

- Each floor tracks its level, position, and button states (up/down).
- Provides methods for pressing up/down buttons, handling elevator arrivals, and getting spawn positions.
- Emits events for button state changes and button presses.
- Used by the world creator to instantiate all floors in the simulation.

**Exports:**

- `asFloor` (default)
