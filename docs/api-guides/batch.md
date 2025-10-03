---
sidebar_position: 7
---

# Batch Request

**Endpoint:** `POST /api/v1/batch`

This endpoint allows executing one or more sub-requests.

**Optional parameter:**

The `transaction` parameter determines whether all batch requests should be processed within a single database transaction.  The default is `true`

If transaction is `true`, the method will roll back all changes if any request in the batch fails, ensuring atomicity.  All requests are executed in single transaction. Processing of request stop when it hit the first error.

If transaction is `false`, each request is processed in its own transaction, so failures in one request do not affect others.  All request will be processed even when some has error. Caller needs to check the status code of each response item to find out whether the execution of a particular request is success or fail.

**Example:** `POST /api/v1/batch?transaction=false`

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
