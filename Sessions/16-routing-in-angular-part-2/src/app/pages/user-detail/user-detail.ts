import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { findUserById } from '../../data/users.data';

@Component({
  selector: 'app-user-detail',
  imports: [RouterLink, RouterOutlet],
  templateUrl: './user-detail.html',
  styleUrls: ['./user-detail.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDetailComponent {
  private readonly route = inject(ActivatedRoute);
  protected readonly userId = signal(Number(this.route.snapshot.paramMap.get('id')));
  protected readonly user = computed(() => findUserById(this.userId()));
}
