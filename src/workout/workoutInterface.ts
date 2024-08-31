import { IExercise } from '../exercise/exerciseInterface';

export default interface IWorkout {
    username: string;
    name: string;
    description?: string;
    exercises: IExercise[];
}

export interface IWorkoutErrors {
    errors: {
        name?: string;
        description?: string;
    };
}
