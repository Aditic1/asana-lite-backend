export interface AuthTokenPayload {
  userId: string;
  role: 'USER' | 'ADMIN';
}
