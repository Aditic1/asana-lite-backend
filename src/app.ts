import type { Request, Response } from 'express';
import express from 'express';

import { errorHandler } from './common/middlewares/errors.middlewares.js';
import { logger } from './common/utils/logger.js';
import { authRoutes } from './modules/auth/routes/auth.routes.js';

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
