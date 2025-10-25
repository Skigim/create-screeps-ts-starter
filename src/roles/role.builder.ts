// in src/roles/role.builder.ts

import { Logger } from "../utils/logger.js";
import { Targeting } from "../utils/targeting.js";
import { moveTo } from "../utils/movement.js";

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
      creep.memory.targetPos = undefined; // Clear reserved spot
      creep.say("🔄 harvest");
      console.log(`${creep.name}: Switched to harvest mode`);
    }
    // If harvesting and full of energy, switch to working
    if (!creep.memory.working && creep.store.getFreeCapacity(RESOURCE_ENERGY) === 0) {
      creep.memory.working = true;
      creep.memory.target = undefined; // Clear target
      creep.memory.targetPos = undefined; // Clear reserved spot
      creep.say("⚡ work");
      console.log(`${creep.name}: Switched to work mode`);
    }

    // 2. ACTION LOGIC
    // --- HARVESTING ---
    if (!creep.memory.working) {
      // Find an available harvest spot if we don't have one
      if (!creep.memory.target || !creep.memory.targetPos) {
        console.log(`${creep.name}: Looking for harvest spot...`);
        const spot = Targeting.findAvailableHarvestSpot(creep);
        if (spot) {
          creep.memory.target = spot.id;
          creep.memory.targetPos = spot.pos;
          console.log(`${creep.name}: Found spot at (${spot.pos.x},${spot.pos.y}) for source ${spot.id}`);
        } else {
          // No spots available - wait
          creep.say("⏳ waiting");
          console.log(`${creep.name}: No available harvest spots`);
          return;
        }
      }

      // Move to and harvest from the target spot
      const source = Game.getObjectById(creep.memory.target as Id<Source>);
      if (source && creep.memory.targetPos) {
        console.log(`${creep.name}: Pos: (${creep.pos.x},${creep.pos.y}) | Target: (${creep.memory.targetPos.x},${creep.memory.targetPos.y}) | At spot: ${creep.pos.isEqualTo(creep.memory.targetPos)}`);
        // Only harvest when at the exact spot
        if (creep.pos.isEqualTo(creep.memory.targetPos)) {
          const harvestResult = creep.harvest(source);
          console.log(`${creep.name}: Harvesting - result: ${harvestResult}`);
          if (harvestResult !== OK && harvestResult !== ERR_NOT_ENOUGH_RESOURCES && harvestResult !== ERR_TIRED) {
            // Clear target if there's an unexpected issue
            creep.memory.target = undefined;
            creep.memory.targetPos = undefined;
          }
        } else {
          console.log(`${creep.name}: Moving to harvest spot...`);
          const moveResult = moveTo(creep, creep.memory.targetPos);
          console.log(`${creep.name}: Move result: ${moveResult}`);
        }
      } else {
        // Target source doesn't exist anymore - clear it
        console.log(`${creep.name}: Lost source or targetPos - resetting`);
        creep.memory.target = undefined;
        creep.memory.targetPos = undefined;
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
          moveTo(creep, fillTarget);
        }
        return; // Job is done for this tick
      }

      // Priority 2: Build Construction Sites
      const constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
      if (constructionSite) {
        if (creep.build(constructionSite) === ERR_NOT_IN_RANGE) {
          moveTo(creep, constructionSite);
        }
        return; // Job is done for this tick
      }

      // Priority 3: Upgrade Controller
      if (creep.room.controller) {
        if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
          moveTo(creep, creep.room.controller);
        }
        return; // Job is done for this tick
      }

      // If nothing else to do, idle near spawn
      const spawn = creep.pos.findClosestByRange(FIND_MY_SPAWNS);
      if (spawn && !creep.pos.isNearTo(spawn)) {
        moveTo(creep, spawn, { reusePath: 10 });
      }
      creep.say("💤 idling");
    }
  }
}

