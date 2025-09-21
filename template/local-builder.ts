import * as esbuild from "esbuild";
import { promises as fs } from "fs";
import * as path from "path";
import "dotenv/config";

const outDir = path.resolve("dist");
const localDir = process.env.SCREEPS_DIR;

if (!localDir) {
  throw new Error("SCREEPS_DIR environment variable is required");
}

const screepsDir = path.resolve(localDir);

async function startWatch() {
  const ctx = await esbuild.context({
    entryPoints: ["src/main.ts"],
    bundle: true,
    outdir: outDir,
    format: "cjs",
    platform: "node",
    sourcemap: false,
    plugins: [
      {
        name: "rebuild-notifier",
        setup(build) {
          build.onEnd(async (result) => {
            if (result.errors.length > 0) {
              console.error("❌ Build failed", result.errors);
            } else {
              console.log("✅ Build succeeded, uploading...");
              try {
                await runUpload();
                console.log("📤 Upload complete");
              } catch (err) {
                console.error("⚠ Upload failed:", err);
              }
            }
          });
        },
      },
    ],
  });

  await ctx.watch();
  console.log("👀 Watching for changes...");
}

async function runUpload() {
  // Ensure destination exists
  await fs.mkdir(screepsDir, { recursive: true });

  // Read files in dist
  const files = await fs.readdir(outDir);

  // Copy each file over
  await Promise.all(
    files.map(async (file) => {
      const src = path.join(outDir, file);
      const dest = path.join(screepsDir, file);
      await fs.copyFile(src, dest);
    })
  );
}

startWatch().catch((e) => {
  console.error(e);
  process.exit(1);
});
