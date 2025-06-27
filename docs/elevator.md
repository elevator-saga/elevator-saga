# elevator.js

Defines the `Elevator` class, which models the behavior and state of an elevator in the simulation.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- END doctoc generated TOC please keep comment here to allow auto update -->

**Key Features:**

- Inherits from `Movable` for position and movement logic.
- Handles elevator movement, acceleration, deceleration, and stopping at floors.
- Manages user slots, button states, and indicators (up/down).
- Provides methods for users entering/exiting, pressing floor buttons, and checking load factor.
- Emits events for state changes, button presses, floor arrivals, and indicator changes.
- Contains logic for determining suitable travel, approaching floors, and handling new states.

**Exports:**

- `Elevator` (default)
