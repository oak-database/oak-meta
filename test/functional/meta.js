import Meta from '../../.dist/meta';
import users from '../test-cases/users';
import racks from '../test-cases/racks';
import { assert } from 'chai';

describe('Meta', () => {

    let meta = new Meta();

    it('should be able to create the __OAK_META__ rack', () => {
        let rackName = racks[0].rackName;
        meta.processAction({
            type: 'create rack',
            payload: {
                rackName
            }
        });
        assert.strictEqual(meta.getRack(rackName).rackName, rackName);
    });

    it('should be able to create the root user', () => {
        let username = users[0].username;
        let hashedKey = users[0].hashedKey;
        meta.processAction({
            type: 'create user',
            payload: {
                username,
                hashedKey
            }
        });
        assert.strictEqual(meta.getUser(username).username, username);
    });

    it('should be able to grant the root user full access to __OAK_META__', () => {
        let username = users[0].username;
        let rackName = racks[0].rackName;
        meta.processAction({
            type: 'grant read',
            payload: {
                username,
                rackName
            }
        });
        meta.processAction({
            type: 'grant write',
            payload: {
                username,
                rackName
            }
        });
        assert.include(meta.getUser(username).writePermissions, rackName);
        assert.include(meta.getRack(rackName).usersWithWritePermission, username);
    });

    it('should be able to create users', () => {
        users.slice(1).forEach(user => {
            let username = user.username;
            let hashedKey = user.hashedKey;
            meta.processAction({
                type: 'create user',
                payload: {
                    username,
                    hashedKey
                }
            });
            assert.strictEqual(meta.getUser(username).username, username);
        });
    });

    it('should be able to create racks', () => {
        racks.slice(1).forEach(rack => {
            let rackName = rack.rackName;
            meta.processAction({
                type: 'create rack',
                payload: {
                    rackName
                }
            });
            assert.strictEqual(meta.getRack(rackName).rackName, rackName);
        });
    });

    it('should be able to grant read permissions', () => {
        users.slice(1).forEach((user, u) => {
            racks.slice(1).forEach((rack, r) => {
                let username = user.username;
                let rackName = rack.rackName;
                if (u % 2 === 0 && r % 2 === 0) {
                    meta.processAction({
                        type: 'grant read',
                        payload: {
                            username,
                            rackName
                        }
                    });
                    assert.include(meta.getUser(username).readPermissions, rackName);
                    assert.include(meta.getRack(rackName).usersWithReadPermission, username);
                } else {
                    assert.notInclude(meta.getUser(username).readPermissions, rackName);
                    assert.notInclude(meta.getRack(rackName).usersWithReadPermission, username);
                }
            });
        });
    });

    it('should be able to grant write permissions', () => {
        users.slice(1).forEach((user, u) => {
            racks.slice(1).forEach((rack, r) => {
                let username = user.username;
                let rackName = rack.rackName;
                if (u % 3 === 0 && r % 3 === 0) {
                    meta.processAction({
                        type: 'grant write',
                        payload: {
                            username,
                            rackName
                        }
                    });
                    assert.include(meta.getUser(username).writePermissions, rackName);
                    assert.include(meta.getRack(rackName).usersWithWritePermission, username);
                } else {
                    assert.notInclude(meta.getUser(username).writePermissions, rackName);
                    assert.notInclude(meta.getRack(rackName).usersWithWritePermission, username);
                }
            });
        });
    });

    it('should be able to revoke read permissions', () => {
        users.slice(1).forEach((user, u) => {
            racks.slice(1).forEach((rack, r) => {
                let username = user.username;
                let rackName = rack.rackName;
                if (u % 2 === 0 && r % 2 === 0) {
                    meta.processAction({
                        type: 'revoke read',
                        payload: {
                            username,
                            rackName
                        }
                    });
                    assert.notInclude(meta.getUser(username).readPermissions, rackName);
                    assert.notInclude(meta.getRack(rackName).usersWithReadPermission, username);
                }
            });
        });
    });

    it('should be able to revoke write permissions', () => {
        users.slice(1).forEach((user, u) => {
            racks.slice(1).forEach((rack, r) => {
                let username = user.username;
                let rackName = rack.rackName;
                if (u % 3 === 0 && r % 3 === 0) {
                    meta.processAction({
                        type: 'revoke write',
                        payload: {
                            username,
                            rackName
                        }
                    });
                    assert.notInclude(meta.getUser(username).writePermissions, rackName);
                    assert.notInclude(meta.getRack(rackName).usersWithWritePermission, username);
                }
            });
        });
    });

    it('should be able to delete users', () => {
        users.slice(1).forEach(user => {
            let username = user.username;
            meta.processAction({
                type: 'delete user',
                payload: {
                    username
                }
            });
            assert.isNull(meta.getUser(username));
        });
    });

});
