import { Routes } from '@angular/router';
import { PaginaInicialComponent } from './pagina-inicial/pagina-inicial.component';

export const routes: Routes = [
    {
      path: '',
      component: PaginaInicialComponent
    },
    {
      path: 'tienda/:id',
      loadComponent: () => import('./tienda/tienda.component').then(m => m.TiendaComponent)
    },
    {
      path: 'carrito',
      loadComponent: () => import('./carrito/carrito.component').then(m => m.CarritoComponent)
    }
];