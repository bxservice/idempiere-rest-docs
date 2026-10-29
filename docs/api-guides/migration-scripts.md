---
sidebar_position: 8
---

# Log Migration Scripts & System Headers

The iDempiere REST API provides dedicated HTTP request headers that allow developers and system administrators to automatically generate database migration scripts (`.sql` files) and control centralized dictionary ID allocation (`AdempiereSys`) when creating or modifying Application Dictionary (AD) records via the API.

This capability is particularly useful when automating schema migrations, configuring dictionary elements, tables, columns, windows, or processes through CI/CD pipelines, scripts, or REST-based developer tooling.

---

## Prerequisites & Authorization

To protect data dictionary integrity and prevent unintentional script generation in production tenant environments, these request headers are strictly restricted:

:::important Authorization Requirement
The migration script and system request headers are **only honored** for authenticated JWT tokens corresponding to **seed tenants** and **seed administrator users**:

- **Tenant:** `AD_Client_ID <= 20` (e.g., Client `0` / `System`)
- **User:** `AD_User_ID <= 102` (e.g., User `100` / `SuperUser` or User `0` / `System`)

This restriction is identical to the permission check performed by the iDempiere web client (`WPreference`).

For all other client tenants (with `AD_Client_ID > 20`) or non-seed users (with `AD_User_ID > 102`), these headers are **silently ignored**, and requests proceed with standard execution without generating migration scripts.
:::

---

## HTTP Request Headers

You can include any combination of the following HTTP request headers with your API requests:

| Header                        | Type / Values      | Default | Description                                                                                                                                        |
| ----------------------------- | ------------------ | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `X-ID-LogMigrationScript`     | String (`Y` / `N`) | `N`     | Enables or disables database migration script generation for dictionary modifications executed in the request.                                     |
| `X-ID-AdempiereSys`           | String (`Y` / `N`) | `N`     | Enables or disables `AdempiereSys` centralized ID allocation for system dictionary records (`AD_Client_ID=0`).                                     |
| `X-ID-MigrationScriptComment` | String             | _Empty_ | A ticket reference (e.g. `IDEMPIERE-1234`) or short description used as the migration script header comment and to derive the generated file name. |

### Boolean Value Parsing

For `X-ID-LogMigrationScript` and `X-ID-AdempiereSys`, the following values (case-insensitive) are evaluated as **`Y`** (enabled):

- `Y`
- `YES`
- `TRUE`
- `1`

Any other non-empty string is evaluated as **`N`** (disabled). If the header is omitted or empty, the setting remains unchanged (disabled).

### Comment Sanitization & Ticket Recognition

The `X-ID-MigrationScriptComment` header is sanitized before being written into the script:

- Line breaks (`\r`, `\n`) and consecutive whitespace characters are collapsed into a single space.
- The comment is parsed with the regular expression `(IDEMPIERE-[0-9]*)` to identify an associated Jira ticket number.

---

## Migration Script File Naming & Grouping

When `X-ID-LogMigrationScript` is set to `Y`, a migration script file is initialized as soon as dictionary changes generate SQL statements.

### File Naming Convention

- **With a recognized ticket:** If the comment contains a ticket number matching `IDEMPIERE-<number>` (for example, `IDEMPIERE-1234 Add loyalty discount column`), the script file name follows the standard iDempiere timestamp and ticket format:

  ```text
  <YYYYMMDDHHmm>_IDEMPIERE-<number>.sql
  ```

  _Example:_ `202610291430_IDEMPIERE-1234.sql`

- **Without a recognized ticket:** If no ticket number is matched in the comment (or if the comment is omitted), the file name defaults to:
  ```text
  <YYYYMMDDHHmm>_PlaceholderForTicket.sql
  ```

### Session Grouping & Appending

Within the same authenticated session (`AD_Session_ID`):

- Subsequent requests that provide the **same ticket number** (or the same comment, or omit the comment while logging is active) will automatically **reuse and append** to the existing migration script file.
- The script registration statement (`SELECT register_migration_script(...)`) is written only **once** at the beginning of the file. Subsequent SQL statements are appended below it.
- If a subsequent request provides a **different** ticket number, a new migration script file is created for that ticket.
- When the session logs out or expires, the cached session file mappings are cleared.

### Dual Database Script Generation

iDempiere automatically generates and synchronizes migration scripts for both supported database dialects:

- **PostgreSQL:** Saved to `<migration_folder>/postgresql/<filename>`
- **Oracle:** Saved to `<migration_folder>/oracle/<filename>`

---

## Request Lifecycle & Isolation

To prevent migration script logging settings from accidentally bleeding into subsequent requests across connection pools or worker threads:

1. **Per-Request Evaluation:** The headers are evaluated on each incoming request by `RequestFilter`.
2. **Immediate Flush & Close:** At the conclusion of the request, `ResponseFilter` flushes and closes the migration script file writer (`Convert.closeLogMigrationScript()`).
3. **Strict Isolation:** If a subsequent request within the same session does not supply `X-ID-LogMigrationScript: Y`, migration script logging is **not** inherited. Each request must explicitly declare whether it should generate migration scripts.

---

## Asynchronous & Process Execution Propagation

When executing dictionary-related processes via the `/api/v1/processes` endpoint (such as running table synchronization, index validation, or column generation):

- The migration script context values (`P_LOGMIGRATIONSCRIPT`, `P_ADEMPIERESYS`, `MigrationScriptComment`, and the resolved script file name) are automatically copied to the asynchronous process execution thread.
- DDL and DML operations performed by the background process are recorded into the exact same migration script file.

---

## Examples

### 1. Creating a Dictionary Column with Migration Logging

The following request creates a new column in `AD_Column` for the `C_BPartner` table under the `System` tenant. It enables migration script logging and centralized ID generation:

#### Request

```http
POST /api/v1/models/ad_column HTTP/1.1
Host: your-server.com
Authorization: Bearer <SUPERUSER_SYSTEM_TOKEN>
Content-Type: application/json
X-ID-LogMigrationScript: Y
X-ID-AdempiereSys: Y
X-ID-MigrationScriptComment: IDEMPIERE-9876 Add loyalty level column

{
  "AD_Table_ID": 291,
  "ColumnName": "LoyaltyLevel",
  "Name": "Loyalty Level",
  "Description": "Customer loyalty reward tier",
  "AD_Element_ID": 1000050,
  "AD_Reference_ID": 10,
  "FieldLength": 10,
  "IsActive": true
}
```

#### cURL Equivalent

```bash
curl -X POST https://your-server.com/api/v1/models/ad_column \
  -H "Authorization: Bearer <SUPERUSER_SYSTEM_TOKEN>" \
  -H "Content-Type: application/json" \
  -H "X-ID-LogMigrationScript: Y" \
  -H "X-ID-AdempiereSys: Y" \
  -H "X-ID-MigrationScriptComment: IDEMPIERE-9876 Add loyalty level column" \
  -d '{
    "AD_Table_ID": 291,
    "ColumnName": "LoyaltyLevel",
    "Name": "Loyalty Level",
    "Description": "Customer loyalty reward tier",
    "AD_Element_ID": 1000050,
    "AD_Reference_ID": 10,
    "FieldLength": 10,
    "IsActive": true
  }'
```

---

### 2. Appending Multiple Changes to the Same Script

In the same authenticated session, send another request for a related field using the same ticket number:

```http
POST /api/v1/models/ad_field HTTP/1.1
Host: your-server.com
Authorization: Bearer <SUPERUSER_SYSTEM_TOKEN>
Content-Type: application/json
X-ID-LogMigrationScript: Y
X-ID-AdempiereSys: Y
X-ID-MigrationScriptComment: IDEMPIERE-9876 Add loyalty level field to Customer tab

{
  "AD_Tab_ID": 220,
  "AD_Column_ID": 1000099,
  "Name": "Loyalty Level",
  "IsActive": true,
  "IsDisplayed": true
}
```

Because both requests share the same session and reference `IDEMPIERE-9876`, the SQL statements generated for `AD_Field` are appended directly to the same file (`<timestamp>_IDEMPIERE-9876.sql`).

---

### 3. Running a Dictionary Process with Migration Logging

Execute a process, such as validating table indexes or synchronizing columns with the database:

```http
POST /api/v1/processes/ad_tableindex-validate HTTP/1.1
Host: your-server.com
Authorization: Bearer <SUPERUSER_SYSTEM_TOKEN>
Content-Type: application/json
X-ID-LogMigrationScript: Y
X-ID-AdempiereSys: Y
X-ID-MigrationScriptComment: IDEMPIERE-9876 Validate table index for loyalty

{
  "AD_Table_ID": 291
}
```

The process thread inherits the migration script context and records any resulting DDL (`CREATE INDEX ...`) into the migration script file.

---
