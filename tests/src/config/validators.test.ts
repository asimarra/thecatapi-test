import { Validators } from '../../../src/config/validators';

describe('Validators', () => {
    describe('email', () => {
        it('should return true if recieve a valid email', () => {
            const validEmail = 'test@example.com';
            const isValid = Validators.email.test(validEmail);
            expect(isValid).toBe(true);
        });

        it('should return false if receive an invalid email', () => {
            const invalidEmail = 'invalid-email';
            const isValid = Validators.email.test(invalidEmail);
            expect(isValid).toBe(false);
        });

        it('should return false if receive an empty email', () => {
            const emptyEmail = '';
            const isValid = Validators.email.test(emptyEmail);
            expect(isValid).toBe(false);
        });
    });
});