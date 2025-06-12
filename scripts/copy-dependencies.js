import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcPath = path.join(__dirname, "..", "src", "python", "filler.py");
const destDir = path.join(__dirname, "..", "dist", "python");

export function copyPythonFiles() {
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  fs.copyFileSync(srcPath, path.join(destDir, "filler.py"));
}
