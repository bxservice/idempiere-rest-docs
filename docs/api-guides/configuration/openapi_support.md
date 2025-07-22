---
sidebar_position: 5
---
# OpenAPI Support

iDempiere REST supports OpenAPI 3.0.0 for table and view definitions.

## Endpoints

- **GET /api/v1/models/tableName/yaml**  
  Returns OpenAPI 3.0.0 schema and requests for the given table.

- **GET /api/v1/views/viewName/yaml**  
  Returns OpenAPI 3.0.0 schema and requests for the given view.

## HTTP Header

```
Accept: application/yaml
```