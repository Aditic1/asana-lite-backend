import type { AuthService } from './auth.service.interface.js';
import type { AuthResponseDto } from '../dto/auth-response.dto.js';
import { InvalidCredentialsError } from '../errors/invalid-credentials.error.js';
import { UserAlreadyExistsError } from '../errors/user-already-exists.error.js';
import { authRepository } from '../repository/auth.repository.js';

import { comparePassword, hashPassword } from '@/common/utils/hash.js';
import { signToken } from '@/common/utils/jwt.js';
import { isUniqueConstraintError } from '@/common/utils/prisma-errors.js';

/**
 *
 * @param name
 * @param email
 * @param password
 *
 * Returns back the AuthResponse DTO or would throw back the error.
 * 1. If user's email is already present, we throw error, e.g. user email already exists in database
 * 2. If not, we create a new user with the details given
 * 3. Generate access token, and return everything in AuthResponseDTO format
 */
const registerUser = async (
  name: string,
  email: string,
  password: string,
): Promise<AuthResponseDto> => {
  const existingUser = await authRepository.findByEmail(email);

  if (existingUser) {
    throw new UserAlreadyExistsError();
  }

  const hashedPassword = await hashPassword(password);
  let newUser;

  try {
    newUser = await authRepository.createUser(email, name, hashedPassword);
  } catch (error) {
    if (isUniqueConstraintError(error)) {
      throw new UserAlreadyExistsError();
    }
    throw error;
  }
  const accessToken = signToken({ userId: newUser.id, role: newUser.role });

  const authResponseDto: AuthResponseDto = {
    id: newUser.id,
    email: newUser.email,
    name: newUser.name,
    accessToken: accessToken,
    role: newUser.role,
  };

  return authResponseDto;
};

/**
 *
 * @param email
 * @param password
 *
 * Returns DTO or throws error
 * 1. Accepts email and password.
 * 2. Uses findUserByEmail from repo layer
 * 3. If user is not returned, we throw InvalidCredentialsError
 * 4. Compare password and hashedPassword present in User using bcrypt
 * 5. If not a match, throw InvalidCredentialsError
 * 6. Get sign on {role, id} and get access token
 * 7. Send back the object - authResponseDTO
 */
const loginUser = async (email: string, password: string): Promise<AuthResponseDto> => {
  const existingUser = await authRepository.findByEmail(email);
  if (!existingUser) {
    throw new InvalidCredentialsError();
  }

  const credentialsValidity = await comparePassword(password, existingUser.passwordHash);
  if (!credentialsValidity) {
    throw new InvalidCredentialsError();
  }

  const accessToken = signToken({ userId: existingUser.id, role: existingUser.role });
  const authResponseDto: AuthResponseDto = {
    id: existingUser.id,
    email: existingUser.email,
    name: existingUser.name,
    accessToken: accessToken,
    role: existingUser.role,
  };
  return authResponseDto;
};
export const authService: AuthService = {
  registerUser,
  loginUser,
};
