import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotiComponent } from './page-noti.component';


const routes: Routes = [
  {
    path: '',
    component: PageNotiComponent
  },
  {
    path: 'main',
    loadChildren: () => import('../../tabs/tabs.module').then(m => m.TabsPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageNotiRoutingModule { }
