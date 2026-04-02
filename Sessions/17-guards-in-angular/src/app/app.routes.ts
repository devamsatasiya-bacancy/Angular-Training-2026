import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { pendingChangesGuard } from './core/guards/pending-changes-guard';
import { postsResolver } from './core/resolvers/posts-resolver';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'posts',
  },
  {
    path: 'login',
    loadComponent: () => import('./features/components/auth/login/login').then((m) => m.Login),
  },
  {
    path: 'posts',
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./features/components/posts/posts/posts').then((m) => m.Posts),
        resolve: {
          posts: postsResolver,
        },
        
      },
      {
        path: 'create',
        loadComponent: () =>
          import('./features/components/posts/create-post/create-post').then(
            (m) => m.CreatePost,
          ),
        canDeactivate: [pendingChangesGuard],
      },
    ],
  },
  {
    path: '**',
    loadComponent: () => import('./features/components/not-found/not-found').then((m) => m.NotFound),
  },
];
