import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductDetailPageRoutingModule } from './product-detail-routing.module';

import { ProductDetailPage } from './product-detail.page';
// import { HTTP } from '@ionic-native/http/ngx';
// import { File } from '@ionic-native/file/ngx';
// import { FileTransfer} from '@ionic-native/file-transfer/ngx';
// import { HTTP } from '@ionic-native/http/ngx';
// import { File } from '@ionic-native/file/ngx';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductDetailPageRoutingModule
  ],
  providers: [
    //  FileTransfer,
    //  File,
    //  HTTP,
  ],
  declarations: [ProductDetailPage]
})
export class ProductDetailPageModule {}
