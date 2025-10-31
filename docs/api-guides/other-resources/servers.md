---
sidebar_position: 10
id: server-resource
title: ServerResource API
sidebar_label: ServerResource
---

# ServerResource API

REST API endpoints for managing iDempiere server instances and schedulers.

It handles operations such as starting/stopping servers, viewing logs, and managing schedulers.

## Endpoints

### `GET /api/v1/servers`

Returns a list of all server instances.

**Sample Response:**

```json
{
    "servers": [
        {
            "id": "Scheduler50002",
            "name": "Housekeeping T_InventoryValue",
            "nodeId": "5e40ca82-682a-4957-aec1-04c9a2fe3a20",
            "hostName": "10.7.47.1",
            "port": 5701,
            "started": true
        },
        {
            "id": "Scheduler50009",
            "name": "Housekeeping T_TrialBalance",
            "nodeId": "5e40ca82-682a-4957-aec1-04c9a2fe3a20",
            "hostName": "10.7.47.1",
            "port": 5701,
            "started": true
        },
        {
            "id": "AlertProcessor100",
            "name": "System Alert Processor",
            "nodeId": "5e40ca82-682a-4957-aec1-04c9a2fe3a20",
            "hostName": "10.7.47.1",
            "port": 5701,
            "started": true
        },
        {
            "id": "WorkflowProcessor100",
            "name": "System Workflow Processor",
            "nodeId": "5e40ca82-682a-4957-aec1-04c9a2fe3a20",
            "hostName": "10.7.47.1",
            "port": 5701,
            "started": true
        },
        {
            "id": "AcctProcessor100",
            "name": "GardenWorld Accounting Processor",
            "nodeId": "5e40ca82-682a-4957-aec1-04c9a2fe3a20",
            "hostName": "10.7.47.1",
            "port": 5701,
            "started": true
        }
    ]
}
```

---

### `GET /api/v1/servers/{id}`

Returns detailed information about a specific server instance.

**Path Parameters:**
- `id` (string): Server instance identifier.

**Response:**
```json
{
    "id": "WorkflowProcessor100",
    "name": "System Workflow Processor",
    "nodeId": "5e40ca82-682a-4957-aec1-04c9a2fe3a20",
    "hostName": "10.7.47.1",
    "port": 5701,
    "lastRun": "Oct 31, 2025, 11:37:25 AM CET",
    "info": "#0 - Last=",
    "nextRun": "Oct 31, 2025, 1:37:25 PM CET",
    "statistics": "Run #0 - Last=0 - Total=0 - Next 0'01:40:07.952",
    "started": true,
    "sleeping": true,
    "interruptd": false
}
```

---

### `GET /api/v1/servers/{id}/logs`

Retrieves execution logs for a specific server instance.

**Path Parameters:**
- `id` (string): Node identifier.

**Response:**
```json
{
    "logs": [
        {
            "created": "Oct 31, 2025, 11:37:25 AM CET",
            "summary": "Wakeup #0 - DynPriority #0 - EndWaitTime #0 - Logs deleted=0",
            "reference": "#0 - 0'00:00:00.24",
            "error": false
        },
        {
            "created": "Oct 30, 2025, 11:08:19 AM CET",
            "summary": "Wakeup #0 - DynPriority #0 - EndWaitTime #0 - Logs deleted=0",
            "reference": "#0 - 0'00:00:00.34",
            "error": false
        }
    ]
}
```

---

### `POST /api/v1/servers/{id}/state`

Starts or stops a server instance (toggles current state).

**Path Parameters:**
- `id` (string): Server instance identifier.

**Response:**
Returns server details (same as Get Server Details).
Toggling the `"started":` between `true` and `false`

---

### `POST /api/v1/servers/{id}/run`

Triggers immediate execution of a server instance.

**Path Parameters:**
- `id` (string): Server instance identifier.

**Response:**
Returns server details (same as Get Server Details)

---

### `POST /api/v1/servers/reload`

Reloads all server configurations.

**Response:**
Returns list of all servers (same as Get All Servers)

---

### `GET /api/v1/schedulers/{id}`

Returns information about a specific scheduler.

**Path Parameters:**
- `id` (string): Scheduler identifier.

**Sample Response:**
```json
{
    "id": 100,
    "uid": "777a868e-ee1a-4d7e-9ebd-5c104c484819",
    "AD_Client_ID": {
        "propertyLabel": "Tenant",
        "id": 0,
        "identifier": "System",
        "model-name": "ad_client"
    },
    "Supervisor_ID": {
        "propertyLabel": "Supervisor",
        "id": 10,
        "identifier": "System",
        "model-name": "ad_user"
    },
    "IsActive": true,
    "AD_Process_ID": {
        "propertyLabel": "Process",
        "id": 241,
        "identifier": "Delete Notices_AD_NoteDelete",
        "model-name": "ad_process"
    },
    "CreatedBy": {
        "propertyLabel": "Created By",
        "id": 0,
        "identifier": "~System (deprecated)~",
        "model-name": "ad_user"
    },
    "Updated": "2025-10-30T11:08:20Z",
    "AD_Org_ID": {
        "propertyLabel": "Organization",
        "id": 0,
        "identifier": "*",
        "model-name": "ad_org"
    },
    "UpdatedBy": {
        "propertyLabel": "Updated By",
        "id": 10,
        "identifier": "System",
        "model-name": "ad_user"
    },
    "Created": "2004-03-06T00:39:02Z",
    "Name": "Delete Old Notes",
    "KeepLogDays": 7,
    "AD_Schedule_ID": {
        "propertyLabel": "Schedule",
        "id": 200001,
        "identifier": "7 Days",
        "model-name": "ad_schedule"
    },
    "model-name": "ad_scheduler",
    "server-id": "Scheduler100",
    "scheduler-state": "Scheduler Started",
    "node-id": "5e40ca82-682a-4957-aec1-04c9a2fe3a20",
    "node-host-name": "10.7.47.1",
    "node-port": 5701
}
```

---

### `POST /api/v1/schedulers/{id}`

Adds a scheduler to be managed by the server.

**Path Parameters:**
- `id` (string): Scheduler identifier.

**Response:**
Returns scheduler details with HTTP 201 (Created) if successful, or 409 (Conflict) if already exists

---

### `DELETE /api/v1/schedulers/{id}`

Removes a scheduler from server management.

**Path Parameters:**
- `id` (string): Scheduler identifier.

**Response:**
Returns scheduler details

---

## Error Responses

All endpoints may return error responses in the following format (example):
```json
{
    "title": "Invalid scheduler Id",
    "status": 404,
    "detail": "No match found for scheduler id: 1000"
}
```

**400 Bad Request**

Invalid request parameters (e.g., invalid scheduler ID)

**403 Forbidden**

User lacks required permissions

**404 Not Found**

Server instance or scheduler not found

**409 Conflict**

Resource already exists (e.g., scheduler already added)

**500 Internal Server Error**

Server-side error during operation execution

---
