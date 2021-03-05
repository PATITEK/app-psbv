import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ProductDetailPageRoutingModule } from './product-detail-routing.module';
import {  File  } from '@ionic-native/file';
import { ProductDetailPage } from './product-detail.page';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { FileTransferObject } from '@ionic-native/file-transfer';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

// import { HTTP } from '@ionic-native/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductDetailPageRoutingModule
  ],
  providers: [
    InAppBrowser
    // FileTransfer,
    // FileTransferObject,
    // File,
    // FileOpener,
  ],
  declarations: [ProductDetailPage]
})
export class ProductDetailPageModule {}
