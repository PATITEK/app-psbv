import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectedProductsPageRoutingModule } from './selected-products-routing.module';

import { SelectedProductsPage } from './selected-products.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectedProductsPageRoutingModule,
  ],
  declarations: [SelectedProductsPage]
})
export class SelectedProductsPageModule {}
