import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Toast } from '../../shared/services/toast';
import { Auth } from '../services/auth';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(Auth);
  const router = inject(Router);
  const toastService = inject(Toast);

  if (authService.isAuthenticated()) {
    return true;
  }

  toastService.show('Please log in to create a post.', 'error');

  return router.createUrlTree(['/login'], {
    queryParams: { redirectTo: state.url },
  });
};
