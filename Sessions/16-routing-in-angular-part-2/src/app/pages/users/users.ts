import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { USERS } from '../../data/users.data';

@Component({
  selector: 'app-users',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './users.html',
  styleUrls: ['./users.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent {
  protected readonly users = signal(USERS);
}
