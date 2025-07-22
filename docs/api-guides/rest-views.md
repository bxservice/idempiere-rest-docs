---
sidebar_position: 5
---

# REST Views

In iDempiere, models typically have many columns and use a database-oriented naming convention. This structure may not align well with typical JSON schema practices. To address this, the **REST View** feature introduces a layer of abstraction, allowing developers to configure a simplified, JSON-oriented schema on top of iDempiere models.

## Overview

REST Views provide a mechanism to:

- Select a subset of columns relevant to specific use cases.
- Rename fields for better readability and consistency with frontend naming conventions.
- Configure expand behavior for master-detail relationships.

### Core Window and Tabs in iDempiere

**Rest_View**
- `Name`: Name of the view
- `AD_Table_ID`: Reference to the iDempiere table
- `WhereClause`: Optional filter for the data

**Rest_ViewColumn**
- `Name`: JSON field name
- `Rest_View_ID`: Associated REST View
- `AD_Column_ID`: Reference to the database column
- `REST_ReferenceView_ID`: (Optional) Reference to another REST View for expanding master data

**Rest_ViewRelated**
- `Name`: Relation name
- `Rest_View_ID`: Associated REST View
- `REST_RelatedRestView_ID`: Reference to related REST View for detail data
- `IsRestAutoExpand`: Automatically expand related data when fetching a record by ID

## API Endpoints

These endpoints behave identically to those under `api/v1/models`, but they operate on the defined REST Views instead of raw database models.

### `GET /api/v1/views`

Retrieve the list of active REST View definitions (`Rest_View`, `Rest_ViewColumn`, `Rest_ViewRelated`).

### Usage

You can use any model-based API method with REST Views by simply replacing:

- `models` with `views`
- `{tableName}` with `{viewName}`

#### Examples

- `GET /api/v1/views/{viewName}` — Equivalent to querying all records from a model
- `GET /api/v1/views/{viewName}/{id}` — Equivalent to fetching a single record by ID
- `POST /api/v1/views/{viewName}` — Create a record based on the REST View schema

> For more information and examples, see: [GitHub Issue #281](https://github.com/bxservice/idempiere-rest/issues/281)