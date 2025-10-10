---
sidebar_position: 1
---

# Reading Data

The iDempiere REST API supports reading data using standard HTTP `GET` requests. These can be used to fetch collections of records, individual records by ID or UUID, and specific fields.

---

## Response Format

Each GET request returns JSON-formatted data with the following structure:

- `id`: Internal record ID
- `uid`: Universally unique identifier (UUID)
- `model-name`: The table/model name
- `{columnname}`: Each field in the record is returned using type-specific formatting:

| Type          | Format                                                                 |
|---------------|------------------------------------------------------------------------|
| **String**    | JSON string (quoted)                                                   |
| **Yes/No**    | `true` or `false`                                                      |
| **Number**    | JSON number (unquoted)                                                 |
| **Date/Time** | ISO 8601 formatted string                                              |
| **Foreign Key** | JSON object with `propertyLabel`, `id`, `identifier`, `model-name` |
| **Binary**    | Base64-encoded string                                                  |
| **Image**     | JSON object with `propertyLabel`, `id`, `data`, `model-name`          |

---

## Getting a Collection of Records

To retrieve a list of records from a table, send a GET request to:

```http
GET /api/v1/models/{table-name}
```

### Example

```http
GET /api/v1/models/c_tax
```

This returns a paginated list of tax records.

### Sample Response

```json
{
  "page-count": 4,
  "records-size": 2,
  "skip-records": 0,
  "row-count": 8,
  "array-count": 2,
  "records": [ ... ]
}
```

These fields have the following meaning:

| Field         | Description                                                                |
|---------------|------------------------------------------------------------------------|
| `page-count`    | the number of pages expected ( row-count / records-size ) |
| `records-size`  | the maximum number of records returned (parameter $top) |
| `skip-records`  | the number of records skipped (parameter $skip) |
| `row-count`     | the number of records matching the filter |
| `array-count`   | the number of records returned (size of the array records) |

These variables are also returned as Response Headers: `X-Array-Count`, `X-Page-Count`, `X-Records-Size`, `X-Row-Count` and `X-Skip-Records`

Each record in `records` follows the standard field format described above.

---

## Getting a Single Record by ID or UUID

You can request an individual record by its ID or UUID using:

```http
GET /api/v1/models/{table-name}/{id|uuid}
```

### Example

```http
GET /api/v1/models/c_tax/106
```

This returns the full JSON object for the record with ID `106`.

---

## Getting a Specific Field

To retrieve a single property from a record:

```http
GET /api/v1/models/{table-name}/{id|uuid}/{property}
```

### Example

```http
GET /api/v1/models/c_tax/106/rate
```

This returns only the `Rate` field and related metadata for the record.

### Sample Response

```json
{
    "id": 106,
    "uid": "315dacb1-415c-45e7-8dac-a9a44fa8aca7",
    "Rate": 7,
    "model-name": "c_tax"
}
```

---

Ready to filter or sort results? Continue to the [Querying Data](./querying-data) guide.