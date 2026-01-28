import type { Role } from '@/generated/prisma/enums.js';

export interface AuthResponseDto {
  id: string;
  name: string;
  email: string;
  accessToken: string;
  role: Role;
}
