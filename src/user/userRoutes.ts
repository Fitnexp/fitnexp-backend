import { Router } from 'express';
import UserController from './userController';
import verifyJWT from '../middlewares/verifyJWT';

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
/**
 * @swagger
 * /api/login:
 *   post:
 *     tags:
 *       - Users
 *     summary: Log in an user
 *     description: This endpoint logs in an user with the provided information. You will receive an access token and a refresh token in two different cookies which will let you access protected routes.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The user's email address.
 *               password:
 *                 type: string
 *                 format: password
 *                 description: The user's password.
 *     responses:
 *       200:
 *         description: User logged in successfully. Access token and refresh token are set in cookies.
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

userRoutes.route('/logout').post(UserController.logoutUser);
/**
 * @swagger
 * /api/logout:
 *   post:
 *     tags:
 *       - Users
 *     summary: Log out an user
 *     description: This endpoint logs out the user by clearing the access token and refresh token cookies.
 *     responses:
 *       200:
 *         description: User logged out successfully. Access token and refresh token cookies are cleared.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Logged out successfully.
 */

userRoutes.route('/logged-user').get(verifyJWT, UserController.loggedUser);
/**
 * @swagger
 * /api/logged-user:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get logged user
 *     description: This endpoint returns the logged user's information. The request must include a valid JWT token in the cookies.
 *     responses:
 *       200:
 *         description: Logged user information obtained successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                   example: "Alba"
 *       400:
 *         description: Unauthorized. The request does not include a valid JWT token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: string
 *                   example: Unauthorized.
 */

export default userRoutes;
