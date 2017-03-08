import Meta from '../../.dist/meta';
import { assert } from 'chai';
import sinon from 'sinon';
import racks from '../test-cases/racks';
import users from '../test-cases/users';

describe('grantWrite', () => {

    let meta;

    beforeEach(() => {
        meta = new Meta();
        meta.racks[racks[0].rackName] = {
            usersWithReadPermission: [],
            usersWithWritePermission: [users[0].username]
        };
        meta.racks[racks[1].rackName] = {
            usersWithReadPermission: [],
            usersWithWritePermission: []
        };
        meta.users[users[0].username] = {
            hashedKey: users[0].hashedKey,
            readPermissions: [],
            writePermissions: [racks[0].rackName]
        };
    });

    it('should validate the username', () => {
        let username = users[0].username;
        let rackName = racks[1].rackName;
        let mock = sinon.mock(Meta);
        mock.expects('validateUsername').once().withExactArgs(username);
        meta.grantWrite(username, rackName);
        mock.verify();
    });

    it('should validate the rack name', () => {
        let username = users[0].username;
        let rackName = racks[1].rackName;
        let mock = sinon.mock(Meta);
        mock.expects('validateRackName').once().withExactArgs(rackName);
        meta.grantWrite(username, rackName);
        mock.verify();
    });

    it('should require an existing username', () => {
        let username = users[1].username;
        let rackName = racks[1].rackName;
        assert.throws(() => {
            meta.grantWrite(username, rackName);
        });
    });

    it('should require an existing rack name', () => {
        let username = users[0].username;
        let rackName = racks[2].rackName;
        assert.throws(() => {
            meta.grantWrite(username, rackName);
        });
    });

    it('should not allow a user that already has permission for the rack', () => {
        let username = users[0].username;
        let rackName = racks[0].rackName;
        assert.throws(() => {
            meta.grantWrite(username, rackName);
        });
    });

    it('should add the rack to the user\'s permissions', () => {
        let username = users[0].username;
        let rackName = racks[1].rackName;
        meta.grantWrite(username, rackName);
        let expected = Object.create(null);
        expected[users[0].username] = {
            hashedKey: users[0].hashedKey,
            readPermissions: [],
            writePermissions: [racks[0].rackName, racks[1].rackName]
        };
        assert.deepEqual();
    });

    it('should add the user to the rack\'s users with permission', () => {
        let username = users[0].username;
        let rackName = racks[1].rackName;
        meta.grantWrite(username, rackName);
        let expected = Object.create(null);
        expected[racks[0].rackName] = {
            usersWithReadPermission: [],
            usersWithWritePermission: [users[0].username]
        };
        expected[racks[1].rackName] = {
            usersWithReadPermission: [],
            usersWithWritePermission: [users[0].username]
        };
        assert.deepEqual();
    });

});
