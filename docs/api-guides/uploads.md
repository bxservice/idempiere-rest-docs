---
sidebar_position: 6
---

# Uploads API
 
The iDempiere REST API supports uploading large files to be used later for attachments, images, or archives. This is especially useful when dealing with base64-based operations.

---

## `POST /api/v1/uploads`

Initiates a new upload session.

**Body Parameters:**

- `fileName`: Name of the file to be uploaded
- `contentType`: MIME type (e.g. image/png)
- `fileSize`: Total file size in bytes
- `chunkSize`: Size of each chunk
- `sha256`: SHA-256 hash of the file content
- `uploadLocation`: One of `ARCHIVE`, `ATTACHMENT`, or `IMAGE`
- `expiresInSeconds`: Expiration time for the session

**Returns:**

- `uploadId`, `chunkSize`, `expiresAt`, `presignedURL`

---

## `PUT /api/v1/uploads/{uploadId}/chunks/{chunkOrder}`

Uploads a file chunk.

**Headers:**

- `X-Total-Chunks`: Total expected number of chunks
- `X-Content-SHA256`: Hash of the chunk

**Returns:**

- `uploadId`, `chunkOrder`, `receivedSize`, `message`, `isLastChunk`

---

## `GET /api/v1/uploads/{uploadId}`

Gets upload session status.

**Query Parameter (optional):**

- `expiresInSeconds`: Expiration for presigned URL

**Returns:**

- Upload session metadata, uploaded chunk info, optional `presignedURL`

---

## `DELETE /api/v1/uploads/{uploadId}`

Cancels an upload session and deletes temporary data.

**Returns:**

- `message`: Status of the cancellation

---

## `GET /api/v1/uploads/{uploadId}/file`

Retrieves uploaded file content.

**Query Parameter (optional):**

- `asJson`: Return as base64 JSON instead of binary

**Returns:**

- File data in `application/octet-stream`, `text/plain`, or `text/html`

---

## `GET /api/v1/uploads`

Lists pending uploads for the current user.

**Returns:**

- A list of upload session metadata

---

## `POST /api/v1/uploads/{uploadId}/copy`

Copies uploaded file to a destination record.

**Body Parameters:**

- `copyLocation`: Destination type (`ARCHIVE`, `IMAGE`, `ATTACHMENT`)
- `tableName` (optional): Table name
- `recordId` (optional): Record ID or UUID

**Returns:**

- Upload and destination record metadata