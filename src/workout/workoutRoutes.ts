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

export default exerciseRoutes;
