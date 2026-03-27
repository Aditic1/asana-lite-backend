import type { NextFunction, Response } from 'express';

import { UnauthorizedError } from '../errors/unauthorized.error.js';
import { parseAuthToken, verifyToken } from '../utils/jwt.js';

import type { UserRequest } from '@/types/express.js';

/**
 *
 * @param _req
 * @param _res
 * @param _next
 *
 * This is used to authenticate the token received from request header.
 * 1. If request.header.authorization doesn't exist, throw new UnauthorizedError
 * 2. Inside try catch block, do all these things -
 *      a. const authToken = parseAuthorizationToken(request.header.authorization)
 *      b. const payload = verifyToken(authToken)
 *      c. req.userId = payload.userId
 *      d. req.role = payload.role
 *      e. next()
 *  catch{
 *      next(new UnauthorizedError())
 * }
 */
export const authMiddleware = (req: UserRequest, _res: Response, next: NextFunction): void => {
  if (req.headers.authorization === undefined) {
    return next(new UnauthorizedError());
  }
  try {
    const authToken = parseAuthToken(req.headers.authorization);
    const payload = verifyToken(authToken);
    req.userId = payload.userId;
    req.role = payload.role;
    next();
  } catch {
    next(new UnauthorizedError());
  }
};
