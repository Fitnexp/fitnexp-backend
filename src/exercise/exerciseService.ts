import { Exercise, CompletedExercise } from './exerciseModel';
import exercises from '../populate/data/exercises';
import IWorkout from '../workout/workoutInterface';
import completedExercises from '../populate/data/completedExercises';
import { ICompletedExercise } from './exerciseInterface';
import ExerciseValidator from '../exercise/exerciseValidator';
import UserService from '../user/userService';

class ExerciseService {
    static async getExercises() {
        try {
            return await Exercise.find();
        } catch (_) {
            /* istanbul ignore next */
            throw new Error('Error retrieving exercises');
        }
    }

    static async getExercisesByName(names: string[]) {
        try {
            const exercises = [];
            for (const name of names) {
                const exercise = await Exercise.findOne({ name });
                if (exercise) {
                    exercises.push(exercise);
                }
            }
            return exercises;
        } catch (_) {
            /* istanbul ignore next */
            throw new Error('Error retrieving exercises');
        }
    }

    static async getAllCompletedExercisesUser(username: string) {
        try {
            return await CompletedExercise.find({ username }).sort({
                createdAt: -1,
            });
        } catch (_) {
            /* istanbul ignore next */
            throw new Error('Error retrieving completed exercises');
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
                            greatest_weight: 0,
                            greatest_theorical_onerm: 0,
                            greatest_volume_oneset: 0,
                            greatest_volume: 0,
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
            let {
                greatest_weight,
                greatest_theorical_onerm,
                greatest_volume,
                greatest_volume_oneset,
            } = completedExercise;

            let totalVolume = 0;
            for (const set of sets) {
                if (set.weight > greatest_weight) {
                    greatest_weight = set.weight;
                    greatest_theorical_onerm = parseFloat(
                        (set.weight * (1 + set.repetitions / 30)).toFixed(2),
                    ); // Epley formula
                }

                if (set.weight * set.repetitions > greatest_volume_oneset) {
                    greatest_volume_oneset = set.weight * set.repetitions;
                }

                totalVolume += set.weight * set.repetitions;
            }
            if (totalVolume > greatest_volume) {
                greatest_volume = totalVolume;
            }

            const newCompletedExercise = new CompletedExercise({
                exercise_name,
                username,
                rest,
                sets,
                greatest_weight,
                greatest_theorical_onerm,
                greatest_volume,
                greatest_volume_oneset,
            });

            const user = await UserService.getUserByUsername(username);
            if (user) {
                user.exercisesDone += 1;
                user.weightLifted += sets.reduce(
                    (total, set) => total + set.weight * set.repetitions,
                    0,
                );
                user.repetitionsDone += sets.reduce(
                    (total, set) => total + set.repetitions,
                    0,
                );
                await user.save();
            }

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
            for (const completedExercise of completedExercises) {
                await this.postCompletedExercise(
                    completedExercise,
                    completedExercise.username,
                );
            }
        } catch (_) {
            /* istanbul ignore next */
            throw new Error('Error populating created exercises');
        }
    }
}

export default ExerciseService;
