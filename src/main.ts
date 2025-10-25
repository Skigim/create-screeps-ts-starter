import "./prototypes/index.js";
import { creepManager } from "./managers/creepManager.js";
import { SpawnManager } from "./managers/spawnManager.js";
import { RoomManager } from "./managers/roomManager.js";
import { Logger } from "./utils/logger.js";

export function loop() {
  Logger.info(`Current game tick is ${Game.time}`);

  // Run creep management (single entry point)
  creepManager.run();

  // Run each spawn
  for (const spawnName in Game.spawns) {
    const spawn = Game.spawns[spawnName];
    if (spawn) {
      SpawnManager.run(spawn);
    }
  }

  // Run each room
  for (const roomName in Game.rooms) {
    const room = Game.rooms[roomName];
    if (room) {
      RoomManager.run(room);
    }
  }
}
