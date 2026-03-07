import { AppError } from './app-errors.js';

export class ForbiddenError extends AppError {
  statusCode = 403;

  constructor(message = 'Forbidden error') {
    super(message);
    this.name = 'ForbiddenError';
  }
}
