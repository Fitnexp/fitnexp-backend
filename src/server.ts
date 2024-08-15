import cors from 'cors';
import indexRoutes from './indexRoutes';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import swaggerJSdoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import express, { Response } from 'express';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Fitnexp API',
            version: '1.0.0',
            description: 'This is the API for the Fitnexp web application',
        },
    },
    apis: ['src/*/*Routes.*'],
};

const swaggerSpec = swaggerJSdoc(options);

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
    app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
    app.get('/api/docs.json', (_, res: Response) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });
    app.use('/api', indexRoutes);
    return app;
}

export default createServer;
