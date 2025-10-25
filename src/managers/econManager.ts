import { RoleHarvester } from "../roles/role.harvester.js";
import { RoleBuilder } from "../roles/role.builder.js";
import { RoleUpgrader } from "../roles/role.upgrader.js";
import { RoleHauler } from "../roles/role.hauler.js";
import { Logger } from "../utils/logger.js";

export class EconManager {
  public runCreep(creep: Creep): void {
    // Route to the appropriate role handler
    switch (creep.memory.role) {
      case "harvester":
        RoleHarvester.run(creep);
        break;
      case "builder":
        RoleBuilder.run(creep);
        break;
      case "upgrader":
        RoleUpgrader.run(creep);
        break;
      case "hauler":
        RoleHauler.run(creep);
        break;
      default:
        Logger.warning(
          `Unknown economic role: ${creep.memory.role} for ${creep.name}`
        );
    }
  }
}

export const econManager = new EconManager();
