import express from 'express';
import indexRoutes from './indexRoutes';
import bodyParser from 'body-parser';

function createServer() {
    const app = express();
    app.use(express.json());
    app.use(bodyParser.json());
    app.use('/api', indexRoutes);
    return app;
}

export default createServer;
