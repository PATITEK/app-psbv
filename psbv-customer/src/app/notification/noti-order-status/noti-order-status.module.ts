import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotiOrderStatusPageRoutingModule } from './noti-order-status-routing.module';

import { NotiOrderStatusPage } from './noti-order-status.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotiOrderStatusPageRoutingModule
  ],
  declarations: [NotiOrderStatusPage]
})
export class NotiOrderStatusPageModule {}
