import express from 'express';
import routes from '../api';
import bodyParser from 'body-parser';
import cors from 'cors';

export default ({ app }: { app: express.Application }) => {
    app.use(cors(
        {
            'origin': '*',
            'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
        }
    ));
    
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.use('/api', routes());
};