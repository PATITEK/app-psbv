import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IDataNoti, PageNotiService } from 'src/app/@modular/page-noti/page-noti.service';
import { PERMISSIONS, ProductsService } from 'src/app/@app-core/http';
import { LoadingService } from 'src/app/@app-core/loading.service';
import { StorageService } from 'src/app/@app-core/storage.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {

  product = {
    id: '',
    name: ' ',
    short_description: ' ',
    description: ' ',
    thumb_image: {
      url: ''
    },
    price: 0
  }
  permission: string;

  constructor(
    private router: Router,
    private pageNotiService: PageNotiService,
    private route: ActivatedRoute,
    private productService: ProductsService,
    private loading: LoadingService,
    private storageService: StorageService,
  ) {}

  ngOnInit() {
    this.loading.present();
    this.storageService.infoAccount.subscribe((data) => {
      this.permission = (data !== null) ? data.role : PERMISSIONS[0].value;
    })

    this.route.queryParams.subscribe((params) => {
      this.productService.getProductDetail(JSON.parse(params['data']).id)
        .subscribe(data => {
          this.product = data.product;
          this.loading.dismiss();
        });
    });
  }

  ionViewWillEnter() {
    const tabs = document.querySelectorAll('ion-tab-bar');
    Object.keys(tabs).map((key) => {
      tabs[key].style.display = 'none';
    });
  }

  goBack() {
    this.router.navigateByUrl('/main/home/product-info');
  }

  download() {
    const data: IDataNoti = {
      title: 'DOWNLOAD DONE',
      description: '',
      routerLink: 'main/home'
    }
    this.pageNotiService.setdataStatusNoti(data);
    this.router.navigate(['/statusNoti']);
  }

  checkStandardPermission(): boolean {
    return this.permission === PERMISSIONS[1].value;
  }
}
