import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login-form/login-form';
import { RegisterComponent } from './components/auth/registration-form/registration-form';
import { DashboardComponent } from './components/dashboard/user-dashboard';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
  },
  { path: '**', redirectTo: '/login' },
];
