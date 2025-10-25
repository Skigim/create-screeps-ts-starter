declare global {
  interface CreepMemory {
    role: string;
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

export {};
