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

const Exercise = mongoose.model<IExercise>('Exercise', exerciseSchema);

export default Exercise;
