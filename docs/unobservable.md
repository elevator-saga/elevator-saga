# unobservable.js

Implements a minimal observable/event system for use in the simulation and for Jest/Node compatibility.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- END doctoc generated TOC please keep comment here to allow auto update -->

**Key Features:**

- Defines `observable` function to add event methods to objects.
- Provides `on`, `off`, `one`, and `trigger` methods for event handling.
- Includes a `CustomArray` class for efficient event handler storage.
- Defines an `Observable` class for inheritance.
- Used as a lightweight alternative to Riot.js observable for testing and core logic.

**Exports:**

- `CustomArray`, `observable`, `Observable`
