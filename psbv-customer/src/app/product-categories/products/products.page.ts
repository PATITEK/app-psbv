import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';
import { IPageRequest, ProductGroupsService } from 'src/app/@app-core/http';
import { LoadingService } from 'src/app/@app-core/loading.service';
import { PERMISSION } from './product-info/product-info.page';


@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infinityScroll: IonInfiniteScroll;

  pageRequest: IPageRequest = {
    page: 1,
    per_page: 8,
    total_objects: 20
  }
  data = [];
  permission: PERMISSION = PERMISSION.GUEST;
  title = '';
  isFirstTime = false;
  id = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productGroupService: ProductGroupsService,
    private loading: LoadingService
  ) { }

  ngOnInit() {
    const tabs = document.querySelectorAll('ion-tab-bar');
    Object.keys(tabs).map((key) => {
      tabs[key].style.display = 'none';
    });
    this.loading.present();
    this.loadData();
  }

  ionViewWillEnter() {
    this.route.queryParams.subscribe(params => {
      if (params.permission !== undefined) {
        this.permission = JSON.parse(params['permission']);
      }
      if (params.name !== undefined) {
        this.title = JSON.parse(params['name']);
      }
      if (params.id !== undefined) {
        this.id = JSON.parse(params['id']);
      }
    })
  }

  loadData() {
    setTimeout(() => {
      if (this.id != '') {
        this.productGroupService.getProductGroupDetail(this.id, this.pageRequest)
          .subscribe(data => {
            for (let item of data.products) {
              this.data.push(item);
            }

            this.infinityScroll.complete();
            this.loading.dismiss();
            this.pageRequest.page++;

            // check max data
            if (this.data.length >= data.meta.pagination.total_objects) {
              this.infinityScroll.disabled = true;
            }

            // cal left per_page
            const temp = data.meta.pagination.total_objects - this.data.length;
            if (temp <= this.pageRequest.per_page) {
              this.pageRequest.per_page = temp;
            }
          })
      }
    }, 50)
  }

  checkGuestPermission(): boolean {
    return this.permission == PERMISSION.GUEST;
  }

  checkStandardPermission(): boolean {
    return this.permission == PERMISSION.STANDARD;
  }

  goBack(): void {
    this.router.navigateByUrl('main/product-categories');
    const tabs = document.querySelectorAll('ion-tab-bar');
    Object.keys(tabs).map((key) => {
      tabs[key].style.display = 'flex';
    });
  }

  goToNoti() {
    this.router.navigateByUrl('notification');
  }

  goToUserInfo() {
    this.router.navigateByUrl('account/user-info');
  }

  goToDetail(item) {
    this.router.navigate(['main/product-categories/products/product-info'], {
      queryParams: {
        id: JSON.stringify(item.id),
        permission: JSON.stringify(this.permission)
      }
    });
  }
}
