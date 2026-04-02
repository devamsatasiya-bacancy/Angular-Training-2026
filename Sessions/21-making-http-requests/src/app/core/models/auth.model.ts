export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResult {
  success: boolean;
  message: string;
  user?: Omit<User, 'password'>;
}
