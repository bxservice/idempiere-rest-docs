# Global URL Parameters

## `locale`

In any API call, you can use the URL parameter `locale` (`?locale={locale}`) to define the language for the response. For example:

- Adding `?locale=es_CO` to the login URL (`api/v1/auth/tokens`) will return any error messages in Spanish.
- Adding it to model endpoints will return all translatable fields in Spanish, and so on.

**Example:**

```
GET /api/v1/auth/tokens?locale=es_CO
```

```
GET /api/v1/models/{tableName}?locale={locale}
```

This will localize error messages and translatable fields according to the specified locale.
