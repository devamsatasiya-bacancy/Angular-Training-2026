import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'contact-us',
    pathMatch: 'full',
  },
  {
    path: 'contact-us',
    loadComponent: () =>
      import('./components/contact-us-form/contact-us-form').then((m) => m.ContactUsForm),
  },
  {
    path: 'company-details',
    loadComponent: () =>
      import('./pages/project-details/project-details').then((m) => m.ProjectDetails),
  } 
];


