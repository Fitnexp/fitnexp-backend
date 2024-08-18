import mongoose from 'mongoose';
import IWorkout from '../workout/workoutInterface';
import Exercise from '../exercise/exerciseModel';

const { Schema } = mongoose;

const workoutSchema = new Schema<IWorkout>(
    {
        username: { type: String, required: true },
        name: { type: String, required: true },
        description: { type: String },
        exercises: [Exercise.schema],
    },
    { timestamps: true },
);

const Workout = mongoose.model<IWorkout>('Workout', workoutSchema);

export default Workout;
