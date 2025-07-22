---
sidebar_position: 3
---

# Cache

## GET `api/v1/caches`

Retrieve cache information. This call is restricted to administrators only.

---

## DELETE `api/v1/caches`

Reset the cache. This requires a role with permission to execute the **Cache Reset** process.

When called without parameters, it resets the entire cache. You can also restrict the reset to a specific table or a specific record.

### URL Parameters

- `table_name` (optional): Restrict reset to a single table (case sensitive).
- `record_id` (optional): Restrict reset to a specific record. Setting this to zero clears the cache for the entire table.

### Returns

- `entriesReset`: Number of cache entries cleared