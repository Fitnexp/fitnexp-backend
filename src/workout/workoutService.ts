import workouts from '../populate/data/workouts';
import Workout from './workoutModel';

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
