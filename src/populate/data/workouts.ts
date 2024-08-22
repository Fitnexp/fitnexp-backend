import { IExercise } from '../../exercise/exerciseInterface';
import IWorkout from '../../workout/workoutInterface';
import exercises from './exercises';

const exercisesDictionary = exercises.reduce(
    (acc: { [key: string]: IExercise }, exercise) => {
        acc[exercise.name] = exercise;
        return acc;
    },
    {},
);

const workouts: IWorkout[] = [
    {
        username: 'Alberto',
        name: 'Shoulders Sunday',
        description: 'Shoulder workout for Sunday',
        exercises: [
            exercisesDictionary['Ab Roller'],
            exercisesDictionary['Alternating Cable Shoulder Press'],
            exercisesDictionary['Alternating Kettlebell Press'],
        ],
    },
    {
        username: 'Alberto',
        name: 'Core Strength Beginner Workout',
        description:
            'A beginner-friendly workout to strengthen the core muscles.',
        exercises: [
            exercisesDictionary['3/4 Sit-Up'],
            exercisesDictionary['Ab Crunch Machine'],
            exercisesDictionary['Air Bike'],
            exercisesDictionary['Alternate Heel Touchers'],
        ],
    },
    {
        username: 'Jane Doe',
        name: 'Legs Monday',
        description: 'Leg workout for Monday',
        exercises: [
            exercisesDictionary['Barbell Squat'],
            exercisesDictionary['Barbell Squat To A Bench'],
            exercisesDictionary['Barbell Walking Lunge'],
        ],
    },
];

export default workouts;
