# base.js

This file provides utility functions and polyfills used throughout the Elevator Saga codebase.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- END doctoc generated TOC please keep comment here to allow auto update -->

**Key Features:**

- Console shim for environments without a console.
- Utility math functions: `limitNumber`, `epsilonEquals`, `sign` (with polyfill for `Math.sign`).
- Deprecation warning helper.
- Type guard for constructor enforcement.
- Helper for creating boolean property passthrough functions with event triggering.
- Physics helpers for elevator movement calculations.
- Frame requester for simulation/testing without animation frames.
- `getCodeObjFromCode`: Evaluates user code and ensures it has required `init` and `update` functions.

**Exports:**

- `createBoolPassthroughFunction`, `createFrameRequester`, `epsilonEquals`, `getCodeObjFromCode`, `limitNumber`,
  `newGuard`
