export function loop() {
  console.log(`Current game tick is ${Game.time}`);

  // Your Screeps code here
  for (const name in Game.creeps) {
    const creep = Game.creeps[name];
    if (creep.memory.role === "harvester") {
      // Example creep logic
    }
  }
}
