import express from 'express';
import cors from 'cors';
import indexRoutes from './indexRoutes';
import bodyParser from 'body-parser';

const corsOptions = {
    origin: /^http:\/\/localhost:\d+$/,
};
function createServer() {
    const app = express();
    app.use(cors(corsOptions));
    app.use(express.json());
    app.use(bodyParser.json());
    app.use('/api', indexRoutes);
    return app;
}

export default createServer;
