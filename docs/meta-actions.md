# Meta Actions

This document describes the actions which can be consumed by the `oak-meta`
package.

## Table of Contents

* [Meta Actions](#meta-actions)
    * [Table of Contents](#table-of-contents)
    * [Actions](#actions)
        * [Create User](#create-user)
        * [Delete User](#delete-user)
        * [Create Rack](#create-rack)
        * [Grant Read](#grant-read)
        * [Grant Write](#grant-write)
        * [Revoke Read](#revoke-read)
        * [Revoke Write](#revoke-write)

## Actions

Each action is a JSON object with two attributes: `type` and `payload`. The
`type` attribute is a string which identifies the type of action, and the
`payload` attribute is a JSON object with additional information specific to the
type of action. These actions are persistently stored in the `__OAK_META__` rack
of the Oak database.

### Create User

This action creates a new user. Its type is `"create user"`.

Payload attributes:
* `username`: The name of the user to be created
* `hashedKey`: The SHA-256 digest of the user's key as a hexadecimal string

Example:
```json
{
    "type": "create user",
    "payload": {
        "username": "alice",
        "hashedKey": "038aa13b8471e2c4ee467edb95e0d839e3e45ba2e94ab39804e27e968b36ba92"
    }
}
```

#### Delete User

This action deletes an existing user. Its type is `"delete user"`.

Payload attributes:
* `username`: The name of the user to be deleted

Example:
```json
{
    "type": "delete user",
    "payload": {
        "username": "alice"
    }
}
```

### Create Rack

This action creates a new rack. Its type is `"create rack"`.

Payload attributes:
* `rackName`: The name of the rack to be created

Example:
```json
{
    "type": "create rack",
    "payload": {
        "rackName": "comments"
    }
}
```

### Grant Read

This action grants a user read access to a rack. Its type is `"grant read"`.

Payload attributes:
* `username`: The name of the user
* `rackName`: The name of the rack

Example:
```json
{
    "type": "grant read",
    "payload": {
        "username": "alice",
        "rackName": "comments"
    }
}
```

### Grant Write

This action grants a user write access to a rack. Its type is `"grant write"`.

Payload attributes:
* `username`: The name of the user
* `rackName`: The name of the rack

Example:
```json
{
    "type": "grant write",
    "payload": {
        "username": "alice",
        "rackName": "comments"
    }
}
```

### Revoke Read

This action revokes a user's read access to a rack. Its type is `"revoke read"`.

Payload attributes:
* `username`: The name of the user
* `rackName`: The name of the rack

Example:
```json
{
    "type": "revoke read",
    "payload": {
        "username": "alice",
        "rackName": "comments"
    }
}
```

### Revoke write

This action revokes a user's write access to a rack. Its type is `"revoke write"`.

Payload attributes:
* `username`: The name of the user
* `rackName`: The name of the rack

Example:
```json
{
    "type": "revoke write",
    "payload": {
        "username": "alice",
        "rackName": "comments"
    }
}
```
