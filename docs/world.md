# world.js

Defines the world simulation logic and world controller for Elevator Saga.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- END doctoc generated TOC please keep comment here to allow auto update -->

**Key Features:**

- `createWorldCreator`: Factory for creating floors, elevators, users, and the world object.
- `createWorld`: Sets up the simulation world with all entities and event bindings.
- Handles user spawning, elevator/floor/user event wiring, and stats calculation.
- Provides main update loop for simulation and display updates.
- `createWorldController`: Manages simulation timing, pausing, timescale, and user code execution.
- Handles user code errors and challenge state.

**Exports:**

- `createWorldController`, `createWorldCreator`
