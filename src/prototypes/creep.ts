// Extend Creep prototype with custom methods
declare global {
  interface Creep {
    runRole(): void;
  }
}

Creep.prototype.runRole = function (): void {
  // Custom creep methods can be added here
};

export {};
