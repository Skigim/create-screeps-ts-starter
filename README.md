# Create Screeps TypeScript Starter

Modern TypeScript starter template for [Screeps MMO](https://screeps.com/) with esbuild and hot reloading.

## Quick Start

```bash
# Create a new Screeps bot project
pnpm create @tigatok/screeps-ts-starter my-screeps-bot
cd my-screeps-bot

# Install dependencies
pnpm install

# Set up your Screeps token
cp .env.example .env
# Edit .env with your token from https://screeps.com/a/#!/account/auth-tokens

# Start developing with hot reload
pnpm watch
```

## What's Included

- **⚡ Fast builds** with esbuild
- **🔥 Hot reload** - automatically uploads on file changes
- **📁 Local development** - option to copy files to local Screeps client
- **🎯 Modern TypeScript** - strict mode with latest features
- **📦 Zero config** - works out of the box

## Available Scripts

```bash
pnpm build        # Build for production
pnpm upload       # Upload to Screeps servers
pnpm push         # Build + upload
pnpm watch        # Watch files + auto upload
pnpm watch:local  # Watch files + copy to local client
```

## Configuration

Add your Screeps token to `.env`:

```env
SCREEPS_TOKEN=your_token_here
SCREEPS_BRANCH=default
```

Get your token from [Screeps Account Settings](https://screeps.com/a/#!/account/auth-tokens).

## Features

- Modern ES2020+ TypeScript setup
- Automatic bundling with esbuild
- Strict type checking
- Hot reload development workflow
- Support for both MMO and private
