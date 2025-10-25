// Extend StructureSpawn prototype with custom methods
declare global {
  interface StructureSpawn {
    createCustomCreep(role: string): ScreepsReturnCode;
  }
}

StructureSpawn.prototype.createCustomCreep = function (
  role: string
): ScreepsReturnCode {
  const name = `${role}${Game.time}`;
  return this.spawnCreep([WORK, CARRY, MOVE], name, {
    memory: { role },
  });
};

export {};
