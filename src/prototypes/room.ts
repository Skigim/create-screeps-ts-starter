// Extend Room prototype with custom methods
declare global {
  interface Room {
    getEnergyAvailable(): number;
  }
}

Room.prototype.getEnergyAvailable = function (): number {
  return this.energyAvailable;
};

export {};
