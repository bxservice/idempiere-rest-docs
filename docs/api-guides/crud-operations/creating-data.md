---
sidebar_position: 3
---

# Create (POST)

To create a PO in a collection, the client sends a POST request to that collection's URL. The POST body **must** contain a single valid entity representation.

iDempiere allows creating a main PO along with its related detail records in a single POST request. This is useful when you want to create a master record and its associated data (e.g., a Business Partner with its Users and Interest Areas) at once.

For example, to create a Business Partner along with related Users and Interest Areas:

### Request

**POST** `/api/v1/models/C_BPartner`

#### Body
```json
{
    "name":"Test creating BP with User and Interest Area from REST",
     "AD_User": [
         {
             "Name":"Test User with Interest area",
             "R_ContactInterest": [
                 {
                     "R_InterestArea_ID":101
                 }
             ]
         }
     ]
}
```

### Response Payload

```json
{
    "id": 1000004,
    "uid": "d449f685-b9bd-4f69-b43c-59acfbb2e16d",
    "AD_Client_ID": {
        "propertyLabel": "Tenant",
        "id": 11,
        "identifier": "GardenWorld",
        "model-name": "ad_client"
    },
    "AD_Org_ID": {
        "propertyLabel": "Organization",
        "id": 11,
        "identifier": "HQ",
        "model-name": "ad_org"
    },
    "IsActive": true,
    "Created": "2025-07-22T18:23:22Z",
    "CreatedBy": {
        "propertyLabel": "Created By",
        "id": 101,
        "identifier": "GardenAdmin",
        "model-name": "ad_user"
    },
    "Updated": "2025-07-22T18:23:22Z",
    "UpdatedBy": {
        "propertyLabel": "Updated By",
        "id": 101,
        "identifier": "GardenAdmin",
        "model-name": "ad_user"
    },
    "Value": "10000014",
    "Name": "Test creating BP with User and Interest Area from REST",
    "SalesVolume": 0,
    "IsSummary": false,
    "IsVendor": false,
    "IsCustomer": true,
    "IsProspect": false,
    "SO_CreditLimit": 0.0,
    "SO_CreditUsed": 0.0,
    "AcqusitionCost": 0.0,
    "PotentialLifeTimeValue": 0.0,
    "ActualLifeTimeValue": 0.0,
    "ShareOfCustomer": 0,
    "IsEmployee": false,
    "IsSalesRep": false,
    "IsOneTime": false,
    "IsTaxExempt": false,
    "IsDiscountPrinted": false,
    "C_BP_Group_ID": {
        "propertyLabel": "Business Partner Group",
        "id": 103,
        "identifier": "Standard Customers",
        "model-name": "c_bp_group"
    },
    "SendEMail": false,
    "SOCreditStatus": {
        "propertyLabel": "Credit Status",
        "id": "X",
        "identifier": "No Credit Check",
        "model-name": "ad_ref_list"
    },
    "TotalOpenBalance": 0.0,
    "IsPOTaxExempt": false,
    "IsManufacturer": false,
    "Is1099Vendor": false,
    "model-name": "c_bpartner",
    "AD_User": [
        {
            "id": 1000004,
            "uid": "5a1ae2a7-d9f6-4c54-b381-a5670049ea22",
            "Name": "Test User with Interest area",
            "AD_Client_ID": {
                "propertyLabel": "Tenant",
                "id": 11,
                "identifier": "GardenWorld",
                "model-name": "ad_client"
            },
            "AD_Org_ID": {
                "propertyLabel": "Organization",
                "id": 11,
                "identifier": "HQ",
                "model-name": "ad_org"
            },
            "IsActive": true,
            "Created": "2025-07-22T18:23:22Z",
            "CreatedBy": {
                "propertyLabel": "Created By",
                "id": 101,
                "identifier": "GardenAdmin",
                "model-name": "ad_user"
            },
            "Updated": "2025-07-22T18:23:22Z",
            "UpdatedBy": {
                "propertyLabel": "Updated By",
                "id": 101,
                "identifier": "GardenAdmin",
                "model-name": "ad_user"
            },
            "C_BPartner_ID": {
                "propertyLabel": "Business Partner",
                "id": 1000004,
                "identifier": "<1000004>",
                "model-name": "c_bpartner"
            },
            "NotificationType": {
                "propertyLabel": "Notification Type",
                "id": "X",
                "identifier": "None",
                "model-name": "ad_ref_list"
            },
            "IsFullBPAccess": true,
            "Value": "tarea",
            "IsInPayroll": false,
            "IsSalesLead": false,
            "IsLocked": false,
            "FailedLoginCount": 0,
            "IsNoPasswordReset": false,
            "IsExpired": false,
            "IsAddMailTextAutomatically": false,
            "IsNoExpire": false,
            "IsSupportUser": false,
            "IsShipTo": false,
            "IsBillTo": false,
            "IsVendorLead": false,
            "model-name": "ad_user",
            "R_ContactInterest": [
                {
                    "uid": "d7a50534-ce56-4285-be21-2827b926bcd5",
                    "AD_Client_ID": {
                        "propertyLabel": "Tenant",
                        "id": 11,
                        "identifier": "GardenWorld",
                        "model-name": "ad_client"
                    },
                    "Updated": "2025-07-22T18:23:22Z",
                    "AD_User_ID": {
                        "propertyLabel": "User/Contact",
                        "id": 1000004,
                        "identifier": "<1000004>",
                        "model-name": "ad_user"
                    },
                    "CreatedBy": {
                        "propertyLabel": "Created By",
                        "id": 101,
                        "identifier": "GardenAdmin",
                        "model-name": "ad_user"
                    },
                    "UpdatedBy": {
                        "propertyLabel": "Updated By",
                        "id": 101,
                        "identifier": "GardenAdmin",
                        "model-name": "ad_user"
                    },
                    "AD_Org_ID": {
                        "propertyLabel": "Organization",
                        "id": 0,
                        "identifier": "*",
                        "model-name": "ad_org"
                    },
                    "IsActive": true,
                    "Created": "2025-07-22T18:23:22Z",
                    "R_InterestArea_ID": {
                        "propertyLabel": "Interest Area",
                        "id": 101,
                        "identifier": "Lawn Care",
                        "model-name": "r_interestarea"
                    },
                    "model-name": "r_contactinterest"
                }
            ]
        }
    ]
}
```

The system automatically associates these records during creation.

This feature simplifies data input and ensures referential integrity between the master and its detail entities.