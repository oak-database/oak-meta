import Meta from '../../.dist/meta';
import { assert } from 'chai';
import sinon from 'sinon';
import racks from '../test-cases/racks';

describe('createRack', () => {

    let meta;

    beforeEach(() => {
        meta = new Meta();
        meta.racks[racks[0].rackName] = {
            usersWithReadPermission: [],
            usersWithWritePermission: []
        };
    });

    it('should validate the rack name', () => {
        let rackName = racks[1].rackName;
        let mock = sinon.mock(Meta);
        mock.expects('validateRackName').once().withExactArgs(rackName);
        meta.createRack(rackName);
        mock.verify();
    });

    it('should require unique rack names', () => {
        let rackName = racks[0].rackName;
        assert.throws(() => {
            meta.createRack(rackName);
        });
    });

    it('should create a valid rack', () => {
        let rackName = racks[1].rackName;
        meta.createRack(rackName);
        let expected = {};
        expected[racks[0].rackName] = {
            usersWithReadPermission: [],
            usersWithWritePermission: []
        };
        expected[racks[1].rackName] = {
            usersWithReadPermission: [],
            usersWithWritePermission: []
        };
        assert.deepEqual(meta.racks, expected);
    });

});
