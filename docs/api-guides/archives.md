---
sidebar_position: 7
---

# Archives API

iDempiere stores generated documents — most commonly printed report PDFs such as
invoices — as **archives** (`AD_Archive` records) tied to the originating record.
The Archives API lets you list and download these previously generated documents.

This is different from the [Print endpoint](./other-resources/print.md), which always
**re-renders** the document on demand. The archive endpoints return the **existing**
stored binaries, exactly as they were generated.

The same endpoints are available under `api/v1/views` for [REST Views](./rest-views.md),
where they behave identically but operate on the configured view instead of the raw model.

---

## `GET /api/v1/models/{tableName}/{id}/archives`

Lists the archives of a record, most recent first.

**Path Parameters:**

- `tableName`: Table name (e.g. `c_invoice`)
- `id`: Record id (integer) or record uuid

**Returns:**

An `archives` array, each entry containing:

- `id`: `AD_Archive_ID` of the archive entry
- `name`: Archive name (when set)
- `contentType`: MIME type of the archive (e.g. `application/pdf`)
- `isReport`: `true` when the archive was produced by a report/print
- `processId`: `AD_Process_ID` that generated the archive (when set)
- `created`: Timestamp the archive was created

**Example:**

```json
{
  "archives": [
    {
      "id": 1000123,
      "name": "Invoice_1000045.pdf",
      "contentType": "application/pdf",
      "isReport": true,
      "processId": 110,
      "created": "2026-06-19 09:00:00.0"
    }
  ]
}
```

---

## `GET /api/v1/models/{tableName}/{id}/archives/{archiveId}`

Retrieves the content of a single archive entry.

**Path Parameters:**

- `tableName`: Table name (e.g. `c_invoice`)
- `id`: Record id (integer) or record uuid
- `archiveId`: `AD_Archive_ID` of the archive entry (from the list endpoint above)

**Query Parameter (optional):**

- `json`: When not empty, returns a JSON object with base64 encoded content
  instead of the raw binary stream.

**Returns:**

- By default, the file content as `application/octet-stream` (for example, a PDF).
  The MIME type is returned in the `Content-Type` response header.
- With `json`, a JSON object with a single `data` field holding the base64 encoded content.

**Example (base64):**

```
GET /api/v1/models/c_invoice/1000045/archives/1000123?json=true
```

```json
{
  "data": "JVBERi0xLjQ..."
}
```

---

:::note
Archives are system-generated and read-only through the REST API. To produce a new
archive, run the relevant print/report (see the
[Processes API](./processes.md)); to upload arbitrary files against a record, use
[Attachments or the Uploads API](./uploads.md).
:::
