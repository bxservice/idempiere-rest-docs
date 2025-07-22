---
sidebar_position: 4
---

# Update a PO (PUT)

The request below updates the tax with ID `1000000`:

**Request**

```http
PUT /api/v1/models/c_tax/1000000
```

**Body**

```json
{
  "name": "Standard Tax"
}
```

**Response Payload**

```json
{
  "id": 1000002,
  "uid": "a1c76f9b-30ea-44c1-a8c3-2bc27daa1cd1",
  "AD_Client_ID": {
    "propertyLabel": "Client",
    "id": 11,
    "identifier": "MyGST",
    "model-name": "ad_client"
  },
  "AD_Org_ID": {
    "propertyLabel": "Organization",
    "id": 0,
    "identifier": "*",
    "model-name": "ad_org"
  },
  "IsActive": true,
  "Created": "2020-08-21T18:29:28Z",
  "CreatedBy": {
    "propertyLabel": "Created By",
    "id": 101,
    "identifier": "GardenAdmin",
    "model-name": "ad_user"
  },
  "Name": "Standard Tax",
  "Description": "My Sales Tax",
  "Parent_Tax_ID": {
    "propertyLabel": "Parent Tax",
    "id": 108,
    "identifier": "GST/PST",
    "model-name": "c_tax"
  },
  "C_Country_ID": {
    "propertyLabel": "Country",
    "id": 109,
    "identifier": "Canada",
    "model-name": "c_country"
  },
  "To_Country_ID": {
    "propertyLabel": "To",
    "id": 109,
    "identifier": "Canada",
    "model-name": "c_country"
  },
  "C_TaxCategory_ID": {
    "propertyLabel": "Tax Category",
    "id": 107,
    "identifier": "Standard",
    "model-name": "c_taxcategory"
  },
  "Updated": "2022-10-28T15:48:14Z",
  "UpdatedBy": {
    "propertyLabel": "Updated By",
    "id": 101,
    "identifier": "GardenAdmin",
    "model-name": "ad_user"
  },
  "IsDocumentLevel": false,
  "ValidFrom": "1990-01-01",
  "IsSummary": false,
  "Rate": 6.0,
  "RequiresTaxCertificate": false,
  "TaxIndicator": "GST",
  "IsDefault": false,
  "IsTaxExempt": false,
  "SOPOType": {
    "propertyLabel": "SO/PO Type",
    "id": "B",
    "identifier": "Both",
    "model-name": "ad_ref_list"
  },
  "IsSalesTax": true,
  "TaxPostingIndicator": {
    "propertyLabel": "Posting Indicator",
    "id": "0",
    "identifier": "Separate Tax Posting",
    "model-name": "ad_ref_list"
  },
  "model-name": "c_tax"
}
```