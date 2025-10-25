/**
 * Targeting utility for finding available resource spots and preventing conflicts
 */
export class Targeting {
  /**
   * Find an available harvest spot next to a source that isn't already claimed.
   * @param creep - The creep looking for a harvest spot
   * @returns An object with the position and source ID, or null if no spots available
   */
  static findAvailableHarvestSpot(creep: Creep): { pos: RoomPosition; id: Id<Source> } | null {
    // Get all sources in the room
    const sources = creep.room.find(FIND_SOURCES);
    console.log(`Targeting: Found ${sources.length} sources in room ${creep.room.name}`);

    // Get list of all claimed harvest positions (excluding this creep)
    const claimedPositions: { x: number; y: number }[] = [];
    for (const name in Game.creeps) {
      const otherCreep = Game.creeps[name];
      if (!otherCreep) continue;
      // Skip the current creep to avoid counting its own position as claimed
      if (otherCreep.name === creep.name) continue;
      if (otherCreep.room.name === creep.room.name && otherCreep.memory.targetPos) {
        claimedPositions.push({
          x: otherCreep.memory.targetPos.x,
          y: otherCreep.memory.targetPos.y
        });
      }
    }
    console.log(`Targeting: ${claimedPositions.length} positions already claimed by other creeps`);
    console.log(`Targeting: Claimed positions: ${JSON.stringify(claimedPositions)}`);

    // Iterate over each source to find an available spot
    for (const source of sources) {
      // Get terrain to check which adjacent tiles are walkable
      const terrain = creep.room.getTerrain();

      // Check all 8 adjacent positions around the source
      const adjacentPositions = [
        { x: source.pos.x - 1, y: source.pos.y - 1 },
        { x: source.pos.x, y: source.pos.y - 1 },
        { x: source.pos.x + 1, y: source.pos.y - 1 },
        { x: source.pos.x - 1, y: source.pos.y },
        { x: source.pos.x + 1, y: source.pos.y },
        { x: source.pos.x - 1, y: source.pos.y + 1 },
        { x: source.pos.x, y: source.pos.y + 1 },
        { x: source.pos.x + 1, y: source.pos.y + 1 }
      ];

      for (const adj of adjacentPositions) {
        // Check if the position is within room bounds (0-49)
        if (adj.x < 0 || adj.x > 49 || adj.y < 0 || adj.y > 49) {
          continue;
        }

        // Check if the terrain is walkable (not a wall)
        if (terrain.get(adj.x, adj.y) === TERRAIN_MASK_WALL) {
          continue;
        }

        // Check if this spot is already claimed
        const isClaimed = claimedPositions.some(
          claimed => claimed.x === adj.x && claimed.y === adj.y
        );

        if (!isClaimed) {
          // Found an available spot!
          return {
            pos: new RoomPosition(adj.x, adj.y, creep.room.name),
            id: source.id
          };
        }
      }
    }

    // No available spots found
    return null;
  }
}
