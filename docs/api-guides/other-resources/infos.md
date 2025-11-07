---
sidebar_position: 11
id: infos-resource
title: InfosResource API
sidebar_label: InfosResource
---

# Info Window REST API Documentation

## Overview

The Info Window REST API provides access to iDempiere's Info Window functionality, allowing you to query and retrieve information about:

- Info Window definitions
- Info Window columns
- Info Window processes
- Info Window related information
- Query results from Info Windows

## Base Configuration

| Setting | Value |
|---------|-------|
| **Default Query Timeout** | 120 seconds (2 minutes) |
| **Default Page Size** | 100 records per page |
| **Access Control** | All endpoints respect iDempiere role-based access control |

## Endpoints

### 1. Get Info Windows

Retrieves a list of available Info Windows.

`GET /infowindows`

#### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `filter` | string | No | Filter expression to narrow down results |

#### Response

```json
{ "infowindows": [ { "id": "1000000", "name": "Business Partner Info", "slug": "business-partner-info" } ] }
```


#### Notes
- Only returns Info Windows the current user has access to based on their role
- Results are ordered by Info Window name

---

### 2. Get Info Window Records

Executes a query against a specific Info Window and returns matching records.

`GET /infowindows/{infoSlug}/records`


#### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `infoSlug` | string | Yes | URL-friendly slug of the Info Window name |

#### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `parameters` | JSON object | No | Query parameters as JSON |
| `whereClause` | string | No | Additional WHERE clause for filtering |
| `orderBy` | string | No | Column(s) to order results by |
| `pageNo` | integer | No | Page number to retrieve (default: 1) |

#### Response Headers

| Header | Description |
|--------|-------------|
| `X-Page` | Current page number |
| `X-Per-Page` | Number of records per page (100) |
| `X-Next-Page` | Next page number (if available) |
| `X-Prev-Page` | Previous page number (if applicable) |

#### Response

```json
{ "infowindow-records": [ { "field1": "value1", "field2": "value2" } ] }
```


---

### 3. Get Info Window Columns

Retrieves the column definitions for a specific Info Window.

`GET /infowindows/{infoSlug}/columns`


#### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `infoSlug` | string | Yes | URL-friendly slug of the Info Window name |

#### Response

```json
{ "infowindowcolumns": [ { "columnName": "Name", "displayType": "String", "isDisplayed": true } ] }
```


---

### 4. Get Info Window Processes

Retrieves the available processes for a specific Info Window.

`GET /infowindows/{infoSlug}/processes`


#### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `infoSlug` | string | Yes | URL-friendly slug of the Info Window name |

#### Response


```json
{ "infowindowprocesses": [ { "processId": "1000001", "name": "Process Name", "slug": "process-name" } ] }
```


---

### 5. Get Info Window Related

Retrieves related Info Windows for a specific Info Window.


`GET /infowindows/{infoSlug}/relateds`


#### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `infoSlug` | string | Yes | URL-friendly slug of the Info Window name |

#### Response


```json
{ "infowindowrelateds": [ { "relatedInfoId": "1000002", "name": "Related Info Window", "slug": "related-info-window" } ] }
```


## Error Responses

### 403 Forbidden

Returned when the user doesn't have access to the requested Info Window.

```json
{ "status": 403, "title": "Access denied", "detail": "Access denied for info window: {infoSlug}" }
```


### 404 Not Found

Returned when the requested Info Window doesn't exist.


```json
{ "status": 404, "title": "Invalid info window name", "detail": "No match found for info window name: {infoSlug}" }
```


### 500 Internal Server Error

Returned when an unexpected error occurs during processing.

```json
{ "status": 500, "title": "GET Error", "detail": "Get InfoWindows with exception: {error message}" }
```


## Security

- All endpoints require authentication
- Access is controlled by iDempiere's role-based security system
- Only active records with proper access permissions are returned
- Query timeout limits prevent long-running queries from consuming resources

## Implementation Details

- Uses the `slugify` function to create URL-friendly identifiers from Info Window names
- Implements pagination for large result sets (100 records per page, configurable)
- Supports dynamic filtering through query parameters
- Serializes results using the iDempiere PO serializer framework
- All queries enforce active record filtering and access control

