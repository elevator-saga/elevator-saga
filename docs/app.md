# app.js

This is the main entry point for the Elevator Saga web application. It initializes the code editor, sets up the UI, and
manages the main game loop and challenge logic.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- END doctoc generated TOC please keep comment here to allow auto update -->

**Key Features:**

- Loads and configures the Monaco code editor for user code input.
- Handles saving, resetting, and restoring user code from localStorage.
- Manages UI buttons for saving, resetting, and applying code.
- Integrates with the challenge system and world simulation.
- Handles routing for challenge selection and options via URL hash.
- Listens for and displays code errors and challenge feedback.
- Starts, pauses, and restarts challenges based on user interaction.
- Connects the editor, world, and presenters for a seamless user experience.

**Main Functions:**

- `createEditorAsync()`: Loads Monaco editor and sets up code management.
- `createParamsUrl()`: Generates URL hash for challenge state.
- Main jQuery document ready function: Sets up the app, world, and challenge logic, and binds UI events.

**Integration:**

- Uses modules: `challenges`, `presenters`, `types`, `world`.
- Relies on observable/event-driven architecture for UI and simulation updates.
