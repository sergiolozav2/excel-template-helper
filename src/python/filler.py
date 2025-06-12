import os
import sys
import json
import io
from openpyxl import Workbook, load_workbook 

def open_template(filename, sheet):
    wb = load_workbook(filename)
    ws = wb[sheet]
    return wb, ws

try:
    request = json.loads(sys.stdin.read())

    if not request:
        sys.exit(0)

    if request.get("template_path") is None:
        raise ValueError("'template_path is required in the request.")
    if request.get("sheet") is None:
        raise ValueError("'sheet' is required in the request.")
    if request.get("data") is None:
        raise ValueError("'data' is required in the request.")

    if not isinstance(request["data"], list):
        raise ValueError("'data' must be a list of dictionaries.")

    (wb, ws) = open_template(request["template_path"], request["sheet"])  # Fixed attribute access

    start_row = request.get("start_row", 1)
    start_col = request.get("start_col", 1)

    for row_index, rows in enumerate(request["data"]):
        for col_index, value in enumerate(rows):
            ws.cell(row=start_row + row_index, column=start_col + col_index, value=value)
    
    buffer = io.BytesIO()
    wb.save(buffer)
    buffer.seek(0)
    
    sys.stdout.buffer.write(buffer.read())

except Exception as e:
    print(f"Python Error: {e}", file=sys.stderr)
    sys.exit(1)


