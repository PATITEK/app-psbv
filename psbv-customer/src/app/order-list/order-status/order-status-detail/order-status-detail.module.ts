import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderStatusDetailPageRoutingModule } from './order-status-detail-routing.module';

import { OrderStatusDetailPage } from './order-status-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderStatusDetailPageRoutingModule
  ],
  declarations: [OrderStatusDetailPage]
})
export class OrderStatusDetailPageModule {}
