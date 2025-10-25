# Roma Aeterna 🏛️

> *"All roads lead to Rome"* - A TypeScript-based Screeps bot built for expansion and efficiency

Roma Aeterna is a modular, TypeScript-powered AI for [Screeps](https://screeps.com/), designed with Roman-inspired principles of organization, hierarchy, and systematic expansion. The bot features a clean manager-based architecture that separates economic, military, and infrastructure concerns.

## 🎯 Features

- **Modular Manager Architecture**: Cleanly separated concerns with dedicated managers for creeps, spawns, rooms, economy, and military
- **TypeScript Support**: Full type safety and modern ES6+ features
- **Prototype Extensions**: Custom methods on Creep, Room, and Spawn prototypes
- **Hot Reload**: Watch mode for rapid development and testing
- **Multi-Environment Support**: Easy deployment to main server, PTR, or local private server

## 🏗️ Architecture

### Core Managers

- **CreepManager**: Central hub for all creep operations, routing creeps to appropriate sub-managers
- **EconManager**: Handles economic creeps (harvesters, haulers, upgraders, builders)
- **MilitaryManager**: Manages military operations and combat creeps
- **SpawnManager**: Controls creep spawning logic and prioritization
- **RoomManager**: Oversees room-level operations and planning
- **TowerManager**: Manages tower defense and repair operations

### Creep Roles

- **Harvester**: Collects energy from sources
- **Hauler**: Transports energy from sources to structures
- **Upgrader**: Upgrades the room controller
- **Builder**: Constructs and repairs structures

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- pnpm package manager
- A Screeps account (optional: private server for local testing)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd create-screeps-ts-starter

# Install dependencies
pnpm install

# Configure your Screeps credentials
cp screeps.json.example screeps.json
# Edit screeps.json with your credentials
```

### Configuration

Edit `screeps.json` with your Screeps credentials:

```json
{
  "main": {
    "email": "your-email@example.com",
    "password": "your-password",
    "branch": "main"
  },
  "ptr": {
    "email": "your-email@example.com",
    "password": "your-password",
    "branch": "ptr"
  },
  "local": {
    "host": "localhost",
    "port": 21025,
    "branch": "main"
  }
}
```

## 📦 Build & Deploy

### Development

```bash
# Build once
pnpm run build

# Watch mode (auto-rebuild and upload to main server)
pnpm run watch

# Watch mode for local server
pnpm run watch:local

# Watch mode for PTR
pnpm run watch:ptr
```

### Deployment

```bash
# Build and upload to main server
pnpm run push

# Upload to local server
pnpm run push:local

# Upload to PTR
pnpm run push:ptr
```

## 📁 Project Structure

```
src/
├── main.ts                 # Main game loop
├── types.d.ts             # Type declarations
├── managers/              # Manager modules
│   ├── creepManager.ts   # Central creep coordinator
│   ├── econManager.ts    # Economic operations
│   ├── militaryManager.ts # Military operations
│   ├── roomManager.ts    # Room-level logic
│   ├── spawnManager.ts   # Spawn control
│   └── towerManager.ts   # Tower management
├── roles/                 # Creep role behaviors
│   ├── role.harvester.ts
│   ├── role.hauler.ts
│   ├── role.upgrader.ts
│   └── role.builder.ts
├── prototypes/            # Prototype extensions
│   ├── creep.ts
│   ├── room.ts
│   └── spawn.ts
└── utils/                 # Utility functions
    ├── constants.ts
    └── logger.ts
```

## 🎮 Usage

The bot operates on a tick-based loop:

1. **Creep Management**: All creeps are processed through `creepManager`, which routes them to the appropriate sub-manager based on their type (economy or military)
2. **Spawn Management**: Each spawn evaluates creep needs and spawns new units based on role deficits
3. **Room Management**: Room-level operations like planning and infrastructure management
4. **Tower Operations**: Automated defense and repair

## 🔧 Customization

### Adding a New Role

1. Create a new role file in `src/roles/`
2. Define the role behavior
3. Add the role to the appropriate manager (econManager or militaryManager)
4. Update spawn logic in `SpawnManager`

### Extending Prototypes

Add new methods to prototypes in `src/prototypes/`:

```typescript
// Example: Add a method to Creep prototype
Creep.prototype.myCustomMethod = function() {
  // Your logic here
};
```

## 🐛 Debugging

The bot includes a Logger utility for debugging:

```typescript
import { Logger } from "./utils/logger.js";

Logger.info("Information message");
Logger.warning("Warning message");
Logger.error("Error message");
```

## 🌐 Local Development

A Docker-based local server is included for testing:

```bash
cd server
docker-compose up -d
```

Access the local server at `http://localhost:21025`

## 📊 Performance Considerations

- **Single Loop Architecture**: Creeps are only looped through once per tick
- **Memory Cleanup**: Automatic cleanup of dead creep memory
- **Type Safety**: TypeScript catches errors at compile time
- **Modular Design**: Easy to profile and optimize individual managers

## 🤝 Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for bugs and feature requests.

## 📜 License

This project is open source and available under the MIT License.

## 🎓 Resources

- [Screeps Documentation](https://docs.screeps.com/)
- [Screeps API Reference](https://docs.screeps.com/api/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

---

*Built with the discipline of Roman engineering and the flexibility of modern TypeScript* ⚔️
