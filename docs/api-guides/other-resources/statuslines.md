---
sidebar_position: 6
---

# Status Lines

## GET /api/v1/statuslines

Retrieve all active status line records configured in the dictionary ordered by Name.

You can use the query parameters `$filter` to filter the records returned.

Additionally, you can use the query parameter `with_messages` to specify that you want the resulting message returned in the payload. This means that the status line will be resolved by REST, and the result will be returned in a `message` property in the JSON response.

### Returns:

All the active status line records configured in the dictionary.
- id
- uid
- model-name
- name
- entity type
- message (optional)

---

## GET /api/v1/statuslines/statuslineid

Returns the message corresponding to the specific status line.

### Returns:

- message

### Example:
`GET /api/v1/statuslines/200024`

Returns the Core status line Dashboard_OrderCount.

```json
{ "message": "Order Count\n Top Year (2002): 4 \n Current Year: 3" }
```