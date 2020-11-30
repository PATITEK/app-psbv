import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PERMISSION } from '../product-info.page';
import { IDataNoti, PageNotiService } from 'src/app/@modular/page-noti/page-noti.service';
import { ProductsService } from 'src/app/@app-core/http';
import { LoadingService } from 'src/app/@app-core/loading.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {

  product = {
    id: '',
    name: ' ',
    short_description: '',
    description: ' ',
    thumb_image: {
      url: ''
    },
    price: 0
  }
  permission: PERMISSION = PERMISSION.GUEST;

  constructor(
    private router: Router,
    private pageNotiService: PageNotiService,
    private route: ActivatedRoute,
    private productService: ProductsService,
    private loading: LoadingService
  ) {
  }

  ngOnInit() {
    const tabs = document.querySelectorAll('ion-tab-bar');
    Object.keys(tabs).map((key) => {
      tabs[key].style.display = 'none';
    });
    this.loading.present();
  }

  ionViewWillEnter() {
    this.route.queryParams.subscribe((params) => {
      this.permission = JSON.parse(params['permission']);
      this.productService.getProductDetail(JSON.parse(params['id']))
        .subscribe(data => {
          this.product = data.product;
          this.loading.dismiss();
        });
    });
  }

  goBack() {
    this.router.navigateByUrl('/main/home/product-info');
  }

  download() {
    event.preventDefault();
    const data: IDataNoti = {
      title: 'DOWNLOAD DONE',
      description: '',
      routerLink: ''
    }
    this.pageNotiService.setdataStatusNoti(data);
    this.router.navigate(['/statusNoti']);

  }

  checkStandardPermission(): boolean {
    return this.permission == PERMISSION.STANDARD;
  }

}
