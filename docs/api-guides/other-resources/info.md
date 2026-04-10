---
sidebar_position: 50
---

# Info Windows

## Infos `api/v1/infos`

Access info windows and their data.

## Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/infos` | Get list of Info Windows |
| GET | `/api/v1/infos/{infoSlug}` | Get records from an Info Window |
| GET | `/api/v1/infos/{infoSlug}/columns` | Get columns of an Info Window |
| GET | `/api/v1/infos/{infoSlug}/processes` | Get processes of an Info Window |
| GET | `/api/v1/infos/{infoSlug}/relateds` | Get related windows of an Info Window |

## Get Info Windows

Returns a list of all Info Windows accessible to the current user.

**GET** `/api/v1/infos`

### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `$filter` | string | No | OData-style filter expression to narrow results |

### Example

**GET** `api/v1/infos?$filter=Name eq 'Business Partner Info'`

### Response

```json
{
    "infowindows": [
        {
            "id": 200001,
            "uid": "bdb6ccb3-1aed-4b9e-92f4-9db792480cb4",
            "AD_Client_ID": {
                "propertyLabel": "Tenant",
                "id": 0,
                "identifier": "System",
                "model-name": "ad_client"
            },
            "AD_Org_ID": {
                "propertyLabel": "Organization",
                "id": 0,
                "identifier": "*",
                "model-name": "ad_org"
            },
            "IsActive": true,
            "Created": "2013-01-25T17:00:39Z",
            "CreatedBy": {
                "propertyLabel": "Created By",
                "id": 100,
                "identifier": "SuperUser",
                "model-name": "ad_user"
            },
            "Updated": "2014-01-08T21:55:06Z",
            "UpdatedBy": {
                "propertyLabel": "Updated By",
                "id": 100,
                "identifier": "SuperUser",
                "model-name": "ad_user"
            },
            "Name": "Business Partner Info",
            "AD_Table_ID": {
                "propertyLabel": "Table",
                "id": 291,
                "identifier": "C_BPartner_Business Partner",
                "model-name": "ad_table"
            },
            "EntityType": {
                "propertyLabel": "Entity Type",
                "id": "D",
                "identifier": "Dictionary",
                "model-name": "ad_entitytype"
            },
            "FromClause": "C_BPartner bp\nLEFT OUTER JOIN C_BPartner_Location l ON (bp.C_BPartner_ID=l.C_BPartner_ID AND l.IsActive='Y')\nLEFT OUTER JOIN AD_User c ON (bp.C_BPartner_ID=c.C_BPartner_ID AND (c.C_BPartner_Location_ID IS NULL OR c.C_BPartner_Location_ID=l.C_BPartner_Location_ID) AND c.IsActive='Y')\nLEFT OUTER JOIN C_Location a ON (l.C_Location_ID=a.C_Location_ID)",
            "IsDefault": true,
            "IsDistinct": false,
            "OrderByClause": "bp.Value",
            "IsValid": true,
            "ImageURL": "InfoBPartner16.png",
            "SeqNo": 20,
            "IsShowInDashboard": true,
            "MaxQueryRecords": 0,
            "isLoadPageNum": true,
            "PagingSize": 0,
            "model-name": "ad_infowindow",
            "slug": "business-partner-info"
        }
    ]
}
```

### Response Codes

| Code | Description |
|------|-------------|
| 200 | Successful response |
| 500 | Internal server error |

---

## Get Info Window Records

Executes the Info Window query and returns matching records.

**GET** `/api/v1/infos/{infoSlug}`

### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `infoSlug` | string | Yes | Slugified name of the Info Window (e.g., `business-partner-info`) |

### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `$parameters` | JSON string | No | Key-value pairs matching Info Window parameter columns |
| `$orderBy` | string | No | Column name(s) to sort results by |
| `$page_no` | integer | No | Page number for pagination (default: 1) |

### Example

**GET** `/api/v1/infos/business-partner-info?$orderby=Name&$parameters={" Value":"JoeBlock","Postal":"04460"}&$page_no=1`

### Parameters Example
```json
{ " Value":"JoeBlock","Postal":"04460" }
```
Note you can use any field as parameter, not just query parameters.

### Response
```json
{
    "row-count": 1,
    "infowindow-records": [
        {
            "C_BPartner_ID": 118,
            "Value": "JoeBlock",
            "Name": "Joe Block",
            "SO_CreditAvailable": 9730.77,
            "SO_CreditUsed": 269.23,
            "Postal": "04460",
            "City": "Hartford",
            "TotalOpenBalance": 269.23,
            "Revenue": 251.73,
            "Address1": "123 Oak St",
            "IsShipTo": true,
            "IsBillTo": true,
            "C_BPartner_Location_ID": {
                "propertyLabel": "Partner Location",
                "id": 113,
                "identifier": "Hartford"
            }
        }
    ]
}
```
### Response Headers

| Header | Description |
|--------|-------------|
| `X-Array-Count` | Number of records returned in current page |
| `X-Page` | Current page number |
| `X-Per-Page` | Page size (default: 100) |
| `X-Next-Page` | Next page number (only present if more pages exist) |
| `X-Prev-Page` | Previous page number (only present if page > 1) |

### Response Codes

| Code | Description |
|------|-------------|
| 200 | Successful response |
| 403 | Access denied to the requested Info Window |
| 404 | Info Window not found |

---

## Get Info Window Columns

Returns the column definitions for a given Info Window.

**GET** `/api/v1/infos/{infoSlug}/columns`

### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `infoSlug` | string | Yes | Slugified name of the Info Window |

### Response
```json
{
    "infowindowcolumns": [
        {
            "id": 200023,
            "uid": "18790dce-5531-4f38-885a-c1c658e4b468",
            "AD_Client_ID": {
                "propertyLabel": "Tenant",
                "id": 0,
                "identifier": "System",
                "model-name": "ad_client"
            },
            "AD_Org_ID": {
                "propertyLabel": "Organization",
                "id": 0,
                "identifier": "*",
                "model-name": "ad_org"
            },
            "IsActive": true,
            "Created": "2013-01-25T17:01:33Z",
            "CreatedBy": {
                "propertyLabel": "Created By",
                "id": 100,
                "identifier": "SuperUser",
                "model-name": "ad_user"
            },
            "Updated": "2013-01-30T22:08:33Z",
            "UpdatedBy": {
                "propertyLabel": "Updated By",
                "id": 100,
                "identifier": "SuperUser",
                "model-name": "ad_user"
            },
            "Name": "Search Key",
            "Description": "Search key for the record in the format required - must be unique",
            "Help": "A search key allows you a fast method of finding a particular record.\nIf you leave the search key empty, the system automatically creates a numeric number.  The document sequence used for this fallback number is defined in the \"Maintain Sequence\" window with the name \"DocumentNo_<TableName>\", where TableName is the actual name of the table (e.g. C_Order).",
            "AD_InfoWindow_ID": {
                "propertyLabel": "Info Window",
                "id": 200001,
                "identifier": "Business Partner Info",
                "model-name": "ad_infowindow"
            },
            "EntityType": {
                "propertyLabel": "Entity Type",
                "id": "D",
                "identifier": "Dictionary",
                "model-name": "ad_entitytype"
            },
            "SelectClause": "bp.Value",
            "SeqNo": 10,
            "IsDisplayed": true,
            "IsQueryCriteria": true,
            "AD_Element_ID": {
                "propertyLabel": "System Element",
                "id": 620,
                "identifier": "Value",
                "model-name": "ad_element"
            },
            "AD_Reference_ID": {
                "propertyLabel": "Reference",
                "id": 10,
                "identifier": "String",
                "model-name": "ad_reference"
            },
            "IsCentrallyMaintained": true,
            "ColumnName": "Value",
            "QueryOperator": {
                "propertyLabel": "Query Operator",
                "id": "Like",
                "identifier": "Like",
                "model-name": "ad_ref_list"
            },
            "QueryFunction": "Upper",
            "IsIdentifier": true,
            "SeqNoSelection": 0,
            "IsMandatory": false,
            "IsReadOnly": true,
            "IsAutocomplete": false,
            "IsQueryAfterChange": false,
            "IsRange": false,
            "model-name": "ad_infocolumn"
        },
        {
            "id": 200024,
            "uid": "f03d7099-a3a1-4a86-b553-28438c4fea58",
            "AD_Client_ID": {
                "propertyLabel": "Tenant",
                "id": 0,
                "identifier": "System",
                "model-name": "ad_client"
            },
            "AD_Org_ID": {
                "propertyLabel": "Organization",
                "id": 0,
                "identifier": "*",
                "model-name": "ad_org"
            },
            "IsActive": true,
            "Created": "2013-01-25T17:01:55Z",
            "CreatedBy": {
                "propertyLabel": "Created By",
                "id": 100,
                "identifier": "SuperUser",
                "model-name": "ad_user"
            },
            "Updated": "2013-01-30T22:08:40Z",
            "UpdatedBy": {
                "propertyLabel": "Updated By",
                "id": 100,
                "identifier": "SuperUser",
                "model-name": "ad_user"
            },
            "Name": "Name",
            "Description": "Alphanumeric identifier of the entity",
            "Help": "The name of an entity (record) is used as an default search option in addition to the search key. The name is up to 60 characters in length.",
            "AD_InfoWindow_ID": {
                "propertyLabel": "Info Window",
                "id": 200001,
                "identifier": "Business Partner Info",
                "model-name": "ad_infowindow"
            },
            "EntityType": {
                "propertyLabel": "Entity Type",
                "id": "D",
                "identifier": "Dictionary",
                "model-name": "ad_entitytype"
            },
            "SelectClause": "bp.Name",
            "SeqNo": 20,
            "IsDisplayed": true,
            "IsQueryCriteria": true,
            "AD_Element_ID": {
                "propertyLabel": "System Element",
                "id": 469,
                "identifier": "Name",
                "model-name": "ad_element"
            },
            "AD_Reference_ID": {
                "propertyLabel": "Reference",
                "id": 10,
                "identifier": "String",
                "model-name": "ad_reference"
            },
            "IsCentrallyMaintained": true,
            "ColumnName": "Name",
            "QueryOperator": {
                "propertyLabel": "Query Operator",
                "id": "Like",
                "identifier": "Like",
                "model-name": "ad_ref_list"
            },
            "QueryFunction": "Upper",
            "IsIdentifier": true,
            "SeqNoSelection": 0,
            "IsMandatory": false,
            "IsReadOnly": true,
            "IsAutocomplete": false,
            "IsQueryAfterChange": false,
            "IsRange": false,
            "model-name": "ad_infocolumn"
        },
        {
            "id": 200025,
            "uid": "233bd7fd-180d-4c10-935b-23e6a04cf403",
            "AD_Client_ID": {
                "propertyLabel": "Tenant",
                "id": 0,
                "identifier": "System",
                "model-name": "ad_client"
            },
            "AD_Org_ID": {
                "propertyLabel": "Organization",
                "id": 0,
                "identifier": "*",
                "model-name": "ad_org"
            },
            "IsActive": true,
            "Created": "2013-01-25T17:03:33Z",
            "CreatedBy": {
                "propertyLabel": "Created By",
                "id": 100,
                "identifier": "SuperUser",
                "model-name": "ad_user"
            },
            "Updated": "2013-06-04T14:56:20Z",
            "UpdatedBy": {
                "propertyLabel": "Updated By",
                "id": 100,
                "identifier": "SuperUser",
                "model-name": "ad_user"
            },
            "Name": "Contact Name",
            "Description": "Business Partner Contact Name",
            "AD_InfoWindow_ID": {
                "propertyLabel": "Info Window",
                "id": 200001,
                "identifier": "Business Partner Info",
                "model-name": "ad_infowindow"
            },
            "EntityType": {
                "propertyLabel": "Entity Type",
                "id": "D",
                "identifier": "Dictionary",
                "model-name": "ad_entitytype"
            },
            "SelectClause": "c.Name AS ContactName",
            "SeqNo": 30,
            "IsDisplayed": false,
            "IsQueryCriteria": true,
            "AD_Element_ID": {
                "propertyLabel": "System Element",
                "id": 1839,
                "identifier": "ContactName",
                "model-name": "ad_element"
            },
            "AD_Reference_ID": {
                "propertyLabel": "Reference",
                "id": 10,
                "identifier": "String",
                "model-name": "ad_reference"
            },
            "IsCentrallyMaintained": true,
            "ColumnName": "ContactName",
            "QueryOperator": {
                "propertyLabel": "Query Operator",
                "id": "Like",
                "identifier": "Like",
                "model-name": "ad_ref_list"
            },
            "QueryFunction": "Upper",
            "IsIdentifier": false,
            "SeqNoSelection": 0,
            "IsMandatory": false,
            "IsReadOnly": true,
            "IsAutocomplete": false,
            "IsQueryAfterChange": false,
            "IsRange": false,
            "model-name": "ad_infocolumn"
        },
        {
            "id": 200114,
            "uid": "d5b8ddfa-b7d1-4f78-b1ca-b964ba3d71e5",
            "AD_Client_ID": {
                "propertyLabel": "Tenant",
                "id": 0,
                "identifier": "System",
                "model-name": "ad_client"
            },
            "AD_Org_ID": {
                "propertyLabel": "Organization",
                "id": 0,
                "identifier": "*",
                "model-name": "ad_org"
            },
            "IsActive": true,
            "Created": "2013-06-04T14:56:57Z",
            "CreatedBy": {
                "propertyLabel": "Created By",
                "id": 100,
                "identifier": "SuperUser",
                "model-name": "ad_user"
            },
            "Updated": "2013-06-04T14:56:57Z",
            "UpdatedBy": {
                "propertyLabel": "Updated By",
                "id": 100,
                "identifier": "SuperUser",
                "model-name": "ad_user"
            },
            "Name": "User/Contact",
            "Description": "User within the system - Internal or Business Partner Contact",
            "Help": "The User identifies a unique user in the system. This could be an internal user or a business partner contact",
            "AD_InfoWindow_ID": {
                "propertyLabel": "Info Window",
                "id": 200001,
                "identifier": "Business Partner Info",
                "model-name": "ad_infowindow"
            },
            "EntityType": {
                "propertyLabel": "Entity Type",
                "id": "D",
                "identifier": "Dictionary",
                "model-name": "ad_entitytype"
            },
            "SelectClause": "c.AD_User_ID",
            "SeqNo": 40,
            "IsDisplayed": true,
            "IsQueryCriteria": false,
            "AD_Element_ID": {
                "propertyLabel": "System Element",
                "id": 138,
                "identifier": "AD_User_ID",
                "model-name": "ad_element"
            },
            "AD_Reference_ID": {
                "propertyLabel": "Reference",
                "id": 30,
                "identifier": "Search",
                "model-name": "ad_reference"
            },
            "IsCentrallyMaintained": true,
            "ColumnName": "AD_User_ID",
            "QueryOperator": {
                "propertyLabel": "Query Operator",
                "id": "=",
                "identifier": "=",
                "model-name": "ad_ref_list"
            },
            "IsIdentifier": false,
            "SeqNoSelection": 0,
            "IsMandatory": false,
            "IsReadOnly": true,
            "IsAutocomplete": false,
            "IsQueryAfterChange": false,
            "IsRange": false,
            "model-name": "ad_infocolumn"
        },
        {
            "id": 200038,
            "uid": "b2ad7812-46e8-4a59-8fec-b472270b985a",
            "AD_Client_ID": {
                "propertyLabel": "Tenant",
                "id": 0,
                "identifier": "System",
                "model-name": "ad_client"
            },
            "AD_Org_ID": {
                "propertyLabel": "Organization",
                "id": 0,
                "identifier": "*",
                "model-name": "ad_org"
            },
            "IsActive": true,
            "Created": "2013-01-29T16:25:00Z",
            "CreatedBy": {
                "propertyLabel": "Created By",
                "id": 100,
                "identifier": "SuperUser",
                "model-name": "ad_user"
            },
            "Updated": "2013-06-04T14:54:56Z",
            "UpdatedBy": {
                "propertyLabel": "Updated By",
                "id": 100,
                "identifier": "SuperUser",
                "model-name": "ad_user"
            },
            "Name": "EMail Address",
            "Description": "Electronic Mail Address",
            "Help": "The Email Address is the Electronic Mail ID for this User and should be fully qualified (e.g. joe.smith@company.com). The Email Address is used to access the self service application functionality from the web.",
            "AD_InfoWindow_ID": {
                "propertyLabel": "Info Window",
                "id": 200001,
                "identifier": "Business Partner Info",
                "model-name": "ad_infowindow"
            },
            "EntityType": {
                "propertyLabel": "Entity Type",
                "id": "D",
                "identifier": "Dictionary",
                "model-name": "ad_entitytype"
            },
            "SelectClause": "c.EMail",
            "SeqNo": 50,
            "IsDisplayed": false,
            "IsQueryCriteria": true,
            "AD_Element_ID": {
                "propertyLabel": "System Element",
                "id": 881,
                "identifier": "EMail",
                "model-name": "ad_element"
            },
            "AD_Reference_ID": {
                "propertyLabel": "Reference",
                "id": 10,
                "identifier": "String",
                "model-name": "ad_reference"
            },
            "IsCentrallyMaintained": true,
            "ColumnName": "EMail",
            "QueryOperator": {
                "propertyLabel": "Query Operator",
                "id": "Like",
                "identifier": "Like",
                "model-name": "ad_ref_list"
            },
            "QueryFunction": "Upper",
            "IsIdentifier": false,
            "SeqNoSelection": 0,
            "IsMandatory": false,
            "IsReadOnly": true,
            "IsAutocomplete": false,
            "IsQueryAfterChange": false,
            "IsRange": false,
            "model-name": "ad_infocolumn"
        },
        {
            "id": 200026,
            "uid": "232c6bc0-5390-4e7b-b40e-c52c2b4e578c",
            "AD_Client_ID": {
                "propertyLabel": "Tenant",
                "id": 0,
                "identifier": "System",
                "model-name": "ad_client"
            },
            "AD_Org_ID": {
                "propertyLabel": "Organization",
                "id": 0,
                "identifier": "*",
                "model-name": "ad_org"
            },
            "IsActive": true,
            "Created": "2013-01-25T17:05:09Z",
            "CreatedBy": {
                "propertyLabel": "Created By",
                "id": 100,
                "identifier": "SuperUser",
                "model-name": "ad_user"
            },
            "Updated": "2013-06-04T14:55:01Z",
            "UpdatedBy": {
                "propertyLabel": "Updated By",
                "id": 100,
                "identifier": "SuperUser",
                "model-name": "ad_user"
            },
            "Name": "Credit Available",
            "Description": "Available Credit based on Credit Limit (not Total Open Balance) and Credit Used",
            "AD_InfoWindow_ID": {
                "propertyLabel": "Info Window",
                "id": 200001,
                "identifier": "Business Partner Info",
                "model-name": "ad_infowindow"
            },
            "EntityType": {
                "propertyLabel": "Entity Type",
                "id": "D",
                "identifier": "Dictionary",
                "model-name": "ad_entitytype"
            },
            "SelectClause": "bp.SO_CreditLimit-bp.SO_CreditUsed AS SO_CreditAvailable",
            "SeqNo": 60,
            "IsDisplayed": true,
            "IsQueryCriteria": false,
            "AD_Element_ID": {
                "propertyLabel": "System Element",
                "id": 1851,
                "identifier": "SO_CreditAvailable",
                "model-name": "ad_element"
            },
            "AD_Reference_ID": {
                "propertyLabel": "Reference",
                "id": 12,
                "identifier": "Amount",
                "model-name": "ad_reference"
            },
            "IsCentrallyMaintained": true,
            "ColumnName": "SO_CreditAvailable",
            "QueryOperator": {
                "propertyLabel": "Query Operator",
                "id": "=",
                "identifier": "=",
                "model-name": "ad_ref_list"
            },
            "IsIdentifier": false,
            "SeqNoSelection": 0,
            "IsMandatory": false,
            "IsReadOnly": true,
            "IsAutocomplete": false,
            "IsQueryAfterChange": false,
            "IsRange": false,
            "model-name": "ad_infocolumn"
        },
        {
            "id": 200027,
            "uid": "2b743596-27ec-4968-a7c0-7a99834313d6",
            "AD_Client_ID": {
                "propertyLabel": "Tenant",
                "id": 0,
                "identifier": "System",
                "model-name": "ad_client"
            },
            "AD_Org_ID": {
                "propertyLabel": "Organization",
                "id": 0,
                "identifier": "*",
                "model-name": "ad_org"
            },
            "IsActive": true,
            "Created": "2013-01-25T17:06:01Z",
            "CreatedBy": {
                "propertyLabel": "Created By",
                "id": 100,
                "identifier": "SuperUser",
                "model-name": "ad_user"
            },
            "Updated": "2013-06-04T14:55:08Z",
            "UpdatedBy": {
                "propertyLabel": "Updated By",
                "id": 100,
                "identifier": "SuperUser",
                "model-name": "ad_user"
            },
            "Name": "Credit Used",
            "Description": "Current open balance",
            "Help": "The Credit Used indicates the total amount of open or unpaid invoices in primary accounting currency for the Business Partner. Credit Management is based on the Total Open Amount, which includes Vendor activities.",
            "AD_InfoWindow_ID": {
                "propertyLabel": "Info Window",
                "id": 200001,
                "identifier": "Business Partner Info",
                "model-name": "ad_infowindow"
            },
            "EntityType": {
                "propertyLabel": "Entity Type",
                "id": "D",
                "identifier": "Dictionary",
                "model-name": "ad_entitytype"
            },
            "SelectClause": "bp.SO_CreditUsed",
            "SeqNo": 70,
            "IsDisplayed": true,
            "IsQueryCriteria": false,
            "AD_Element_ID": {
                "propertyLabel": "System Element",
                "id": 554,
                "identifier": "SO_CreditUsed",
                "model-name": "ad_element"
            },
            "AD_Reference_ID": {
                "propertyLabel": "Reference",
                "id": 12,
                "identifier": "Amount",
                "model-name": "ad_reference"
            },
            "IsCentrallyMaintained": true,
            "ColumnName": "SO_CreditUsed",
            "IsIdentifier": false,
            "SeqNoSelection": 0,
            "IsMandatory": false,
            "IsReadOnly": true,
            "IsAutocomplete": false,
            "IsQueryAfterChange": false,
            "IsRange": false,
            "model-name": "ad_infocolumn"
        },
        {
            "id": 200028,
            "uid": "89b27cb6-0002-4905-ad0a-28b14e9eeebb",
            "AD_Client_ID": {
                "propertyLabel": "Tenant",
                "id": 0,
                "identifier": "System",
                "model-name": "ad_client"
            },
            "AD_Org_ID": {
                "propertyLabel": "Organization",
                "id": 0,
                "identifier": "*",
                "model-name": "ad_org"
            },
            "IsActive": true,
            "Created": "2013-01-25T17:06:50Z",
            "CreatedBy": {
                "propertyLabel": "Created By",
                "id": 100,
                "identifier": "SuperUser",
                "model-name": "ad_user"
            },
            "Updated": "2013-06-04T14:55:14Z",
            "UpdatedBy": {
                "propertyLabel": "Updated By",
                "id": 100,
                "identifier": "SuperUser",
                "model-name": "ad_user"
            },
            "Name": "Phone",
            "Description": "Identifies a telephone number",
            "Help": "The Phone field identifies a telephone number",
            "AD_InfoWindow_ID": {
                "propertyLabel": "Info Window",
                "id": 200001,
                "identifier": "Business Partner Info",
                "model-name": "ad_infowindow"
            },
            "EntityType": {
                "propertyLabel": "Entity Type",
                "id": "D",
                "identifier": "Dictionary",
                "model-name": "ad_entitytype"
            },
            "SelectClause": "c.Phone",
            "SeqNo": 80,
            "IsDisplayed": true,
            "IsQueryCriteria": true,
            "AD_Element_ID": {
                "propertyLabel": "System Element",
                "id": 505,
                "identifier": "Phone",
                "model-name": "ad_element"
            },
            "AD_Reference_ID": {
                "propertyLabel": "Reference",
                "id": 10,
                "identifier": "String",
                "model-name": "ad_reference"
            },
            "IsCentrallyMaintained": true,
            "ColumnName": "Phone",
            "QueryOperator": {
                "propertyLabel": "Query Operator",
                "id": "Like",
                "identifier": "Like",
                "model-name": "ad_ref_list"
            },
            "IsIdentifier": false,
            "SeqNoSelection": 0,
            "IsMandatory": false,
            "IsReadOnly": true,
            "IsAutocomplete": false,
            "IsQueryAfterChange": false,
            "IsRange": false,
            "model-name": "ad_infocolumn"
        },
        {
            "id": 200029,
            "uid": "04d7c2cb-01fc-4756-b2e3-53d91a27014c",
            "AD_Client_ID": {
                "propertyLabel": "Tenant",
                "id": 0,
                "identifier": "System",
                "model-name": "ad_client"
            },
            "AD_Org_ID": {
                "propertyLabel": "Organization",
                "id": 0,
                "identifier": "*",
                "model-name": "ad_org"
            },
            "IsActive": true,
            "Created": "2013-01-25T17:07:59Z",
            "CreatedBy": {
                "propertyLabel": "Created By",
                "id": 100,
                "identifier": "SuperUser",
                "model-name": "ad_user"
            },
            "Updated": "2013-06-04T14:55:19Z",
            "UpdatedBy": {
                "propertyLabel": "Updated By",
                "id": 100,
                "identifier": "SuperUser",
                "model-name": "ad_user"
            },
            "Name": "ZIP",
            "Description": "Postal code",
            "Help": "The Postal Code or ZIP identifies the postal code for this entity's address.",
            "AD_InfoWindow_ID": {
                "propertyLabel": "Info Window",
                "id": 200001,
                "identifier": "Business Partner Info",
                "model-name": "ad_infowindow"
            },
            "EntityType": {
                "propertyLabel": "Entity Type",
                "id": "D",
                "identifier": "Dictionary",
                "model-name": "ad_entitytype"
            },
            "SelectClause": "a.Postal",
            "SeqNo": 90,
            "IsDisplayed": true,
            "IsQueryCriteria": true,
            "AD_Element_ID": {
                "propertyLabel": "System Element",
                "id": 512,
                "identifier": "Postal",
                "model-name": "ad_element"
            },
            "AD_Reference_ID": {
                "propertyLabel": "Reference",
                "id": 10,
                "identifier": "String",
                "model-name": "ad_reference"
            },
            "IsCentrallyMaintained": true,
            "ColumnName": "Postal",
            "QueryOperator": {
                "propertyLabel": "Query Operator",
                "id": "Like",
                "identifier": "Like",
                "model-name": "ad_ref_list"
            },
            "QueryFunction": "Upper",
            "IsIdentifier": false,
            "SeqNoSelection": 0,
            "IsMandatory": false,
            "IsReadOnly": true,
            "IsAutocomplete": false,
            "IsQueryAfterChange": false,
            "IsRange": false,
            "model-name": "ad_infocolumn"
        },
        {
            "id": 200030,
            "uid": "87b2a158-eb69-475c-9324-eefca8d0c7da",
            "AD_Client_ID": {
                "propertyLabel": "Tenant",
                "id": 0,
                "identifier": "System",
                "model-name": "ad_client"
            },
            "AD_Org_ID": {
                "propertyLabel": "Organization",
                "id": 0,
                "identifier": "*",
                "model-name": "ad_org"
            },
            "IsActive": true,
            "Created": "2013-01-25T17:08:26Z",
            "CreatedBy": {
                "propertyLabel": "Created By",
                "id": 100,
                "identifier": "SuperUser",
                "model-name": "ad_user"
            },
            "Updated": "2013-06-04T14:55:23Z",
            "UpdatedBy": {
                "propertyLabel": "Updated By",
                "id": 100,
                "identifier": "SuperUser",
                "model-name": "ad_user"
            },
            "Name": "City",
            "Description": "Identifies a City",
            "Help": "The City identifies a unique City for this Country or Region.",
            "AD_InfoWindow_ID": {
                "propertyLabel": "Info Window",
                "id": 200001,
                "identifier": "Business Partner Info",
                "model-name": "ad_infowindow"
            },
            "EntityType": {
                "propertyLabel": "Entity Type",
                "id": "D",
                "identifier": "Dictionary",
                "model-name": "ad_entitytype"
            },
            "SelectClause": "a.City",
            "SeqNo": 100,
            "IsDisplayed": true,
            "IsQueryCriteria": false,
            "AD_Element_ID": {
                "propertyLabel": "System Element",
                "id": 225,
                "identifier": "City",
                "model-name": "ad_element"
            },
            "AD_Reference_ID": {
                "propertyLabel": "Reference",
                "id": 10,
                "identifier": "String",
                "model-name": "ad_reference"
            },
            "IsCentrallyMaintained": true,
            "ColumnName": "City",
            "QueryOperator": {
                "propertyLabel": "Query Operator",
                "id": "Like",
                "identifier": "Like",
                "model-name": "ad_ref_list"
            },
            "QueryFunction": "Upper",
            "IsIdentifier": false,
            "SeqNoSelection": 0,
            "IsMandatory": false,
            "IsReadOnly": true,
            "IsAutocomplete": false,
            "IsQueryAfterChange": false,
            "IsRange": false,
            "model-name": "ad_infocolumn"
        },
        {
            "id": 200031,
            "uid": "743b5ce2-9257-450a-8d0c-718caa30ed35",
            "AD_Client_ID": {
                "propertyLabel": "Tenant",
                "id": 0,
                "identifier": "System",
                "model-name": "ad_client"
            },
            "AD_Org_ID": {
                "propertyLabel": "Organization",
                "id": 0,
                "identifier": "*",
                "model-name": "ad_org"
            },
            "IsActive": true,
            "Created": "2013-01-25T17:08:51Z",
            "CreatedBy": {
                "propertyLabel": "Created By",
                "id": 100,
                "identifier": "SuperUser",
                "model-name": "ad_user"
            },
            "Updated": "2013-06-04T14:55:28Z",
            "UpdatedBy": {
                "propertyLabel": "Updated By",
                "id": 100,
                "identifier": "SuperUser",
                "model-name": "ad_user"
            },
            "Name": "Open Balance",
            "Description": "Total Open Balance Amount in primary Accounting Currency",
            "Help": "The Total Open Balance Amount is the calculated open item amount for Customer and Vendor activity.  If the Balance is below zero, we owe the Business Partner.  The amount is used for Credit Management.\nInvoices and Payment Allocations determine the Open Balance (i.e. not Orders or Payments).",
            "AD_InfoWindow_ID": {
                "propertyLabel": "Info Window",
                "id": 200001,
                "identifier": "Business Partner Info",
                "model-name": "ad_infowindow"
            },
            "EntityType": {
                "propertyLabel": "Entity Type",
                "id": "D",
                "identifier": "Dictionary",
                "model-name": "ad_entitytype"
            },
            "SelectClause": "bp.TotalOpenBalance",
            "SeqNo": 110,
            "IsDisplayed": true,
            "IsQueryCriteria": false,
            "AD_Element_ID": {
                "propertyLabel": "System Element",
                "id": 2562,
                "identifier": "TotalOpenBalance",
                "model-name": "ad_element"
            },
            "AD_Reference_ID": {
                "propertyLabel": "Reference",
                "id": 12,
                "identifier": "Amount",
                "model-name": "ad_reference"
            },
            "IsCentrallyMaintained": true,
            "ColumnName": "TotalOpenBalance",
            "IsIdentifier": false,
            "SeqNoSelection": 0,
            "IsMandatory": false,
            "IsReadOnly": true,
            "IsAutocomplete": false,
            "IsQueryAfterChange": false,
            "IsRange": false,
            "model-name": "ad_infocolumn"
        },
        {
            "id": 200032,
            "uid": "3032fa64-7e07-4adf-a252-07dabfe12427",
            "AD_Client_ID": {
                "propertyLabel": "Tenant",
                "id": 0,
                "identifier": "System",
                "model-name": "ad_client"
            },
            "AD_Org_ID": {
                "propertyLabel": "Organization",
                "id": 0,
                "identifier": "*",
                "model-name": "ad_org"
            },
            "IsActive": true,
            "Created": "2013-01-25T17:09:46Z",
            "CreatedBy": {
                "propertyLabel": "Created By",
                "id": 100,
                "identifier": "SuperUser",
                "model-name": "ad_user"
            },
            "Updated": "2013-06-04T14:55:43Z",
            "UpdatedBy": {
                "propertyLabel": "Updated By",
                "id": 100,
                "identifier": "SuperUser",
                "model-name": "ad_user"
            },
            "Name": "Revenue",
            "AD_InfoWindow_ID": {
                "propertyLabel": "Info Window",
                "id": 200001,
                "identifier": "Business Partner Info",
                "model-name": "ad_infowindow"
            },
            "EntityType": {
                "propertyLabel": "Entity Type",
                "id": "D",
                "identifier": "Dictionary",
                "model-name": "ad_entitytype"
            },
            "SelectClause": "bp.ActualLifetimeValue",
            "SeqNo": 120,
            "IsDisplayed": true,
            "IsQueryCriteria": false,
            "AD_Reference_ID": {
                "propertyLabel": "Reference",
                "id": 12,
                "identifier": "Amount",
                "model-name": "ad_reference"
            },
            "IsCentrallyMaintained": true,
            "ColumnName": "Revenue",
            "QueryOperator": {
                "propertyLabel": "Query Operator",
                "id": "=",
                "identifier": "=",
                "model-name": "ad_ref_list"
            },
            "IsIdentifier": false,
            "SeqNoSelection": 0,
            "IsMandatory": false,
            "IsReadOnly": true,
            "IsAutocomplete": false,
            "IsQueryAfterChange": false,
            "IsRange": false,
            "model-name": "ad_infocolumn"
        },
        {
            "id": 200033,
            "uid": "501f1ba5-9eed-4d94-af31-589a97c810f2",
            "AD_Client_ID": {
                "propertyLabel": "Tenant",
                "id": 0,
                "identifier": "System",
                "model-name": "ad_client"
            },
            "AD_Org_ID": {
                "propertyLabel": "Organization",
                "id": 0,
                "identifier": "*",
                "model-name": "ad_org"
            },
            "IsActive": true,
            "Created": "2013-01-25T17:10:09Z",
            "CreatedBy": {
                "propertyLabel": "Created By",
                "id": 100,
                "identifier": "SuperUser",
                "model-name": "ad_user"
            },
            "Updated": "2013-06-04T14:55:48Z",
            "UpdatedBy": {
                "propertyLabel": "Updated By",
                "id": 100,
                "identifier": "SuperUser",
                "model-name": "ad_user"
            },
            "Name": "Address 1",
            "Description": "Address line 1 for this location",
            "Help": "The Address 1 identifies the address for an entity's location",
            "AD_InfoWindow_ID": {
                "propertyLabel": "Info Window",
                "id": 200001,
                "identifier": "Business Partner Info",
                "model-name": "ad_infowindow"
            },
            "EntityType": {
                "propertyLabel": "Entity Type",
                "id": "D",
                "identifier": "Dictionary",
                "model-name": "ad_entitytype"
            },
            "SelectClause": "a.Address1",
            "SeqNo": 130,
            "IsDisplayed": true,
            "IsQueryCriteria": false,
            "AD_Element_ID": {
                "propertyLabel": "System Element",
                "id": 156,
                "identifier": "Address1",
                "model-name": "ad_element"
            },
            "AD_Reference_ID": {
                "propertyLabel": "Reference",
                "id": 10,
                "identifier": "String",
                "model-name": "ad_reference"
            },
            "IsCentrallyMaintained": true,
            "ColumnName": "Address1",
            "IsIdentifier": false,
            "SeqNoSelection": 0,
            "IsMandatory": false,
            "IsReadOnly": true,
            "IsAutocomplete": false,
            "IsQueryAfterChange": false,
            "IsRange": false,
            "model-name": "ad_infocolumn"
        },
        {
            "id": 200034,
            "uid": "e6154d16-db40-45e7-adaf-2f6aa19d78dc",
            "AD_Client_ID": {
                "propertyLabel": "Tenant",
                "id": 0,
                "identifier": "System",
                "model-name": "ad_client"
            },
            "AD_Org_ID": {
                "propertyLabel": "Organization",
                "id": 0,
                "identifier": "*",
                "model-name": "ad_org"
            },
            "IsActive": true,
            "Created": "2013-01-25T17:11:21Z",
            "CreatedBy": {
                "propertyLabel": "Created By",
                "id": 100,
                "identifier": "SuperUser",
                "model-name": "ad_user"
            },
            "Updated": "2013-06-04T14:55:53Z",
            "UpdatedBy": {
                "propertyLabel": "Updated By",
                "id": 100,
                "identifier": "SuperUser",
                "model-name": "ad_user"
            },
            "Name": "Ship Address",
            "Description": "Business Partner Shipment Address",
            "Help": "If the Ship Address is selected, the location is used to ship goods to a customer or receive goods from a vendor.",
            "AD_InfoWindow_ID": {
                "propertyLabel": "Info Window",
                "id": 200001,
                "identifier": "Business Partner Info",
                "model-name": "ad_infowindow"
            },
            "EntityType": {
                "propertyLabel": "Entity Type",
                "id": "D",
                "identifier": "Dictionary",
                "model-name": "ad_entitytype"
            },
            "SelectClause": "l.IsShipTo",
            "SeqNo": 140,
            "IsDisplayed": true,
            "IsQueryCriteria": false,
            "AD_Element_ID": {
                "propertyLabel": "System Element",
                "id": 929,
                "identifier": "IsShipTo",
                "model-name": "ad_element"
            },
            "AD_Reference_ID": {
                "propertyLabel": "Reference",
                "id": 20,
                "identifier": "Yes-No",
                "model-name": "ad_reference"
            },
            "IsCentrallyMaintained": true,
            "ColumnName": "IsShipTo",
            "IsIdentifier": false,
            "SeqNoSelection": 0,
            "IsMandatory": false,
            "IsReadOnly": true,
            "IsAutocomplete": false,
            "IsQueryAfterChange": false,
            "IsRange": false,
            "model-name": "ad_infocolumn"
        },
        {
            "id": 200035,
            "uid": "b1e8e398-453d-497d-8ae1-b5bcd3572191",
            "AD_Client_ID": {
                "propertyLabel": "Tenant",
                "id": 0,
                "identifier": "System",
                "model-name": "ad_client"
            },
            "AD_Org_ID": {
                "propertyLabel": "Organization",
                "id": 0,
                "identifier": "*",
                "model-name": "ad_org"
            },
            "IsActive": true,
            "Created": "2013-01-25T17:11:32Z",
            "CreatedBy": {
                "propertyLabel": "Created By",
                "id": 100,
                "identifier": "SuperUser",
                "model-name": "ad_user"
            },
            "Updated": "2013-06-04T14:55:58Z",
            "UpdatedBy": {
                "propertyLabel": "Updated By",
                "id": 100,
                "identifier": "SuperUser",
                "model-name": "ad_user"
            },
            "Name": "Invoice Address",
            "Description": "Business Partner Invoice/Bill Address",
            "Help": "If the Invoice Address is selected, the location is used to send invoices to a customer or receive invoices from a vendor.",
            "AD_InfoWindow_ID": {
                "propertyLabel": "Info Window",
                "id": 200001,
                "identifier": "Business Partner Info",
                "model-name": "ad_infowindow"
            },
            "EntityType": {
                "propertyLabel": "Entity Type",
                "id": "D",
                "identifier": "Dictionary",
                "model-name": "ad_entitytype"
            },
            "SelectClause": "l.IsBillTo",
            "SeqNo": 150,
            "IsDisplayed": true,
            "IsQueryCriteria": false,
            "AD_Element_ID": {
                "propertyLabel": "System Element",
                "id": 916,
                "identifier": "IsBillTo",
                "model-name": "ad_element"
            },
            "AD_Reference_ID": {
                "propertyLabel": "Reference",
                "id": 20,
                "identifier": "Yes-No",
                "model-name": "ad_reference"
            },
            "IsCentrallyMaintained": true,
            "ColumnName": "IsBillTo",
            "IsIdentifier": false,
            "SeqNoSelection": 0,
            "IsMandatory": false,
            "IsReadOnly": true,
            "IsAutocomplete": false,
            "IsQueryAfterChange": false,
            "IsRange": false,
            "model-name": "ad_infocolumn"
        },
        {
            "id": 200036,
            "uid": "64676c6f-aab0-40d3-8875-23257197ef5c",
            "AD_Client_ID": {
                "propertyLabel": "Tenant",
                "id": 0,
                "identifier": "System",
                "model-name": "ad_client"
            },
            "AD_Org_ID": {
                "propertyLabel": "Organization",
                "id": 0,
                "identifier": "*",
                "model-name": "ad_org"
            },
            "IsActive": true,
            "Created": "2013-01-29T16:04:53Z",
            "CreatedBy": {
                "propertyLabel": "Created By",
                "id": 100,
                "identifier": "SuperUser",
                "model-name": "ad_user"
            },
            "Updated": "2021-07-26T13:25:56Z",
            "UpdatedBy": {
                "propertyLabel": "Updated By",
                "id": 0,
                "identifier": "~System (deprecated)~",
                "model-name": "ad_user"
            },
            "Name": "Customer",
            "Description": "Indicates if this Business Partner is a Customer",
            "Help": "The Customer checkbox indicates if this Business Partner is a customer.  If it is select additional fields will display which further define this customer.",
            "AD_InfoWindow_ID": {
                "propertyLabel": "Info Window",
                "id": 200001,
                "identifier": "Business Partner Info",
                "model-name": "ad_infowindow"
            },
            "EntityType": {
                "propertyLabel": "Entity Type",
                "id": "D",
                "identifier": "Dictionary",
                "model-name": "ad_entitytype"
            },
            "SelectClause": "bp.IsCustomer",
            "SeqNo": 160,
            "IsDisplayed": false,
            "IsQueryCriteria": true,
            "AD_Element_ID": {
                "propertyLabel": "System Element",
                "id": 364,
                "identifier": "IsCustomer",
                "model-name": "ad_element"
            },
            "AD_Reference_ID": {
                "propertyLabel": "Reference",
                "id": 17,
                "identifier": "List",
                "model-name": "ad_reference"
            },
            "AD_Reference_Value_ID": {
                "propertyLabel": "Reference Key",
                "id": 319,
                "identifier": "_YesNo",
                "model-name": "ad_reference"
            },
            "IsCentrallyMaintained": true,
            "DisplayLogic": "@IsSOTrx:Y@=Y | @+IgnoreIsSOTrxInBPInfo:N@=Y",
            "ColumnName": "IsCustomer",
            "QueryOperator": {
                "propertyLabel": "Query Operator",
                "id": "=",
                "identifier": "=",
                "model-name": "ad_ref_list"
            },
            "IsIdentifier": false,
            "SeqNoSelection": 10,
            "DefaultValue": "@SQL=SELECT CASE WHEN '@IsSOTrx:X@'='X' OR '@+IgnoreIsSOTrxInBPInfo:N@'='Y' THEN '' WHEN '@IsSOTrx:X@'='Y' THEN 'Y' ELSE 'N' END AS DefaultValue FROM DUAL",
            "IsMandatory": false,
            "IsReadOnly": true,
            "IsAutocomplete": false,
            "IsQueryAfterChange": false,
            "IsRange": false,
            "model-name": "ad_infocolumn"
        },
        {
            "id": 200037,
            "uid": "4c718d20-3bc5-41a4-ab06-d32ff0388596",
            "AD_Client_ID": {
                "propertyLabel": "Tenant",
                "id": 0,
                "identifier": "System",
                "model-name": "ad_client"
            },
            "AD_Org_ID": {
                "propertyLabel": "Organization",
                "id": 0,
                "identifier": "*",
                "model-name": "ad_org"
            },
            "IsActive": true,
            "Created": "2013-01-29T16:05:32Z",
            "CreatedBy": {
                "propertyLabel": "Created By",
                "id": 100,
                "identifier": "SuperUser",
                "model-name": "ad_user"
            },
            "Updated": "2021-06-03T13:38:52Z",
            "UpdatedBy": {
                "propertyLabel": "Updated By",
                "id": 100,
                "identifier": "SuperUser",
                "model-name": "ad_user"
            },
            "Name": "Vendor",
            "Description": "Indicates if this Business Partner is a Vendor",
            "Help": "The Vendor checkbox indicates if this Business Partner is a Vendor.  If it is selected, additional fields will display which further identify this vendor.",
            "AD_InfoWindow_ID": {
                "propertyLabel": "Info Window",
                "id": 200001,
                "identifier": "Business Partner Info",
                "model-name": "ad_infowindow"
            },
            "EntityType": {
                "propertyLabel": "Entity Type",
                "id": "D",
                "identifier": "Dictionary",
                "model-name": "ad_entitytype"
            },
            "SelectClause": "bp.IsVendor",
            "SeqNo": 170,
            "IsDisplayed": false,
            "IsQueryCriteria": true,
            "AD_Element_ID": {
                "propertyLabel": "System Element",
                "id": 426,
                "identifier": "IsVendor",
                "model-name": "ad_element"
            },
            "AD_Reference_ID": {
                "propertyLabel": "Reference",
                "id": 17,
                "identifier": "List",
                "model-name": "ad_reference"
            },
            "AD_Reference_Value_ID": {
                "propertyLabel": "Reference Key",
                "id": 319,
                "identifier": "_YesNo",
                "model-name": "ad_reference"
            },
            "IsCentrallyMaintained": true,
            "DisplayLogic": "@IsSOTrx:N@=N | @+IgnoreIsSOTrxInBPInfo:N@=Y",
            "ColumnName": "IsVendor",
            "QueryOperator": {
                "propertyLabel": "Query Operator",
                "id": "=",
                "identifier": "=",
                "model-name": "ad_ref_list"
            },
            "IsIdentifier": false,
            "SeqNoSelection": 20,
            "DefaultValue": "@SQL=SELECT CASE WHEN '@IsSOTrx:X@'='X' OR '@+IgnoreIsSOTrxInBPInfo:N@'='Y' THEN '' WHEN '@IsSOTrx:X@'='N' THEN 'Y' ELSE 'N' END AS DefaultValue FROM DUAL",
            "IsMandatory": false,
            "IsReadOnly": true,
            "IsAutocomplete": false,
            "IsQueryAfterChange": false,
            "IsRange": false,
            "model-name": "ad_infocolumn"
        },
        {
            "id": 200115,
            "uid": "927e1423-37d6-4930-b8b1-524ce3d53c74",
            "AD_Client_ID": {
                "propertyLabel": "Tenant",
                "id": 0,
                "identifier": "System",
                "model-name": "ad_client"
            },
            "AD_Org_ID": {
                "propertyLabel": "Organization",
                "id": 0,
                "identifier": "*",
                "model-name": "ad_org"
            },
            "IsActive": true,
            "Created": "2013-06-04T14:57:28Z",
            "CreatedBy": {
                "propertyLabel": "Created By",
                "id": 100,
                "identifier": "SuperUser",
                "model-name": "ad_user"
            },
            "Updated": "2013-06-04T14:57:28Z",
            "UpdatedBy": {
                "propertyLabel": "Updated By",
                "id": 100,
                "identifier": "SuperUser",
                "model-name": "ad_user"
            },
            "Name": "Partner Location",
            "Description": "Identifies the (ship to) address for this Business Partner",
            "Help": "The Partner address indicates the location of a Business Partner",
            "AD_InfoWindow_ID": {
                "propertyLabel": "Info Window",
                "id": 200001,
                "identifier": "Business Partner Info",
                "model-name": "ad_infowindow"
            },
            "EntityType": {
                "propertyLabel": "Entity Type",
                "id": "D",
                "identifier": "Dictionary",
                "model-name": "ad_entitytype"
            },
            "SelectClause": "l.C_BPartner_Location_ID",
            "SeqNo": 180,
            "IsDisplayed": true,
            "IsQueryCriteria": false,
            "AD_Element_ID": {
                "propertyLabel": "System Element",
                "id": 189,
                "identifier": "C_BPartner_Location_ID",
                "model-name": "ad_element"
            },
            "AD_Reference_ID": {
                "propertyLabel": "Reference",
                "id": 30,
                "identifier": "Search",
                "model-name": "ad_reference"
            },
            "IsCentrallyMaintained": true,
            "ColumnName": "C_BPartner_Location_ID",
            "QueryOperator": {
                "propertyLabel": "Query Operator",
                "id": "=",
                "identifier": "=",
                "model-name": "ad_ref_list"
            },
            "IsIdentifier": false,
            "SeqNoSelection": 0,
            "IsMandatory": false,
            "IsReadOnly": true,
            "IsAutocomplete": false,
            "IsQueryAfterChange": false,
            "IsRange": false,
            "model-name": "ad_infocolumn"
        }
    ]
}
```
### Response Codes

| Code | Description |
|------|-------------|
| 200 | Successful response |
| 403 | Access denied to the requested Info Window |
| 404 | Info Window not found |

---

## Get Info Window Processes

Returns the processes associated with a given Info Window.

**GET** `/api/v1/infos/{infoSlug}/processes`

### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `infoSlug` | string | Yes | Slugified name of the Info Window |

### Response
```json
{
    "infowindowprocesses": [
        {
            "id": 1000000,
            "uid": "019d76f7-d26b-7cc3-a1ca-66097c256947",
            "AD_Client_ID": {
                "propertyLabel": "Tenant",
                "id": 0,
                "identifier": "System",
                "model-name": "ad_client"
            },
            "AD_Org_ID": {
                "propertyLabel": "Organization",
                "id": 0,
                "identifier": "*",
                "model-name": "ad_org"
            },
            "IsActive": true,
            "Created": "2026-04-10T12:37:25Z",
            "CreatedBy": {
                "propertyLabel": "Created By",
                "id": 100,
                "identifier": "SuperUser",
                "model-name": "ad_user"
            },
            "Updated": "2026-04-10T12:37:25Z",
            "UpdatedBy": {
                "propertyLabel": "Updated By",
                "id": 100,
                "identifier": "SuperUser",
                "model-name": "ad_user"
            },
            "SeqNo": 10,
            "AD_Process_ID": {
                "propertyLabel": "Process",
                "id": 314,
                "identifier": "Validate Business Partner_C_BPartner Validate",
                "model-name": "ad_process"
            },
            "AD_InfoWindow_ID": {
                "propertyLabel": "Info Window",
                "id": 200001,
                "identifier": "Business Partner Info",
                "model-name": "ad_infowindow"
            },
            "LayoutType": {
                "propertyLabel": "Layout Type",
                "id": "B",
                "identifier": "Button",
                "model-name": "ad_ref_list"
            },
            "EntityType": {
                "propertyLabel": "Entity Type",
                "id": "U",
                "identifier": "User maintained",
                "model-name": "ad_entitytype"
            },
            "model-name": "ad_infoprocess",
            "slug": "c_bpartner-validate"
        }
    ]
}
```
### Response Codes

| Code | Description |
|------|-------------|
| 200 | Successful response |
| 403 | Access denied to the requested Info Window |
| 404 | Info Window not found |

---

## Get Info Window Related Windows

Returns the related Info Windows configured for a given Info Window.

**GET** `/api/v1/infos/{infoSlug}/relateds`

### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `infoSlug` | string | Yes | Slugified name of the Info Window |

### Response
```json
{
    "infowindowrelateds": [
        {
            "id": 1000000,
            "uid": "019d76f8-30c9-78ea-a276-a6f2adb90265",
            "AD_Client_ID": {
                "propertyLabel": "Tenant",
                "id": 0,
                "identifier": "System",
                "model-name": "ad_client"
            },
            "AD_Org_ID": {
                "propertyLabel": "Organization",
                "id": 0,
                "identifier": "*",
                "model-name": "ad_org"
            },
            "IsActive": true,
            "Created": "2026-04-10T12:37:50Z",
            "CreatedBy": {
                "propertyLabel": "Created By",
                "id": 100,
                "identifier": "SuperUser",
                "model-name": "ad_user"
            },
            "Updated": "2026-04-10T12:37:50Z",
            "UpdatedBy": {
                "propertyLabel": "Updated By",
                "id": 100,
                "identifier": "SuperUser",
                "model-name": "ad_user"
            },
            "Name": "Invoices",
            "AD_InfoWindow_ID": {
                "propertyLabel": "Info Window",
                "id": 200001,
                "identifier": "Business Partner Info",
                "model-name": "ad_infowindow"
            },
            "SeqNo": 0,
            "RelatedInfo_ID": {
                "propertyLabel": "Related Info Window",
                "id": 200003,
                "identifier": "Invoice Info",
                "model-name": "ad_infowindow"
            },
            "RelatedColumn_ID": {
                "propertyLabel": "Related Info Column",
                "id": 200052,
                "identifier": "Business Partner_10_Y_Y",
                "model-name": "ad_infocolumn"
            },
            "EntityType": {
                "propertyLabel": "Entity Type",
                "id": "U",
                "identifier": "User maintained",
                "model-name": "ad_entitytype"
            },
            "model-name": "ad_inforelated",
            "slug": "invoice-info"
        },
        {
            "id": 1000001,
            "uid": "019d76f8-536a-7652-a551-6ef1392631d2",
            "AD_Client_ID": {
                "propertyLabel": "Tenant",
                "id": 0,
                "identifier": "System",
                "model-name": "ad_client"
            },
            "AD_Org_ID": {
                "propertyLabel": "Organization",
                "id": 0,
                "identifier": "*",
                "model-name": "ad_org"
            },
            "IsActive": true,
            "Created": "2026-04-10T12:37:59Z",
            "CreatedBy": {
                "propertyLabel": "Created By",
                "id": 100,
                "identifier": "SuperUser",
                "model-name": "ad_user"
            },
            "Updated": "2026-04-10T12:37:59Z",
            "UpdatedBy": {
                "propertyLabel": "Updated By",
                "id": 100,
                "identifier": "SuperUser",
                "model-name": "ad_user"
            },
            "Name": "Orders",
            "AD_InfoWindow_ID": {
                "propertyLabel": "Info Window",
                "id": 200001,
                "identifier": "Business Partner Info",
                "model-name": "ad_infowindow"
            },
            "SeqNo": 0,
            "RelatedInfo_ID": {
                "propertyLabel": "Related Info Window",
                "id": 200002,
                "identifier": "Order Info",
                "model-name": "ad_infowindow"
            },
            "RelatedColumn_ID": {
                "propertyLabel": "Related Info Column",
                "id": 200039,
                "identifier": "Business Partner_10_Y_Y",
                "model-name": "ad_infocolumn"
            },
            "EntityType": {
                "propertyLabel": "Entity Type",
                "id": "U",
                "identifier": "User maintained",
                "model-name": "ad_entitytype"
            },
            "model-name": "ad_inforelated",
            "slug": "order-info"
        }
    ]
}
```
### Response Codes

| Code | Description |
|------|-------------|
| 200 | Successful response |
| 403 | Access denied to the requested Info Window |
| 404 | Info Window not found |

---

## Notes

- All endpoints require authentication.
- Access to Info Windows is controlled by iDempiere **Role** permissions.
- The `slug` field is a URL-friendly version of the Info Window name, automatically generated by the system.
- Pagination defaults to **100 records per page**.
- Query timeout is set to **2 minutes** by default.

