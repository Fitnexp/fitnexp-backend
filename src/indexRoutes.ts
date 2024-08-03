import { Router } from 'express';
import userRoutes from './user/userRoutes';

const indexRoutes = Router();

indexRoutes.use('/', userRoutes);

export default indexRoutes;
