import { Router } from 'express';
import UserController from './userController';
import verifyJWT from '../verifyJWT';

const userRoutes = Router();

userRoutes.route('/register').post(UserController.registerUser);
/**
 * @swagger
 * /api/register:
 *   post:
 *     tags:
 *       - Users
 *     summary: Register a new user
 *     description: This endpoint registers a new user with the provided information.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *               - confirmPassword
 *             properties:
 *               username:
 *                 type: string
 *                 description: The user's username.
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The user's email address.
 *               password:
 *                 type: string
 *                 format: password
 *                 description: The user's password.
 *               confirmPassword:
 *                 type: string
 *                 format: password
 *                 description: The user's password confirmation.
 *     responses:
 *       200:
 *         description: User created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Bad request. The request body is missing required fields or contains invalid data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: object
 */

userRoutes.route('/login').post(UserController.loginUser);

userRoutes.route('/logout').get(UserController.logoutUser);

userRoutes.route('/protected').get(verifyJWT, UserController.protectedRoute);

export default userRoutes;
