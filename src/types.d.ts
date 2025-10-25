declare global {
  interface CreepMemory {
    role: "harvester" | "builder" | "upgrader" | "hauler" | "defender" | "attacker";
    type?: "economy" | "military";
    room?: string;
    working?: boolean;
    target?: Id<Source | StructureController | ConstructionSite>;
  }

  interface Memory {
    uuid: number;
    log: any;
  }

  // Syntax for adding properties to `global` (ex "global.log")
  namespace NodeJS {
    interface Global {
      log: any;
    }
  }
}

// Export the CreepRole type for use in other files
export type CreepRole = "harvester" | "builder" | "upgrader" | "hauler" | "defender" | "attacker";

export {};
