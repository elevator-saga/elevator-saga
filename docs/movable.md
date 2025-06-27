# movable.js

Defines the `Movable` class and interpolation helpers for objects that can move in the simulation.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- END doctoc generated TOC please keep comment here to allow auto update -->

**Key Features:**

- `Movable` is a base class for all moving entities (elevators, users).
- Handles position, parent/child relationships, and world coordinates.
- Provides methods for moving instantly, over time, or with interpolation.
- Supports busy state, waiting, and task management for animations.
- Includes interpolation helpers: `linearInterpolate`, `powInterpolate`, `coolInterpolate`.

**Exports:**

- `Movable` (default), interpolation helpers
