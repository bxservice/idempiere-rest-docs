---
sidebar_position: 5
---

# Print a Record

`GET /api/v1/models/{tablename}/{recordId}/print`

This method is used to print based on the print format from the model's record ID.

## URL Parameters

- `$report_type` (optional): Format of the report. Options include:
  - `PDF`
  - `HTML`
  - `CSV`
  - `XLSX`
  - `XLS`

## Returns

- `AD_PInstance_ID`
- `process`
- `summary`
- `isError`
- `reportFile`
- `reportFileName`
- `reportFileLength`
- `nodeId`