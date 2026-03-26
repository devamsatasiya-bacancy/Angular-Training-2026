import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { findUserById } from '../../data/users.data';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.html',
  styleUrls: ['./post-list.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostListComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  protected readonly userId = signal(0);
  protected readonly sortOrder = signal('');
  protected readonly fragmentValue = signal('');
  protected readonly posts = computed(() => findUserById(this.userId())?.posts ?? []);

  ngOnInit(): void {
    this.route.parent?.paramMap.subscribe((params) => {
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
