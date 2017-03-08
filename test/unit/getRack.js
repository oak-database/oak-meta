import Meta from '../../.dist/meta';
import { assert } from 'chai';
import racks from '../test-cases/racks';

describe('getRack', () => {

    let meta;

    beforeEach(() => {
        meta = new Meta();
        racks.slice(0, 3).forEach(rack => {
            meta.racks[rack.rackName] = {
                usersWithReadPermission: [],
                usersWithWritePermission: []
            };
        });
    });

    it('should return null for a rack that does not exist', () => {
        assert.isNull(meta.getRack(racks[3].rackName));
    });

    it('should return the "__OAK_META__" rack', () => {
        let rack = meta.getRack(racks[0].rackName);
        assert.deepEqual(rack, {
            rackName: racks[0].rackName,
            usersWithReadPermission: [],
            usersWithWritePermission: []
        });
    });

    it('should return the "a" rack', () => {
        let rack = meta.getRack(racks[1].rackName);
        assert.deepEqual(rack, {
            rackName: racks[1].rackName,
            usersWithReadPermission: [],
            usersWithWritePermission: []
        });
    });

    it('should not expose its own mutable state', () => {
        let rack = meta.getRack(racks[2].rackName);
        rack.rackName = 'mutated rack name';
        rack.usersWithReadPermission.push('mutated user with read permission');
        rack.usersWithWritePermission.push('mutated user with write permission');
        assert.deepEqual(meta.getRack(racks[2].rackName), {
            rackName: racks[2].rackName,
            usersWithReadPermission: [],
            usersWithWritePermission: []
        });
    });

});
