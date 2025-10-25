// in src/managers/spawnManager.ts

import { Logger } from "../utils/logger.js";
import type { CreepRole } from "../types.js";

// --- Spawn Configuration ---

// Define our "do-everything" bootstrap creep
const BOOTSTRAP_ROLE: CreepRole = "builder";
const MIN_BOOTSTRAP_CREEPS = 2; // Keep at least this many alive

// Define other roles as we add them
// const HARVESTER_ROLE: CreepRole = "harvester";
// const HARVESTER_BODY: BodyPartConstant[] = [WORK, WORK, CARRY, MOVE]; // 300 energy
// const MIN_HARVESTERS = 2;

export class SpawnManager {
  /**
   * Runs the logic for a single spawn.
   * This is called by the roomManager for each spawn in the room.
   */
  public static run(spawn: StructureSpawn): void {
    if (spawn.spawning) {
      // Display spawning creep info
      const spawningCreep = Game.creeps[spawn.spawning.name];
      if (spawningCreep) {
        spawn.room.visual.text(
            `🛠️ ${spawningCreep.memory.role}`,
            spawn.pos.x + 1,
            spawn.pos.y,
            {align: 'left', opacity: 0.8}
        );
      }
      return; // Don't try to spawn if already spawning
    }

    // --- Spawn Logic ---
    // At the start, we only care about bootstrap creeps.
    // We count *only* the bootstrap creeps assigned to this room.
    let bootstrapCreepsInRoom = 0;
    for (const name in Game.creeps) {
      const creep = Game.creeps[name];
      if (!creep) continue;
      if (creep.memory.role === BOOTSTRAP_ROLE && creep.memory.room === spawn.room.name) {
        bootstrapCreepsInRoom++;
      }
    }

    // Build a target body based on the room's energy capacity (not current energy)
    const targetBody = this.getBodyForRole(BOOTSTRAP_ROLE, spawn.room.energyCapacityAvailable);
    const bodyCost = targetBody.reduce((cost, part) => cost + BODYPART_COST[part], 0);

    // If the spawn currently has enough energy (has naturally recharged) and fewer than our
    // minimum required bootstrap creeps, attempt to spawn the capacity-appropriate body.
    if (spawn.room.energyAvailable >= bodyCost && bootstrapCreepsInRoom < MIN_BOOTSTRAP_CREEPS) {
      this.trySpawnCreep(spawn, BOOTSTRAP_ROLE, targetBody);
      return; // Stop here, spawning is handled
    }

    // --- Add future spawn logic here ---
    // This is where you'll add your logic for dedicated harvesters, haulers, etc.
    // once your bootstrap creeps have built a container.
    //
    // Example:
    // const harvestersInRoom = /* ... count harvesters ... */;
    // if (harvestersInRoom < MIN_HARVESTERS) {
    //   this.trySpawnCreep(spawn, "harvester", HARVESTER_BODY);
    //   return;
    // }
  }

  /**
   * Build a body for a role based on the room's energy capacity.
   * This focuses on useful builder bodies for bootstrap and scales with capacity.
   */
  private static getBodyForRole(role: CreepRole, capacity: number): BodyPartConstant[] {
    switch (role) {
      case "builder": {
        // Ensure at least one CARRY and one MOVE. Allocate remaining energy to WORK parts.
        const reserve = 50 + 50; // one CARRY + one MOVE
        const remaining = Math.max(0, capacity - reserve);
        const workCount = Math.max(1, Math.floor(remaining / 100));

        const body: BodyPartConstant[] = [];
        for (let i = 0; i < workCount; i++) body.push(WORK);
        body.push(CARRY);
        body.push(MOVE);
        return body;
      }
      default:
        // Fallback to a small general-purpose body
        return [WORK, CARRY, MOVE];
    }
  }

  /**
   * Attempts to spawn a creep with the given role and body.
   * This is now type-safe, expecting a CreepRole.
   */
  private static trySpawnCreep(spawn: StructureSpawn, role: CreepRole, body: BodyPartConstant[]): ScreepsReturnCode {
    const newName = `${role}_${Game.time}`;

    // Create the full, type-safe CreepMemory object
    const memory: CreepMemory = {
      role: role,
      type: "economy", // All creeps from this manager are economy
      room: spawn.room.name, // Assign creep to this spawn's room
      working: false, // Start all creeps in "harvesting" state
      target: undefined // No target to start
    };

    // Attempt to spawn
    const result = spawn.spawnCreep(body, newName, {
      memory: memory
    });

    // Log the result
    if (result === OK) {
      Logger.info(`Spawning new ${role}: ${newName} in ${spawn.room.name}`);
    } else if (result !== ERR_NOT_ENOUGH_ENERGY && result !== ERR_BUSY) {
      // Log errors that aren't routine (like not enough energy)
      Logger.error(`Failed to spawn ${role} in ${spawn.room.name}: ${result}`);
    }
    return result;
  }
}
