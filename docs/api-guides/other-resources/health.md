---
sidebar_position: 40
id: health-endpoint
title: Health Check
sidebar_label: Health Check
---

# Health Check Endpoint

The Health Check endpoint provides a way to monitor the availability and status of the iDempiere REST API service.

By default this endpoint is public (it doesn't require any authentication).  It can be configured to require a key simply by creating the SysConfig `REST_HEALTH_MONITORING_KEY`

The answer for this endpoint is cached, the cached version is returned if called before the cache duration.  Cache duration is 20 seconds by default, and it can be configured passing a System Property `REST_HEALTH_CACHE_DURATION_PROPERTY` to the JVM.

## Overview

This endpoint is useful for:

- Load balancer health probes
- Kubernetes liveness/readiness probes
- Monitoring systems
- Service discovery

## Endpoint

### GET /api/v1/health

Returns the current health status of the REST API service.

#### Query Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `db` | boolean | No | `false` | When `true`, includes database connectivity status in the response |
| `key` | String | It depends | Empty | Required if the server has the SysConfig `REST_HEALTH_MONITORING_KEY` configured |

Note that including database check can takes longer and has additional impact on the server.

#### Response

**Success Response (200 OK)**

Sample
```json
{
    "status": "UP"
}
```

With parameter db=true
```json
{
    "status": "UP",
    "database": "connected"
}
```
