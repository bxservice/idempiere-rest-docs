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
- `200 OK` — JSON array of nodes.

---

### `GET /api/v1/nodes/{id}`

Retrieve information about a specific node.

**Path Parameters:**  
- `id` (string): Node identifier.

**Response:**  
- `200 OK` — JSON object with node details.

---

### `GET /api/v1/nodes/{id}/logs`

Retrieve logs for a specific node.

**Path Parameters:**  
- `id` (string): Node identifier.

**Response:**  
- `200 OK` — JSON array of log entries.

---

### `GET /api/v1/nodes/{id}/logs/file`

Download a log file for a specific node.

**Path Parameters:**  
- `id` (string): Node identifier.

**Query Parameters:**  
- `fileName` (string, optional): Name of the log file.  
- `asJson` (string, optional): If set, returns the log as JSON.

**Response:**  
- `200 OK` — Log file as octet-stream, HTML, or plain text.

---

### `DELETE /api/v1/nodes/{id}/logs`

Delete all logs for a specific node.

**Path Parameters:**  
- `id` (string): Node identifier.

**Response:**  
- `200 OK` — JSON result of the deletion.

---

### `POST /api/v1/nodes/{id}/logs/rotate`

Rotate the logs for a specific node.

**Path Parameters:**  
- `id` (string): Node identifier.

**Response:**  
- `200 OK` — JSON result of the rotation.

---

### `PUT /api/v1/nodes/{id}/logs/level/{logLevel}`

Update the log level for a specific node.

**Path Parameters:**  
- `id` (string): Node identifier.  
- `logLevel` (string): New log level.

**Response:**  
- `200 OK` — JSON result of the update.

---

## Constants

- `LOCAL_ID = "local"`
- `CURRENT_FILE_NAME = "current"`
