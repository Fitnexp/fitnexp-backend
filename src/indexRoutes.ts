import { Router } from 'express';
import userRoutes from './user/userRoutes';
import exerciseRoutes from './exercise/exerciseRoutes';
import workoutRoutes from './workout/workoutRoutes';
import verifyJWT from './middlewares/verifyJWT';

const indexRoutes = Router();

indexRoutes.use('/', userRoutes);
indexRoutes.use(verifyJWT);
indexRoutes.use('/exercises', exerciseRoutes);
indexRoutes.use('/workouts', workoutRoutes);

export default indexRoutes;
