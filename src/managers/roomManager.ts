import { SpawnManager } from "./spawnManager.js";
import { Logger } from "../utils/logger.js";

export class RoomManager {
  public run(): void {
    // Loop over all rooms owned by the player
    for (const roomName in Game.rooms) {
      const room = Game.rooms[roomName];
      if (room) {
        this.runRoom(room);
      }
    }
  }

  private runRoom(room: Room): void {
    // Room planning and management logic
    this.manageConstructionSites(room);
    this.manageTowers(room);

    // Call SpawnManager for each spawn in this room
    room.find(FIND_MY_SPAWNS).forEach((spawn) => {
      SpawnManager.run(spawn);
    });
  }

  private manageConstructionSites(room: Room): void {
    const constructionSites = room.find(FIND_CONSTRUCTION_SITES);
    if (constructionSites.length > 0) {
      Logger.debug(
        `Room ${room.name} has ${constructionSites.length} construction sites`
      );
    }
  }

  private manageTowers(room: Room): void {
    const towers = room.find(FIND_MY_STRUCTURES, {
      filter: (structure) => structure.structureType === STRUCTURE_TOWER,
    }) as StructureTower[];

    towers.forEach((tower) => {
      const closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
      if (closestHostile) {
        tower.attack(closestHostile);
      }
    });
  }
}

export const roomManager = new RoomManager();
