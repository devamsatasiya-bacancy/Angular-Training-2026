import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Jobs } from './pages/jobs/jobs';
import { JobDetail } from './pages/job-detail/job-detail';
import { About } from './pages/about/about';
import { Contact } from './pages/contact/contact';
import { NotFound } from './pages/not-found/not-found';

export const routes: Routes = [

  {
    path: 'home',
    component: Home,
  },
  {
    path: 'jobs',
    component: Jobs,
  },
  {
    path: 'jobs/:id',
    component: JobDetail,
  },
  {
    path: 'about',
    component: About,
  },
  {
    path: 'contact',
    component: Contact,
  },
  {
    path: '**',
    component: NotFound
    },
];
