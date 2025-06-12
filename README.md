# excel-template-helper

A simple Node.js package to fill a rectangular area in an Excel file and returns the file.  
This package is powered by [openpyxl](https://openpyxl.readthedocs.io/) to handle Excel file manipulation.


## Requirements
- Python

## Features

- Fill a specified rectangle (rows × columns) in an Excel sheet with your data.
- Uses a template `.xlsx` file and writes to a specific sheet, starting at any row and column.

## Usage

```ts
import { excelTemplateFiller } from "excel-template-helper";

const buffer = await excelTemplateFiller({
  data: [
    [1, 2, 3],
    [4, 5, 6]
  ],
  start_row: 2,
  start_col: 1,
  template_path: "path/to/template.xlsx",
  sheet: "Sheet1"
});

// buffer is a Node.js Buffer containing the filled Excel file