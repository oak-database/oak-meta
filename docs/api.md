# API

This document describes the public interface of the `oak-meta` package.

## Table of Contents

* [API](#api)
    * [Table of Contents](#table-of-contents)
    * [`Meta`](#meta)
        * [`new Meta()`](#new-meta)
        * [`meta.getUser(username)`](#metagetuserusername)
        * [`meta.getRack(rackName)`](#metagetrackrackname)
        * [`meta.processAction(action)`](#metaprocessactionaction)
        * [`Class Method: Meta.validateAction(action)`](#class-method-metavalidateactionaction)
        * [`Class Method: Meta.validateUsername(username)`](#class-method-metavalidateusernameusername)
        * [`Class Method: Meta.validateHashedKey(hashedKey)`](#class-method-metavalidatehashedkeyhashedkey)
        * [`Class Method: Meta.validateRackName(rackName)`](#class-method-metavalidateracknamerackname)

## `Meta`

`Meta` is the only module offered by `oak-meta`. It is the default export of the package.

```javascript
import Meta from 'oak-meta';
```

### `new Meta()`

Creates an instance of `Meta` for an oak database.

Example:

```javascript
const meta = new Meta();
```

### `meta.getUser(username)`

Retrieves the user with the given username. Returns `null` for a user that does not exist.

Example:

```javascript
/* Prints: {
    username: 'root',
    hashedKey: 'b62fe1895283a4aafe9985602c6061bb3a14a08e20a463f089dd9a8b42732afe',
    readPermissions: ['__OAK_META__'],
    writePermissions: ['__OAK_META__']
}*/
console.log(meta.getUser('root'));
```

### `meta.getRack(rackName)`

Retrieves the rack with the given rack name. Returns `null` for a rack that does not exist.

Example:

```javascript
/* Prints: {
    rackName: '__OAK_META__',
    usersWithReadPermission: ['root'],
    usersWithWritePermission: ['root']
}*/
console.log(meta.getRack('__OAK_META__'));
```

### `meta.processAction(action)`

Processes an action from the `__OAK_META__` rack. See [Meta Actions](meta-actions.md) for more information.

Example:

```javascript
const action = {
    type: 'create rack',
    payload: {
        rackName: '__OAK_META__'
    }
};

meta.processAction(action);
```

### `Class Method: Meta.validateAction(action)`

Validates an action, throwing an Error if the action is invalid.

An action must:

* Be an object
* Have the property `type` with a string value
* Have the property `payload` with an object value

Example:

```javascript
const action = {
    type: 'create rack',
    payload: {
        rackName: '__OAK_META__'
    }
};

try {
    meta.validateAction(action);
} catch(e) {
    // Handle the invalid action
}
```

### `Class Method: Meta.validateUsername(username)`

Validates a username, throwing an Error if the username is invalid.

A username must:

* Be a string
* Be at least 1 character in length
* Be no more than 32 characters in length
* Contain only lowercase letters (a-z) and numbers (0-9)

Example:

```javascript
try {
    meta.validateUsername('root');
} catch(e) {
    // Handle the invalid username
}
```

### `Class Method: Meta.validateHashedKey(hashedKey)`

Validates a hashed key, throwing an Error if the hashed key is invalid.

A hashed key must:

* Be a string
* Be 64 characters in length
* Contain only lowercase hexadecimal digits (0-9, a-z)

Example:

```javascript
try {
    meta.validateHashedKey('b62fe1895283a4aafe9985602c6061bb3a14a08e20a463f089dd9a8b42732afe');
} catch(e) {
    // Handle the invalid hashed key
}
```

### `Class Method: Meta.validateRackName(rackName)`

Validates a rack name, throwing an Error if the rack name is invalid.

A rack name must:

* Be a string
* Be at least 1 character in length
* Be no more than 128 characters in length
* Contain only letters (a-z, A-Z), numbers (0-9), and underscores (\_)

Example:
```javascript
try {
    meta.validateRackName('__OAK_META__');
} catch(e) {
    // Handle the invalid rack name
}
```
