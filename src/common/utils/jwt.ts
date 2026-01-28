import type { JwtPayload } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';

import type { AuthTokenPayload } from '@/modules/auth/dto/auth-token-payload.js';

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

export const verifyToken = (token: string): JwtPayload | AuthTokenPayload => {
  return jwt.verify(token, jwtSecret) as JwtPayload | AuthTokenPayload;
};
