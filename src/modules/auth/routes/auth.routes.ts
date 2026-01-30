import { Router } from 'express';

import { authController } from '../controller/auth.controller.js';

const router = Router();

router.post('/login', authController.loginUser);
router.post('/register', authController.registerUser);

export const authRoutes = router;
