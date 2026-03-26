import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  template: `
    <section class="card">
      <p class="section-label">Home</p>
      <h2>Practice Angular routing with a small user directory.</h2>
      <p>
        Use the navigation above or jump directly to the users list to test
        redirects, route params, child routes, query params, fragments, and the
        wildcard route.
      </p>

      <a class="primary-link" routerLink="/users">Browse users</a>
    </section>
  `,
  styles: `
    .card {
      max-width: 52rem;
      padding: 1.5rem;
      border: 1px solid #cbd5e1;
      border-radius: 1rem;
      background-color: rgba(255, 255, 255, 0.92);
      box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
    }

    .section-label {
      margin: 0 0 0.5rem;
      color: #0f766e;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      font-size: 0.85rem;
    }

    h2 {
      margin: 0 0 0.75rem;
    }

    p {
      margin: 0 0 1rem;
      line-height: 1.6;
    }

    .primary-link {
      display: inline-flex;
      padding: 0.8rem 1.15rem;
      border-radius: 999px;
      background-color: #0f766e;
      color: #f8fafc;
      text-decoration: none;
      font-weight: 700;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {}
