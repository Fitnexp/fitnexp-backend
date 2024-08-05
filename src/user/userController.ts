import { Request, Response } from 'express';
import UserService from './userService';
import { ILoginForm, IRegisterForm } from './userInterface';

class UserController {
    static async registerUser(req: Request, res: Response) {
        try {
            const formData: IRegisterForm = req.body;
            const createdUser = await UserService.registerUser(formData);
            if (createdUser.errors) {
                return res.status(400).send(createdUser);
            }
            return res
                .status(200)
                .send({ message: 'User created successfully' });
        } catch (_) {
            /* istanbul ignore next */
            throw new Error('Error creating user');
        }
    }

    static async loginUser(req: Request, res: Response) {
        try {
            const formData: ILoginForm = req.body;
            const tokens = await UserService.loginUser(formData);
            if ('errors' in tokens && tokens.errors) {
                return res.status(400).send(tokens);
            }

            res.cookie(
                'accessToken',
                (tokens as { accessToken: string }).accessToken,
                {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict',
                    maxAge: 60 * 60 * 24 * 7 * 1000,
                },
            );

            res.cookie(
                'refreshToken',
                (tokens as { refreshToken: string }).refreshToken,
                {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict',
                    maxAge: 60 * 60 * 24 * 7 * 1000,
                },
            );

            return res.status(200).send({
                message: 'User logged in successfully',
                ...tokens,
            });
        } catch (_) {
            /* istanbul ignore next */
            throw new Error('Error creating user');
        }
    }

    static async logoutUser(req: Request, res: Response) {
        try {
            const cookies = req.cookies;
            if (!cookies?.accessToken || !cookies?.refreshToken) {
                return res.status(200).send();
            }
            res.clearCookie('accessToken');
            res.clearCookie('refreshToken');
            return res.status(200).send({ message: 'Logged out successfully' });
        } catch (_) {
            /* istanbul ignore next */
            throw new Error('Error logging out user');
        }
    }

    static async protectedRoute(
        req: Request & { email?: string },
        res: Response,
    ) {
        try {
            return res
                .status(200)
                .send({ message: `Welcome back ${req.email}` });
        } catch (_) {
            /* istanbul ignore next */
            throw new Error('Error accessing protected route');
        }
    }
}

export default UserController;
