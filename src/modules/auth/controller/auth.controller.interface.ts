import type { Request, Response, NextFunction } from 'express';

export interface AuthController {
  loginUser(req: Request, res: Response, next: NextFunction): Promise<void>;
  registerUser(req: Request, res: Response, next: NextFunction): Promise<void>;
}
