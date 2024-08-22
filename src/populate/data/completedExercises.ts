import { ICompletedExercise } from '../../exercise/exerciseInterface';

function generateCompletedExercises(
    exercise_name: string,
    username: string,
    rest: number,
    number_sets: number,
    repetitions: number,
    weight: number,
): ICompletedExercise {
    const sets = [];
    for (let i = 0; i < number_sets; i++) {
        sets.push({ repetitions, weight });
    }
    return {
        exercise_name,
        username,
        rest,
        sets,
    };
}
const completedExercises: ICompletedExercise[] = [
    generateCompletedExercises('Ab Roller', 'Alberto', 60, 4, 10, 10),
    generateCompletedExercises('Ab Roller', 'Alberto', 60, 2, 20, 10),
    generateCompletedExercises(
        'Alternating Kettlebell Press',
        'Alberto',
        60,
        1,
        10,
        10,
    ),
    generateCompletedExercises('3/4 Sit-Up', 'Alberto', 60, 3, 10, 10),
    generateCompletedExercises('Ab Crunch Machine', 'Alberto', 60, 4, 10, 10),
    generateCompletedExercises('Air Bike', 'Alberto', 60, 3, 10, 10),
    generateCompletedExercises(
        'Alternate Heel Touchers',
        'Alberto',
        60,
        4,
        10,
        10,
    ),
];

export default completedExercises;
