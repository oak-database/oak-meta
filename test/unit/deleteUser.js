import Meta from '../../.dist/meta';
import { assert } from 'chai';
import sinon from 'sinon';
import users from '../test-cases/users';
import racks from '../test-cases/racks';

describe('deleteUser', () => {

    let meta;

    beforeEach(() => {
        meta = new Meta();
        meta.users[users[0].username] = {
            hashedKey: users[0].hashedKey,
            readPermissions: [racks[0].rackName],
            writePermissions: [racks[0].rackName]
        };
        meta.racks[racks[0].rackName] = {
            usersWithReadPermission: [users[0].username],
            usersWithWritePermission: [users[0].username]
        };
    });

    it('should validate the username', () => {
        let username = users[0].username;
        let mock = sinon.mock(Meta);
        mock.expects('validateUsername').once().withExactArgs(username);
        meta.deleteUser(username);
        mock.verify();
    });

    it('should require an existing username', () => {
        let username = users[1].username;
        assert.throws(() => {
            meta.deleteUser(username);
        });
    });

    it('should delete a user', () => {
        let username = users[0].username;
        meta.deleteUser(username);
        assert.deepEqual(meta.users, {});
    });

    it('should remove the deleted user\'s permissions from racks', () => {
        let username = users[0].username;
        meta.deleteUser(username);
        let expected = Object.create(null);
        expected[racks[0].rackName] = {
            usersWithReadPermission: [],
            usersWithWritePermission: []
        };
        assert.deepEqual(meta.racks, expected);
    });

});
