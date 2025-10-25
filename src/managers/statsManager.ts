import { Logger } from "../utils/logger.js";

export class StatsManager {
  public run(): void {
    // Collect and log statistics about the empire
    this.collectCreepStats();
    this.collectResourceStats();
    this.collectRoomStats();
  }

  private collectCreepStats(): void {
    const creepsByRole: Record<string, number> = {};
    const creepsByType = { economy: 0, military: 0 };

    for (const name in Game.creeps) {
      const creep = Game.creeps[name];
      if (!creep) continue;

      const role = creep.memory.role;
      const type = creep.memory.type || "economy";

      // Count by role
      creepsByRole[role] = (creepsByRole[role] || 0) + 1;

      // Count by type
      if (type === "economy" || type === "military") {
        creepsByType[type]++;
      }
    }

    Logger.debug(`Creep counts by role: ${JSON.stringify(creepsByRole)}`);
    Logger.debug(`Creep counts by type: ${JSON.stringify(creepsByType)}`);
  }

  private collectResourceStats(): void {
    let totalEnergy = 0;

    for (const roomName in Game.rooms) {
      const room = Game.rooms[roomName];
      if (!room) continue;
      if (room.controller && room.controller.my) {
        totalEnergy += room.energyAvailable;
      }
    }

    Logger.debug(`Total available energy: ${totalEnergy}`);
  }

  private collectRoomStats(): void {
    for (const roomName in Game.rooms) {
      const room = Game.rooms[roomName];
      if (!room) continue;
      if (room.controller && room.controller.my) {
        const rcl = room.controller.level;
        const progress = room.controller.progress;
        const progressTotal = room.controller.progressTotal;
        const percentage = ((progress / progressTotal) * 100).toFixed(2);

        Logger.debug(
          `Room ${roomName}: RCL ${rcl}, Upgrade Progress: ${percentage}%`
        );
      }
    }
  }
}

export const statsManager = new StatsManager();
