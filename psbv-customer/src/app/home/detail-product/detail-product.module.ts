import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailProductPageRoutingModule } from './detail-product-routing.module';

import { DetailProductPage } from './detail-product.page';
import { ModalAddComponent } from '../product-info/product-detail/modal-add/modal-add.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailProductPageRoutingModule
  ],
  declarations: [DetailProductPage, ModalAddComponent],
  entryComponents: [ModalAddComponent]
})
export class DetailProductPageModule {}
