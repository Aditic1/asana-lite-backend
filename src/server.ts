import 'dotenv/config';
import type { Request, Response } from 'express';
import express from 'express';

import { logger } from './common/utils/index.js';
import { authRoutes } from './modules/auth/routes/index.js';

import { errorHandler } from '@/common/middlewares/index.js';

const app = express();

const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

app.use('/auth', authRoutes);

app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'ok' });
});

app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
