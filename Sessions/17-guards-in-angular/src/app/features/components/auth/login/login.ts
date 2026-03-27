import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Auth } from '../../../../core/services/auth';
import { Toast } from '../../../../shared/services/toast';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login {
  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(Auth);
  private readonly toastService = inject(Toast);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly loginForm = this.formBuilder.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  readonly demoUsers = this.authService.users;
  readonly isAuthenticated = this.authService.isAuthenticated;

  submit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.toastService.show('Enter a valid email and password.', 'error');
      return;
    }

    const result = this.authService.login(this.loginForm.getRawValue());

    if (!result.success) {
      this.toastService.show(result.message, 'error');
      return;
    }

    this.toastService.show(result.message, 'success');
    void this.router.navigateByUrl('/posts');
  }
}
