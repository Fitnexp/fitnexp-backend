import { Router } from 'express';
import ExerciseController from './exerciseController';

const exerciseRoutes = Router();

exerciseRoutes.route('/').get(ExerciseController.getExercises);

export default exerciseRoutes;
