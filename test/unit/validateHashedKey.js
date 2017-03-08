import Meta from '../../.dist/meta';
import { assert } from 'chai';
import users from '../test-cases/users';

describe('validateHashedKey', () => {

    it('should require a value', () => {
        assert.throws(() => {
            Meta.validateHashedKey();
        });
    });

    it('should require a string', () => {
        assert.throws(() => {
            Meta.validateHashedKey(123);
        });
    });

    it('should require 64 characters', () => {
        assert.throws(() => {
            Meta.validateHashedKey(Array(63+1).join('a'));
            Meta.validateHashedKey(Array(65+1).join('a'));
        });
        Meta.validateHashedKey(Array(64+1).join('a'));
    });

    it('should only allow lowercase hexadecimal characters', () => {
        ['á', 'A', '!', 'さ', 'g'].forEach(forbiddenCharacter => {
            assert.throws(() => {
                Meta.validateHashedKey(Array(64+1).join(forbiddenCharacter));
            });
        });
    });

    it('should accept valid hashed keys', () => {
        users.forEach(user => {
            Meta.validateHashedKey(user.hashedKey);
        });
    });

});
