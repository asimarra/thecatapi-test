import { bcryptAdapter } from '../../../src/config/bcryptAdapter';

const password = 'password123';
let hashedPassword = bcryptAdapter.hash(password);

describe('bcryptAdapter', () => {
    describe('hash', () => {
        it('should return a hashed password', () => {
            expect(hashedPassword).toBeDefined();
        });
    });

    describe('compare', () => {
        it('should return true when the passwords are equals', () => {
            const result = bcryptAdapter.compare(password, hashedPassword);
            expect(result).toBe(true);
        });

        it('should return false when the passwords are not equals', () => {
            const incorrectPassword = 'wrongpassword';
            const result = bcryptAdapter.compare(incorrectPassword, hashedPassword);

            expect(result).toBe(false);
        });
    });
});