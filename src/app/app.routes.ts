import { Routes } from '@angular/router';
import { Registro } from './components/registro/registro';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'registro',
    pathMatch: 'full'
  },
  {
    path: 'registro',
    component: Registro
  },
  {
    path: '**',
    redirectTo: 'registro'
  }



];
