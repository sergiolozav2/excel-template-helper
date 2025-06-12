import {describe, expect, it} from "vitest"
import { excelTemplateFiller } from "../excel-template-filler.js";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('Excel Template Filler', () => {
  it('should fill the template with data', async () => {

    const file = await excelTemplateFiller({
        data: [
            ["2025-06-11T00:00:00.000Z", "Apple", 35, 34],
            ["2021", "Banana", 30, 32],
            ["2022", "Cherry", 28, 30],
            ["2023", "Date", 25, 26]
        ], 
        start_row: 2, 
        start_col: 1, 
        sheet: "Datos", 
        table_name: "Table1",
        template_path: path.join(__dirname, "templates", "template-test-1.xlsx"),
    })
    await fs.writeFile(path.join("output.xlsx"), file)

  });

})