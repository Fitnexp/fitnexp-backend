import mongoose from 'mongoose';
import ExerciseService from '../exercise/exerciseService';
import IWorkout from './workoutInterface';
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
    static async getCompletedExercisesWorkout(
        req: Request & { username?: string },
        res: Response,
    ) {
        try {
            const workoutId = req.params.id;
            if (!mongoose.isValidObjectId(workoutId)) {
                res.status(400).json({ errors: 'Workout not found' });
                return;
            }

            const username = req.username;
            const workout = await WorkoutService.getWorkout(
                username as string,
                workoutId,
            );
            if (workout.errors) {
                res.status(400).json(workout);
                return;
            }

            const completedExercises =
                await ExerciseService.getLatestCompletedExercises(
                    workout as IWorkout,
                );
            res.status(200).send({ completedExercises: completedExercises });
        } catch (error: unknown) {
            /* istanbul ignore next */
            throw new Error(error as string);
        }
    }

    static async deleteExerciseFromWorkout(
        req: Request & { username?: string },
        res: Response,
    ) {
        try {
            const { workoutId, position } = req.params;
            const username = req.username;

            const deleteExercise =
                await WorkoutService.deleteExerciseFromWorkout(
                    username as string,
                    workoutId,
                    position,
                );

            if (deleteExercise.errors) {
                res.status(400).json(deleteExercise);
                return;
            }

            res.status(200).json({
                message: 'Exercise deleted successfully',
            });
        } catch (_) {
            /* istanbul ignore next */
            throw new Error('Error deleting exercise from workout');
        }
    }
}

export default WorkoutController;
