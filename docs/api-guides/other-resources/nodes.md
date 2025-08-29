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
```json
{
    "nodes": [
        {
            "id": "bd176ed0-fe80-4ffd-9fa4-01e89f9a4f85",
            "hostName": "10.8.0.10",
            "port": 5701
        }
    ]
}
```
- If cluster service is not available:
```json
{ "id": "local", "name": "string" }
```

---

### `GET /api/v1/nodes/{id}`

Retrieve information about a specific node.

**Path Parameters:**
- `id` (string): Node identifier.

**Response:**
```json
{
    "id": "bd176ed0-fe80-4ffd-9fa4-01e89f9a4f85",
    "hostName": "my-idempiere-server",
    "home": "/opt/idempiere-server",
    "os": "Linux 6.8.0-78-generic (amd64)",
    "jvm": "OpenJDK 64-Bit Server VM 17.0.16+8-Ubuntu-0ubuntu124.04.1",
    "databaseDescription": "org.postgresql.Driver@569bf23c",
    "databaseConnectionURL": "jdbc:postgresql://localhost:5432/idempieredev?encoding=UNICODE&ApplicationName=iDempiere",
    "databaseStatus": "# Connections: 10 , # Busy Connections: 0 , # Idle Connections: 10 , # Threads waiting on connection: 0 , # Min Pool Size: 10 , # Max Pool Size: 90 , # Open Transactions: 0",
    "availableProcessors": 8,
    "averageSystemLoad": 22.5,
    "memoryUsage": "Init=7,488k, Used=180,057k, Free=5,478k 2%, Committed=185,536k -1819017216%, Max=-1",
    "heapMemoryUsage": "Init=1,032,192k, Used=939,903k, Free=895,104k 48%, Committed=1,835,008k 11%, Max=16,392,192k",
    "runtime": "561217@my-idempiere-server",
    "runtimeUptime": "0'00:04:32.541",
    "threadCount": 239,
    "peakThreadCount": 454,
    "daemonThreadCount": 52,
    "totalStartedThreadCount": 533,
    "logLevel": "WARNING",
    "currentLogFile": "/opt/idempiere-server/log/idempiere.2025-08-29_0.log",
    "sessionCount": 3,
    "garbageCollectionCount": 25,
    "garbageCollectionTime": 491
}
```

---

### `GET /api/v1/nodes/{id}/logs`

Retrieve logs for a specific node.

**Path Parameters:**
- `id` (string): Node identifier.

**Response:**
```json
{
    "logs": [
        {
            "fileName": "/opt/idempiere-server/log/AuthFailure.log",
            "fileSize": 22008
        },
        {
            "fileName": "/opt/idempiere-server/log/idempiere.2025-08-28_9.log",
            "fileSize": 1550
        },
        {
            "fileName": "/opt/idempiere-server/log/idempiere.2025-08-29_0.log",
            "fileSize": 5647
        }
    ]
}
```

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
```json
{
    "currentLogFile": "/opt/idempiere-server/log/idempiere.2025-08-29_1.log"
}
```

---

### `POST /api/v1/nodes/{id}/logs/rotate`

Rotate the logs for a specific node.

**Path Parameters:**
- `id` (string): Node identifier.

**Response:**
```json
{
    "currentLogFile": "/opt/idempiere-server/log/idempiere.2025-08-29_2.log"
}
```

---

### `PUT /api/v1/nodes/{id}/logs/level/{logLevel}`

Update the log level for a specific node.

**Path Parameters:**
- `id` (string): Node identifier.
- `logLevel` (string): New log level.

**Response:**
```json
{
    "logLevel": "WARNING"
}
```

---

## Error Responses

All endpoints may return error responses in the following format:
```json
{ "status": "HTTP status code", "title": "Error title", "detail": "Error details" }
```

For example:
```json
{
    "title": "Invalid Node Id",
    "status": 404,
    "detail": "No match found for node id: xd176ed0-fe80-4ffd-9fa4-01e89f9a4f85"
}
```

---
