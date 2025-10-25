import "./prototypes/index.js";
import { creepManager } from "./managers/creepManager.js";
import { roomManager } from "./managers/roomManager.js";
import { statsManager } from "./managers/statsManager.js";
import { Logger } from "./utils/logger.js";

export function loop() {
  Logger.info(`Current game tick is ${Game.time}`);

  // Run managers (all centralized)
  creepManager.run();
  roomManager.run(); // This handles all rooms and spawns
  statsManager.run(); // Collect statistics at the end
}
