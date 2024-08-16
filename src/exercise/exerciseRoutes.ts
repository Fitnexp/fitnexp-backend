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
 *                     example: ['Select a light resistance and sit down on the ab machine placing your feet under the pads provided and grabbing the top handles. Your arms should be bent at a 90 degree angle as you rest the triceps on the pads provided. This will be your starting position.','At the same time, begin to lift the legs up as you crunch your upper torso. Breathe out as you perform this movement. Tip: Be sure to use a slow and controlled motion. Concentrate on using your abs to move the weight while relaxing your legs and feet.','After a second pause, slowly return to the starting position as you breathe in.','Repeat the movement for the prescribed amount of repetitions.',]
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

export default exerciseRoutes;
