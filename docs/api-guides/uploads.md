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
- `presignedURL`: pre-signed URL for PUT api/v1/upload/\{uploadId\}/chunks/\{chunkOrder\}

---

## `PUT /api/v1/uploads/{uploadId}/chunks/{chunkOrder}`

Uploads a file chunk.

**Headers:**

- `X-Total-Chunks`: Total expected number of chunks
- `X-Content-SHA256`: Hash of the chunk

**Returns:**

- `uploadId`, `chunkOrder`, `receivedSize`, `message`, `isLastChunk`
- `isLastChunk`: true if the just uploaded chunk is the last chunk receive and will trigger completion of the upload request

---

## `GET /api/v1/uploads/{uploadId}`

Gets upload session status.

**Query Parameter (optional):**

- `expiresInSeconds`: Expiration for presigned URL

**Returns:**

- Upload session metadata, uploaded chunk info, image Id (for IMAGE upload location), optional `presignedURL`
- `presignedURL`: pre-signed URL for GET api/v1/uplods/\{uploadId\} and GET api/v1/uplods/\{uploadId\}/file if a positive value is provided for the expireInSeconds query parameter

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

- Upload status for all pending upload sessions

---

## `POST /api/v1/uploads/{uploadId}/copy`

Copies uploaded file to a destination record.

**Body Parameters:**

- `copyLocation`: Destination type (`ARCHIVE`, `IMAGE`, `ATTACHMENT`)
- `tableName` (optional): Table name
- `recordId` (optional): Record ID or UUID

**Returns:**

- Upload session id and destination record metadata (table name, id and uuid)