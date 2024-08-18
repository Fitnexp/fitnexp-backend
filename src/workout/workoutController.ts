import WorkoutService from './workoutService';
import { Request, Response } from 'express';

class WorkoutController {
    static async getWorkouts(
        req: Request & { username?: string },
        res: Response,
    ) {
        try {
            const username = req.username;
            const workouts = await WorkoutService.getWorkouts(
                username as string,
            );
            res.status(200).send({ workouts: workouts });
        } catch (_) {
            /* istanbul ignore next */
            throw new Error('Error retrieving workouts');
        }
    }
}

export default WorkoutController;
