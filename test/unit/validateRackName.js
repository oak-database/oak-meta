import Meta from '../../.dist/meta';
import { assert } from 'chai';
import racks from '../test-cases/racks';

describe('validateRackName', () => {

    it('should require a value', () => {
        assert.throws(() => {
            Meta.validateRackName();
        });
    });

    it('should require a string', () => {
        assert.throws(() => {
            Meta.validateRackName(123);
        });
    });

    it('should require at least one character', () => {
        assert.throws(() => {
            Meta.validateRackName('');
        });
        Meta.validateRackName('a');
    });

    it('should require no more than 128 characters', () => {
        assert.throws(() => {
            Meta.validateRackName(Array(129+1).join('a'));
        });
        Meta.validateRackName(Array(128+1).join('a'));
    });

    it('should only allow lowercase letters and numbers', () => {
        ['á', '!', 'さ'].forEach(forbiddenCharacter => {
            assert.throws(() => {
                Meta.validateRackName(forbiddenCharacter);
            });
        });
    });

    it('should accept valid rack names', () => {
        racks.forEach(rack => {
            Meta.validateRackName(rack.rackName);
        });
    });

});
