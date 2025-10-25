import { Logger } from "../utils/logger.js";

export class RoomManager {
  static run(room: Room): void {
    // Room planning and management logic
    this.manageConstructionSites(room);
    this.manageTowers(room);
  }

  private static manageConstructionSites(room: Room): void {
    const constructionSites = room.find(FIND_CONSTRUCTION_SITES);
    if (constructionSites.length > 0) {
      Logger.debug(
        `Room ${room.name} has ${constructionSites.length} construction sites`
      );
    }
  }

  private static manageTowers(room: Room): void {
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
