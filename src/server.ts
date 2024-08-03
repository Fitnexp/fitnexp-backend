import express from 'express';
import cors from 'cors';
import indexRoutes from './indexRoutes';
import bodyParser from 'body-parser';

function createServer() {
    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use(bodyParser.json());
    app.use('/api', indexRoutes);
    return app;
}

export default createServer;
