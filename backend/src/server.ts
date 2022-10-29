import express, { Request, Response, NextFunction } from 'express';
import "express-async-errors";
import "reflect-metadata"
import dotenv from 'dotenv';
import { router } from './routes';

import "./database/ormconfig";

import "@shared/container";
import { AppError } from '@errors/AppError';

dotenv.config();

const app = express();

const port = 3333;

app.use(express.json());

app.use(router);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      message: err.message
    })
  }

  return response.status(500).json({
    status: "error",
    message: `Internal server error - ${err.message}`
  })
})

app.listen(port, () => console.log(`server running at por ${port}`));