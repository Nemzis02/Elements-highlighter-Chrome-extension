import { NextFunction, Request, Response } from 'express';
import config from '../config/config';

export interface AppError extends Error {
  status?: number;
  statusCode?: number;
}

export const errorHandler = (
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const statusCode = err.statusCode || err.status || 500;
  const isProduction = config.nodeEnv === 'production';

  console.error(err);

  res.status(statusCode).json({
    success: false,
    error: {
      message: err.message || 'Internal Server Error',
      ...(isProduction ? {} : { stack: err.stack }),
    },
  });
};
