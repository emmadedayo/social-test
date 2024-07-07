import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv-safe';
import cookieParser from 'cookie-parser';

import api from '@src/api';

import { errorHandlerMiddleware } from '@src/middlewares';
import notFoundMiddleware from '@src/middlewares/errors/notFound';
import mongoDbErrorHandler from '@src/middlewares/mongo/mongo-validator';
import rateLimit from 'express-rate-limit';

dotenv.config();
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many requests, please try again later.",
});
// Initialize app with express
const app: express.Application | undefined = express();

// Load App Middleware

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  helmet({
    crossOriginResourcePolicy: false,
    crossOriginEmbedderPolicy: false,
    crossOriginOpenerPolicy: false,
  })
);
app.use(limiter);
app.use(cors());
app.use('/api/v1', api);
app.use(notFoundMiddleware);
app.use(mongoDbErrorHandler);
app.use(errorHandlerMiddleware);

export default app;
