import mongoose from 'mongoose';
import { IExercise } from './exerciseInterface';

const { Schema } = mongoose;

const exerciseSchema = new Schema<IExercise>(
    {
        name: { type: String, required: true },
        force: { type: String },
        level: { type: String },
        mechanic: { type: String },
        equipment: { type: String },
        primaryMuscles: { type: [String] },
        secondaryMuscles: { type: [String] },
        instructions: { type: [String] },
        category: { type: String },
        photo: { type: String },
    },
    { timestamps: true },
);

export const Exercise = mongoose.model<IExercise>('Exercise', exerciseSchema);

const completedExercises = new Schema(
    {
        exercise_name: { type: String, required: true },
        username: { type: String, required: true },
        rest: { type: Number, required: true },
        sets: [
            {
                repetitions: { type: Number, required: true },
                weight: { type: Number, required: true },
            },
        ],
    },
    { timestamps: true },
);

export const CompletedExercise = mongoose.model(
    'CompletedExercise',
    completedExercises,
);
