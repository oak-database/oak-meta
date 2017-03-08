import Meta from '../../.dist/meta';
import { assert } from 'chai';

describe('validateAction', () => {

    it('should require a value', () => {
        assert.throws(() => {
            Meta.validateAction();
        });
    });

    it('should require an object', () => {
        assert.throws(() => {
            Meta.validateAction(123);
        });
    });

    it('should require a type', () => {
        assert.throws(() => {
            Meta.validateAction({
                payload: {}
            });
        });
    });

    it('should require a string type', () => {
        assert.throws(() => {
            Meta.validateAction({
                type: 123,
                payload: {}
            });
        });
    });

    it('should require a payload', () => {
        assert.throws(() => {
            Meta.validateAction({
                type: 'create user'
            });
        });
    });

    it('should require an object payload', () => {
        assert.throws(() => {
            Meta.validateAction({
                type: 'create user',
                payload: 123
            });
        });
    });

    it('should accept a valid action', () => {
        Meta.validateAction({
            type: 'create user',
            payload: {}
        });
    });

});
