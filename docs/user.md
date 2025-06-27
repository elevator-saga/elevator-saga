# user.js

Defines the `User` class, representing a person in the simulation who wants to use the elevator.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- END doctoc generated TOC please keep comment here to allow auto update -->

**Key Features:**

- Inherits from `Movable` for position and movement logic.
- Tracks user weight, current floor, destination, and state (done, removeMe).
- Handles appearing on floors, pressing floor buttons, and entering/exiting elevators.
- Moves to destination, triggers events on entering/exiting, and animates leaving.
- Used by the world to simulate elevator usage and waiting.

**Exports:**

- `User` (default)
