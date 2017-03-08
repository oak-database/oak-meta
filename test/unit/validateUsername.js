import Meta from '../../.dist/meta';
import { assert } from 'chai';
import users from '../test-cases/users';

describe('validateUsername', () => {

    it('should require a value', () => {
        assert.throws(() => {
            Meta.validateUsername();
        });
    });

    it('should require a string', () => {
        assert.throws(() => {
            Meta.validateUsername(123);
        });
    });

    it('should require at least one character', () => {
        assert.throws(() => {
            Meta.validateUsername('');
        });
        Meta.validateUsername('a');
    });

    it('should require no more than 32 characters', () => {
        assert.throws(() => {
            Meta.validateUsername(Array(33+1).join('a'));
        });
        Meta.validateUsername(Array(32+1).join('a'));
    });

    it('should only allow lowercase letters and numbers', () => {
        ['á', 'A', '!', 'さ'].forEach(forbiddenCharacter => {
            assert.throws(() => {
                Meta.validateUsername(forbiddenCharacter);
            });
        });
    });

    it('should accept valid usernames', () => {
        users.forEach(user => {
            Meta.validateUsername(user.username);
        });
    });

});
