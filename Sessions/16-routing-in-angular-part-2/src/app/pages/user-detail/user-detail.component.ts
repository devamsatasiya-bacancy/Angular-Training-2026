import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { findUserById } from '../../data/users.data';

@Component({
  imports: [RouterLink, RouterOutlet],
  template: `
    <section class="detail-page">
      @if (user(); as selectedUser) {
        <div class="detail-card">
          <p class="section-label">User Detail</p>
          <h2>{{ selectedUser.name }}</h2>
          <p>User id from snapshot: <strong>{{ userId() }}</strong></p>
          <p>{{ selectedUser.role }} based in {{ selectedUser.city }}</p>

          <div class="actions">
            <a routerLink="/users">Back to users</a>
            <a
              [routerLink]="['posts']"
              [queryParams]="{ sort: 'recent' }"
              fragment="comments"
            >
              View Posts
            </a>
          </div>
        </div>

        <router-outlet />
      } @else {
        <div class="detail-card">
          <p class="section-label">User Detail</p>
          <h2>User not found</h2>
          <p>No hardcoded user matches the id <strong>{{ userId() }}</strong>.</p>
          <a routerLink="/users">Return to the users list</a>
        </div>
      }
    </section>
  `,
  styles: `
    .detail-page {
      display: grid;
      gap: 1rem;
    }

    .detail-card {
      padding: 1.25rem;
      border: 1px solid #cbd5e1;
      border-radius: 1rem;
      background-color: rgba(255, 255, 255, 0.94);
      box-shadow: 0 10px 30px rgba(15, 23, 42, 0.06);
    }

    .section-label {
      margin: 0 0 0.4rem;
      color: #0f766e;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      font-size: 0.85rem;
    }

    h2,
    p {
      margin: 0 0 0.75rem;
    }

    .actions {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
    }

    a {
      color: #0f766e;
      font-weight: 700;
    }
  `,
})
export class UserDetailComponent {
  private readonly route = inject(ActivatedRoute);
  protected readonly userId = signal(Number(this.route.snapshot.paramMap.get('id')));
  protected readonly user = computed(() => findUserById(this.userId()));
}
