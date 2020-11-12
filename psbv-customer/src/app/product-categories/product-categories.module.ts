import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductCategoriesPageRoutingModule } from './product-categories-routing.module';

import { ProductCategoriesPage } from './product-categories.page';
<<<<<<< HEAD
=======
import { HeaderHomeModule } from '../@modular/header-home/header-home.module';
>>>>>>> FEmimi

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductCategoriesPageRoutingModule,
<<<<<<< HEAD
=======
    HeaderHomeModule
>>>>>>> FEmimi
  ],
   
    declarations: [ProductCategoriesPage]
})
export class ProductCategoriesPageModule {}
