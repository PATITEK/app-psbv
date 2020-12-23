import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { GlobalVariablesService } from 'src/app/@app-core/global-variables.service';
import { PERMISSIONS, ProductsService } from 'src/app/@app-core/http';
import { LoadingService } from 'src/app/@app-core/loading.service';
import { StorageService } from 'src/app/@app-core/storage.service';
import { IDataNoti, PageNotiService } from 'src/app/@modular/page-noti/page-noti.service';
import { ModalAddComponent } from './modal-add/modal-add.component';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.page.html',
  styleUrls: ['./detail-product.page.scss'],
})
export class DetailProductPage implements OnInit {
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
  curAddedProducts = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductsService,
    private loadingService: LoadingService,
    private storageService: StorageService,
    private pageNotiService: PageNotiService,
    public globalVariablesService: GlobalVariablesService,
    public modalController: ModalController,
  ) { }

  ngOnInit() {
    this.storageService.infoAccount.subscribe(data => {
      this.permission = data !== null ? data.role : PERMISSIONS[0].value;
    })
    this.loadingService.present();
    this.loadData();
  }

  ionViewWillEnter() {
    this.curAddedProducts = 0;

    const tabs = document.querySelectorAll('ion-tab-bar');
    Object.keys(tabs).map((key) => {
      tabs[key].style.display = 'none';
    });
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
          product: {
            id: this.product.id,
            name: this.product.name,
            amount: 0,
            price: this.product.price,
            url: this.product.thumb_image.url
          }
        }
      });
      await modal.present();

      const { data: amount, role } = await modal.onWillDismiss();
      if (role == 'ok') {
        const a = this.curAddedProducts + amount;
        if (a <= 99) {
          this.curAddedProducts = a;
        }
      }
    }
  }

  loadData() {
    this.route.queryParams.subscribe(params => {
      if (params.data !== undefined && !this.loadedProduct) {
        this.productService.getProductDetail(JSON.parse(params['data']).id).subscribe(data => {
          this.product = data.product;
          this.loadedProduct = true;
          this.loadingService.dismiss();
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
  }

  gotToCart() {
    this.globalVariablesService.backUrlShoppingCart = this.router.url;
    this.router.navigateByUrl('main/shopping-cart');
  }
}
