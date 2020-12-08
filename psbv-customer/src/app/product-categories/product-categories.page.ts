import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';
import { IPageRequest, ProductGroupsService } from '../@app-core/http';
import { LoadingService } from '../@app-core/loading.service';

@Component({
  selector: 'app-product-categories',
  templateUrl: './product-categories.page.html',
  styleUrls: ['./product-categories.page.scss'],
})

export class ProductCategoriesPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infinityScroll: IonInfiniteScroll;

  data = [];
  val = '';
  checkurl: boolean
  pageRequest: IPageRequest = {
    page: 1,
    per_page: 12,
    total_objects: 1
  }

  constructor(
    private router: Router,
    private productGroupService: ProductGroupsService,
    private loading: LoadingService,
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

  onGoUserInfo() {
    this.router.navigateByUrl("/account/user-info");
  }

  gotoNoti() {
    this.router.navigateByUrl('notification');
  }

  gotoHome() {
    this.router.navigateByUrl('/main/product-categories');
  }

  onInput(event: any) {
    const val = event.target.value;
    console.log(this.val.valueOf());
    this.productGroupService.searchProductGroup(val).subscribe((data: any) => {
      this.data = data.products;
    })
  }

  loadData() {
    setTimeout(() => {
      this.productGroupService.getProductGroups(this.pageRequest).subscribe(data => {
        for (let item of data.product_groups) {
          // image not found
          if (item.thumb_image === null) {
            const data = {
              url: "https://i.imgur.com/dbpoag5.png"
            }
            item.thumb_image = data;
          }
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
    const data = {
      id: item.id,
      title: item.name
    }
    this.router.navigate(['main/product-categories/products'], {
      queryParams: {
        data: JSON.stringify(data)
      }
    });
  }
}
