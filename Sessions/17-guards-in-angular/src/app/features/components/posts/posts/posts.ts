import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Post } from '../../../../core/models/post.model';
import { Auth } from '../../../../core/services/auth';

@Component({
  selector: 'app-posts',
  imports: [RouterLink, DatePipe],
  templateUrl: './posts.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Posts {
  private readonly route = inject(ActivatedRoute);
  private readonly authService = inject(Auth);

  readonly posts = computed(() => (this.route.snapshot.data['posts'] as Post[] | undefined) ?? []);
  readonly isAuthenticated = this.authService.isAuthenticated;
}
