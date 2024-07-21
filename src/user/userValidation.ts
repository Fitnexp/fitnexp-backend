import { IRegisterForm, IRegisterFormErrors } from './userInterface';
import UserService from './userService';

class UserValidator {
    static async checkUserAlreadyExistEmail(email: string) {
        const user = await UserService.getUserByEmail(email);
        if (user) {
            return true;
        }
        return false;
    }
    static async checkUserAlreadyExistUsername(username: string) {
        const user = await UserService.getUserByUsername(username);
        if (user) {
            return true;
        }
        return false;
    }
    static async checkRegisterForm(formData: IRegisterForm) {
        const errors: IRegisterFormErrors = { errors: {} };

        // Input validation
        if (typeof formData.email !== 'string' || !formData.email.trim()) {
            errors.errors.email = 'Email must be a non-blank string';
        }
        if (
            typeof formData.username !== 'string' ||
            !formData.username.trim()
        ) {
            errors.errors.username = 'Username must be a non-blank string';
        }
        if (
            typeof formData.password !== 'string' ||
            !formData.password.trim()
        ) {
            errors.errors.password = 'Password must be a non-blank string';
        }
        if (
            typeof formData.confirmPassword !== 'string' ||
            !formData.confirmPassword.trim()
        ) {
            errors.errors.confirmPassword =
                'Confirm password must be a non-blank string';
        }
        if (
            formData.password !== formData.confirmPassword &&
            !errors.errors.password &&
            !errors.errors.confirmPassword
        ) {
            errors.errors.passwordsEqual = 'Both passwords must be equal';
        }

        if (Object.keys(errors.errors).length !== 0) {
            return errors;
        }

        // Database validation

        if (await this.checkUserAlreadyExistEmail(formData.email)) {
            errors.errors.emailInUse = 'Email is already in use';
        }

        if (await this.checkUserAlreadyExistUsername(formData.username)) {
            errors.errors.usernameInUse = 'Username is already in use';
        }

        if (Object.keys(errors.errors).length === 0) {
            return null;
        }
        return errors;
    }
}

export default UserValidator;
