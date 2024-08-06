import express from 'express';
import cors from 'cors';
import indexRoutes from './indexRoutes';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

const corsOptions = {
    origin: /^http:\/\/localhost:\d+$/,
    credentials: true,
};
function createServer() {
    const app = express();
    app.use(cors(corsOptions));
    app.use(cookieParser());
    app.use(express.json());
    app.use(bodyParser.json());
    app.use('/api', indexRoutes);
    return app;
}

export default createServer;
