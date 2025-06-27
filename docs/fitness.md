# fitness.js

Implements the fitness evaluation system for user code in Elevator Saga.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- END doctoc generated TOC please keep comment here to allow auto update -->

**Key Features:**

- Defines `fitnessChallenges` for different simulation scenarios.
- Provides `calculateFitness` to run a simulation and collect performance metrics.
- `doFitnessSuite` runs multiple simulations and averages results.
- `fitnessSuite` runs fitness tests, optionally using a Web Worker for async evaluation.
- Used to provide feedback on user code performance (wait times, users transported, etc).

**Exports:**

- `fitnessSuite`, `doFitnessSuite`, `calculateFitness`, `fitnessChallenges`, and helpers
