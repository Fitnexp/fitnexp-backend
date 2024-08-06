import mongoose from 'mongoose';
import swaggerDocs from './swagger';
import createServer from './server';
import dotenv from 'dotenv';

dotenv.config();

const app = createServer();

const port = parseInt(process.env.PORT as string) || 3000;
const mongodbUri = process.env.MONGODB_URI as string;

app.listen(port, async () => {
    await mongoose.connect(mongodbUri).catch(() => {
        throw new Error('Failed to connect to the database');
    });
    swaggerDocs(app);
    console.log(
        `Server is running, docs are available at http://localhost:${port}/api/docs`,
    );
});
