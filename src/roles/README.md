# src/roles/

This folder defines the specific behavior for each creep role. Each file (e.g., `role.harvester.ts`) contains a `run(creep)` function that acts as a simple finite-state machine (FSM). The `creepManager` calls these functions based on a creep's `memory.role`.
