import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';

import { Application } from 'express';

const middlewares = (app: Application) => {
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(
    cors({
      origin: '*',
      methods: ['GET', 'PUT', 'POST', 'DELETE','PATCH'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true, // Habilitar el intercambio de cookies
    }),
  );
  app.use(morgan('[:method] :url :status'));
  app.use(helmet());
  app.use(compression());
  
};

export default middlewares;
