import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { GlobalVariablesService } from 'src/app/@app-core/global-variables.service';
import { PERMISSIONS, AccessoriesService } from 'src/app/@app-core/http';
import { LoadingService } from 'src/app/@app-core/loading.service';
import { StorageService } from 'src/app/@app-core/storage.service';
import { ModalAddComponent } from 'src/app/home/product-info/product-detail/modal-add/modal-add.component';

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
  added: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accessoriesService: AccessoriesService,
    private loadingService: LoadingService,
    private storageService: StorageService,
    public globalVariablesService: GlobalVariablesService,
    public modalController: ModalController,
  ) { }

  ngOnInit() {
    this.storageService.infoAccount.subscribe(data => {
      this.permission = data !== null ? data.role : PERMISSIONS[0].value;
    })
    this.route.queryParams.subscribe(params => {
      this.added = JSON.parse(params['data']).added;
    })
    this.loadingService.present();
    this.loadData();
    console.log(this.router.url);

  }

  ionViewWillLeave() {
    localStorage.setItem('added', JSON.stringify(this.added));
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
            kind: 'accessory'
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
        this.added = true;
      }
    }
  }

  loadData() {
    this.route.queryParams.subscribe(params => {
      if (params.data !== undefined && !this.loadedAccessory) {
        this.accessoriesService.getAccessoryDetail(JSON.parse(params['data']).id).subscribe(data => {
          this.accessory = data.accessory;
          this.loadedAccessory = true;
          this.loadingService.dismiss();
        });
      }
    })
  }
}
