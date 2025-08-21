---
sidebar_position: 9
id: node-resource
title: NodeResource API
sidebar_label: NodeResource
---

# NodeResource API

Manage nodes in the system including retrieving node information and handling log operations.

## Endpoints

### `GET /api/v1/nodes`

Retrieve a list of all nodes.

**Response:**

- If cluster service is available:
{ "nodes": [ { "id": "string", "hostName": "string", "port": number } ] }
- If cluster service is not available:
{ "id": "local", "name": "string" }

---

### `GET /api/v1/nodes/{id}`

Retrieve information about a specific node.

**Path Parameters:**
- `id` (string): Node identifier.

**Response:**
{ "id": "string", "hostName": "string", "home": "string", "os": "string", "jvm": "string", "databaseDescription": "string", "databaseConnectionURL": "string", "databaseStatus": "string", "availableProcessors": number, "averageSystemLoad": number, "memoryUsage": number, "heapMemoryUsage": number, "runtime": "string", "runtimeUptime": "string", "threadCount": number, "peakThreadCount": number, "daemonThreadCount": number, "totalStartedThreadCount": number, "logLevel": "string", "currentLogFile": "string", "sessionCount": number, "garbageCollectionCount": number, "garbageCollectionTime": number }

---

### `GET /api/v1/nodes/{id}/logs`

Retrieve logs for a specific node.

**Path Parameters:**
- `id` (string): Node identifier.

**Response:**
{ "logs": [ { "fileName": "string", "fileSize": number } ] }

---

### `GET /api/v1/nodes/{id}/logs/file`

Download a log file for a specific node.

**Path Parameters:**
- `id` (string): Node identifier.

**Query Parameters:**
- `fileName` (string, optional): Name of the log file.
- `asJson` (string, optional): If set, returns the log as JSON.

**Response:**
- `200 OK` — Log file as octet-stream, HTML, plain text, or JSON.

---

### `DELETE /api/v1/nodes/{id}/logs`

Delete all logs for a specific node.

**Path Parameters:**
- `id` (string): Node identifier.

**Response:**
{ "currentLogFile": "string" }

---

### `POST /api/v1/nodes/{id}/logs/rotate`

Rotate the logs for a specific node.

**Path Parameters:**
- `id` (string): Node identifier.

**Response:**
{ "currentLogFile": "string" }

---

### `PUT /api/v1/nodes/{id}/logs/level/{logLevel}`

Update the log level for a specific node.

**Path Parameters:**
- `id` (string): Node identifier.
- `logLevel` (string): New log level.

**Response:**
{ "logLevel": "string" }

---

## Error Responses

All endpoints may return error responses in the following format:
{ "status": "HTTP status code", "title": "Error title", "detail": "Error details" }

---
