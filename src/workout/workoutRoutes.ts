import { Router } from 'express';
import WorkoutController from './workoutController';

const workoutRoutes = Router();

workoutRoutes.route('/').get(WorkoutController.getWorkouts);
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
 *               properties:
 *                 workouts:
 *                  type: array
 *                  items:
 *                      type: object
 *                      required:
 *                       - username
 *                       - name
 *                      properties:
 *                       _id:
 *                        type: string
 *                        example: "5f8f1b7b7f1f3b0017b3e3b1"
 *                       username:
 *                        type: string
 *                        example: "Alberto"
 *                       name:
 *                        type: string
 *                        example: "Workout 1"
 *                       description:
 *                        type: string
 *                        example: "This is a workout"
 *                       exercises:
 *                        type: array
 *                        items:
 *                         type: object
 *                         example:
 *                          {name: '3/4 Sit-Up',force: 'pull',level: 'beginner',mechanic: 'compound',equipment: 'body only',primaryMuscles: ['abdominals'],secondaryMuscles: [],instructions: ['Lie down on the floor and secure your feet. Your legs should be bent at the knees.','Place your hands behind or to the side of your head. You will begin with your back on the ground. This will be your starting position.','Flex your hips and spine to raise your torso toward your knees.','At the top of the contraction your torso should be perpendicular to the ground. Reverse the motion, going only Â¾ of the way down.','Repeat for the recommended amount of repetitions.',],category: 'strength',photo: 'data:image/jpeg;base64,<base64-encoded-image>'}
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

workoutRoutes.post('/', WorkoutController.createWorkout);
/**
 * @swagger
 * /api/workouts:
 *   post:
 *     tags:
 *       - Workouts
 *     summary: Create a new workout
 *     description: Create a new workout for the logged in user. The request must include a valid JWT token in the cookies.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Workout created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 workout:
 *                   type: object
 *                   properties:
 *                    username:
 *                     type: string
 *                    name:
 *                     type: string
 *                    description:
 *                     type: string
 *                    exercises:
 *                     type: array
 *                     items:
 *                      type: object
 *                 message:
 *                   type: string
 *                   example: "Workout created successfully"
 *
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

workoutRoutes.route('/:id').get(WorkoutController.getCompletedExercisesWorkout);
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
 *                    {"_id": "66c79a0cd084e4e5700c3acf","exercise_name": "Ab Roller","username": "Alberto","rest": 60,"sets": [{"repetitions": 20,"weight": 10,"_id": "66c79a0cd084e4e5700c3ad0"},{"repetitions": 20,"weight": 10,"_id": "66c79a0cd084e4e5700c3ad1"}],"greatest_weight": 0,"greatest_theorical_onerm": 0,"greatest_volume_oneset": 0,"greatest_volume": 0,"__v": 0,"createdAt": "2024-08-22T20:05:32.443Z","updatedAt": "2024-08-22T20:05:32.443Z"}
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

workoutRoutes.delete(
    '/:workoutId/exercises/:position',
    WorkoutController.deleteExerciseFromWorkout,
);
/**
 * @swagger
 * /api/workouts/{workoutId}/exercises/{position}:
 *   delete:
 *     tags:
 *       - Workouts
 *     summary: Delete an exercise from a workout
 *     description: Delete an exercise from a workout by its position in the exercises array. The request must include a valid JWT token in the cookies.
 *     parameters:
 *       - in: path
 *         name: workoutId
 *         required: true
 *         schema:
 *           type: string
 *         description: The workout ID
 *       - in: path
 *         name: position
 *         required: true
 *         schema:
 *          type: number
 *         description: The position of the exercise in the exercises array
 *     responses:
 *       200:
 *         description: Exercise deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                message:
 *                 type: string
 *       400:
 *          description: The ID or the position may be invalid or the user has not logged in.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  errors:
 *                    type: string
 */

workoutRoutes.post(
    '/:workoutId/exercises',
    WorkoutController.addExerciseToWorkout,
);
/**
 * @swagger
 * /api/workouts/{workoutId}/exercises:
 *   post:
 *     tags:
 *       - Workouts
 *     summary: Add an exercise to a workout
 *     description: Add an exercise to a workout by its ID. The request must include a valid JWT token in the cookies.
 *     parameters:
 *     - in: path
 *       name: workoutId
 *       required: true
 *       schema:
 *         type: string
 *       description: The workout ID
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example: {"_id": "66d2319c9ae7ed4e793d5e34","name": "Adductor/Groin","force": "static","level": "intermediate","mechanic": null,"equipment": null,"primaryMuscles": ["adductors"],"secondaryMuscles": [],"instructions": ["Lie on your back with your feet raised towards the ceiling.","Have your partner hold your feet or ankles. Abduct your legs as far as you can. This will be your starting position.","Attempt to squeeze your legs together for 10 or more seconds, while your partner prevents you from doing so.","Now, relax the muscles in your legs as your partner pushes your feet apart, stretching as far as is comfortable for you. Be sure to let your partner know when the stretch is adequate to prevent overstretching or injury."], "category": "stretching", "__v": 0, "createdAt": "2024-08-30T20:54:52.456Z", "updatedAt": "2024-08-30T20:54:52.456Z"}
 *     responses:
 *       200:
 *         description: Exercise added successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                  type: string
 *
 *       400:
 *         description: Bad request. The request body is missing required fields or contains invalid data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: string
 */

export default workoutRoutes;
