---
sidebar_position: 6
---

# Special Cases in Entity Representations

This section describes special requirements when working with certain entity types or data structures in the iDempiere REST API.

---

## Image Field Representation

When you are **creating or modifying values of an Image type column/field**, the JSON entity representation must follow this structure:

```json
{
  "id": 123,  // Optional: the foreign record ID
  "file_name": "example.jpg",  // Required: readable file name
  "url": "https://example.com/image.jpg",  // Optional: URL for the image
  "data": "base64-encoded-string"  // Required if 'url' is not used
}
```

- `id`: The foreign record ID. If not provided, a new foreign record will be created and linked to the main record.
- `file_name`: The readable file name to be stored at the foreign table.
- `url`: An optional URL from which the image can be fetched.
- `data`: A string containing the base64-encoded image data.

---