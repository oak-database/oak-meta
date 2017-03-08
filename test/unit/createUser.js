import Meta from '../../.dist/meta';
import { assert } from 'chai';
import sinon from 'sinon';
import users from '../test-cases/users';

describe('createUser', () => {

    let meta;

    beforeEach(() => {
        meta = new Meta();
        meta.users[users[0].username] = {
            hashedKey: users[0].hashedKey,
            readPermissions: [],
            writePermissions: []
        };
    });

    it('should validate the username', () => {
        let username = users[1].username;
        let hashedKey = users[1].hashedKey;
        let mock = sinon.mock(Meta);
        mock.expects('validateUsername').once().withExactArgs(username);
        meta.createUser(username, hashedKey);
        mock.verify();
    });

    it('should validate the hashed key', () => {
        let username = users[1].username;
        let hashedKey = users[1].hashedKey;
        let mock = sinon.mock(Meta);
        mock.expects('validateHashedKey').once().withExactArgs(hashedKey);
        meta.createUser(username, hashedKey);
        mock.verify();
    });

    it('should require unique usernames', () => {
        let username = users[0].username;
        let hashedKey = users[0].hashedKey;
        assert.throws(() => {
            meta.createUser(username, hashedKey);
        });
    });

    it('should create a valid user', () => {
        let username = users[1].username;
        let hashedKey = users[1].hashedKey;
        meta.createUser(username, hashedKey);
        let expected = {};
        expected[users[0].username] = {
            hashedKey: users[0].hashedKey,
            readPermissions: [],
            writePermissions: []
        };
        expected[users[1].username] = {
            hashedKey: users[1].hashedKey,
            readPermissions: [],
            writePermissions: []
        };
        assert.deepEqual(meta.users, expected);
    });

});
