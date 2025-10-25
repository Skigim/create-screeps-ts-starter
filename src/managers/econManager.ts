// in src/managers/econManager.ts

// Import the role classes
import { RoleBuilder } from "../roles/role.builder.js";
import { RoleHarvester } from "../roles/role.harvester.js";
import { RoleUpgrader } from "../roles/role.upgrader.js";
import { RoleHauler } from "../roles/role.hauler.js";
import { Logger } from "../utils/logger.js";

class EconManager {
  /**
   * Runs the logic for a single economy creep.
   * This is called by the creepManager.
   */
  public runCreep(creep: Creep): void {
    // Ensure creep has a role defined in memory
    if (!creep.memory.role) {
        // Assign a default role if none exists (e.g., builder for bootstrap)
        creep.memory.role = "builder";
        Logger.warning(`Creep ${creep.name} had no role. Assigned default: builder.`);
    }

    // Delegate to the correct role's static run method
    try {
        switch (creep.memory.role) {
          case "builder":
            RoleBuilder.run(creep);
            break;
          case "harvester":
            RoleHarvester.run(creep);
            break;
          case "upgrader":
            RoleUpgrader.run(creep);
            break;
          case "hauler":
            RoleHauler.run(creep);
            break;
          default:
            // Log warning for unhandled roles but let it default to builder
            Logger.warning(
              `EconManager: Unknown or unhandled role '${creep.memory.role}' for creep ${creep.name}. Attempting default builder logic.`
            );
            // Attempt to run as builder as a fallback
             RoleBuilder.run(creep);
            break;
        }
    } catch (e) {
        Logger.error(`Error running role ${creep.memory.role} for creep ${creep.name}: ${e instanceof Error ? e.stack : e}`);
    }
  }
}

// Export a singleton instance for use by creepManager
export const econManager = new EconManager();
