---
sidebar_position: 2
---

# Quick Start Guide

Get up and running with the iDempiere REST API in just a few steps. This guide will help you enable the plugin and perform your first API test.

---

## How to Enable and Test the REST Plugin

### 1. Install the REST Plugin

he REST API is available as a plugin in iDempiere.

Follow the installation instructions in the official guide: [How to distribute and install plugins in iDempiere](https://wiki.idempiere.org/en/Developing_Plug-Ins_-_Get_your_Plug-In_running#Distribution_of_plugins)

Once installed, make sure the plugin is active via the **OSGi Console**:  
`http://your-server/osgi/system/console/bundles`

### 2. Use Postman to Explore the API

Download the official [Postman collection and environments](https://github.com/bxservice/idempiere-rest/blob/master/com.trekglobal.idempiere.rest.api/postman/).

### Why Use Postman?

- It includes predefined environments for **local** and **demo** servers.
- You can test all endpoints with ready-to-use examples.
- You can run the authentication request and immediately interact with the system.

> 💡 Just import the collection and select an environment to start testing.

---

## 3. Make Your First API Call (Manually)

Try reading a record from a standard table, like `AD_User`:

### Request

```http
GET /api/v1/models/ad_user HTTP/1.1
Authorization: Bearer <your-token>
```

### Example Using `curl`

```bash
curl -X GET https://your-server.com/api/v1/models/ad_user \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Success!

If you receive JSON responses with data, congratulations! Your iDempiere REST API is working correctly.

### Next Steps

- Explore the the full [API Guides](./category/api-guides/) to learn more about the API

### Troubleshooting

If you encounter issues:

- Check iDempiere server logs for error messages
- Verify your credentials are correct
- Ensure the REST plugin is properly installed
- Check network connectivity and firewall settings
- Confirm the correct port and URL format

---

**Need help?** Join the [REST Mattermost channel](https://mattermost.idempiere.org/idempiere/channels/rest) for support and collaboration.
