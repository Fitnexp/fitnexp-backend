import { Router } from 'express';
import ExerciseController from './exerciseController';

const exerciseRoutes = Router();

exerciseRoutes.route('/').get(ExerciseController.getExercises);
/**
 * @swagger
 * /api/exercises:
 *   get:
 *     tags:
 *       - Exercises
 *     summary: Get all exercises
 *     description: WARNING, THIS WILL CRASH YOUR BROWSER (TOO MANY DOCUMENTS). This endpoint returns all exercises in the database. The request must include a valid JWT token in the cookies.
 *     responses:
 *       200:
 *         description: Exercises obtained successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: Ab Crunch Machine
 *                   force:
 *                     type: string
 *                     example: pull
 *                   level:
 *                     type: string
 *                     example: beginner
 *                   mechanic:
 *                     type: string
 *                     example: isolation
 *                   equipment:
 *                     type: string
 *                     example: machine
 *                   primaryMuscles:
 *                     type: array
 *                     items:
 *                       type: string
 *                     example: ["abdominals"]
 *                   secondaryMuscles:
 *                     type: array
 *                     items:
 *                       type: string
 *                     example: []
 *                   instructions:
 *                     type: array
 *                     items:
 *                       type: string
 *                     example: ['Select a light resistance and sit down on the ab machine placing your feet under the pads provided and grabbing the top handles. Your arms should be bent at a 90 degree angle as you rest the triceps on the pads provided. This will be your starting position.','At the same time, begin to lift the legs up as you crunch your upper torso. Breathe out as you perform this movement. Tip: Be sure to use a slow and controlled motion. Concentrate on using your abs to move the weight while relaxing your legs and feet.','After a second pause, slowly return to the starting position as you breathe in.','Repeat the movement for the prescribed amount of repetitions.']
 *                   category:
 *                     type: string
 *                     example: strength
 *                   photo:
 *                     type: string
 *                     example: data:image/jpeg;base64,<base64-encoded-image>
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

exerciseRoutes.post('/names', ExerciseController.getExercisesByName);
/**
 * @swagger
 * /api/exercises/names:
 *   post:
 *     tags:
 *       - Exercises
 *     summary: Get exercises by name
 *     description: This endpoint returns exercises that match the names in the request body. The request must include a valid JWT token in the cookies.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - names
 *             properties:
 *               names:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Exercises obtained successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 exercises:
 *                   type: array
 *                   items:
 *                    type: object
 *                    properties:
 *                     name:
 *                      type: string
 *                      example: Ab Crunch Machine
 *                     force:
 *                      type: string
 *                      example: pull
 *                     level:
 *                      type: string
 *                      example: beginner
 *                     mechanic:
 *                      type: string
 *                      example: isolation
 *                     equipment:
 *                      type: string
 *                      example: machine
 *                     primaryMuscles:
 *                      type: array
 *                      items:
 *                       type: string
 *                      example: ["abdominals"]
 *                     secondaryMuscles:
 *                      type: array
 *                      items:
 *                        type: string
 *                      example: []
 *                     instructions:
 *                      type: array
 *                      items:
 *                       type: string
 *                      example: ['Select a light resistance and sit down on the ab machine placing your feet under the pads provided and grabbing the top handles. Your arms should be bent at a 90 degree angle as you rest the triceps on the pads provided. This will be your starting position.','At the same time, begin to lift the legs up as you crunch your upper torso. Breathe out as you perform this movement. Tip: Be sure to use a slow and controlled motion. Concentrate on using your abs to move the weight while relaxing your legs and feet.','After a second pause, slowly return to the starting position as you breathe in.','Repeat the movement for the prescribed amount of repetitions.']
 *                     category:
 *                      type: string
 *                      example: strength
 *                     photo:
 *                      type: string
 *                      example: data:image/jpeg;base64,<base64-encoded-image>
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

exerciseRoutes.get(
    '/completed-exercises',
    ExerciseController.getAllCompletedExercisesUser,
);
/**
 * @swagger
 * /api/exercises/completed-exercises:
 *   get:
 *     tags:
 *       - Exercises
 *     summary: Get all completed exercises from an user
 *     description: This endpoint returns all completed exercises from an user. The request must include a valid JWT token in the cookies.
 *     responses:
 *       200:
 *         description: Completed exercises obtained successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 completedExercises:
 *                   type: array
 *                   items:
 *                    type: object
 *                    properties:
 *                     exercise_name:
 *                      type: string
 *                      description: The exercise's name.
 *                     username:
 *                      type: string
 *                      description: The user's name.
 *                     rest:
 *                      type: number
 *                      description: The number of seconds of rest between sets.
 *                     sets:
 *                      type: array
 *                      items:
 *                       type: object
 *                       properties:
 *                        repetitions:
 *                          type: integer
 *                          description: Number of repetitions
 *                        weight:
 *                          type: integer
 *                          description: Weight used
 *                       description: List of sets with repetitions and weight
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

exerciseRoutes
    .route('/completed-exercise')
    .post(ExerciseController.postCompletedExercise);
export default exerciseRoutes;
/**
 * @swagger
 * /api/exercises/completed-exercise:
 *   post:
 *     tags:
 *       - Exercises
 *     summary: Post a completed exercise
 *     description: This endpoint posts a completed exercise to the database. The request must include a valid JWT token in the cookies.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - exercise_name
 *               - username
 *               - rest
 *               - sets
 *             properties:
 *               exercise_name:
 *                 type: string
 *                 description: The exercise's name.
 *               username:
 *                 type: string
 *                 description: The user's name.
 *               rest:
 *                 type: number
 *                 description: The number of seconds of rest between sets.
 *               sets:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     repetitions:
 *                       type: integer
 *                       description: Number of repetitions
 *                     weight:
 *                       type: integer
 *                       description: Weight used
 *                   description: List of sets with repetitions and weight
 *     responses:
 *       200:
 *         description: Completed exercise posted successfully.
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
