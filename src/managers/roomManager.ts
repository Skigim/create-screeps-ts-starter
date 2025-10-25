import { SpawnManager } from "./spawnManager.js";
import { Logger } from "../utils/logger.js";
import type { CreepRole } from "../types.js";

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
    // Only manage rooms we own
    if (!room.controller || !room.controller.my) {
      return;
    }

    // Initialize room memory if needed
    if (!Memory.rooms) {
      Memory.rooms = {};
    }
    if (!Memory.rooms[room.name]) {
      Memory.rooms[room.name] = {};
    }

    // Calculate and store creep quotas for this room
    const quotas = this.calculateCreepQuotas(room);
    const roomMemory = Memory.rooms[room.name];
    if (roomMemory) {
      roomMemory.creepQuotas = quotas;
    }

    // Room planning and management logic
    this.manageConstructionSites(room);
    this.manageTowers(room);

    // Call SpawnManager for each spawn in this room, passing the quotas
    room.find(FIND_MY_SPAWNS).forEach((spawn) => {
      SpawnManager.run(spawn, quotas);
    });
  }

  private calculateCreepQuotas(room: Room): Partial<Record<CreepRole, number>> {
    const quotas: Partial<Record<CreepRole, number>> = {};

    // Count active energy sources
    const sources = room.find(FIND_SOURCES);
    const activeSources = sources.filter(s => s.energy > 0 || s.ticksToRegeneration < 300);

    // Harvesters: 2 per active source
    quotas.harvester = activeSources.length * 2;

    // Builders: 1 if there are construction sites, otherwise 0
    const constructionSites = room.find(FIND_CONSTRUCTION_SITES);
    quotas.builder = constructionSites.length > 0 ? 1 : 0;

    // Upgraders: Always 1
    quotas.upgrader = 1;

    // Haulers: 0 for now (to be implemented later)
    quotas.hauler = 0;

    return quotas;
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
