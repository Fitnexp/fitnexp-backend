import { Request, Response } from 'express';
import UserService from './userService';
import { IRegisterForm } from './userInterface';

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
}

export default UserController;
