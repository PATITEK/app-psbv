import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';
import { IPageRequest, ProductGroupsService } from '../@app-core/http';
import { LoadingService } from '../@app-core/loading.service';
import { PERMISSION } from '../home/product-info/product-info.page';

@Component({
  selector: 'app-product-categories',
  templateUrl: './product-categories.page.html',
  styleUrls: ['./product-categories.page.scss'],
})

export class ProductCategoriesPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infinityScroll: IonInfiniteScroll;

  data = [];
  
  pageRequest: IPageRequest = {
    page: 1,
    per_page: 12,
    total_objects: 1
  }
  permission: PERMISSION = PERMISSION.STANDARD;

  constructor(
    private router: Router,
    private productGroupService: ProductGroupsService,
    private loading: LoadingService
  ) { }

  ngOnInit() {
    this.loading.present();
    this.loadData();
  }

  ionViewWillEnter() {
    const tabs = document.querySelectorAll('ion-tab-bar');
    Object.keys(tabs).map((key) => {
      tabs[key].style.display = 'flex';
    });
  }

  loadData() {
    setTimeout(() => {
      this.productGroupService.getProductGroups(this.pageRequest).subscribe(data => {
        for (let item of data.product_groups) {
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
    }, 50);
  }

  goToDetail(item) {
    this.router.navigate(['main/product-categories/products'], {
      queryParams: {
        id: JSON.stringify(item.id),
        permission: JSON.stringify(this.permission),
        name: JSON.stringify(item.name)
      }
    });
  }
}
