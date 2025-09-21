#!/usr/bin/env node
import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function createProject(projectName) {
  const templateDir = path.join(__dirname, "template");
  const targetDir = path.join(process.cwd(), projectName);

  // Create project directory
  await fs.mkdir(targetDir, { recursive: true });

  // Copy template files
  await copyTemplate(templateDir, targetDir, projectName);

  console.log(`✅ Created ${projectName}`);
  console.log(`\nNext steps:`);
  console.log(`  cd ${projectName}`);
  console.log(`  pnpm install`);
  console.log(`  cp .env.example .env`);
  console.log(`  # Edit .env with your Screeps token`);
  console.log(`  pnpm watch`);
}

async function copyTemplate(src, dest, projectName) {
  const entries = await fs.readdir(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name.replace(".template", ""));

    if (entry.isDirectory()) {
      await fs.mkdir(destPath, { recursive: true });
      await copyTemplate(srcPath, destPath, projectName);
    } else {
      let content = await fs.readFile(srcPath, "utf8");

      // Replace template variables
      content = content.replace(/\{\{PROJECT_NAME\}\}/g, projectName);

      await fs.writeFile(destPath, content);
    }
  }
}

// Get project name from args
const projectName = process.argv[2] || "my-screeps-bot";
createProject(projectName).catch(console.error);
