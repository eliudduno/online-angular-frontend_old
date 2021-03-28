import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './public/home/default/default.component';

const routes: Routes = [
  //Agregando rutas
  {
    path: 'home',
    component: DefaultComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home'
  },
  {
    path: 'security',
    loadChildren: () => import('./modules/security/security.module').then(m => m.SecurityModule)
  },
  {
    path: 'parameters',
    loadChildren: () => import('./modules/parameters/parameters.module').then(m => m.ParametersModule)
  },

  //** Esta ruta deberia ir de ultima - sino hay ninguna ruta valida esto lo llevara directo al home */
  {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
