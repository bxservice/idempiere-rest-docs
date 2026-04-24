---
sidebar_position: 100
---

# Reference

The **Reference** endpoint allows you to retrieve iDempiere reference data, including list validations and table validations.

**Supported Reference Types**: Only list and table validation references are supported.

## Endpoint  GET /api/v1/references/[refID]


## Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `refID` | `string` | The reference identifier. Accepts a numeric ID, a UUID, or the reference **Name**. |

## Response

The response format depends on the **Validation Type** of the reference.

---

### List Validation (`L`)

Returns the reference metadata along with its list of values.

GET /api/v1/references/_YesNo
**Response Body**
```json
{
  "id": 319,
  "uid": "de0c3f82-e8fa-4118-939a-9876ec70f1a8",
  "Name": "_YesNo",
  "ValidationType": {
    "propertyLabel": "Validation type",
    "id": "L",
    "identifier": "List Validation",
    "model-name": "ad_ref_list"
  },
  "model-name": "ad_reference",
  "reflist": [
    {
      "value": "N",
      "name": "No"
    },
    {
      "value": "Y",
      "name": "Yes"
    }
  ]
}
```

| Field | Description |
|-------|-------------|
| `reflist` | Array of value/name pairs defined in the reference list |

---

### Table Validation (`T`)

Returns records from the referenced table filtered and sorted according to the reference configuration.

GET /api/v1/references/C_UOM
GET /api/v1/references/114
GET /api/v1/references/39a31dc2-7c5e-44df-bb29-055fff18954d	

**Response Body**

These three calls return the same set:

```json
{
    "reftable": [
        {
            "id": 50003,
            "uid": "a9b9be37-5dfe-436e-a0a7-c7c33a66e4c3",
            "model-name": "c_uom"
        },
        {
            "id": 102,
            "uid": "68535d3f-596a-4400-9f72-ad032ec9e145",
            "model-name": "c_uom"
        },
        {
            "id": 100,
            "uid": "43e9ced9-60f4-4e15-adaa-2844637f4e1e",
            "model-name": "c_uom"
        },
        {
            "id": 101,
            "uid": "ddba8d0f-26ca-4fe4-8253-a60d0dd22d1b",
            "model-name": "c_uom"
        },
        {
            "id": 106,
            "uid": "c2dbbdb4-433e-47d2-91bc-6e2b00c2644b",
            "model-name": "c_uom"
        },
        {
            "id": 105,
            "uid": "a409bde4-f5c9-4c07-9752-99602fccd687",
            "model-name": "c_uom"
        },
        {
            "id": 104,
            "uid": "e12aed18-09e9-4fd1-ad41-a9d5156b37ee",
            "model-name": "c_uom"
        },
        {
            "id": 107,
            "uid": "828cba55-5a25-47b7-ba18-c86874223324",
            "model-name": "c_uom"
        },
        {
            "id": 108,
            "uid": "648f31ee-4630-4ff5-b6e2-6df0946f4ab4",
            "model-name": "c_uom"
        },
        {
            "id": 109,
            "uid": "f622fe59-cbbd-4835-96b2-bb8eb5b8bf99",
            "model-name": "c_uom"
        },
        {
            "id": 200001,
            "uid": "f058dfd3-89f5-46e8-b2b8-11df0505dffa",
            "model-name": "c_uom"
        },
        {
            "id": 50001,
            "uid": "c0776c7c-f653-4663-89ed-cb2bf92b6998",
            "model-name": "c_uom"
        },
        {
            "id": 50000,
            "uid": "3bb47b84-d840-4037-b1c6-dfb15503e590",
            "model-name": "c_uom"
        },
        {
            "id": 50002,
            "uid": "fd31e3a5-714e-41ed-ae67-33c9c075160c",
            "model-name": "c_uom"
        },
        {
            "id": 103,
            "uid": "06edf453-43b0-41f3-9767-1dcc0dba33de",
            "model-name": "c_uom"
        }
    ]
}
```

| Field | Description |
|-------|-------------|
| `reftable` | Array of records from the target table. Each record includes the **Key** column, the **Display** column, and optionally the **Value** column if configured |

:::note
Only active records are returned. Access filters are applied based on the logged-in user's permissions.
:::

---

## Error Responses

| HTTP Status | Reason |
|-------------|--------|
| `404 Not Found` | No reference found matching the provided `refID` |
| `404 Not Found` | Reference is a Table Validation but no `AD_Ref_Table` configuration was found |
| `501 Not Implemented` | Reference uses Data Validation, which is not supported |

