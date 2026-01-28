import type { AuthResponseDto } from '../dto/auth-response.dto.js';

export interface AuthService {
  registerUser: (name: string, email: string, password: string) => Promise<AuthResponseDto>;
  loginUser: (email: string, password: string) => Promise<AuthResponseDto>;
}
