export class RoleBuilder {
  static run(creep: Creep): void {
    if (creep.memory.working && creep.store[RESOURCE_ENERGY] === 0) {
      creep.memory.working = false;
      creep.say("🔄 harvest");
    }
    if (!creep.memory.working && creep.store.getFreeCapacity() === 0) {
      creep.memory.working = true;
      creep.say("🚧 build");
    }

    if (creep.memory.working) {
      const targets = creep.room.find(FIND_CONSTRUCTION_SITES);
      if (targets.length > 0) {
        const target = targets[0];
        if (target && creep.build(target) === ERR_NOT_IN_RANGE) {
          creep.moveTo(target, {
            visualizePathStyle: { stroke: "#ffffff" },
          });
        }
      }
    } else {
      const sources = creep.room.find(FIND_SOURCES);
      if (sources.length > 0) {
        const source = sources[0];
        if (source && creep.harvest(source) === ERR_NOT_IN_RANGE) {
          creep.moveTo(source, {
            visualizePathStyle: { stroke: "#ffaa00" },
          });
        }
      }
    }
  }
}
