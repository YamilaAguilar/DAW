import { Routes } from '@angular/router';

import { ProyectosListComponent } from './pages/proyectos-list/proyectos-list';
import { ProyectoFormComponent } from './pages/proyecto-form/proyecto-form';
import { ClientesList } from './pages/clientes-list/clientes-list';

export const routes: Routes = [
  {
    path: 'proyectos',
    component: ProyectosListComponent
  },

  {
    path: 'proyectos/nuevo',
    component: ProyectoFormComponent
  },

  {
    path: 'proyectos/editar/:id',
    component: ProyectoFormComponent
  },

  {
    path: '',
    redirectTo: 'proyectos',
    pathMatch: 'full'
  },

  {
    path: 'proyectos/:id',
    component: ProyectoFormComponent
  },

   {
    path: 'clientes',
    component: ClientesList
  },
];