import { assert } from 'chai';

class Meta {

    constructor() {
        this.users = Object.create(null);
        this.racks = Object.create(null);
    }

    getUser(username) {
        Meta.validateUsername(username);
        let user = this.users[username];
        if (user === undefined) {
            return null;
        }
        return {
            username,
            hashedKey: user.hashedKey,
            readPermissions: user.readPermissions.map(p => p),
            writePermissions: user.writePermissions.map(p => p)
        };
    }

    getRack(rackName) {
        Meta.validateRackName(rackName);
        let rack = this.racks[rackName];
        if (rack === undefined) {
            return null;
        }
        return {
            rackName,
            usersWithReadPermission: rack.usersWithReadPermission.map(u => u),
            usersWithWritePermission: rack.usersWithWritePermission.map(u => u)
        };
    }

    processAction(action) {
        Meta.validateAction(action);
        switch (action.type) {
        case 'create user':
            this.createUser(action.payload.username, action.payload.hashedKey);
            break;
        case 'delete user':
            this.deleteUser(action.payload.username);
            break;
        case 'create rack':
            this.createRack(action.payload.rackName);
            break;
        case 'grant read':
            this.grantRead(action.payload.username, action.payload.rackName);
            break;
        case 'grant write':
            this.grantWrite(action.payload.username, action.payload.rackName);
            break;
        case 'revoke read':
            this.revokeRead(action.payload.username, action.payload.rackName);
            break;
        case 'revoke write':
            this.revokeWrite(action.payload.username, action.payload.rackName);
            break;
        default:
            throw new Error('Unrecognized action type.');
        }
    }

    static validateAction(action) {
        assert.isDefined(action, 'An action must be defined.');
        assert.isObject(action, 'An action must be an object.');
        assert.isDefined(action.type, 'An action must have the property "type".');
        assert.isString(action.type, 'An action\'s "type" property must be a string.');
        assert.isDefined(action.payload, 'An action must have the property "payload".');
        assert.isObject(action.payload, 'An action\'s "payload" property must be an object.');
    }

    static validateUsername(username) {
        assert.isDefined(username, 'A username must be defined.');
        assert.isString(username, 'A username must be a string.');
        assert.isAtLeast(username.length, 1, 'A username must be at least 1 character in length.');
        assert.isAtMost(username.length, 32, 'A username cannot be more than 32 characters in length.');
        assert.match(username, /^([0-9a-z])+$/, 'A username can only contain lowercase letters (a-z) and numbers (0-9).');
    }

    static validateHashedKey(hashedKey) {
        assert.isDefined(hashedKey, 'A hashed key must be defined.');
        assert.isString(hashedKey, 'A hashed key must be a string.');
        assert.lengthOf(hashedKey, 64, 'A hashed key must be 64 characters in length.');
        assert.match(hashedKey, /^([0-9a-f])+$/, 'A hashed key must be lowercase and hexadecimal (0-9, a-f).');
    }

    static validateRackName(rackName) {
        assert.isDefined(rackName, 'A rack name must be defined.');
        assert.isString(rackName, 'A rack name must be a string.');
        assert.isAtLeast(rackName.length, 1, 'A rack name must be at least 1 character in length.');
        assert.isAtMost(rackName.length, 128, 'A rack name cannot be more than 128 characters in length.');
        assert.match(rackName, /^([0-9a-zA-Z_])+$/, 'A rack name can only contain letters (a-z, A-Z), numbers (0-9), and underscores (_).');
    }

    createUser(username, hashedKey) {
        Meta.validateUsername(username);
        Meta.validateHashedKey(hashedKey);
        assert.isUndefined(this.users[username], 'A user with this username already exists.');
        this.users[username] = {
            hashedKey: hashedKey,
            readPermissions: [],
            writePermissions: []
        };
    }

    deleteUser(username) {
        Meta.validateUsername(username);
        assert.isDefined(this.users[username], 'A user with this username does not exist.');
        this.users[username].readPermissions.forEach(readPermission => {
            let usersWithReadPermission = this.racks[readPermission].usersWithReadPermission;
            let index = usersWithReadPermission.indexOf(username);
            usersWithReadPermission.splice(index, 1);
        });
        this.users[username].writePermissions.forEach(writePermission => {
            let usersWithWritePermission = this.racks[writePermission].usersWithWritePermission;
            let index = usersWithWritePermission.indexOf(username);
            usersWithWritePermission.splice(index, 1);
        });
        delete this.users[username];
    }

    createRack(rackName) {
        Meta.validateRackName(rackName);
        assert.isUndefined(this.racks[rackName], 'This rack already exists.');
        this.racks[rackName] = {
            usersWithReadPermission: [],
            usersWithWritePermission: []
        };
    }

    grantRead(username, rackName) {
        Meta.validateUsername(username);
        Meta.validateRackName(rackName);
        assert.isDefined(this.users[username], 'A user with this username does not exist.');
        assert.isDefined(this.racks[rackName], 'This rack does not exist.');
        assert.notInclude(this.users[username].readPermissions, rackName, 'The user already has read permission for this rack.');
        this.users[username].readPermissions.push(rackName);
        this.racks[rackName].usersWithReadPermission.push(username);
    }

    grantWrite(username, rackName) {
        Meta.validateUsername(username);
        Meta.validateRackName(rackName);
        assert.isDefined(this.users[username], 'A user with this username does not exist.');
        assert.isDefined(this.racks[rackName], 'This rack does not exist.');
        assert.notInclude(this.users[username].writePermissions, rackName, 'The user already has write permission for this rack.');
        this.users[username].writePermissions.push(rackName);
        this.racks[rackName].usersWithWritePermission.push(username);
    }

    revokeRead(username, rackName) {
        Meta.validateUsername(username);
        Meta.validateRackName(rackName);
        assert.isDefined(this.users[username], 'A user with this username does not exist.');
        assert.isDefined(this.racks[rackName], 'This rack does not exist.');
        let index = this.users[username].readPermissions.indexOf(rackName);
        assert.isAtLeast(index, 0, 'The user does not have read permission for this rack.');
        this.users[username].readPermissions.splice(index, 1);
        index = this.racks[rackName].usersWithReadPermission.indexOf(username);
        this.racks[rackName].usersWithReadPermission.splice(index, 1);
    }

    revokeWrite(username, rackName) {
        Meta.validateUsername(username);
        Meta.validateRackName(rackName);
        assert.isDefined(this.users[username], 'A user with this username does not exist.');
        assert.isDefined(this.racks[rackName], 'This rack does not exist.');
        let index = this.users[username].writePermissions.indexOf(rackName);
        assert.isAtLeast(index, 0, 'The user does not have write permission for this rack.');
        this.users[username].writePermissions.splice(index, 1);
        index = this.racks[rackName].usersWithWritePermission.indexOf(username);
        this.racks[rackName].usersWithWritePermission.splice(index, 1);
    }

}

module.exports = Meta;
