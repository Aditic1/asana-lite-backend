import { AppError } from '@/common/errors/app-errors.js';

export class InvalidCredentialsError extends AppError {
  statusCode = 401;
  constructor() {
    super('Invalid credentials');
    this.name = 'InvalidCredentialsError';
  }
}
