import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectedProductsPage } from './selected-products.page';

const routes: Routes = [
  {
    path: '',
    component: SelectedProductsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectedProductsPageRoutingModule {}
