import { inject, Injectable, signal } from '@angular/core';
import {
  RegisterRequestModel,
  LoginRequestModel,
  LoginResponseModel,
} from '../models/auth/auth-model';
import { HttpClient } from '@angular/common/http';
import { devenvironment } from '../../environments/environment.development';
import { Observable, tap, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private httpclient: HttpClient = inject(HttpClient);
  private router = inject(Router);

  private currentUserSubject = new BehaviorSubject<LoginResponseModel | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  isAuthenticated = signal<boolean>(false);

  constructor() {
    this.autoLogin();
  }

  login(loginRequest: LoginRequestModel): Observable<LoginResponseModel> {
    return this.httpclient
      .post<LoginResponseModel>(`${devenvironment.apiUrl}/auth/login`, loginRequest)
      .pipe(
        tap((response) => {
          this.handleAuthSuccess(response);
        }),
      );
  }

  register(registerRequest: RegisterRequestModel): Observable<LoginResponseModel> {
    return this.httpclient
      .post<LoginResponseModel>(`${devenvironment.apiUrl}/auth/register`, registerRequest)
      .pipe(
        tap((response) => {
          this.router.navigate(['/login'], { queryParams: { registered: 'true' } });
        }),
      );
  }

  logout(): void {
    this.httpclient.post(`${devenvironment.apiUrl}/auth/logout`, {}).subscribe({
      next: () => {
        this.clearAuthData();
      },
      error: () => {
        this.clearAuthData();
      },
    });
  }

  private handleAuthSuccess(response: LoginResponseModel): void {
    localStorage.setItem('auth_token', response.accessToken);
    localStorage.setItem('current_user', JSON.stringify(response));
    console.log(response) 
    this.currentUserSubject.next(response);
    this.isAuthenticated.set(true);
    this.router.navigate(['/dashboard']);
  }

  private clearAuthData(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('current_user');
    this.currentUserSubject.next(null);
    this.isAuthenticated.set(false);
    this.router.navigate(['/login']);
  }

  autoLogin(): void {
    const token = localStorage.getItem('auth_token');
    const userJson = localStorage.getItem('current_user');

    if (token && userJson) {
      try {
        const user: LoginResponseModel = JSON.parse(userJson);
        this.currentUserSubject.next(user);
        this.isAuthenticated.set(true);
      } catch (error) {
        this.clearAuthData();
      }
    }
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  getCurrentUser(): LoginResponseModel | null {
    return this.currentUserSubject.value;
  }
}
