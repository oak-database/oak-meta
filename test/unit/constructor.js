import Meta from '../../.dist/meta';
import { assert } from 'chai';

describe('constructor', () => {

    it('should create an instance of Meta', () => {
        assert.instanceOf(new Meta(), Meta);
    });

    it('should have an empty object for its `users` attribute', () => {
        assert.deepEqual(new Meta().users, {});
    });

    it('should have an empty object for its `racks` attribute', () => {
        assert.deepEqual(new Meta().racks, {});
    });

});
