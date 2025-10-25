import { Targeting } from "../utils/targeting.js";
import { moveTo } from "../utils/movement.js";

export class RoleHarvester {
  static run(creep: Creep): void {
    // State management: toggle working state based on energy
    if (!creep.memory.working && creep.store.getFreeCapacity() === 0) {
      creep.memory.working = true;
      // Clear reserved harvest spot when full
      creep.memory.target = undefined;
      creep.memory.targetPos = undefined;
      creep.say("🚚 deliver");
    }
    if (creep.memory.working && creep.store[RESOURCE_ENERGY] === 0) {
      creep.memory.working = false;
      creep.say("🔄 harvest");
    }

    // Harvesting logic
    if (!creep.memory.working) {
      // Find an available harvest spot if we don't have one
      if (!creep.memory.target || !creep.memory.targetPos) {
        const spot = Targeting.findAvailableHarvestSpot(creep);
        if (spot) {
          creep.memory.target = spot.id;
          creep.memory.targetPos = spot.pos;
        } else {
          // No spots available - wait
          creep.say("⏳ waiting");
          return;
        }
      }

      // Move to the harvest spot
      const source = Game.getObjectById(creep.memory.target as Id<Source>);
      if (source && creep.memory.targetPos) {
        // Only harvest when at the exact spot
        if (creep.pos.isEqualTo(creep.memory.targetPos)) {
          creep.harvest(source);
        } else {
          moveTo(creep, creep.memory.targetPos);
        }
      } else {
        // Target source doesn't exist anymore - clear it
        creep.memory.target = undefined;
        creep.memory.targetPos = undefined;
      }
    }
    // Delivery logic
    else {
      const targets = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
          return (
            (structure.structureType === STRUCTURE_EXTENSION ||
              structure.structureType === STRUCTURE_SPAWN ||
              structure.structureType === STRUCTURE_TOWER) &&
            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
          );
        },
      });

      if (targets.length > 0) {
        const target = targets[0];
        if (target && creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          moveTo(creep, target);
        }
      }
    }
  }
}

