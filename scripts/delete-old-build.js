import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const destDir = path.join(__dirname, "..", "dist");

function main() {
  if (fs.existsSync(destDir)) {
    fs.rmSync(destDir, { recursive: true, force: true });
    console.log(`Deleted folder: ${destDir}`);
  } else {
    console.log(`Folder does not exist: ${destDir}`);
  }
}

main();
