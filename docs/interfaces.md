# interfaces.js

Defines the `asElevatorInterface` function, which wraps elevator objects with a robust, event-driven interface for user
code.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- END doctoc generated TOC please keep comment here to allow auto update -->

**Key Features:**

- Provides a safe, observable interface to elevators for user code.
- Manages a destination queue and helper methods for queueing floor stops.
- Exposes elevator state, indicators, and events (idle, passing floor, stopped, button pressed).
- Handles event forwarding and error handling for user code.
- Used to abstract away direct elevator manipulation and provide a stable API.

**Exports:**

- `asElevatorInterface` (default)
