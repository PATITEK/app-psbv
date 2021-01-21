import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IDataNoti, PageNotiService } from 'src/app/@modular/page-noti/page-noti.service';
import { PERMISSIONS, ProductsService, ShoppingCartsService } from 'src/app/@app-core/http';
import { LoadingService } from 'src/app/@app-core/loading.service';
import { StorageService } from 'src/app/@app-core/storage.service';
import { GlobalVariablesService } from 'src/app/@app-core/global-variables.service';
import { ModalController, Platform } from '@ionic/angular';
import { ModalAddComponent } from 'src/app/home/product-info/product-detail/modal-add/modal-add.component';
import { ConnectivityService } from 'src/app/@app-core/utils/connectivity.service';
import { HTTP } from '@ionic-native/http/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
// import { File } from '@ionic-native/file';
import { File } from '@ionic-native/file/ngx';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {
  product = {
    id: '',
    name: ' ',
    description: ' ',
    short_description: ' ',
    thumb_image: {
      url: ''
    },
    price: 0
  }

  loadedProduct = false;
  permission = '';
  cartItems = [];
  isOnline;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductsService,
    private loadingService: LoadingService,
    private storageService: StorageService,
    private pageNotiService: PageNotiService,
    public globalVariablesService: GlobalVariablesService,
    public modalController: ModalController,
    private connectivityService: ConnectivityService,
    private shoppingCartsService: ShoppingCartsService,
    private transfer: FileTransfer,
    private nativeHTTP: HTTP, 
    private file: File,
    public platform: Platform

  ) {
    this.connectivityService.appIsOnline$.subscribe(online => {
      if (online) {
        this.isOnline = true;
        this.loadData();
      } else {
        this.isOnline = false;
      }
    })
  }
  private win: any = window;
  ngOnInit() {
    this.storageService.infoAccount.subscribe(data => {
      this.permission = data !== null ? data.role : PERMISSIONS[0].value;
    })

    if (this.isOnline === true) {
      this.loadingService.present();
      this.loadData();
    }
  }

  ionViewWillEnter() {
    this.getCarts();
  }

  getCarts() {
    if(PERMISSIONS[0].value === 'guest') {

    }
    else {
      this.shoppingCartsService.getShoppingCarts().subscribe(data => {
        const cartItems = data.preferences.cartItems;
        this.cartItems = cartItems === undefined ? [] : cartItems;
      })
    }
  }

  updateCartsLocal(amount) {
    let duplicated = false;
    for (let i of this.cartItems) {
      if (i.kind == 'Product' && this.product.id == i.id) {
        i.amount += amount;
        duplicated = true;
        break;
      }
    }
    if (!duplicated) {
      this.cartItems.push({
        id: this.product.id,
        name: this.product.name,
        price: this.product.price,
        kind: 'Product',
        amount: amount
      });
    }
  }
  
  updateCartsSever() {
    this.shoppingCartsService.updateShoppingCarts(this.cartItems).subscribe();
  }

  checkGuestPermission() {
    return this.permission === PERMISSIONS[0].value;
  }

  checkStandardPermission() {
    return this.permission === PERMISSIONS[1].value;
  }

  checkPremiumPermission() {
    return this.permission === PERMISSIONS[2].value;
  }

  async openModalAdd() {
    if (this.checkGuestPermission()) {
      this.router.navigateByUrl('auth/login');
    } else {
      const modal = await this.modalController.create({
        component: ModalAddComponent,
        cssClass: 'modal-add-detail-product',
        componentProps: {
          data: {
            id: this.product.id,
            name: this.product.name,
            amount: 0,
            price: this.product.price,
            kind: 'Product'
            // url: this.product.thumb_image.url
          }
        }
      });
      await modal.present();

      const { data: amount, role } = await modal.onWillDismiss();
      if (role == 'ok') {
        this.updateCartsLocal(amount);
        this.updateCartsSever();
      }
    }
  }
  linkContactUs() {
    this.router.navigateByUrl('/account/user-info/about-us');
}
imgnotFound(item) {
  const d = {
    url: "https://i.imgur.com/Vm39DR3.jpg"
  }
  if(item.thumb_image == null ) {
    item['thumb_image'] = d;
   }
   else if(item.thumb_image.url == null) {
     item.thumb_image.url = d.url;
   }
  }
  loadData() {
    this.route.queryParams.subscribe(params => {
      if (params.data !== undefined && !this.loadedProduct) {
        this.productService.getProductDetail(JSON.parse(params['data']).id).subscribe(data => {
          if (!this.loadedProduct) {
           this.imgnotFound(data.product);
            this.product = data.product;
            this.loadedProduct = true;
            this.loadingService.dismiss();

            if (JSON.parse(params['data']).doesOpenModal) {
              this.openModalAdd();
            }
          } 
        });
      }
    })
  }
//   public downloadTechnical() {
//     //
//     const filePath = this.file.dataDirectory ; 
//     console.log(filePath);
//                      // for iOS use this.file.documentsDirectory
//     this.nativeHTTP.downloadFile('https://post.healthline.com/wp-content/uploads/2020/08/edible-flowers-732x549-thumbnail.jpg', {}, {}, filePath).then(response => {
//        // prints 200
//        console.log('success block...', response);
//     }).catch(err => {
//         // prints 403
//         console.log('error block ... ', err.status);
//         // prints Permission denied
//         console.log('error block ... ', err.error);
//     })
//  }
//  public async checkFile() {
//   const fileUrl = 'https://post.healthline.com/wp-content/uploads/2020/08/edible-flowers-732x549-thumbnail.jpg';
//   let stringURL = String(fileUrl);
//   let fileName = stringURL.split('//')[1].replace(/\//g, '-');
//   let directory;

//       if (this.platform.is("desktop")) {
//         return fileUrl;
//       }
//       if (this.platform.is("android")) {
//         directory = this.file.dataDirectory;
//       }
//       if (this.platform.is("ios")) {
//         directory = this.file.dataDirectory;
//       }

//   return this.file.checkFile(directory, fileName)
//     .then(
//       async result => {
//         console.log(directory);
//         if (result) {
//           return this.win.Ionic.WebView.convertFileSrc(directory + fileName);
//         } else {
//           return fileUrl;
//         }
//       }
//     )
//     .catch(
//       async err => {
//         //FileError.NOT_FOUND_ERR
//         if (err.code == 1) {
//           let fileTransfer: FileTransferObject = this.transfer.create();
//           fileTransfer.download(fileUrl, directory + fileName, true)
//             .then(
//               result => {
//                 console.log('thanh cong');
//               }
//             )
//             .catch(
//               error => {
//                 console.log('loi');
//                 console.error(error);
//                 throw error;
//               }
//             )
//         }
//         return fileUrl;

//       }
//     )


// }



  downloadTechnical() {
    const data: IDataNoti = {
      title: 'DOWNLOAD DONE',
      description: '',
      routerLink: 'main/home'
    }
    const fileTransfer: FileTransferObject = this.transfer.create();
    const url = 'https://post.healthline.com/wp-content/uploads/2020/08/edible-flowers-732x549-thumbnail.jpg';
    fileTransfer.download(url, this.file.dataDirectory + 'file.pdf').then((entry) => {
      console.log('download complete: ' + entry.toURL());
    }, (error) => {
      // handle error
    });
    this.pageNotiService.setdataStatusNoti(data);
    this.router.navigate(['/statusNoti']);
  }

  goToCart(): void {
    this.globalVariablesService.backUrlShoppingCart = this.router.url;
    this.router.navigateByUrl('main/shopping-cart');
  }
}
