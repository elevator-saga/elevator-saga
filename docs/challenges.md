# challenges.js

Defines the set of game challenges and the logic for evaluating challenge completion in Elevator Saga.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- END doctoc generated TOC please keep comment here to allow auto update -->

**Key Features:**

- Challenge condition factories for different win/lose criteria:
  - `requireUserCountWithinTime`
  - `requireUserCountWithMaxWaitTime`
  - `requireUserCountWithinTimeWithMaxWaitTime`
  - `requireUserCountWithinMoves`
  - `requireDemo`
- Each condition returns a description and an `evaluate(world)` function.
- The `challenges` array defines all available game challenges, each with options and a condition.

**Exports:**

- `challenges`, all condition factory functions
