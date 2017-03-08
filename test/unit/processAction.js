import Meta from '../../.dist/meta';
import { assert } from 'chai';
import sinon from 'sinon';
import users from '../test-cases/users';
import racks from '../test-cases/racks';

describe('processAction', () => {

    let meta;

    beforeEach(() => {
        meta = new Meta();
    });

    it('should call createUser', () => {
        let username = users[0].username;
        let hashedKey = users[0].hashedKey;
        let mock = sinon.mock(meta);
        mock.expects('createUser').once().withExactArgs(username, hashedKey);
        meta.processAction({
            type: 'create user',
            payload: {
                username,
                hashedKey
            }
        });
        mock.verify();
    });

    it('should call deleteUser', () => {
        let username = users[0].username;
        let mock = sinon.mock(meta);
        mock.expects('deleteUser').once().withExactArgs(username);
        meta.processAction({
            type: 'delete user',
            payload: {
                username
            }
        });
        mock.verify();
    });

    it('should call createRack', () => {
        let rackName = racks[0].rackName;
        let mock = sinon.mock(meta);
        mock.expects('createRack').once().withExactArgs(rackName);
        meta.processAction({
            type: 'create rack',
            payload: {
                rackName
            }
        });
        mock.verify();
    });

    it('should call grantRead', () => {
        let username = users[0].username;
        let rackName = racks[0].rackName;
        let mock = sinon.mock(meta);
        mock.expects('grantRead').once().withExactArgs(username, rackName);
        meta.processAction({
            type: 'grant read',
            payload: {
                username,
                rackName
            }
        });
        mock.verify();
    });

    it('should call grantWrite', () => {
        let username = users[0].username;
        let rackName = racks[0].rackName;
        let mock = sinon.mock(meta);
        mock.expects('grantWrite').once().withExactArgs(username, rackName);
        meta.processAction({
            type: 'grant write',
            payload: {
                username,
                rackName
            }
        });
        mock.verify();
    });

    it('should call revokeRead', () => {
        let username = users[0].username;
        let rackName = racks[0].rackName;
        let mock = sinon.mock(meta);
        mock.expects('revokeRead').once().withExactArgs(username, rackName);
        meta.processAction({
            type: 'revoke read',
            payload: {
                username,
                rackName
            }
        });
        mock.verify();
    });

    it('should call revokeWrite', () => {
        let username = users[0].username;
        let rackName = racks[0].rackName;
        let mock = sinon.mock(meta);
        mock.expects('revokeWrite').once().withExactArgs(username, rackName);
        meta.processAction({
            type: 'revoke write',
            payload: {
                username,
                rackName
            }
        });
        mock.verify();
    });

    it('should throw an error for unrecognized action types', () => {
        assert.throws(() => {
            meta.processAction({
                type: 'this is not a valid type',
                payload: {
                    key: 'value'
                }
            });
        });
    });

});
