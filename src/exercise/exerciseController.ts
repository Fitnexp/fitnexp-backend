import ExerciseService from './exerciseService';
import { Request, Response } from 'express';

class ExercisesController {
    static async getExercises(_req: Request, res: Response) {
        try {
            const exercises = await ExerciseService.getExercises();
            return res.status(200).send({ exercises: exercises });
        } catch (_) {
            /* istanbul ignore next */
            throw new Error('Error creating user');
        }
    }
}

export default ExercisesController;
