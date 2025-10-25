# Screeps TypeScript Bot# Screeps TypeScript Bot# Create Screeps TypeScript Starter



A well-structured TypeScript bot for [Screeps MMO](https://screeps.com/) featuring modular architecture, manager-based organization, and hot reloading.



## 🏗️ ArchitectureModern TypeScript bot for [Screeps MMO](https://screeps.com/) with esbuild and hot reloading.Modern TypeScript starter template for [Screeps MMO](https://screeps.com/) with esbuild and hot reloading.



This bot uses a **router-based architecture** with clear separation of concerns:



```## Requirements## Requirements

main.ts

   ↓

creepManager (master router)

   ↓- [Node.js](https://nodejs.org/) v22+- [Node.js](https://nodejs.org/) v22+

   ├── econManager → economy roles (harvester, builder, upgrader, hauler)

   └── militaryManager → military roles (defender, attacker, etc.)- pnpm (or npm)

```

## Quick Start

### Project Structure

## Quick Start

```

src/```bash

├── main.ts                 # Entry point - game loop

├── types.d.ts             # Global type definitions```bash# Create a new Screeps bot project

│

├── managers/              # High-level colony management# Install dependenciespnpm create @tigatok/screeps-ts-starter my-screeps-bot

│   ├── creepManager.ts    # Master router for all creeps

│   ├── econManager.ts     # Economy creep delegationpnpm installcd my-screeps-bot

│   ├── militaryManager.ts # Military creep delegation

│   ├── roomManager.ts     # Room-level logic

│   ├── spawnManager.ts    # Spawn queue management

│   └── towerManager.ts    # Tower automation# Set up your Screeps access# Install dependencies

│

├── roles/                 # Creep behavior (FSM)cp .env.example .envpnpm install

│   ├── role.harvester.ts  # Energy harvesting

│   ├── role.builder.ts    # Constructioncp .screeps.json.example .screeps.json

│   ├── role.upgrader.ts   # Controller upgrading

│   └── role.hauler.ts     # Energy transport# Set up your Screeps access

│

├── prototypes/            # Game object extensions# Start developing with hot reloadcp .env.example .env

│   ├── creep.ts           # Creep.prototype extensions

│   ├── room.ts            # Room.prototype extensionspnpm watchcp .screeps.json.example .screeps.json

│   ├── spawn.ts           # StructureSpawn.prototype extensions

│   └── index.ts           # Exports all prototypes```

│

└── utils/                 # Reusable helpers# Start developing with hot reload

    ├── constants.ts       # Game constants & configs

    └── logger.ts          # Colored console output## What's Includedpnpm watch

```

```

## 🚀 Quick Start

- **⚡ Fast builds** with esbuild

### Prerequisites

- **🔥 Hot reload** - automatically uploads on file changes## What's Included

- [Node.js](https://nodejs.org/) v22+

- npm or pnpm- **📁 Local development** - option to copy files to local Screeps client



### Installation- **🎯 Modern TypeScript** - strict mode with latest features- **⚡ Fast builds** with esbuild



```bash- **📦 Zero config** - works out of the box- **🔥 Hot reload** - automatically uploads on file changes

# Install dependencies

npm install- **🗄️ screeps.json** - Supports screeps.json for easier config- **📁 Local development** - option to copy files to local Screeps client



# Set up your Screeps credentials- **🐳 Docker support** - Contains a docker-compose file for running a local server- **🎯 Modern TypeScript** - strict mode with latest features

cp .env.example .env

cp .screeps.json.example .screeps.json- **📦 Zero config** - works out of the box



# Edit .env and add your token## Available Scripts- **🗄️ screeps.json** - Supports screeps.json for easier config

# Get token from: https://screeps.com/a/#!/account/auth-tokens

```- **🐳 Docker support** - Contains a docker-compose file for running a local server



### Development```bash



```bashpnpm build        # Build for production## Available Scripts

npm run build        # Build for production

npm run upload       # Upload to Screeps serverspnpm upload       # Upload to Screeps servers

npm run push         # Build + upload

npm run push:local   # Build + upload to local serverpnpm push         # Build + upload```bash

npm run push:ptr     # Build + upload to PTR server

npm run watch        # Watch mode + auto uploadpnpm push:local   # Build + copy to local clientpnpm build        # Build for production

npm run watch:local  # Watch mode + local server

npm run watch:ptr    # Watch mode + PTR serverpnpm push:ptr     # Build + upload to PTR serverpnpm upload       # Upload to Screeps servers

```

pnpm watch        # Watch files + auto uploadpnpm push         # Build + upload

## ⚙️ Configuration

pnpm watch:local  # Watch files + copy to local clientpnpm push:local   # Build + copy to local client

### Environment Variables (.env)

pnpm watch:ptr    # Watch files + upload to PTR serverpnpm push:ptr     # Build + upload to PTR server

```env

SCREEPS_BRANCH=default```pnpm watch        # Watch files + auto upload



# Screeps MMO serverpnpm watch:local  # Watch files + copy to local client

SCREEPS_TOKEN=your_token_here

## Configurationpnpm watch:ptr    # Watch files + upload to PTR server

# Local server (optional)

SCREEPS_LOCAL_USERNAME=your_username```

SCREEPS_LOCAL_PASSWORD=your_password

```Update env variables in `.env`:



### Screeps Configuration (.screeps.json)## Configuration



```json```env

{

  "main": {SCREEPS_BRANCH=defaultUpdate env variables in `.env`:

    "token": "YOUR_TOKEN_HERE",

    "protocol": "https",

    "hostname": "screeps.com",

    "port": 443,# Screeps MMO server configuration```env

    "path": "/",

    "branch": "default"SCREEPS_TOKEN=your_token_hereSCREEPS_BRANCH=default

  }

}

```

# Only needed if running a local server# Screeps MMO server configuration

## 🐳 Local Development Server

SCREEPS_LOCAL_USERNAME=your_usernameSCREEPS_TOKEN=your_token_here

Run a local Screeps server using Docker:

SCREEPS_LOCAL_PASSWORD=your_password

```bash

cd server```# Only needed if running a local server

cp .env.example .env

# Edit .env with your Steam keySCREEPS_LOCAL_USERNAME=your_username

docker-compose up -d

```Get your token from [Screeps Account Settings](https://screeps.com/a/#!/account/auth-tokens).SCREEPS_LOCAL_PASSWORD=your_password



## 🎯 Key Features```



### Router Architecture## Running Local Server

- **Single loop** - All creeps processed once per tick

- **Type-based routing** - Creeps routed by `memory.type` (economy/military)Get your token from [Screeps Account Settings](https://screeps.com/a/#!/account/auth-tokens).

- **Role delegation** - Sub-managers handle specific roles

- **Easy extension** - Add new managers without touching core loopTo run a local Screeps server, ensure you have Docker installed. Copy the server/.env.example to server/.env and replace your steam key and path to nw. Then run:



### Creep Memory Structure## Running Local Server



```typescript```bash

interface CreepMemory {

  type?: "economy" | "military";  // Manager typecd server && docker-compose up -dTo run a local Screeps server, ensure you have Docker installed. Copy the server/.env.example to server/.env and replace your steam key and path to nw. Then run:

  role: string;                   // Specific role (harvester, builder, etc.)

  working?: boolean;              // FSM state```

  target?: Id<GameObject>;        // Current target

}```bash

```

## Featurescd server && docker-compose up -d

### Economy Roles

```

- **Harvester** - Mines energy and fills spawns/extensions/towers

- **Builder** - Constructs buildings at construction sites- Modern ES2020+ TypeScript setup

- **Upgrader** - Upgrades room controller

- **Hauler** - Picks up dropped resources and delivers to structures- Automatic bundling with esbuild## Features



### Military Roles (Placeholder)- Strict type checking



- **Defender** - Room defense (not yet implemented)- Hot reload development workflow- Modern ES2020+ TypeScript setup

- **Attacker** - Offensive operations (not yet implemented)

- Support for both MMO and private servers- Automatic bundling with esbuild

## 🛠️ Development

- Supports `screeps.json` configuration- Strict type checking

### Adding a New Role

- Contains docker-compose for local server- Hot reload development workflow

1. Create role file in `src/roles/`

2. Add to appropriate manager (`econManager` or `militaryManager`)- Support for both MMO and private

3. Update spawn logic in `spawnManager.ts`- Supports `screeps.json` configuration

- Contains docker-compose for local server

Example:

```typescript
// src/roles/role.miner.ts
export class RoleMiner {
  static run(creep: Creep): void {
    // Your role logic here
  }
}

// src/managers/econManager.ts
import { RoleMiner } from "../roles/role.miner.js";

// Add to switch statement
case "miner":
  RoleMiner.run(creep);
  break;
```

### Adding a New Manager Type

1. Create manager in `src/managers/`
2. Add to `creepManager.ts` router
3. Update `CreepMemory` type in `types.d.ts`

## 📊 Built With

- **TypeScript** - Type-safe JavaScript
- **esbuild** - Fast bundler
- **Prettier** - Code formatting
- **ESLint** - Code linting (optional)

## 📝 License

ISC

## 🔗 Resources

- [Screeps Documentation](https://docs.screeps.com/)
- [Screeps API Reference](https://docs.screeps.com/api/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
