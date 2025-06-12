import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const VENV_DIR = path.join(__dirname, "..", "dist", ".venv");

function findPythonCommand() {
  try {
    execSync("python3 --version", { stdio: "ignore" });
    return "python3";
  } catch (e) {
    try {
      execSync("python --version", { stdio: "ignore" });
      return "python";
    } catch (e2) {
      return null;
    }
  }
}

export function setupPythonEnv() {
  console.log("Setting up Python environment for my-npm-library...");

  const pythonCmd = findPythonCommand();

  if (!pythonCmd) {
    console.error("--- ERROR ---");
    console.error("Python is not installed or not in your PATH.");
    console.error("This library needs Python to work. Please install it.");
    console.error("---------------");
    process.exit(0);
  }

  // 1. Create a virtual environment
  if (!fs.existsSync(VENV_DIR)) {
    console.log(`Using '${pythonCmd}' to create a virtual environment...`);
    execSync(`${pythonCmd} -m venv ${VENV_DIR}`);
  } else {
    console.log("Virtual environment already exists.");
  }

  // 2. Install dependencies using the venv's pip
  console.log("Installing Python dependencies...");
  let pipCmd;
  if (process.platform === "win32") {
    pipCmd = path.join(VENV_DIR, "Scripts", "pip.exe");
  } else if (process.platform === "darwin" || process.platform === "linux") {
    pipCmd = path.join(VENV_DIR, "bin", "pip");
    try {
      execSync(`chmod +x "${pipCmd}"`);
    } catch (error) {
      console.warn(
        `Warning: Could not set execute permissions on pip: ${error}`
      );
    }
  } else {
    console.warn(
      `Warning: Unsupported platform ${process.platform}, trying Unix-style paths`
    );
    pipCmd = path.join(VENV_DIR, "bin", "pip");
  }

  const reqsFile = path.join(__dirname, "requirements.txt");
  execSync(`"${pipCmd}" install -r "${reqsFile}"`);

  console.log("✅ Python setup complete!");
}
