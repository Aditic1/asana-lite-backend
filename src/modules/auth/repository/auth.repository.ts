import { prisma } from '@/common/config/prisma.js';
import type { User } from '@/generated/prisma/client.js';

export interface AuthRepository {
  createUser(email: string, name: string, hashedPassword: string): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
}

const createUser = async (email: string, name: string, hashedPassword: string): Promise<User> => {
  const user = await prisma.user.create({
    data: {
      email: email,
      name: name,
      passwordHash: hashedPassword,
    },
  });
  return user;
};

const findByEmail = async (email: string): Promise<User | null> => {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  return user;
};

export const authRepository: AuthRepository = {
  createUser,
  findByEmail,
};
