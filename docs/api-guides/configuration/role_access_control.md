---
sidebar_position: 4
---
# Role Access Control for Resource Endpoint

Role-based access control for resource endpoint path.

By default, all resource endpoint paths are not protected. Create a new resource path record (`Rest_Resource`) to protect one or more resource endpoints. The resource path definition is a regular expression so you can use `.*` to protect all endpoint paths and add new resource path records to open access to selected resources (e.g. `v1/models\b/?.*`).

## Tables

### 1. Rest_Resource
- Name
- Resource Path (regex pattern, without query parameters)

### 2. Rest_Resource_Access
- AD_Role_ID 
- Rest_Resource_ID
- Http Methods (Multi selection list of GET, POST, PUT and DELETE)

## Windows
1. Rest Resource Window  
2. Role Data Access Window (added Rest Resource Access tab)

## System Config
- **REST_RESOURCE_ACCESS_CONTROL**
  - Y/N, System level, default to Y

## Examples

See examples at https://github.com/bxservice/idempiere-rest/issues/290