import { AppError } from '@/common/errors/app-errors.js';

export class UserAlreadyExistsError extends AppError {
  statusCode = 409;
  constructor() {
    super('User with this email already exists');
    this.name = 'UserAlreadyExistsError';
  }
}
