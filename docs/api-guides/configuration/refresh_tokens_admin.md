---
sidebar_position: 3
---
# Refresh Tokens Administration

With the window Rest Refresh Token you can review and administer the refresh tokens issued by the server.

For security reasons the refresh tokens are not deleted, it is recommended to set up a periodic housekeeping that takes care of deleting obsolete and unnecessary tokens.

When there is a detected breach (a trial to use a refresh token twice) the token is marked as revoked with cause Breach and all the tokens related to the breached token are revoked too with cause Breach Chain, including the authorization token, so, in case of a breach is mandatory that the user log in again. It is recommended to verify frequently for breaches and take potential actions (f.e. inform the user), this can be done setting an alert.

Also, when a user changes his/her password all the refresh tokens are revoked with cause Password Change.