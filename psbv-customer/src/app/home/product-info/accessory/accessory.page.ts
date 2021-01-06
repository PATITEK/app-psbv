import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { GlobalVariablesService } from 'src/app/@app-core/global-variables.service';
import { PERMISSIONS, AccessoriesService } from 'src/app/@app-core/http';
import { LoadingService } from 'src/app/@app-core/loading.service';
import { StorageService } from 'src/app/@app-core/storage.service';
import { ConnectivityService } from 'src/app/@app-core/utils/connectivity.service';
import { ModalAddComponent } from '../product-detail/modal-add/modal-add.component';

@Component({
  selector: 'app-accessory',
  templateUrl: './accessory.page.html',
  styleUrls: ['./accessory.page.scss'],
})
export class AccessoryPage implements OnInit {
  accessory = {
    id: '',
    name: ' ',
    description: ' ',
    thumb_image: {
      url: ''
    },
    price: 0
  }

  loadedAccessory = false;
  permission = '';
  cartItemsLength = 0;
  isOnline;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accessoriesService: AccessoriesService,
    private loadingService: LoadingService,
    private storageService: StorageService,
    public globalVariablesService: GlobalVariablesService,
    public modalController: ModalController,
    private connectivityService: ConnectivityService
  ) {
    const arr = JSON.parse(localStorage.getItem('cartItems')) || [];
    this.cartItemsLength = arr.length;
    this.connectivityService.appIsOnline$.subscribe(online => {
      if (online) {
        this.isOnline = true;
        this.loadData();
      } else {
        this.isOnline = false;
      }
    })
  }

  ngOnInit() {
    this.storageService.infoAccount.subscribe(data => {
      this.permission = data !== null ? data.role : PERMISSIONS[0].value;
    })
    if (this.isOnline === true) {
      this.loadingService.present();
      this.loadData();
    }
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
            id: this.accessory.id,
            name: this.accessory.name,
            amount: 0,
            price: this.accessory.price,
            kind: 'Accessory'
            // url: this.product.thumb_image.url
          }
        }
      });
      await modal.present();

      const { data: amount, role } = await modal.onWillDismiss();
      if (role == 'ok') {
        // const a = this.curAddedProducts + amount;
        // if (a <= 99) {
        //   this.curAddedProducts = a;
        // }
        // this.added = true;
        const arr = JSON.parse(localStorage.getItem('cartItems')) || [];
        this.cartItemsLength = arr.length;
      }
    }
  }

  loadData() {
    this.route.queryParams.subscribe(params => {
      if (params.data !== undefined && !this.loadedAccessory) {
        this.accessoriesService.getAccessoryDetail(JSON.parse(params['data']).id).subscribe(data => {
          if (!this.loadedAccessory) {
            this.accessory = data.accessory;
            this.loadedAccessory = true;
            this.loadingService.dismiss();
          }
        });
      }
    })
  }

  goToCart(): void {
    this.globalVariablesService.backUrlShoppingCart = this.router.url;
    this.router.navigateByUrl('main/shopping-cart');
  }
}
