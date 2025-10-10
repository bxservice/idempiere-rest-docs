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

**Response:**

- If cluster service is available:
```json
{
  "servers": [
    {
      "id": "string",
      "name": "string",
      "nodeId": "string",
      "hostName": "string",
      "port": number,
      "started": boolean
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
  "id": "string",
  "name": "string",
  "nodeId": "string",
  "hostName": "string",
  "port": number,
  "description": "string",
  "lastRun": "datetime",
  "info": "string",
  "nextRun": "datetime",
  "statistics": "string",
  "started": boolean,
  "sleeping": boolean,
  "interruptd": boolean
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
      "created": "datetime",
      "summary": "string",
      "description": "string",
      "reference": "string",
      "textMessage": "string",
      "error": boolean
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
Returns server details (same as Get Server Details)

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

**Response:**
```json
{
  "server-id": "string",
  "scheduler-state": "string",
  "node-id": "string",
  "node-host-name": "string",
  "node-port": number,
  // Additional scheduler properties from PO serialization
}
```

---

### `POST /api/v1/schedulers/{id}/add`

Adds a scheduler to be managed by the server.

**Path Parameters:**
- `id` (string): Scheduler identifier.

**Response:**
Returns scheduler details with HTTP 201 (Created) if successful, or 409 (Conflict) if already exists

---

### `POST /api/v1/schedulers/{id}/remove`

Removes a scheduler from server management.

**Path Parameters:**
- `id` (string): Scheduler identifier.

**Response:**
Returns scheduler details

---

## Error Responses

All endpoints may return error responses in the following format:
```json
{
  "status": number,
  "title": "string",
  "detail": "string"
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
