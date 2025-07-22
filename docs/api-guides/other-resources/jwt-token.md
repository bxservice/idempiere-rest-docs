---
sidebar_position: 3
---

# JWT Signature Key Endpoint

## GET `api/v1/auth/jwk`

This endpoint returns the key used to sign the JWT token.

:::danger
 Exposing the signature key is intended **exclusively** for integration with API gateways that require it (e.g., Krakend).  
 This endpoint **MUST** be hidden from public access and exposed **only** to the API gateway.  
 **Do not expose this endpoint to the internet** as it opens up your REST interface to attacks via modified JWT tokens.
:::

---

### Prerequisites

To enable this endpoint, set the following system configuration on the **System tenant**:

```
IDEMPIERE_REST_EXPOSE_JWK = Y
```

By default, the endpoint returns nothing unless the config above is set.

---

### Returns

A JSON object containing the key(s) used to sign the JWT tokens:

```json
{
  "keys": [
    {
      "alg": "HS256",
      "k": "your-key-here",
      "kid": "key-id",
      "kty": "oct"
    }
  ]
}
```

- `alg`: Algorithm used (e.g., HS256)
- `k`: The key value
- `kid`: Key identifier
- `kty`: Key type (e.g., `oct` for symmetric keys)