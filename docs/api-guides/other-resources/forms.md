---
sidebar_position: 5
---

# Forms

## Endpoint: `GET /api/v1/forms`

This endpoint returns a list of available forms (`AD_Form`) in the system.

### URL Parameters

- `$filter` (optional): Used to filter the query.

### Returns

An array of PO JSON records from the queried forms.

Example:

```json
[
  {
    "id": 100,
    "uid": "a1b2c3d4",
    "Name": "Form A",
    "Description": "This is a sample form.",
    "model-name": "ad_form"
  },
  ...
]
```