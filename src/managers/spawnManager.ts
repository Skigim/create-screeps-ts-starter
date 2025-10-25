// in src/managers/spawnManager.ts

import { Logger } from "../utils/logger.js";
import type { CreepRole } from "../types.js";

// Bootstrap configuration for RCL 1-2
const MIN_BOOTSTRAP_CREEPS = 2;

export class SpawnManager {
  /**
   * Runs the logic for a single spawn.
   * This is called by the roomManager for each spawn in the room.
   * @param spawn - The spawn structure to manage
   * @param quotas - The creep quotas calculated by roomManager
   */
  public static run(spawn: StructureSpawn, quotas: Partial<Record<CreepRole, number>>): void {
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

    // Count creeps by role for this room
    const counts: Partial<Record<CreepRole, number>> = {};
    for (const name in Game.creeps) {
      const creep = Game.creeps[name];
      if (!creep) continue;
      if (creep.memory.room === spawn.room.name) {
        const role = creep.memory.role;
        counts[role] = (counts[role] || 0) + 1;
      }
    }

    // RCL 1-2: Bootstrap phase - only spawn builders
    if (spawn.room.controller && spawn.room.controller.level <= 2) {
      // Only spawn bootstrap builders up to our minimum
      if ((counts.builder || 0) < MIN_BOOTSTRAP_CREEPS) {
        const body = this.getBodyForRole("builder", spawn.room.energyCapacityAvailable);
        const cost = body.reduce((sum: number, part: BodyPartConstant) => sum + BODYPART_COST[part], 0);
        if (spawn.room.energyAvailable >= cost) {
          this.trySpawnCreep(spawn, "builder", body);
          return;
        }
      }
    } else {
      // RCL 3+: Specialized roles based on quotas
      // Priority 1: Harvesters (critical for energy)
      if ((counts.harvester || 0) < (quotas.harvester || 0)) {
        const body = this.getBodyForRole("harvester", spawn.room.energyCapacityAvailable);
        const cost = body.reduce((sum: number, part: BodyPartConstant) => sum + BODYPART_COST[part], 0);
        if (spawn.room.energyAvailable >= cost) {
          this.trySpawnCreep(spawn, "harvester", body);
          return;
        }
      }

      // Priority 2: Builders (infrastructure)
      if ((counts.builder || 0) < (quotas.builder || 0)) {
        const body = this.getBodyForRole("builder", spawn.room.energyCapacityAvailable);
        const cost = body.reduce((sum: number, part: BodyPartConstant) => sum + BODYPART_COST[part], 0);
        if (spawn.room.energyAvailable >= cost) {
          this.trySpawnCreep(spawn, "builder", body);
          return;
        }
      }

      // Priority 3: Upgraders (RCL progression)
      if ((counts.upgrader || 0) < (quotas.upgrader || 0)) {
        const body = this.getBodyForRole("upgrader", spawn.room.energyCapacityAvailable);
        const cost = body.reduce((sum: number, part: BodyPartConstant) => sum + BODYPART_COST[part], 0);
        if (spawn.room.energyAvailable >= cost) {
          this.trySpawnCreep(spawn, "upgrader", body);
          return;
        }
      }

      // Priority 4: Haulers (when implemented)
      if ((counts.hauler || 0) < (quotas.hauler || 0)) {
        const body = this.getBodyForRole("hauler", spawn.room.energyCapacityAvailable);
        const cost = body.reduce((sum: number, part: BodyPartConstant) => sum + BODYPART_COST[part], 0);
        if (spawn.room.energyAvailable >= cost) {
          this.trySpawnCreep(spawn, "hauler", body);
          return;
        }
      }
    }
  }

  /**
   * Build a body for a role based on the room's energy capacity.
   * Uses static bodies for now, will be made smarter later.
   */
  private static getBodyForRole(role: CreepRole, capacity: number): BodyPartConstant[] {
    switch (role) {
      case "harvester":
        // Basic harvester: 2 WORK, 1 CARRY, 1 MOVE (300 energy)
        if (capacity >= 300) {
          return [WORK, WORK, CARRY, MOVE];
        }
        return [WORK, CARRY, MOVE]; // Fallback for low energy

      case "builder": {
        // Builder: Scale WORK parts based on capacity
        const reserve = 50 + 50; // one CARRY + one MOVE
        const remaining = Math.max(0, capacity - reserve);
        const workCount = Math.max(1, Math.floor(remaining / 100));

        const body: BodyPartConstant[] = [];
        for (let i = 0; i < workCount; i++) body.push(WORK);
        body.push(CARRY);
        body.push(MOVE);
        return body;
      }

      case "upgrader":
        // Basic upgrader: 1 WORK, 1 CARRY, 1 MOVE (200 energy)
        return [WORK, CARRY, MOVE];

      case "hauler":
        // Basic hauler: 2 CARRY, 1 MOVE (150 energy)
        return [CARRY, CARRY, MOVE];

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
