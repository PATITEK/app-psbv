import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserInfoPage } from './user-info.page';

const routes: Routes = [
  {
    path: '',
    component: UserInfoPage
  },
  {
    path: 'upgrade',
    loadChildren: () => import('./upgrade/upgrade.module').then( m => m.UpgradePageModule)
  },
  {
    path: 'support',
    loadChildren: () => import('./support/support.module').then( m => m.SupportPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserInfoPageRoutingModule {}
