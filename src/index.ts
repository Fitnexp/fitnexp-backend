import mongoose from 'mongoose';
import swaggerDocs from './swagger';
import createServer from './server';
import config from '../config';

const app = createServer();

app.listen(config.PORT, () => {
    mongoose.connect(config.MONGODB_URI).catch(() => {
        throw new Error('Failed to connect to the database');
    });
    swaggerDocs(app, config.PORT);
    console.log(
        `Server is running on http://localhost:${config.PORT}/api/login, current environment is ${process.env.NODE_ENV}`,
    );
});
