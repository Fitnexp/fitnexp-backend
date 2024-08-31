import IWorkout, { IWorkoutErrors } from './workoutInterface';

class WorkoutValidator {
    static validateWorkout(workout: IWorkout) {
        const errors: IWorkoutErrors = { errors: {} };

        if (typeof workout.description !== 'string') {
            errors.errors.description = 'Description must be a string';
        }

        if (typeof workout.name !== 'string') {
            errors.errors.name = 'Name must be a string';
        }

        if (!workout.name || workout.name.length === 0) {
            errors.errors.name = 'Email is required';
        }

        if (Object.keys(errors.errors).length === 0) {
            return null;
        }
        return errors;
    }
}

export default WorkoutValidator;
