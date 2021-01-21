import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IDataNoti, PageNotiService } from 'src/app/@modular/page-noti/page-noti.service';
import { PERMISSIONS, ProductsService, ShoppingCartsService } from 'src/app/@app-core/http';
import { LoadingService } from 'src/app/@app-core/loading.service';
import { StorageService } from 'src/app/@app-core/storage.service';
import { GlobalVariablesService } from 'src/app/@app-core/global-variables.service';
import { ModalController } from '@ionic/angular';
import { ModalAddComponent } from './modal-add/modal-add.component';
import { ConnectivityService } from 'src/app/@app-core/utils/connectivity.service';
// import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
// import { HTTP } from '@ionic-native/http/ngx';
// import { File } from '@ionic-native/file/ngx';
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
  isOnline;
  cartItems = [];

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
    //   private nativeHTTP: HTTP,
    //  private transfer: FileTransfer,
    // private file: File
  ) {
    this.checkOnline();
  }

  ngOnInit() {
    // this.storageService.infoAccount.subscribe(data => {
    //   this.permission = data !== null ? data.role : PERMISSIONS[0].value;
    // })

    if (this.isOnline === true) {
      this.loadingService.present();
      this.loadData();
    }
  }

  ionViewWillEnter() {
      if (localStorage.getItem('Authorization') !== null) {
         this.getCarts();
      }
      else {

      }
  }

  checkOnline() {
    this.connectivityService.appIsOnline$.subscribe(online => {
      if (online) {
        this.isOnline = true;
        this.loadData();
      } else {
        this.isOnline = false;
      }
    })
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

  getCarts() {
    //if (localStorage.getItem('Authorization') !== null) {
      this.shoppingCartsService.getShoppingCarts().subscribe(data => {
        const cartItems = data.preferences.cartItems;
        this.cartItems = cartItems === undefined ? [] : cartItems;
      })
    // } else {
      
    // }
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
    if (localStorage.getItem('Authorization') !== null) {
    this.shoppingCartsService.updateShoppingCarts(this.cartItems).subscribe();
    } else {
      
    }
    
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

  downloadTechnical() {
    const data: IDataNoti = {
      title: 'DOWNLOAD DONE',
      description: '',
      routerLink: 'main/home'
    }
    this.pageNotiService.setdataStatusNoti(data);
    this.router.navigate(['/statusNoti']);
    // var url = this.product.thumb_image.url;
    // const filePath = this.file.dataDirectory; 
    // // for iOS use this.file.documentsDirectory

    //   this.nativeHTTP.downloadFile(url, {}, {}, filePath).then(response => {
    //   // prints 200
    //   console.log('success block...', response);
    //   }).catch(err => {
    //   // prints 403
    //   console.log('error block ... ', err.status);
    //   // prints Permission denied
    //   console.log('error block ... ', err.error);
    //   })
    // const fileTransfer: FileTransferObject = this.transfer.create();
    // 
    // fileTransfer.download(url, this.file.dataDirectory + 'file.pdf').then((entry) => {
    //   console.log('download complete: ' + entry.toURL());
    // }, (error) => {
    //   // handle error
    //   console.log(error);
    // });
  }

  goToCart(): void {
    this.globalVariablesService.backUrlShoppingCart = this.router.url;
    this.router.navigateByUrl('main/shopping-cart');
  }
}
