---
sidebar_position: 70
---

# Menutree

The menutree endpoints return an iDempiere menu tree (`AD_Tree` of type Menu) as nested JSON. A client can use them to build its own navigation, for example a sidebar that matches the iDempiere web UI.

| Endpoint | Purpose |
|---|---|
| `GET /api/v1/menutree/{id}` | The menu tree with the given ID or UUID |
| `GET /api/v1/menutree/me` | The menu tree of the role of the current session |

Both endpoints return the same structure, and both accept the [`locale`](../global-url-parameters.md#locale) URL parameter to get translated names and descriptions.

---

## GET /api/v1/menutree/\{id\}

Retrieve all the elements of the requested menu tree. `{id}` is the `AD_Tree_ID` or the `AD_Tree_UU` of the tree.

### Example:

`GET /api/v1/menutree/10`

Returns the core primary menu tree (`AD_Tree_ID = 10`).

### Errors:

- `404 Not Found` when no menu tree matches the ID or UUID.

---

## GET /api/v1/menutree/me

Retrieve the menu tree of the role of the current session. The caller does not pass a tree ID.

The tree is the same one the iDempiere web UI shows for that role:

1. The **Menu Tree** of the role (`AD_Role.AD_Tree_Menu_ID`), if one is set.
2. Otherwise the **Menu Tree** of the tenant (`AD_ClientInfo.AD_Tree_Menu_ID`).
3. Otherwise the core primary menu (`AD_Tree_ID = 10`).

The response is identical to calling `GET /api/v1/menutree/{id}` with that tree ID.

### Example:

`GET /api/v1/menutree/me?locale=es_CO`

Returns the menu of the session's role, with names and descriptions in Spanish.

:::note
This endpoint was added in [idempiere-rest#542](https://github.com/bxservice/idempiere-rest/pull/542). Check that your REST plugin version includes it before using it.
:::

---

## Response

The root object holds the name and description of the tree's root node, and an `entries` array with the top-level menu items.

Each entry is an `AD_Menu` record with these properties:

- id
- uid
- Name
- Description
- IsSOTrx
- PredefinedContextVariables
- EntityType
- Action
- AD_Window_ID
- AD_Workflow_ID
- AD_Task_ID
- AD_Process_ID
- AD_Form_ID
- AD_InfoWindow_ID
- model-name

A summary node (a folder) also has its own `entries` array with its children. A leaf entry has no `entries` array. Empty properties are left out. For example, a window entry has `AD_Window_ID` but no `AD_Process_ID`.

`Action` tells you what the entry opens (`W` window, `P` process, `R` report, `X` form, `F` workflow, `T` task, `I` info window). The matching `AD_*_ID` property points to the object to open.

### Example response (shortened):

```json
{
  "Name": "Menu",
  "Description": "Default Menu",
  "entries": [
    {
      "id": 164,
      "uid": "a8ab5f6c-...",
      "Name": "System Admin",
      "Description": "System Administration",
      "IsSOTrx": false,
      "EntityType": {
        "propertyLabel": "Entity Type",
        "id": "D",
        "identifier": "Dictionary",
        "model-name": "ad_entitytype"
      },
      "model-name": "ad_menu",
      "entries": [
        {
          "id": 110,
          "uid": "3f6c2a1e-...",
          "Name": "Window, Tab & Field",
          "Description": "Maintain Windows, Tabs & Fields",
          "IsSOTrx": false,
          "EntityType": {
            "propertyLabel": "Entity Type",
            "id": "D",
            "identifier": "Dictionary",
            "model-name": "ad_entitytype"
          },
          "Action": {
            "propertyLabel": "Action",
            "id": "W",
            "identifier": "Window",
            "model-name": "ad_menu"
          },
          "AD_Window_ID": {
            "propertyLabel": "Window",
            "id": 102,
            "identifier": "Window, Tab & Field",
            "model-name": "ad_window"
          },
          "model-name": "ad_menu"
        }
      ]
    }
  ]
}
```
