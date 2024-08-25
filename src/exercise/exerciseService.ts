import { Exercise, CompletedExercise } from './exerciseModel';
import exercises from '../populate/data/exercises';
import IWorkout from '../workout/workoutInterface';
import completedExercises from '../populate/data/completedExercises';
import { ICompletedExercise } from './exerciseInterface';
import ExerciseValidator from '../exercise/exerciseValidator';

class ExerciseService {
    static async getExercises() {
        try {
            return await Exercise.find();
        } catch (_) {
            /* istanbul ignore next */
            throw new Error('Error retrieving exercises');
        }
    }

    static async getLatestCompletedExercise(
        username: string,
        exercise_name: string,
    ) {
        try {
            return await CompletedExercise.find({ username, exercise_name })
                .sort({ createdAt: -1 })
                .limit(1);
        } catch (_) {
            /* istanbul ignore next */
            throw new Error('Error retrieving latest completed exercise');
        }
    }

    static async getLatestCompletedExercises(workout: IWorkout) {
        try {
            const latestCompletedExercises = [];
            for (const exercise of workout.exercises) {
                const latestCompletedExercise =
                    await this.getLatestCompletedExercise(
                        workout.username,
                        exercise.name,
                    );
                if (latestCompletedExercise.length === 0) {
                    latestCompletedExercises.push([
                        {
                            exercise_name: exercise.name,
                            username: workout.username,
                            rest: 60,
                            sets: [
                                { repetitions: 0, weight: 0 },
                                { repetitions: 0, weight: 0 },
                                { repetitions: 0, weight: 0 },
                            ],
                        },
                    ]);
                    continue;
                }
                latestCompletedExercises.push(latestCompletedExercise);
            }
            return latestCompletedExercises;
        } catch (_) {
            /* istanbul ignore next */
            throw new Error('Error retrieving latest completed exercises');
        }
    }

    static async postCompletedExercise(
        completedExercise: ICompletedExercise,
        usernameCookie: string,
    ) {
        try {
            const errors = await ExerciseValidator.validateCompletedExercise(
                completedExercise,
                usernameCookie,
            );
            if (errors) {
                return errors;
            }

            const { exercise_name, username, rest, sets } = completedExercise;
            const newCompletedExercise = new CompletedExercise({
                exercise_name,
                username,
                rest,
                sets,
            });
            await newCompletedExercise.save();
            return newCompletedExercise;
        } catch (_) {
            /* istanbul ignore next */
            throw new Error('Error saving new completed exercise');
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

    static async populateCompletedExercises() {
        try {
            return await CompletedExercise.insertMany(completedExercises);
        } catch (_) {
            /* istanbul ignore next */
            throw new Error('Error populating created exercises');
        }
    }
}

export default ExerciseService;
