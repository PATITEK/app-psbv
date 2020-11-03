import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthManagerPage } from './auth-manager.page';

const routes: Routes = [
  {
    path: '',
    component: AuthManagerPage,
  },
  {
    path: 'login',
    loadChildren: () => import('../auth-manager/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)
  },
  {
    path: 'new-password',
    loadChildren: () => import('./new-password/new-password.module').then( m => m.NewPasswordPageModule)
  },
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthManagerPageRoutingModule {}
