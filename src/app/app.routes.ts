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
  // {
  //   path: 'pokemons',
  //   loadComponent: () => import('./pages/pokemons/pokemons-page.component'),
  // },
  {
    path: 'pokemons/page/:page',
    loadComponent: () => import('./pages/pokemons/pokemons-page.component'),
  },
  {
    path: 'pokemons/:id',
    loadComponent: () => import('./pages/pokemon-page/pokemon-page.component'),
  },
  {
    path: '**',
    redirectTo: () => {
      // const authService = inject(authService);
      return 'about';
    },
  }
];
