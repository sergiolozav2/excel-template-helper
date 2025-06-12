import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let pythonExecutable = path.join(__dirname, ".venv", "bin", "python3");
if (process.platform === "win32") {
  pythonExecutable = path.join(__dirname, ".venv", "Scripts", "python.exe");
}

const pythonFillerScriptPath = path.resolve(
  path.join(__dirname, "python"),
  "filler.py"
);

export function getPythonPath() {
  if (process.env.PYTHON_PATH) {
    return {
      pythonExecutable: process.env.PYTHON_PATH,
      pythonFillerScriptPath,
    };
  }

  return { pythonExecutable, pythonFillerScriptPath };
}
