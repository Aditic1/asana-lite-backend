import type { Request, Response, NextFunction } from 'express';

import type { AuthController } from './auth.controller.interface.js';
import { parseLoginRequest } from '../dto/login-request.dto.js';
import { parseRegisterRequest } from '../dto/registration-request.dto.js';
import { authService } from '../services/auth.service.js';

const loginUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = parseLoginRequest(req.body);

    const result = await authService.loginUser(email, password);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const registerUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password, name } = parseRegisterRequest(req.body);

    const result = await authService.registerUser(name, email, password);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

export const authController: AuthController = {
  registerUser,
  loginUser,
};
