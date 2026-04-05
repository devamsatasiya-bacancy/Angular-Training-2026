import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'books',
    pathMatch: 'full'
  },
  {
    path: 'books',
    loadComponent: () => import('./components/book-list/book-list.component').then(m => m.BookListComponent)
  },
  {
    path: 'add-book',
    loadComponent: () => import('./components/add-book/add-book.component').then(m => m.AddBookComponent)
  }
];
