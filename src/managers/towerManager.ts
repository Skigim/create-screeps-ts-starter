import { Logger } from "../utils/logger.js";

export class TowerManager {
  static run(tower: StructureTower): void {
    // Defend against hostile creeps
    const closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    if (closestHostile) {
      tower.attack(closestHostile);
      return;
    }

    // Repair damaged structures
    const closestDamagedStructure = tower.pos.findClosestByRange(
      FIND_STRUCTURES,
      {
        filter: (structure) =>
          structure.hits < structure.hitsMax &&
          structure.structureType !== STRUCTURE_WALL &&
          structure.structureType !== STRUCTURE_RAMPART,
      }
    );

    if (closestDamagedStructure) {
      tower.repair(closestDamagedStructure);
    }
  }
}
