---
sidebar_position: 7
---

# Batch Request

**Endpoint:** `POST /api/v1/batch`

This endpoint allows executing one or more sub-requests in a single transaction.

## Request Body

An array of sub-request objects. Each object includes:

- `method`: HTTP method `"POST"`, `"PUT"` or `"DEL"`
- `path`: Sub-request resource path, e.g. `"v1/model/C_Order"`
- `body`: JSON body for the sub-request (if applicable)

### Example

```json
[
  {
    "method": "POST",
    "path": "v1/model/C_Order",
    "body": {
      "DocumentNo": "ORD001",
      "C_BPartner_ID": 1000000
    }
  },
  {
    "method": "PUT",
    "path": "v1/model/C_Order/1000012",
    "body": {
      "DocStatus": "CO"
    }
  },
  {
    "method": "DELETE",
    "path": "v1/model/C_Order/1000013"
  }
]
```

## Response

An array of results from each sub-request. Each object includes:

- `status`: HTTP status text (e.g., "OK", "Created")
- `statusCode`: HTTP status code (e.g., 200, 201, 400)
- `body`: JSON return from the sub-request (if available)

## Notes

- You can include various types of requests in the same batch, including creation, update, deletion, and even running processes.
- You can create base data (like business partners) and use them in later requests (e.g., creating orders) within the same batch request.
- If any of the requests fail, everything is rollback and an error is returned.