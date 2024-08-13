import Exercise from './exerciseModel';
import exercises from '../populate/data/exercises';

class ExerciseService {
    static async getExercises() {
        try {
            return await Exercise.find();
        } catch (_) {
            /* istanbul ignore next */
            throw new Error('Error retrieving exercises');
        }
    }

    static async populateExercises() {
        try {
            return await Exercise.insertMany(exercises);
        } catch (_) {
            /* istanbul ignore next */
            throw new Error('Error populating exercises');
        }
    }
}

export default ExerciseService;
