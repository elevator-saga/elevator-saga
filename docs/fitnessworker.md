# fitnessworker.js

Implements a Web Worker for running fitness evaluations in a separate thread.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- END doctoc generated TOC please keep comment here to allow auto update -->

**Key Features:**

- Loads required scripts for simulation and fitness evaluation.
- Listens for messages containing user code to test.
- Runs `doFitnessSuite` on the provided code and posts results back to the main thread.
- Used by `fitnessSuite` in `fitness.js` for async performance testing.

**Exports:**

- None (worker script)
