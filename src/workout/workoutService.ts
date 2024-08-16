import workouts from '../populate/data/workouts';
import Workout from './workoutModel';

class WorkoutService {
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
