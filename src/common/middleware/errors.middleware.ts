import type { Request, Response, NextFunction } from 'express';

import { AppError } from '../errors/app-errors.js';
import { logger } from '../utils/logger.js';

export const errorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      message: error.message,
    });
    return;
  }
  logger.error(error as Error);
  res.status(500).json({
    message: 'Internal Server Error',
  });
};
