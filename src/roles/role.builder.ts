// in src/roles/role.builder.ts

import { Logger } from "../utils/logger.js";

/**
 * This is the "do-everything" bootstrap creep.
 * Priority: Fill Spawn/Extensions > Build > Upgrade
 */
export class RoleBuilder {
  public static run(creep: Creep): void {
    // 1. STATE TOGGLING
    // If working and out of energy, switch to harvesting
    if (creep.memory.working && creep.store.getUsedCapacity(RESOURCE_ENERGY) === 0) {
      creep.memory.working = false;
      creep.memory.target = undefined; // Clear target
      creep.say("🔄 harvest");
    }
    // If harvesting and full of energy, switch to working
    if (!creep.memory.working && creep.store.getFreeCapacity(RESOURCE_ENERGY) === 0) {
      creep.memory.working = true;
      creep.memory.target = undefined; // Clear target
      creep.say("⚡ work");
    }

    // 2. ACTION LOGIC
    // --- HARVESTING ---
    if (!creep.memory.working) {
      // Find a source to harvest from if we don't have one
      if (!creep.memory.target) {
        const source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
        if (source) {
          creep.memory.target = source.id;
        } else {
          // No active sources? Wait.
          creep.say(" idling ");
          return;
        }
      }

      // Try to harvest from the target source
      const source = Game.getObjectById(creep.memory.target as Id<Source>);
      if (source) {
        const harvestResult = creep.harvest(source);
        if (harvestResult === ERR_NOT_IN_RANGE) {
          creep.moveTo(source, { visualizePathStyle: { stroke: "#ffaa00" }, reusePath: 5 });
        } else if (harvestResult !== OK) {
          creep.memory.target = undefined; // Clear target if there's an issue (e.g., source empty)
        }
      } else {
        // Target source doesn't exist anymore? Clear target.
        creep.memory.target = undefined;
      }
    }
    // --- WORKING ---
    else {
      // Priority 1: Fill Spawn and Extensions
      const fillTarget = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
        filter: structure => {
          return (
            (structure.structureType === STRUCTURE_SPAWN || structure.structureType === STRUCTURE_EXTENSION) &&
            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
          );
        }
      });

      if (fillTarget) {
        if (creep.transfer(fillTarget, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          creep.moveTo(fillTarget, { visualizePathStyle: { stroke: "#ffffff" }, reusePath: 5 });
        }
        return; // Job is done for this tick
      }

      // Priority 2: Build Construction Sites
      const constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
      if (constructionSite) {
        if (creep.build(constructionSite) === ERR_NOT_IN_RANGE) {
          creep.moveTo(constructionSite, { visualizePathStyle: { stroke: "#aaaaaa" }, reusePath: 5 });
        }
        return; // Job is done for this tick
      }

      // Priority 3: Upgrade Controller
      if (creep.room.controller) {
        if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
          creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: "#4CAF50" }, reusePath: 5 });
        }
        return; // Job is done for this tick
      }

      // If nothing else to do, idle near spawn
      const spawn = creep.pos.findClosestByRange(FIND_MY_SPAWNS);
      if (spawn && !creep.pos.isNearTo(spawn)) {
        creep.moveTo(spawn, { visualizePathStyle: { stroke: "#888888" }, reusePath: 10 });
      }
      creep.say(" idling ");
    }
  }
}
