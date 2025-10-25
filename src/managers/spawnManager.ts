import { Logger } from "../utils/logger.js";

export class SpawnManager {
  static run(spawn: StructureSpawn): void {
    if (spawn.spawning) {
      const spawningCreep = Game.creeps[spawn.spawning.name];
      if (spawningCreep) {
        spawn.room.visual.text(
          "🛠️" + spawningCreep.memory.role,
          spawn.pos.x + 1,
          spawn.pos.y,
          { align: "left", opacity: 0.8 }
        );
      }
      return;
    }

    // Count creeps by role
    const harvesters = Object.values(Game.creeps).filter(
      (creep) => creep.memory.role === "harvester"
    );
    const builders = Object.values(Game.creeps).filter(
      (creep) => creep.memory.role === "builder"
    );
    const upgraders = Object.values(Game.creeps).filter(
      (creep) => creep.memory.role === "upgrader"
    );

    // Spawn logic
    if (harvesters.length < 2) {
      this.spawnCreep(spawn, "harvester");
    } else if (upgraders.length < 1) {
      this.spawnCreep(spawn, "upgrader");
    } else if (builders.length < 2) {
      this.spawnCreep(spawn, "builder");
    }
  }

  private static spawnCreep(spawn: StructureSpawn, role: string): void {
    const newName = `${role}${Game.time}`;
    const body = this.getBodyForRole(role);

    const result = spawn.spawnCreep(body, newName, {
      memory: { role },
    });

    if (result === OK) {
      Logger.info(`Spawning new ${role}: ${newName}`);
    } else if (result !== ERR_NOT_ENOUGH_ENERGY) {
      Logger.error(`Failed to spawn ${role}: ${result}`);
    }
  }

  private static getBodyForRole(role: string): BodyPartConstant[] {
    switch (role) {
      case "harvester":
        return [WORK, CARRY, MOVE];
      case "builder":
        return [WORK, CARRY, MOVE];
      case "upgrader":
        return [WORK, CARRY, MOVE];
      case "hauler":
        return [CARRY, CARRY, MOVE];
      default:
        return [WORK, CARRY, MOVE];
    }
  }
}
