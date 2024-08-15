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
                    secure: false,
                    sameSite: 'lax',
                    domain: 'localhost',
                    maxAge: 60 * 60 * 24 * 7 * 1000,
                },
            );

            res.cookie(
                'refreshToken',
                (tokens as { refreshToken: string }).refreshToken,
                {
                    httpOnly: true,
                    secure: false,
                    sameSite: 'lax',
                    domain: 'localhost',
                    maxAge: 60 * 60 * 24 * 7 * 1000,
                },
            );

            return res.status(200).send({
                message: 'User logged in successfully',
            });
        } catch (_) {
            /* istanbul ignore next */
            throw new Error('Error creating user');
        }
    }

    static async logoutUser(_: Request, res: Response) {
        try {
            res.cookie('accessToken', '', {
                httpOnly: true,
                secure: false,
                sameSite: 'lax',
                domain: 'localhost',
                expires: new Date(0),
            });

            res.cookie('refreshToken', '', {
                httpOnly: true,
                secure: false,
                sameSite: 'lax',
                domain: 'localhost',
                expires: new Date(0),
            });
            res.clearCookie('refreshToken', { path: '/' });
            return res.status(200).send({ message: 'Logged out successfully' });
        } catch (_) {
            /* istanbul ignore next */
            throw new Error('Error logging out user');
        }
    }

    static async loggedUser(req: Request, res: Response) {
        try {
            return res.status(200).send({ username: req.username });
        } catch (_) {
            /* istanbul ignore next */
            throw new Error('Error getting logged in user');
        }
    }
}

export default UserController;
