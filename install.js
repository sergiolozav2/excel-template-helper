import { copyDependencies } from "./scripts/copy-dependencies.js";
import { setupPythonEnv } from "./scripts/setup-python-env.js";

copyDependencies();
setupPythonEnv();
console.log("Installation complete! You can now use this library.");
