import { Targeting } from "../utils/targeting.js";
import { moveTo } from "../utils/movement.js";

export class RoleUpgrader {
  static run(creep: Creep): void {
    // State management: toggle working state based on energy
    if (creep.memory.working && creep.store[RESOURCE_ENERGY] === 0) {
      creep.memory.working = false;
      creep.memory.target = undefined; // Clear target
      creep.memory.targetPos = undefined; // Clear reserved spot
      creep.say("🔄 harvest");
    }
    if (!creep.memory.working && creep.store.getFreeCapacity() === 0) {
      creep.memory.working = true;
      creep.memory.target = undefined; // Clear target
      creep.memory.targetPos = undefined; // Clear reserved spot
      creep.say("⚡ upgrade");
    }

    // Upgrading logic
    if (creep.memory.working) {
      if (creep.room.controller) {
        if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
          moveTo(creep, creep.room.controller);
        }
      }
    }
    // Harvesting logic
    else {
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

      // Move to and harvest from the target spot
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
  }
}

