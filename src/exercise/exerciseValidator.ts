import {
    ICompletedExercise,
    ICompletedExerciseErrors,
} from './exerciseInterface';

class ExerciseValidator {
    private static async validateUsername(
        completedExercise: ICompletedExercise,
        usernameCookie: string,
        errors: ICompletedExerciseErrors,
    ) {
        if (!completedExercise.username) {
            errors.errors.username = 'Username is required';
            return;
        }
        if (
            typeof completedExercise.username !== 'string' ||
            !completedExercise.username.trim()
        ) {
            errors.errors.username = 'Username must be a non-blank string';
            return;
        }
        if (completedExercise.username !== usernameCookie) {
            errors.errors.username =
                'You can not complete the exercise for another user';
        }
    }

    private static async validateExerciseName(
        completedExercise: ICompletedExercise,
        errors: ICompletedExerciseErrors,
    ) {
        if (!completedExercise.exercise_name) {
            errors.errors.exercise_name = 'Exercise name is required';
            return;
        }
        if (
            typeof completedExercise.exercise_name !== 'string' ||
            !completedExercise.exercise_name.trim()
        ) {
            errors.errors.exercise_name =
                'Exercise name must be a non-blank string';
        }
    }

    static async validateRest(
        completedExercise: ICompletedExercise,
        errors: ICompletedExerciseErrors,
    ) {
        if (!completedExercise.rest) {
            errors.errors.rest = 'Rest is required';
            return;
        }
        if (typeof completedExercise.rest !== 'number') {
            errors.errors.rest = 'Rest must be a number';
        }
        if (completedExercise.rest < 0) {
            errors.errors.rest = 'Rest must be greater than 0';
        }
    }

    static async validateSets(
        completedExercise: ICompletedExercise,
        errors: ICompletedExerciseErrors,
    ) {
        if (!completedExercise.sets) {
            errors.errors.sets = 'Sets is required';
            return;
        }
        if (!Array.isArray(completedExercise.sets)) {
            errors.errors.sets = 'Sets must be an array';
            return;
        }
        if (completedExercise.sets.length === 0) {
            errors.errors.sets = 'Sets must have at least one set';
            return;
        }

        for (const set of completedExercise.sets) {
            this.validateSet(set, errors);
        }
    }

    private static validateSet(set: any, errors: ICompletedExerciseErrors) {
        if (!set.weight) {
            errors.errors.weight = 'Weight is required';
            return;
        }

        if (typeof set.weight !== 'number') {
            errors.errors.weight = 'Weight must be a number';
            return;
        }

        if (set.weight < 0) {
            errors.errors.weight = 'Weight must be greater than 0';
            return;
        }

        if (!set.repetitions) {
            errors.errors.repetitions = 'Repetitions is required';
            return;
        }

        if (typeof set.repetitions !== 'number') {
            errors.errors.repetitions = 'Repetitions must be a number';
            return;
        }

        if (set.repetitions < 0) {
            errors.errors.repetitions = 'Repetitions must be greater than 0';
        }
    }

    static async validateCompletedExercise(
        completedExercise: ICompletedExercise,
        username: string,
    ) {
        const errors: ICompletedExerciseErrors = { errors: {} };

        this.validateUsername(completedExercise, username, errors);
        this.validateExerciseName(completedExercise, errors);
        this.validateRest(completedExercise, errors);
        this.validateSets(completedExercise, errors);

        if (Object.keys(errors.errors).length === 0) {
            return null;
        }
        return errors;
    }
}

export default ExerciseValidator;
