---
sidebar_position: 6
---
# Add Custom Endpoint

You can add new, custom endpoint with your own plugin.

## To do that, in your plugin:

1. Create resource classes for your endpoints using JAX-RS annotations (`@Path`, `@GET`, `@POST`, etc).
2. Create an OSGi component that implements the `ResourceExtension` interface (`@Component(service = ResourceExtension.class, immediate = true)`).
3. Override the `getResourceClasses()` method and return the set of resource classes that you have created.