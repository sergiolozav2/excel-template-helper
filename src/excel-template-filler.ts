import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url); 
const pythonScriptPath = path.join(path.dirname(__filename), "python");
const pythonFillerPath = path.resolve(pythonScriptPath, "filler.py");

let pythonExecutable = path.join(__dirname, ".venv", "bin", "python3");
if (process.platform === "win32") {
  pythonExecutable = path.join(__dirname, ".venv", "Scripts", "python.exe");
}

export function excelTemplateFiller(params: GenerateExcelReportParams): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const pythonProcess = spawn(pythonExecutable, [pythonFillerPath]);

    const stdoutChunks: Uint8Array[] = [];
    const stderrChunks: Uint8Array[] = [];

    pythonProcess.stdout.on("data", (chunk) => {
      stdoutChunks.push(chunk);
    });

    pythonProcess.stderr.on("data", (chunk) => {
      stderrChunks.push(chunk);
    });

    pythonProcess.on("close", (code) => {
      if (code !== 0) {
        const errorOutput = Buffer.concat(stderrChunks).toString();
        reject(new Error(`Python script exited with code ${code}: ${errorOutput}`));
        return;
      }

      const excelBuffer = Buffer.concat(stdoutChunks);
      resolve(excelBuffer);
    });

    pythonProcess.on("error", (err) => {
      reject(err);
    });

    pythonProcess.stdin.write(JSON.stringify(params));
    pythonProcess.stdin.end();
  });
}

type GenerateExcelReportParams = {
  data: unknown[];
  start_row: number;
  start_col: number;
  template_path: string;
  sheet: string;
};
