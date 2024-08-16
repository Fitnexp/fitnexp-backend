import { Router } from 'express';
import WorkoutController from './workoutController';

const exerciseRoutes = Router();

exerciseRoutes.route('/').get(WorkoutController.getWorkouts);

export default exerciseRoutes;
