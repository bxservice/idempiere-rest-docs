---
sidebar_position: 8
---

# Other Endpoints

## Nodes `api/v1/nodes`

Manage nodes in the system including retrieving node information and handling log operations.

**Operations Available**:
- Get node information
- Get log files
- Reset logs
- Rotate logs

**Status**: To Be Documented (TBD)

---

## Servers `api/v1/servers`

Manage server and scheduler resources.

**Status**: To Be Documented (TBD)

---

## Infos `api/v1/infos`

Access info windows and their data.

**Status**: To Be Documented (TBD)

---

## Reference `api/v1/reference/{id}`

Retrieve a reference list by ID, UUID, or name.

**Supported Reference Types**: Only list and table validation references are supported.

### Examples:

- `GET /api/v1/reference/152`
- `GET /api/v1/reference/42522223-92ae-4405-92dc-e02e2dea61a7`
- `GET /api/v1/reference/C_Order%20DeliveryViaRule`