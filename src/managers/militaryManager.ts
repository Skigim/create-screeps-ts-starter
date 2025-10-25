import { Logger } from "../utils/logger.js";

export class MilitaryManager {
  public runCreep(creep: Creep): void {
    // Military creep logic will go here
    switch (creep.memory.role) {
      case "defender":
        // RoleDefender.run(creep);
        Logger.debug(`Defender ${creep.name} - not yet implemented`);
        break;
      case "attacker":
        // RoleAttacker.run(creep);
        Logger.debug(`Attacker ${creep.name} - not yet implemented`);
        break;
      default:
        Logger.warning(
          `Unknown military role: ${creep.memory.role} for ${creep.name}`
        );
    }
  }
}

export const militaryManager = new MilitaryManager();
