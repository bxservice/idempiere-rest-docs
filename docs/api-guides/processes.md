---
sidebar_position: 3
---

# Processes API

Working with processes and reports via `/api/v1/processes`.

---

## Get All Processes

**GET** `/api/v1/processes`

Retrieve the list of available processes.

### URL Parameters

- `$filter` (optional): Used to filter the query.

### Returns

An array of PO JSON records from the `AD_Process` queried.

---

## Get Process Information

**GET** `/api/v1/processes/{process_value}`

Retrieve metadata and information from a specific process.

### URL Parameters

- `{process_value}`: The slug value (lowercase) of the process.

### Returns

A single PO JSON record from the queried `AD_Process`.

---

## Run a Process

**POST** `/api/v1/processes/{process_value}`

Execute a process directly.

### URL Parameters

- `{process_value}`: The slug value (lowercase) of the process.  
  Example: `https://demo.globalqss.com/api/v1/processes/translationimpexp`

### Body

Provide the process parameters in JSON format. Example:

```json
{
  "ImportOrExport": "export",
  "AD_Language": "es_CO",
  "IsOnlyCentralizedData": true
}
```

#### Special Parameters for Reports

- `report-type`: HTML | CSV | XLS | PDF (default)
- `is-summary`
- `print-format-id`

#### Special Parameters for Buttons

- `table-id` or `model-name`
- `record-id`

### Returns

A JSON object containing:

- `AD_PInstance_ID`
- `process`
- `summary`
- `isError`
- `nodeId`
- `logs`: Array of logs from the process

If a report is generated:

- `reportFile`: base64 encoded content
- `reportFileName`
- `reportFileLength`

If the process generates an export file:

- `exportFile`: base64 encoded content
- `exportFileName`
- `exportFileLength`

---

## Get All Running Jobs

**GET** `/api/v1/processes/jobs`

Retrieve currently running background jobs.

### Returns

An array of JSON records from `AD_PInstance`.

---

## Get Job Information

**GET** `/api/v1/processes/jobs/{ad_pinstance_id}`

Retrieve detailed information about a specific job.

### URL Parameters

- `{ad_pinstance_id}`: ID of the background job.

### Returns

A JSON record of the `AD_PInstance`.

---

## Run a Process as Background Job

**POST** `/api/v1/processes/jobs/{process_value}`

Execute a process in background as a job.

### URL Parameters

- `{process_value}`: The slug value (lowercase) of the process.  
  Example: `https://demo.globalqss.com/api/v1/processes/jobs/translationimpexp`

### Body

Same format as the regular process execution:

```json
{
  "ImportOrExport": "export",
  "AD_Language": "es_CO"
}
```

#### Additional Parameter

- `notification-type`: E (Email), N (Notification), or B (Both)

### Returns

A JSON object with scheduling information for the background job.