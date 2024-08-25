import {
    ILoginForm,
    ILoginFormErrors,
    IRegisterForm,
    IRegisterFormErrors,
} from './userInterface';
import UserService from './userService';
import bcrypt from 'bcrypt';

class UserValidator {
    private static validateEmail(
        formData: IRegisterForm | ILoginForm,
        errors: IRegisterFormErrors,
    ) {
        if (typeof formData.email !== 'string' || !formData.email.trim()) {
            errors.errors.email = 'Email must be a non-blank string';
        }
    }

    private static validateUsername(
        formData: IRegisterForm,
        errors: IRegisterFormErrors,
    ) {
        if (
            typeof formData.username !== 'string' ||
            !formData.username.trim()
        ) {
            errors.errors.username = 'Username must be a non-blank string';
        } else if (formData.username.trim().length > 16) {
            errors.errors.username = 'Username must be less than 17 characters';
        }
    }

    private static validatePassword(
        formData: IRegisterForm | ILoginForm,
        errors: IRegisterFormErrors,
    ) {
        if (
            typeof formData.password !== 'string' ||
            !formData.password.trim()
        ) {
            errors.errors.password = 'Password must be a non-blank string';
        } else if (formData.password.trim().length < 12) {
            errors.errors.password = 'Password must be at least 12 characters';
        } else if (formData.password.trim().length > 32) {
            errors.errors.password = 'Password must be less than 33 characters';
        }
    }

    private static validateConfirmPassword(
        formData: IRegisterForm,
        errors: IRegisterFormErrors,
    ) {
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
    }

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

    static async checkUserCredentials(
        email: string,
        password: string,
        errors: ILoginFormErrors,
    ) {
        const user = await UserService.getUserByEmail(email);
        if (!user) {
            errors.errors.incorrectCredentials =
                'Email or password is incorrect';
            return errors.errors.incorrectCredentials;
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            errors.errors.incorrectCredentials =
                'Email or password is incorrect';
            return errors.errors.incorrectCredentials;
        }
    }

    static async checkRegisterForm(formData: IRegisterForm) {
        const errors: IRegisterFormErrors = { errors: {} };

        // Input validation
        this.validateEmail(formData, errors);
        this.validateUsername(formData, errors);
        this.validatePassword(formData, errors);
        this.validateConfirmPassword(formData, errors);

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

    static async checkLoginForm(formData: ILoginForm) {
        const errors: ILoginFormErrors = { errors: {} };

        // Input validation
        this.validateEmail(formData, errors);
        this.validatePassword(formData, errors);

        if (Object.keys(errors.errors).length !== 0) {
            return errors;
        }

        // Database validation
        await this.checkUserCredentials(
            formData.email,
            formData.password,
            errors,
        );

        if (Object.keys(errors.errors).length === 0) {
            return null;
        }
        return errors;
    }
}

export default UserValidator;
