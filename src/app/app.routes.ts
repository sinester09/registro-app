import { Routes } from '@angular/router';
import { Registro } from './components/registro/registro';
import { Inicio } from './components/inicio/inicio';
import { Menu } from './components/menu/menu';

export const routes: Routes = [
  {
    path: '',
    component: Inicio,
    pathMatch: 'full'
  },
  {
    path: 'registro',
    component: Registro
  },
  {
    path: 'inicio',
    component: Inicio
  },
  {
    path: 'menu',
    component: Menu
  },
  {
    path: 'contacto',
    component: Inicio
  },
  {
    path: 'acerca',
    component: Inicio
  },
  {
    path: '**',
    redirectTo: 'inicio'
  }
];
