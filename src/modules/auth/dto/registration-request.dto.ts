import { BadRequestError } from '@/common/errors/bad-request.error.js';

export interface RegisterRequestDto {
  name: string;
  email: string;
  password: string;
}

export const parseRegisterRequest = (body: unknown): RegisterRequestDto => {
  if (typeof body !== 'object' || body === null) {
    throw new BadRequestError('Invalid request body');
  }

  const { email, password, name } = body as Record<string, unknown>;

  if (typeof email !== 'string' || typeof password !== 'string' || typeof name !== 'string') {
    throw new BadRequestError('Email, name and password must be strings');
  }

  return { email, password, name };
};
