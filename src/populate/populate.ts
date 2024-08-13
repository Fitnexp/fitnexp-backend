import mongoose from 'mongoose';
import dotenv from 'dotenv';

import ExerciseService from '../exercise/exerciseService';
import UserService from '../user/userService';

dotenv.config();

/* istanbul ignore next */
async function populate(mongodbUri = process.env.MONGODB_URI as string) {
    await mongoose.connect(mongodbUri).catch(() => {
        /* istanbul ignore next */
        throw new Error('Failed to connect to the database');
    });
    mongoose.connection.dropDatabase();

    await UserService.populateUsers();
    await ExerciseService.populateExercises();

    mongoose.connection.close();
}

export default populate;
