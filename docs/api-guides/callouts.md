---
sidebar_position: 5
---

# Callouts API

Execute field-level callouts without saving records via `/api/v1/callout/{windowSlug}/{tabSlug}`.

This endpoint allows client applications to fire iDempiere callouts and retrieve the changed fields — all without persisting anything to the database. This is useful for building dynamic UIs that react to field changes in real time.

---

## Fire a Callout

**POST** `/api/v1/callout/{windowSlug}/{tabSlug}`

Execute callouts triggered by a field value change and return the fields that were modified.

### URL Parameters

- `{windowSlug}`: The slug (lowercase, hyphenated) of the window name. Example: `sales-order`
- `{tabSlug}`: The slug of the tab name. Example: `order-line`

### Body

```json
{
  "columnName": "M_Product_ID",
  "value": 123,
  "record": {
    "C_BPartner_ID": 100,
    "M_Warehouse_ID": 103
  },
  "recordId": 0
}
```

- `columnName` (required): The column whose value change triggers the callout.
- `value` (required): The new value for the trigger column. Use `null` to clear the field.
- `record` (optional): An object of existing field values to set on the record before firing the callout. This provides context so the callout can read related field values.
- `recordId` (optional): The ID of an existing record to load as context. Use `0` or omit for a new (unsaved) record.

### Returns

A JSON object with a `changedFields` property containing only the fields that were modified by the callout:

```json
{
  "changedFields": {
    "C_UOM_ID": 100,
    "M_AttributeSetInstance_ID": 0,
    "QtyOrdered": 1
  }
}
```

:::tip
The trigger column itself is excluded from `changedFields` — only side-effect changes are returned.
:::

### Error Responses

| Status | Condition |
|--------|-----------|
| 400 | Missing `columnName`; malformed `record` or `recordId`; or invalid `value` type for the target column (`null` is allowed to clear) |
| 403 | User role does not have access to the window |
| 404 | Window, tab, column, or record not found |
| 500 | Callout execution error |

Error body example:

```json
{
  "error": "Window not found: invalid-window"
}
```

---

## How It Works

1. The endpoint resolves the window and tab from the URL slugs using base-language names, so it works consistently across locales.
2. If `recordId` is provided and greater than 0, the existing record is loaded. Otherwise, a new record is initialized.
3. Field values from `record` are applied to set up the context.
4. A snapshot of all field values is taken (before state).
5. The trigger column is set to `value`, which fires any registered callouts via `GridTab.processFieldChange()`.
6. A second snapshot is compared against the first to detect which fields changed.
7. The record is discarded — nothing is saved to the database.

---

## Field Metadata: hasCallout Flag

The Window fields metadata endpoint also includes a `hasCallout` boolean flag for each field:

**GET** `/api/v1/windows/{windowSlug}/{tabSlug}/fields`

```json
{
  "columnName": "M_Product_ID",
  "hasCallout": true
}
```

This flag is `true` when the field has callouts registered via either:

- **AD_Column.Callout** — traditional callout class references configured in the Application Dictionary
- **IColumnCalloutFactory** — OSGi-based callout plugins discovered at runtime via `Core.findCallout()`

Client applications can use this flag to show visual indicators on fields that have automatic side effects.
