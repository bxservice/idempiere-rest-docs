---
sidebar_position: 1
---

# SysConfig Keys

## IDEMPIERE_REST_EXPOSE_JWK
- **Type**: Y/N - defaults to N  
- **Scope**: System  
- **Description**: For integration with KrakenD, it is necessary to expose the signing key in the endpoint `api/v1/auth/jwk`. Set to `Y` to expose the endpoint. Default is `N`.

## REST_COLUMNNAME_TOLOWERCASE
- **Type**: Y/N - defaults to N  
- **Scope**: System  
- **Description**: When set to `Y`, column names are translated to JSON property style (first letter lowercase if no underscore). Otherwise, column name remains unchanged.

## REST_MAX_RECORDS_SIZE
- **Type**: Numeric, default 100  
- **Scope**: System  
- **Description**: Maximum number of records returned in a GET operation. `$top` cannot exceed this. Setting to 0 means unlimited.

## REST_USE_SYSCONFIG_SECRET
- **Type**: Y/N - defaults to Y  
- **Scope**: System  
- **Description**: If `N`, a random key is used at each reboot, invalidating tokens. `Y` (default) uses `REST_TOKEN_SECRET`, allowing persistence and multi-server compatibility.

## REST_TOKEN_SECRET
- **Scope**: System  
- **Description**: Holds a generated key used to sign tokens. Automatically managed. Can be reset using *Expire Server Secret* process.

## REST_TOKEN_EXPIRE_IN_MINUTES
- **Scope**: Tenant  
- **Default**: 60 minutes  
- **Description**: Duration of token expiration. Set to `0` for no expiration.

## REST_REFRESH_TOKEN_EXPIRE_IN_MINUTES
- **Scope**: Tenant  
- **Default**: 1440 minutes (1 day)  
- **Description**: Duration of refresh token expiration based on session inactivity. Set to `0` for no expiration.

## REST_TOKEN_ABSOLUTE_EXPIRE_IN_MINUTES
- **Scope**: Tenant  
- **Default**: 10080 minutes (1 week)  
- **Description**: Maximum session duration regardless of activity. After this, refresh tokens expire and login is required.

## REST_MANDATORY_CLIENT_ID_ON_REFRESH
- **Description**: If your app cannot provide `clientId`, set this to `N` to make it optional in the `/auth/refresh` endpoint.

## REST_MANDATORY_USER_ID_ON_REFRESH
- **Description**: If your app cannot provide `userId`, set this to `N` to make it optional in the `/auth/refresh` endpoint.

## REST_ALLOW_UPDATE_SECURE_COLUMN
- **Scope**: System  
- **Default**: True  
- **Description**: By default, secure/encrypted columns are updatable. Set to `N` to block updates to such columns.

## REST_ERROR_ON_NON_EXISTING_COLUMN
- **Scope**: System  
- **Description**: Set to `N` to avoid throwing errors when a non-existing column is referenced.

## REST_ERROR_ON_NON_UPDATABLE_COLUMN
- **Scope**: System  
- **Description**: Set to `N` to skip non-updatable columns silently instead of throwing an error.

## REST_EXPAND_SEPARATOR
- **Scope**: System  
- **Default**: `;`  
- **Description**: Character used to separate expand sub-operators. Change it if your API gateway (e.g. Traefik, KrakenD) does not support semicolons.

## REST_TABLES_EXPORT_LOOKUP_UU
- **Scope**: Tenant  
- **Description**: Configure tables to return UUID in lookup fields. Use `ALL` (case insensitive) for all tables. Can impact performance.

## REST_HIDE_PRESIGNED_URL_ERRORS 
- **Type**: Y/N - defaults to Y  
- **Scope**: System  
- **Description**: If `Y`, show generic message (**REST_Presigned_URL_Generic_Error** AD_Message, default is **Something went wrong ...**) for errors caused by access to Presigned URL.
