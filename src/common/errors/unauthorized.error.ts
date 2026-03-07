import { AppError } from './app-errors.js';

export class UnauthorizedError extends AppError {
  statusCode = 401;

  constructor(message = 'Unauthorized error - User not logged in or invalid token') {
    super(message);
    this.name = 'UnauthorizedError';
  }
}
