import type { CreepRole } from "../types.js";

// Define color mapping for each role
const roleColors: Record<CreepRole, string> = {
  harvester: "#FFFFFF",
  builder: "#FFD700",
  upgrader: "#A020F0",
  hauler: "#00FFFF",
  defender: "#FF0000",
  attacker: "#FF4500"
};

/**
 * Move a creep to a target with role-specific path coloring and path reuse.
 * @param creep - The creep to move
 * @param target - The target position or object with a position
 * @param opts - Optional MoveToOpts to override defaults
 * @returns The result code from moveTo
 */
export function moveTo(
  creep: Creep,
  target: RoomPosition | { pos: RoomPosition },
  opts: MoveToOpts = {}
): ScreepsReturnCode {
  // Default options
  const defaultOpts: MoveToOpts = {
    reusePath: 5
  };

  // Get role-specific color
  const roleColor = roleColors[creep.memory.role] || "#FFFFFF";
  defaultOpts.visualizePathStyle = { stroke: roleColor };

  // Merge default options with provided options (opts override defaults)
  return creep.moveTo(target, { ...defaultOpts, ...opts });
}
