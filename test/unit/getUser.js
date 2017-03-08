import Meta from '../../.dist/meta';
import { assert } from 'chai';
import users from '../test-cases/users';

describe('getUser', () => {

    let meta;

    beforeEach(() => {
        meta = new Meta();
        users.slice(0, 3).forEach(user => {
            meta.users[user.username] = {
                hashedKey: user.hashedKey,
                readPermissions: [],
                writePermissions: []
            };
        });
    });

    it('should return null for a user that does not exist', () => {
        assert.isNull(meta.getUser(users[3].username));
    });

    it('should return root', () => {
        let root = meta.getUser(users[0].username);
        assert.deepEqual(root, {
            username: users[0].username,
            hashedKey: users[0].hashedKey,
            readPermissions: [],
            writePermissions: []
        });
    });

    it('should return Alice', () => {
        let alice = meta.getUser(users[1].username);
        assert.deepEqual(alice, {
            username: users[1].username,
            hashedKey: users[1].hashedKey,
            readPermissions: [],
            writePermissions: []
        });
    });

    it('should not expose its own mutable state', () => {
        let bob = meta.getUser(users[2].username);
        bob.username = 'mutated username';
        bob.hashedKey = 'mutated hashed key';
        bob.readPermissions.push('mutated read permission');
        bob.writePermissions.push('mutated write permission');
        assert.deepEqual(meta.getUser(users[2].username), {
            username: users[2].username,
            hashedKey: users[2].hashedKey,
            readPermissions: [],
            writePermissions: []
        });
    });

});
