import mongoose from 'mongoose';
import { ICompletedExercise, IExercise } from './exerciseInterface';

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

        greatest_weight: { type: Number, default: 0 },
        greatest_theorical_onerm: { type: Number, default: 0 },
        greatest_volume_oneset: { type: Number, default: 0 },
        greatest_volume: { type: Number, default: 0 },
    },
    { timestamps: true },
);

export const CompletedExercise = mongoose.model<ICompletedExercise>(
    'CompletedExercise',
    completedExercises,
);
