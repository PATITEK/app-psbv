import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthManagerPage } from './auth-manager.page';

const routes: Routes = [
  {
    path: '',
    component: AuthManagerPage
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthManagerPageRoutingModule {}
