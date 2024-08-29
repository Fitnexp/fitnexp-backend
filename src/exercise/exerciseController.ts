import ExerciseService from './exerciseService';
import { Request, Response } from 'express';

class ExercisesController {
    static async getExercises(_req: Request, res: Response) {
        try {
            const exercises = await ExerciseService.getExercises();
            return res.status(200).send({ exercises: exercises });
        } catch (_) {
            /* istanbul ignore next */
            throw new Error('Error retrieving exercises');
        }
    }

    static async getExercisesByName(req: Request, res: Response) {
        try {
            const names: string[] = req.body.names;
            const exercises = await ExerciseService.getExercisesByName(names);
            return res.status(200).send({ exercises: exercises });
        } catch (_) {
            /* istanbul ignore next */
            throw new Error('Error retrieving exercises');
        }
    }

    static async getAllCompletedExercisesUser(
        req: Request & { username?: string },
        res: Response,
    ) {
        try {
            const username = req.username;
            const completedExercises =
                await ExerciseService.getAllCompletedExercisesUser(
                    username as string,
                );
            return res
                .status(200)
                .send({ completedExercises: completedExercises });
        } catch (_) {
            /* istanbul ignore next */
            throw new Error('Error retrieving completed exercises');
        }
    }

    static async postCompletedExercise(
        req: Request & { username?: string },
        res: Response,
    ) {
        try {
            const { ...completedExercise } = req.body;
            const username = req.username;
            const completedExerciseStatus =
                await ExerciseService.postCompletedExercise(
                    completedExercise,
                    username as string,
                );
            if (completedExerciseStatus.errors) {
                return res.status(400).send(completedExerciseStatus);
            }
            res.status(200).send({
                meesage: 'Completed exercise saved successfully',
            });
        } catch (_) {
            /* istanbul ignore next */
            throw new Error('Error saving new completed exercise');
        }
    }
}

export default ExercisesController;
