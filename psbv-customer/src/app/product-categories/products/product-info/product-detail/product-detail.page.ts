import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IDataNoti, PageNotiService } from 'src/app/@modular/page-noti/page-noti.service';
import { PERMISSIONS, ProductsService } from 'src/app/@app-core/http';
import { LoadingService } from 'src/app/@app-core/loading.service';
import { StorageService } from 'src/app/@app-core/storage.service';
import { GlobalVariablesService } from 'src/app/@app-core/global-variables.service';
import { ModalController } from '@ionic/angular';
import { ModalAddComponent } from 'src/app/home/product-info/product-detail/modal-add/modal-add.component';

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
  added: boolean;

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
    this.route.queryParams.subscribe(params => {
      this.added = JSON.parse(params['data']).added;
    })
    this.loadingService.present();
    this.loadData();
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
            id: this.product.id,
            name: this.product.name,
            amount: 0,
            price: this.product.price,
            kind: 'product'
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
      if (params.data !== undefined && !this.loadedProduct) {
        this.productService.getProductDetail(JSON.parse(params['data']).id).subscribe(data => {
          this.product = data.product;
          this.loadedProduct = true;
          this.loadingService.dismiss();
          
          if (JSON.parse(params['data']).doesOpenModal) {
            this.openModalAdd();
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
  }
}
