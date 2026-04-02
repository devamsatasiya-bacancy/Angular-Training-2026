import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Auth } from './core/services/auth';
import { Toast } from './shared/services/toast';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  private readonly authService = inject(Auth);
  private readonly toastService = inject(Toast);
  private readonly router = inject(Router);
  protected readonly currentUser = this.authService.currentUser;
  protected readonly isAuthenticated = this.authService.isAuthenticated;

  protected logout(): void {
    this.authService.logout();
    this.toastService.show('Logged out successfully.', 'info');
    this.router.navigate(['/login']);
  }
}
