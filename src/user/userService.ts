import User from './userModel';
import UserValidator from './userValidation';
import { IRegisterForm } from './userInterface';
import bcrypt from 'bcrypt';

class UserService {
    static async getUserByEmail(email: string) {
        try {
            return await User.findOne({ email });
        } catch (_) {
            /* istanbul ignore next */
            throw new Error('Error getting user by email');
        }
    }
    static async getUserByUsername(username: string) {
        try {
            return await User.findOne({ username });
        } catch (_) {
            /* istanbul ignore next */
            throw new Error('Error getting user by username');
        }
    }
    static async registerUser(formData: IRegisterForm) {
        try {
            const errors = await UserValidator.checkRegisterForm(formData);
            if (errors) {
                return errors;
            }

            const { email, username, password } = formData;
            const hashedPassword = await bcrypt.hash(password, 10);

            const user = new User({
                email,
                username,
                password: hashedPassword,
            });
            await user.save();
            return user;
        } catch (_) {
            /* istanbul ignore next */
            throw new Error('Error creating user');
        }
    }
}

export default UserService;
