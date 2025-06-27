# world.js

Defines the world simulation logic and world controller for Elevator Saga.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- END doctoc generated TOC please keep comment here to allow auto update -->

**Key Features:**

- `createWorldCreator`: Factory for creating floors, elevators, users, and the world object.
  - Uses the `Floor` class (formerly `asFloor` function) for floor objects.
  - `createFloors`: Instantiates `Floor` objects for each floor, wiring up observable/event logic.
  - `createElevators`: Instantiates `Elevator` objects and positions them in the world.
  - `createRandomUser` and `spawnUserRandomly`: Create and place users with random attributes and destinations.
  - `createWorld`: Sets up the simulation world with all entities, event bindings, and stats tracking.
- Handles user spawning, elevator/floor/user event wiring, and stats calculation.
- Provides main update loop for simulation and display updates.
- `createWorldController`: Manages simulation timing, pausing, timescale, and user code execution.
  - Handles user code errors and challenge state.

**Exports:**

- `createWorldController`, `createWorldCreator`

**Notable Implementation Details:**

- The world object is observable and emits events for UI and simulation updates.
- The new `Floor` class is used for all floor objects, supporting event-driven button and elevator logic.
- All simulation entities (elevators, floors, users) are managed and updated in the main world update loop.
- The controller ensures user code is safely executed and errors are handled gracefully.
