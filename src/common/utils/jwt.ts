import jwt from 'jsonwebtoken';

import { UnauthorizedError } from '../errors/unauthorized.error.js';

import type { AuthTokenPayload } from '@/modules/auth/dto/auth-token-payload.js';
import type { UserRequest } from '@/types/express.js';

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET ?? '';
  if (secret.length === 0) {
    // Explicitly checking for empty string
    throw new Error('JWT_SECRET is not defined or is empty');
  }
  return secret;
}

const jwtSecret = getJwtSecret();

export const signToken = (payload: AuthTokenPayload): string => {
  return jwt.sign(payload, jwtSecret, { expiresIn: '1d' });
};

export const verifyToken = (token: string): AuthTokenPayload => {
  return jwt.verify(token, jwtSecret) as AuthTokenPayload;
};

/**
 * Authorization: Bearer <Token>
 */

export const parseAuthToken = (authHeader: UserRequest['headers']['authorization']): string => {
  if (authHeader === undefined) {
    throw new UnauthorizedError();
  }
  const authParts = authHeader.trim().split(' ');
  if (authParts.length !== 2 || authParts[0].toLowerCase() !== 'bearer') {
    throw new UnauthorizedError();
  }

  const token = authParts[1];
  if (!token || token === '') {
    throw new UnauthorizedError();
  }
  return token;
};
