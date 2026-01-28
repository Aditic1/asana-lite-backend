import { BadRequestError } from '@/common/errors/bad-request.error.js';

export interface LoginRequestDto {
  email: string;
  password: string;
}

export const parseLoginRequest = (body: unknown): LoginRequestDto => {
  if (typeof body !== 'object' || body === null) {
    throw new BadRequestError('Invalid request body');
  }

  const { email, password } = body as Record<string, unknown>;

  if (typeof email !== 'string' || typeof password !== 'string') {
    throw new BadRequestError('Email and password must be strings');
  }

  return { email, password };
};
