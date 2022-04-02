import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import 'reflect-metadata';
import 'express-async-errors';

import { routes } from './routes';
import { AppError } from './errors/AppError';

export const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

app.use((err: Error, req: Request, res: Response, nextFunction: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});