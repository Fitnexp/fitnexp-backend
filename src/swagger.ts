import swaggerJSdoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import { Express, Response } from 'express';

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

const swaggerDocs = (app: Express) => {
    app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
    app.get('/api/docs.json', (_, res: Response) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });
};

export default swaggerDocs;
