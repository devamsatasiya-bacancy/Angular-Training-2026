import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user-service';
import { AsyncPipe } from '@angular/common';
import { UserProfile } from '../../components/user-profile/user-profile';
@Component({
  selector: 'app-user-dashboard',
  imports: [AsyncPipe , UserProfile],
  templateUrl: './user-dashboard.html',
  styleUrl: './user-dashboard.scss',
})
export class UserDashboard {
  userService = inject(UserService);
  users$ = this.userService.getUsers();
}
