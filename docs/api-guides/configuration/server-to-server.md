---
sidebar_position: 2
---

# Server to Server Tokens

iDempiere allows the generation of server-to-server tokens using the **Rest Auth Token** window.

## Generating a Token

To generate a token, open the **Rest Auth Token** window and fill in the required fields:

- **Organization**
- **User**
- **Role**
- **Warehouse**
- **Language**
- **Expire in Minutes** (set to `0` for no expiration)

Once the form is saved, a token will be generated with these parameters.

![Rest Auth Token](./img/800px-01_Rest_Auth_Token.png)

## Token Activation and Deactivation

- The **Active** flag indicates whether the token is valid.
- Use the **Inactive/Active Token** process to toggle the token’s state.

![Activate Inactivate Token](./img/800px-02_Activate_Inactivate_Token.png)

## Expiring All Tokens

- Use the **Expire Server Secret** process to change the server secret key.
- This will immediately invalidate all previously issued tokens.

![Expire Server Secret](./img/800px-03_Expire_Server_Secret.png)