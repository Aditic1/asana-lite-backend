import type { Request, Response, NextFunction } from 'express';

import { AppError } from '../errors/app-errors.js';
import { logger } from '../utils/logger.js';

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  logger.error(err.stack ?? err.message);

  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      message: err.message,
    });
    return;
  }

  res.status(500).json({
    message: 'Internal Server Error',
  });
};
