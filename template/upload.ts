import fs from "fs";
import path from "path";
import fetch from "node-fetch";
import "dotenv/config";

const SCREEPS_TOKEN = process.env.SCREEPS_TOKEN!;
const BRANCH = process.env.SCREEPS_BRANCH ?? "default";
const DIST_DIR = "dist"; // where esbuild puts .js files

async function upload() {
  // read all built files
  const files = fs.readdirSync(DIST_DIR);

  const modules: Record<string, string> = {};
  for (const f of files) {
    if (f.endsWith(".js")) {
      const name = path.basename(f, ".js"); // "main" from "main.js"
      const code = fs.readFileSync(path.join(DIST_DIR, f), "utf8");
      modules[name] = code;
    }
  }

  const response = await fetch("https://screeps.com/api/user/code", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Token": SCREEPS_TOKEN,
      "X-Username": "unused", // still required, but ignored if using token
    },
    body: JSON.stringify({ branch: BRANCH, modules }),
  });

  const result = await response.json();
  console.log("Upload result:", result);
}

upload().catch((err) => {
  console.error("Error uploading:", err);
  process.exit(1);
});
