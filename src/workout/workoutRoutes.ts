import { Router } from 'express';
import WorkoutController from './workoutController';

const exerciseRoutes = Router();

exerciseRoutes.route('/').get(WorkoutController.getWorkouts);
/**
 * @swagger
 * /api/workouts:
 *   get:
 *     tags:
 *       - Workouts
 *     summary: Get all workouts
 *     description: This endpoint returns all workouts of the logged in user found on the database. The request must include a valid JWT token in the cookies.
 *     responses:
 *       200:
 *         description: Workouts obtained successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                - username
 *                - name
 *               properties:
 *                _id:
 *                 type: string
 *                 example: "5f8f1b7b7f1f3b0017b3e3b1"
 *                username:
 *                 type: string
 *                 example: "Alberto"
 *                name:
 *                 type: string
 *                 example: "Workout 1"
 *                description:
 *                 type: string
 *                 example: "This is a workout"
 *                exercises:
 *                 type: array
 *                 items:
 *                  type: object
 *                  example:
 *                   {name: '3/4 Sit-Up',force: 'pull',level: 'beginner',mechanic: 'compound',equipment: 'body only',primaryMuscles: ['abdominals'],secondaryMuscles: [],instructions: ['Lie down on the floor and secure your feet. Your legs should be bent at the knees.','Place your hands behind or to the side of your head. You will begin with your back on the ground. This will be your starting position.','Flex your hips and spine to raise your torso toward your knees.','At the top of the contraction your torso should be perpendicular to the ground. Reverse the motion, going only Â¾ of the way down.','Repeat for the recommended amount of repetitions.',],category: 'strength',photo: 'data:image/jpeg;base64,<base64-encoded-image>'}
 *
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

exerciseRoutes
    .route('/:id')
    .get(WorkoutController.getCompletedExercisesWorkout);
/**
 * @swagger
 * /api/workouts/{id}:
 *   get:
 *     tags:
 *       - Workouts
 *     summary: Get completed exercises for a workout
 *     description: Retrieve all completed exercises for a specific workout by ID. The request must include a valid JWT token in the cookies.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The workout ID
 *     responses:
 *       200:
 *         description: Completed exercises from the workout obtained successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                - username
 *                - name
 *               properties:
 *                completedExercises:
 *                 type: array
 *                 items:
 *                  type: array
 *                  items:
 *                   type: object
 *                   example:
 *                    {"_id": "66c79a0cd084e4e5700c3acf","exercise_name": "Ab Roller","username": "Alberto","rest": 60,"sets": [{"repetitions": 20,"weight": 10,"_id": "66c79a0cd084e4e5700c3ad0"},{"repetitions": 20,"weight": 10,"_id": "66c79a0cd084e4e5700c3ad1"}],"__v": 0,"createdAt": "2024-08-22T20:05:32.443Z","updatedAt": "2024-08-22T20:05:32.443Z"}
 *       400:
 *          description: The ID may be invalid or the user has not logged in.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  errors:
 *                    type: object
 */
export default exerciseRoutes;
