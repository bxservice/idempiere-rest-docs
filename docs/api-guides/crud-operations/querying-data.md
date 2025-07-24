---
sidebar_position: 2
---

# Querying Data

## Filtering with `$filter`

The `$filter` query option allows you to filter a collection of resources by specifying expressions that evaluate to `true`. Only matching items will be included in the response.

### Supported Operators

#### Logical Operators

| Operator | Description         |
|----------|---------------------|
| `eq`     | equals (`=`)        |
| `neq`    | not equals (`!=`)   |
| `in`     | in list (`IN`)      |
| `gt`     | greater than (`>`)  |
| `ge`     | greater or equal (`>=`) |
| `lt`     | less than (`<`)     |
| `le`     | less or equal (`<=`) |
| `and`    | logical AND         |
| `or`     | logical OR          |
| `not`    | logical NOT         |

#### Method Operators

> ⚠️ Strings must use single quotes.

- `contains(field,'value')`
- `startswith(field,'value')`
- `endswith(field,'value')`
- `tolower(field)`
- `toupper(field)`

Parentheses are supported to group conditions.

---

### Example

Retrieve active customers whose name starts with `"Pa"` and whose ID is in a specific list:

```http
GET /api/v1/models/c_bpartner?$filter=isCustomer eq true AND isActive eq true AND startswith(name,'Pa') AND C_BPartner_ID in (120,121)
```

---

### 🧾 Sample Response

```json
{
  "page-count": 1,
  "records-size": 3,
  "skip-records": 0,
  "row-count": 1,
  "array-count": 1,
  "records": [
    {
      "id": 121,
      "uid": "39e85feb-94a2-4e41-ae45-e7d49d7be077",
      "Name": "Patio Fun, Inc.",
      "IsActive": true,
      "IsCustomer": true
    }
  ]
}
```
---
## Query Option `$orderby`

The `$orderby` query option allows developers to request resources in either ascending order using `asc` or descending order using `desc`.  

If `asc` or `desc` is not specified, then the resources will be ordered in ascending order by default.

### Example

The request below orders products by the property `Value` in descending order:

```
GET /api/v1/models/m_product?$orderby=Value desc
```

#### Response Payload (partial)
```json
{
  "page-count": 37,
  "records-size": 3,
  "skip-records": 0,
  "row-count": 111,
  "array-count": 3,
  "records": [
    {
      "id": 1000216,
      "Name": "Tron",
      "Value": "zas"
    },
    {
      "id": 1000398,
      "Name": "yudo mat",
      "Value": "ym"
    },
    {
      "id": 1000299,
      "Name": "Xiaomi Redmi Airdots",
      "Value": "Xiaomi Redmi Airdots"
    }
  ]
}
```

Use `$orderby` with any property in the model to sort your results based on your criteria.

---

## Query Options `$top` and `$skip`

The `$top` query option requests the number of items in the queried collection to be included in the result.  

The `$skip` query option requests the number of items in the queried collection that are to be skipped and not included in the result.

### Example

The request below returns the first two Orders starting from the 6th order (skipping the first 5):

```http
GET /api/v1/models/c_order?$top=2&$skip=5
```

#### Response Payload

```json
{
  "page-count": 34,
  "records-size": 2,
  "skip-records": 5,
  "row-count": 68,
  "array-count": 2,
  "records": [
    {
      "id": 1000022,
      "uid": "2238dc66-edda-41f7-8348-d781342f6dfc",
      "DocumentNo": "50015",
      "DateOrdered": "2021-07-29",
      "GrandTotal": 0.0,
      "model-name": "c_order"
    },
    {
      "id": 1000016,
      "uid": "5565e213-a119-4bcc-beb6-c9f9a4e75dab",
      "DocumentNo": "50009",
      "DateOrdered": "2021-02-16",
      "GrandTotal": 95.00,
      "model-name": "c_order"
    }
  ]
}
```

These options are useful for implementing pagination in your API consumers.

---

## Query Option `$select`

The `$select` query option allows the clients to request a limited set of properties for each entity or complex type.

### Example

The request below returns `Name` and `Value` of all products:

```
GET /api/v1/models/m_product?$select=Name,Value
```

#### Response Payload

```json
{
    "page-count": 28,
    "records-size": 4,
    "skip-records": 0,
    "row-count": 111,
    "array-count": 4,
    "records": [
        {
            "id": 1000322,
            "uid": "b0e7e8b6-13ed-406d-a105-bd67ddb7f423",
            "Name": "Mug 50",
            "Value": "Mug 50",
            "model-name": "m_product"
        },
        {
            "id": 134,
            "uid": "01254fee-c75f-42f0-941c-142e27078643",
            "Name": "Patio Table",
            "Value": "PTable",
            "model-name": "m_product"
        },
        {
            "id": 137,
            "uid": "26a7e6d7-e2c1-4c21-97f2-773dc222e6a2",
            "Name": "Mulch 10#",
            "Value": "Mulch",
            "model-name": "m_product"
        }
    ]
}
```

---

## Query Option `$expand`

The `$expand` query option allows you to include related detail records within a single request.

### Basic Example

To fetch orders along with their lines and taxes:

```
GET /api/v1/models/c_order?$expand=c_orderLine,c_ordertax
```

This returns the order along with an array of line items (`c_orderLine`) and taxes (`c_ordertax`) related to each order.

---

### Adding Query Options to Expanded Records

You can use query operators (`$filter`, `$orderby`, `$top`, `$skip`, `$select`) within expanded resources by wrapping them in parentheses and separating with `;`.

```
GET /api/v1/models/c_order?$select=DocumentNo,Description&$expand=C_OrderLine($select=Line,Linenetamt ; $filter=LineNetAmt gt 1000 ; $orderby=Line)&$top=5
```

This returns:
- Document number and description for the top 5 orders.
- Their lines filtered by `LineNetAmt > 1000`, ordered by line number, and including only `Line` and `LineNetAmt`.

---

### Custom Join Key

By default, `$expand` uses the primary key from the parent. To customize the join column, use the format `table.column`.

```
GET /api/v1/models/ad_user?$expand=C_order.salesrep_id($select=documentno)&$select=Name
```

This fetches users and expands orders where the user is the `salesrep_id`.

---

### Expanding Special Tables

Some tables like `fact_acct` use `record_id`. The plugin automatically resolves this.

```
GET /api/v1/models/c_invoice/104?$expand=fact_acct.record_id($select=fact_acct_id)&$select=DocumentNo
```

This fetches the invoice and its accounting entries from `fact_acct`.

---

### Expand Master Record

To fetch a record and expand its master (e.g. product category of a product):

```
GET /api/v1/models/m_product/122?$expand=m_product_category_id($select=Name,IsDefault)&$select=Name,m_product_category_id
```

This includes the `Name` and `IsDefault` fields from the category related to the product.

> **Note**: Only `$select` is allowed when expanding to a master record.

---

### Nested Expand

You can expand on multiple levels with detail relationships:

```
GET /api/v1/models/c_order?$expand=c_orderLine($expand=c_orderTax)
```

However, expanding backwards (e.g. master from detail) beyond the first level is not allowed.

---

## iDempiere Specific Query Options

This section covers iDempiere-specific query options for advanced filtering, labeling, and SQL visibility.

### Query Option `$valrule`

The `$valrule` option allows retrieving PO records using a validation rule by referencing either `AD_ValRule_ID` or `AD_ValRule_UU`.

---

### Query Option `$context`

The `$context` The $context query option allows you to inject context variables into your request. These context variables can then be interpreted by validation rules, such as dynamic validations or reference filters, during the execution of the request.

**Syntax**

`$context=VariableName:Value`

You can pass multiple context variables separated by commas:

`$context=Variable1:Value1,Variable2:Value2`

#### Example

`GET /api/v1/models/c_uom?$valrule=210&$context=M_Product_ID:124&$select=Name`

In this example:
- `$valrule=210` specifies the validation rule ID to apply.
- `$context=M_Product_ID:124` sets the M_Product_ID context variable to 124, so the validation rule has access to it.

---

### Query Option `showsql`

The `showsql` query option enables SQL query tracing. It includes a JSON element `sql-command` in the response payload that shows the SQL query executed by the backend.

- Use `showsql=nodata` to return only the query information without actual record data.

#### Example

**Request**  
`GET .../api/v1/models/c_tax/106?$expand=c_tax_acct&showsql`

**Response Payload Excerpt**  
```json
"sql-command": "SELECT ... FROM C_Tax WHERE ...",
"sql-command-c_tax_acct": "SELECT ... FROM C_Tax_Acct WHERE ..."
```

---

### Query Option `label`

The `label` option filters PO records based on assigned labels (`AD_Label`).  
Supports nested use within `$expand`.

#### Example

`GET /api/v1/models/C_BPartner?label=Name eq '%23Customer'`  
Returns business partners with the `#Customer` label.

---

### Query Option `showlabel`

Includes assigned label data in the response.

#### Example

**Request**  
`GET /api/v1/models/C_BPartner/119?showlabel&$select=Name,IsCustomer,IsVendor`

**Response Payload**  
```json
"assigned-labels": [
    {
        "Name": "#Customer",
        "Description": "Customers"
    },
    ...
]
```

#### Customizing Returned Label Data

- `showlabel=Name,Description` → include selected columns.
- `showlabel=Name` → include label values only.

**Request**  
`GET /api/v1/models/C_BPartner/119?showlabel=Name`

**Response Payload**  
```json
"assigned-labels": [
    "#Customer",
    "#Vendor"
]
```