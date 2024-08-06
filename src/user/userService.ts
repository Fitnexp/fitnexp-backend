import User from './userModel';
import UserValidator from './userValidation';
import { ILoginForm, IRegisterForm } from './userInterface';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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

    static async loginUser(formData: ILoginForm) {
        try {
            const errors = await UserValidator.checkLoginForm(formData);
            if (errors) {
                return errors;
            }

            const email = formData.email;
            const accessToken = jwt.sign(
                { email },
                process.env.ACCESS_TOKEN_SECRET as string,
                {
                    expiresIn: '5s',
                },
            );

            const refreshToken = jwt.sign(
                { email },
                process.env.REFRESH_TOKEN_SECRET as string,
                {
                    expiresIn: '10s',
                },
            );

            return { accessToken, refreshToken };
        } catch (_) {
            /* istanbul ignore next */
            throw new Error('Error login user');
        }
    }
}

export default UserService;
