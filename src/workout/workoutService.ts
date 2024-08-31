import mongoose from 'mongoose';
import workouts from '../populate/data/workouts';
import Workout from './workoutModel';
import IWorkout from './workoutInterface';
import { IExercise } from '../exercise/exerciseInterface';
import WorkoutValidator from './workoutValidator';

class WorkoutService {
    static async getWorkout(username: string, id: string) {
        try {
            const workout = await Workout.findById(id);
            if (!workout) {
                return { errors: 'Workout not found' };
            }
            if (workout.username !== username) {
                return { errors: 'Unauthorized' };
            }
            return workout;
        } catch (error: unknown) {
            /* istanbul ignore next */
            throw new Error(error as string);
        }
    }

    static async getWorkoutByName(username: string, name: string) {
        try {
            const workout = await Workout.findOne({ username, name });
            if (!workout) {
                return { errors: 'Workout not found' };
            }
            return workout;
        } catch (error: unknown) {
            /* istanbul ignore next */
            throw new Error(error as string);
        }
    }

    static async getWorkouts(username: string) {
        try {
            return await Workout.find({ username: username });
        } catch (_) {
            /* istanbul ignore next */
            throw new Error('Error retrieving workouts');
        }
    }

    static async createWorkout(workout: IWorkout) {
        try {
            const errors = WorkoutValidator.validateWorkout(workout);
            if (errors) {
                return errors;
            }

            const { username, name, description } = workout;
            const newWorkout = new Workout({
                username,
                name,
                description,
                exercises: [],
            });
            await newWorkout.save();
            return newWorkout;
        } catch (_) {
            /* istanbul ignore next */
            throw new Error('Error creating workout');
        }
    }

    static async deleteExerciseFromWorkout(
        username: string,
        workoutId: string,
        position: string,
    ) {
        try {
            if (!mongoose.isValidObjectId(workoutId)) {
                return { errors: 'Invalid workout ID' };
            }

            const workout = await WorkoutService.getWorkout(
                username,
                workoutId,
            );

            /* istanbul ignore next */
            if (workout.errors) {
                return workout;
            }

            const pos = parseInt(position, 10);
            if (
                isNaN(pos) ||
                pos < 0 ||
                pos >= (workout as IWorkout).exercises.length
            ) {
                return { errors: 'Invalid position' };
            }

            (workout as IWorkout).exercises.splice(pos, 1);

            const updatedWorkout = workout as mongoose.Document & IWorkout;
            await updatedWorkout.save();

            return updatedWorkout;
        } catch (_) {
            /* istanbul ignore next */
            throw new Error('Error deleting exercise from workout');
        }
    }

    static async addExerciseToWorkout(
        username: string,
        workoutId: string,
        exercise: IExercise,
    ) {
        try {
            if (!mongoose.isValidObjectId(workoutId)) {
                return { errors: 'Invalid workout ID' };
            }

            const workout = await WorkoutService.getWorkout(
                username,
                workoutId,
            );

            /* istanbul ignore next */
            if (workout.errors) {
                return workout;
            }

            (workout as IWorkout).exercises.push(exercise);

            const updatedWorkout = workout as mongoose.Document & IWorkout;
            await updatedWorkout.save();

            return updatedWorkout;
        } catch (_) {
            /* istanbul ignore next */
            throw new Error('Error adding exercise to workout');
        }
    }

    static async populateWorkouts() {
        try {
            return await Workout.insertMany(workouts);
        } catch (_) {
            /* istanbul ignore next */
            throw new Error('Error populating workouts');
        }
    }
}

export default WorkoutService;
