import { AppError } from './app-errors.js';

export class BadRequestError extends AppError {
  statusCode = 400;

  constructor(message = 'Bad request') {
    super(message);
    this.name = 'BadRequestError';
  }
}
