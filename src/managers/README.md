# src/managers/

This folder contains the high-level "brains" of the colony. Each manager is responsible for a major system, such as `creepManager` (delegating tasks to creeps), `roomManager` (running room-level logic), and `spawnManager` (handling the spawn queue). The `main.ts` loop will initialize and run these managers every tick.
