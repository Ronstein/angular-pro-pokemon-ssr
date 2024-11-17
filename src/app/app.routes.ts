import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'about',
    loadComponent: () => import('./pages/about-page/about-page.component'),
  },
  {
    path: 'pricing',
    loadComponent: () => import('./pages/pricing-page/pricing-page.component'),
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact-page/contact-page.component'),
  },
  {
    path: '**',
    redirectTo: () => {
      // const authService = inject(authService);
      return 'about';
    },
  }
];
