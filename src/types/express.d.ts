import type { Request } from 'express';

import type { Role } from '@/generated/prisma/enums.ts';

export interface UserRequest extends Request {
  userId?: string;
  role?: Role;
}
