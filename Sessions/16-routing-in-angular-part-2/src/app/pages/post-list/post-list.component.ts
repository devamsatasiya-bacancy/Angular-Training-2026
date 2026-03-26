import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { findUserById } from '../../data/users.data';

@Component({
  template: `
    <section class="posts-card">
      <p class="section-label">Posts</p>
      <h3>Posts for user id {{ userId() }}</h3>
      <p>Query param sort: <strong>{{ sortOrder() || 'none' }}</strong></p>
      <p>Fragment: <strong>{{ fragmentValue() || 'none' }}</strong></p>

      @if (sortOrder() === 'recent') {
        <p class="status-banner">Showing the most recent posts first.</p>
      }

      <ul>
        @for (post of posts(); track post.id) {
          <li>{{ post.title }}</li>
        }
      </ul>

      <button type="button" (click)="goBack()">Go Back</button>
    </section>
  `,
  styles: `
    .posts-card {
      padding: 1.25rem;
      border: 1px solid #99f6e4;
      border-radius: 1rem;
      background-color: #f0fdfa;
    }

    .section-label {
      margin: 0 0 0.4rem;
      color: #0f766e;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      font-size: 0.85rem;
    }

    h3,
    p,
    ul {
      margin: 0 0 0.8rem;
    }

    ul {
      padding-left: 1.2rem;
    }

    .status-banner {
      padding: 0.75rem 1rem;
      border-radius: 0.75rem;
      background-color: #ccfbf1;
      color: #115e59;
      font-weight: 600;
    }

    button {
      padding: 0.75rem 1rem;
      border: 0;
      border-radius: 999px;
      background-color: #0f766e;
      color: #f8fafc;
      font-weight: 700;
      cursor: pointer;
    }
  `,
})
export class PostListComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  protected readonly userId = signal(0);
  protected readonly sortOrder = signal('');
  protected readonly fragmentValue = signal('');
  protected readonly posts = computed(() => findUserById(this.userId())?.posts ?? []);

  ngOnInit():void{
    console.log(this.route)
    
    this.route.parent?.paramMap.subscribe((params) => {
      console.log(params.get('id'))
      this.userId.set(Number(params.get('id')));  
    });
  
    this.route.queryParamMap.subscribe((params) => {
      this.sortOrder.set(params.get('sort') ?? '');
    });

    this.route.fragment.subscribe((fragment) => {
      this.fragmentValue.set(fragment ?? '');
    });
  }

  protected goBack(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
