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
      import('./pages/home/home').then(m=> m.HomeComponent)
  },
  {
    path: 'users',
    loadComponent: () =>
      import('./pages/users/users').then(m=> m.UsersComponent),
  },
  {
    path: 'users/:id',
    loadComponent: () =>
      import('./pages/user-detail/user-detail').then(m=> m.UserDetailComponent),
    children: [
      {
        path: 'posts',
        loadComponent: () =>
          import('./pages/post-list/post-list').then(m=> m.PostListComponent)
      }
    ]
  },
  {
    path: 'not-found',
    loadComponent: () =>
      import('./pages/not-found/not-found').then((module) => module.NotFoundComponent)
  },
  {
    path: '**',
    redirectTo: 'not-found'
  }
];
