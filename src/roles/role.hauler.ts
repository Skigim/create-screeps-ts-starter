export class RoleHauler {
  static run(creep: Creep): void {
    if (creep.memory.working && creep.store[RESOURCE_ENERGY] === 0) {
      creep.memory.working = false;
      creep.say("🔄 pickup");
    }
    if (!creep.memory.working && creep.store.getFreeCapacity() === 0) {
      creep.memory.working = true;
      creep.say("🚚 deliver");
    }

    if (creep.memory.working) {
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
        if (
          target &&
          creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE
        ) {
          creep.moveTo(target, {
            visualizePathStyle: { stroke: "#ffffff" },
          });
        }
      }
    } else {
      const droppedEnergy = creep.room.find(FIND_DROPPED_RESOURCES, {
        filter: (resource) => resource.resourceType === RESOURCE_ENERGY,
      });

      if (droppedEnergy.length > 0) {
        const resource = droppedEnergy[0];
        if (resource && creep.pickup(resource) === ERR_NOT_IN_RANGE) {
          creep.moveTo(resource, {
            visualizePathStyle: { stroke: "#ffaa00" },
          });
        }
      }
    }
  }
}
