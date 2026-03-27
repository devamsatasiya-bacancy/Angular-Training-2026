import { Injectable, computed, signal } from '@angular/core';
import { AuthResult, LoginCredentials, User } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private readonly usersData: User[] = [
    {
      id: 1,
      name: 'Amit Patel',
      email: 'amit@example.com',
      password: 'password123',
    },
    {
      id: 2,
      name: 'Neha Sharma',
      email: 'neha@example.com',
      password: 'password123',
    },
  ];

  private readonly currentUserState = signal<Omit<User, 'password'> | null>(null);

  readonly currentUser = this.currentUserState.asReadonly();
  readonly isAuthenticated = computed(() => this.currentUserState() !== null);
  readonly users = computed(() =>
    this.usersData.map(({ password, ...user }) => user),
  );

  login(credentials: LoginCredentials): AuthResult {
    const matchedUser = this.usersData.find(
      (user) =>
        user.email === credentials.email.trim() &&
        user.password === credentials.password,
    );

    if (!matchedUser) {
      return {
        success: false,
        message: 'Invalid email or password.',
      };
    }

    const { password: _password, ...safeUser } = matchedUser;
    this.currentUserState.set(safeUser);

    return {
      success: true,
      message: `Welcome, ${safeUser.name}.`,
      user: safeUser,
    };
  }

  logout(): void {
    this.currentUserState.set(null);
  }
}
