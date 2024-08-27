import mongoose from 'mongoose';
import { IUser } from './userInterface';

const { Schema } = mongoose;

const userSchema = new Schema<IUser>(
    {
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        exercisesDone: { type: Number, required: true, default: 0 },
        weightLifted: { type: Number, required: true, default: 0 },
        repetitionsDone: { type: Number, required: true, default: 0 },
    },
    { timestamps: true },
);

const User = mongoose.model<IUser>('User', userSchema);

export default User;
