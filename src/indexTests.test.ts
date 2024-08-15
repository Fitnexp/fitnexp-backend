import createServer from './server';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import populate from './populate/populate';
import populateTests from './populate/populateTests';
import userTests from './user/userTests';
import exerciseTests from './exercise/exerciseTests';
dotenv.config();

const app = createServer();
const mongodbUri = process.env.MONGODB_URI_TEST as string;

describe('Tests', () => {
    beforeAll(async () => {
        await populate(mongodbUri);
        await mongoose.connect(mongodbUri).catch(() => {
            throw new Error('Failed to connect to the database');
        });
    });

    afterAll(async () => {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
    });

    populateTests();
    userTests(app);
    exerciseTests(app);
});
