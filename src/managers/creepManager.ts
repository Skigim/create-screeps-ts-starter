import { econManager } from "./econManager.js";
import { militaryManager } from "./militaryManager.js";
import { Logger } from "../utils/logger.js";

export class CreepManager {
  public run(): void {
    // Clean up memory of dead creeps first
    this.cleanupMemory();

    // Loop only ONCE through all creeps
    for (const name in Game.creeps) {
      const creep = Game.creeps[name];
      if (!creep) continue;

      // Delegate to the correct sub-manager based on creep type
      switch (creep.memory.type) {
        case "economy":
          econManager.runCreep(creep);
          break;
        case "military":
          militaryManager.runCreep(creep);
          break;
        default:
          // Default to economy if no type is set
          if (!creep.memory.type) {
            creep.memory.type = "economy";
            econManager.runCreep(creep);
          } else {
            Logger.warning(
              `Unknown creep type: ${creep.memory.type} for ${name}`
            );
          }
      }
    }
  }

  private cleanupMemory(): void {
    for (const name in Memory.creeps) {
      if (!(name in Game.creeps)) {
        delete Memory.creeps[name];
        Logger.info(`Clearing non-existing creep memory: ${name}`);
      }
    }
  }
}

export const creepManager = new CreepManager();
