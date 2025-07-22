---
sidebar_position: 4
---

# Workflows API

## GET /api/v1/workflow

Returns all suspended, non-processed workflow nodes for the current user.

### Response:

- `id`
- `uid`
- `model-name`
- `node-name`
- `node-description`
- `priority`
- `summary`
- `node-help`
- `history-records`
- `table-name`
- `ad_table_id`
- `record_id`
- `node-approval`
- `node-confirmation`
- `created`

---

## GET /api/v1/workflow/userid

Returns all suspended, non-processed workflow nodes for the specified user ID.

### Parameters:
- `userid` - The ID of the user whose workflow nodes you want to retrieve

### Example:
`/api/v1/workflow/100`

### Response:
Same as above.

---

## PUT /api/v1/workflow/approve/nodeid

Approves a workflow node (only applicable to nodes of type Approval).

### Body Parameters:
```json
{
  "message": "This is an example message for approval" // Optional
}
```

### Response:
Confirmation of the approval.

---

## PUT /api/v1/workflow/reject/nodeid

Rejects a workflow node (only applicable to nodes of type Approval).

### Body Parameters:
```json
{
  "message": "This is an example message for rejection" // Optional
}
```

### Response:
Confirmation of the rejection.

---

## PUT /api/v1/workflow/forward/nodeid

Forwards a workflow node to a specific user (only applicable to nodes of type Approval).

### Body Parameters:
```json
{
  "userTo": "100",          // Mandatory - The user ID to forward to
  "message": "This is an example message for forwarding" // Optional
}
```

### Response:
Confirmation of the forwarding.

---

## PUT /api/v1/workflow/acknowledge/nodeid

Acknowledges a workflow node (used for notification-type nodes that do not require user action).

### Body Parameters:
```json
{
  "message": "This is an example message for acknowledge" // Optional
}
```

### Response:
Confirmation of the acknowledge.

---

## PUT /api/v1/workflow/setuserchoice/nodeid

Sets a user choice on a workflow node (supports columns of type List and String).

### Body Parameters:
```json
{
  "value": "Value to be set in the corresponding column", // Mandatory
  "message": "This is an example message for userschoice" // Optional
}
```

### Response:
Confirmation of the user choice.