import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.component').then((module) => module.HomeComponent)
  },
  {
    path: 'users',
    loadComponent: () =>
      import('./pages/users/users.component').then((module) => module.UsersComponent)
  },
  {
    path: 'users/:id',
    loadComponent: () =>
      import('./pages/user-detail/user-detail.component').then((module) => module.UserDetailComponent),
    children: [
      {
        path: 'posts',
        loadComponent: () =>
          import('./pages/post-list/post-list.component').then((module) => module.PostListComponent)
      }
    ]
  },
  {
    path: 'not-found',
    loadComponent: () =>
      import('./pages/not-found/not-found.component').then((module) => module.NotFoundComponent)
  },
  {
    path: '**',
    redirectTo: 'not-found'
  }
];
