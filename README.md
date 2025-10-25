# Screeps TypeScript Bot# Create Screeps TypeScript Starter



Modern TypeScript bot for [Screeps MMO](https://screeps.com/) with esbuild and hot reloading.Modern TypeScript starter template for [Screeps MMO](https://screeps.com/) with esbuild and hot reloading.



## Requirements## Requirements



- [Node.js](https://nodejs.org/) v22+- [Node.js](https://nodejs.org/) v22+

- pnpm (or npm)

## Quick Start

## Quick Start

```bash

```bash# Create a new Screeps bot project

# Install dependenciespnpm create @tigatok/screeps-ts-starter my-screeps-bot

pnpm installcd my-screeps-bot



# Set up your Screeps access# Install dependencies

cp .env.example .envpnpm install

cp .screeps.json.example .screeps.json

# Set up your Screeps access

# Start developing with hot reloadcp .env.example .env

pnpm watchcp .screeps.json.example .screeps.json

```

# Start developing with hot reload

## What's Includedpnpm watch

```

- **⚡ Fast builds** with esbuild

- **🔥 Hot reload** - automatically uploads on file changes## What's Included

- **📁 Local development** - option to copy files to local Screeps client

- **🎯 Modern TypeScript** - strict mode with latest features- **⚡ Fast builds** with esbuild

- **📦 Zero config** - works out of the box- **🔥 Hot reload** - automatically uploads on file changes

- **🗄️ screeps.json** - Supports screeps.json for easier config- **📁 Local development** - option to copy files to local Screeps client

- **🐳 Docker support** - Contains a docker-compose file for running a local server- **🎯 Modern TypeScript** - strict mode with latest features

- **📦 Zero config** - works out of the box

## Available Scripts- **🗄️ screeps.json** - Supports screeps.json for easier config

- **🐳 Docker support** - Contains a docker-compose file for running a local server

```bash

pnpm build        # Build for production## Available Scripts

pnpm upload       # Upload to Screeps servers

pnpm push         # Build + upload```bash

pnpm push:local   # Build + copy to local clientpnpm build        # Build for production

pnpm push:ptr     # Build + upload to PTR serverpnpm upload       # Upload to Screeps servers

pnpm watch        # Watch files + auto uploadpnpm push         # Build + upload

pnpm watch:local  # Watch files + copy to local clientpnpm push:local   # Build + copy to local client

pnpm watch:ptr    # Watch files + upload to PTR serverpnpm push:ptr     # Build + upload to PTR server

```pnpm watch        # Watch files + auto upload

pnpm watch:local  # Watch files + copy to local client

## Configurationpnpm watch:ptr    # Watch files + upload to PTR server

```

Update env variables in `.env`:

## Configuration

```env

SCREEPS_BRANCH=defaultUpdate env variables in `.env`:



# Screeps MMO server configuration```env

SCREEPS_TOKEN=your_token_hereSCREEPS_BRANCH=default



# Only needed if running a local server# Screeps MMO server configuration

SCREEPS_LOCAL_USERNAME=your_usernameSCREEPS_TOKEN=your_token_here

SCREEPS_LOCAL_PASSWORD=your_password

```# Only needed if running a local server

SCREEPS_LOCAL_USERNAME=your_username

Get your token from [Screeps Account Settings](https://screeps.com/a/#!/account/auth-tokens).SCREEPS_LOCAL_PASSWORD=your_password

```

## Running Local Server

Get your token from [Screeps Account Settings](https://screeps.com/a/#!/account/auth-tokens).

To run a local Screeps server, ensure you have Docker installed. Copy the server/.env.example to server/.env and replace your steam key and path to nw. Then run:

## Running Local Server

```bash

cd server && docker-compose up -dTo run a local Screeps server, ensure you have Docker installed. Copy the server/.env.example to server/.env and replace your steam key and path to nw. Then run:

```

```bash

## Featurescd server && docker-compose up -d

```

- Modern ES2020+ TypeScript setup

- Automatic bundling with esbuild## Features

- Strict type checking

- Hot reload development workflow- Modern ES2020+ TypeScript setup

- Support for both MMO and private servers- Automatic bundling with esbuild

- Supports `screeps.json` configuration- Strict type checking

- Contains docker-compose for local server- Hot reload development workflow

- Support for both MMO and private
- Supports `screeps.json` configuration
- Contains docker-compose for local server
