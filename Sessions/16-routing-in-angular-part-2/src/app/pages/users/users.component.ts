import {  Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { USERS } from '../../data/users.data';

@Component({
  imports: [RouterLink, RouterLinkActive],
  template: `
    <section class="users-page">
      <div class="intro">
        <p class="section-label">Users</p>
        <h2>Select a user profile</h2>
        <p>Each user link below navigates to <code>/users/:id</code>.</p>
      </div>

      <div class="user-list">
        @for (user of users(); track user.id) {
          <a
            class="user-card"
            [routerLink]="['/users', user.id]"
            routerLinkActive="active-card"
          >
            <h3>{{ user.name }}</h3>
            <p>{{ user.role }}</p>
            <span>{{ user.city }}</span>
          </a>
        }
      </div>
    </section>
  `,
  styles: `
    .users-page {
      display: grid;
      gap: 1.25rem;
    }

    .intro,
    .user-card {
      border: 1px solid #cbd5e1;
      border-radius: 1rem;
      background-color: rgba(255, 255, 255, 0.92);
      box-shadow: 0 10px 30px rgba(15, 23, 42, 0.06);
    }

    .intro {
      padding: 1.25rem;
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
    h3,
    p {
      margin: 0;
    }

    .user-list {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 1rem;
    }

    .user-card {
      display: grid;
      gap: 0.5rem;
      padding: 1.25rem;
      color: #0f172a;
      text-decoration: none;
    }

    .user-card span {
      color: #475569;
      font-size: 0.95rem;
    }

    .user-card:hover,
    .user-card:focus-visible,
    .user-card.active-card {
      border-color: #0f766e;
      background-color: #ecfeff;
    }
  `,
})
export class UsersComponent {
  protected readonly users = signal(USERS);
}
