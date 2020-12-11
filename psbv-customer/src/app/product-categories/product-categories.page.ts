import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, IonInfiniteScroll, Platform } from '@ionic/angular';
import { IPageRequest, ProductGroupsService } from '../@app-core/http';
import { LoadingService } from '../@app-core/loading.service';

@Component({
  selector: 'app-product-categories',
  templateUrl: './product-categories.page.html',
  styleUrls: ['./product-categories.page.scss'],
})

export class ProductCategoriesPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infinityScroll: IonInfiniteScroll;
  @ViewChild(IonContent) ionContent: IonContent;

  pageRequest: IPageRequest;
  data = [];
  permission: string;
  val = '';
  counter = 0;
  inputValue: string = '';
  isMaxData = false;
  checkSystem = false;
  constructor(
    private router: Router,
    private productGroupService: ProductGroupsService,
    private loading: LoadingService,
    private platform: Platform
  ) {
    this.reset();
  }

  ngOnInit() {
    this.loading.present();
    this.loadData();
    this.platform.ready().then(() => {
      if (this.platform.is('android')) {
         this.checkSystem = true;
      }
  });
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
    this.inputValue = event.target.value;
    this.reset();
    this.scrollContent();
    this.counter++;
    this.loadData();
  }

  loadData() {
    if (!this.isMaxData) {
      setTimeout(() => {
        if (this.inputValue !== '') {
          const counterTemp = this.counter;
          this.productGroupService.searchProductGroup(this.pageRequest, this.inputValue, counterTemp).subscribe((data: any) => {
            if (counterTemp == this.counter) {
              for (let item of data.product_groups) {
                // image not found
                if (item.thumb_image === null) {
                  const d = {
                    url: "https://i.imgur.com/dbpoag5.png"
                  }
                  item.thumb_image = d;
                }
                this.data.push(item);
              }

              this.infinityScroll.complete();
              this.loading.dismiss();
              this.pageRequest.page++;

              // check max data
              if (this.data.length >= data.meta.pagination.total_objects) {
                // this.infinityScroll.disabled = true;
                this.isMaxData = true;
              }
            }
          })
        } else {
          this.productGroupService.getProductGroups(this.pageRequest).subscribe(data => {
            for (let item of data.product_groups) {
              // image not found
              if (item.thumb_image === null) {
                const d = {
                  url: "https://i.imgur.com/dbpoag5.png"
                }
                item.thumb_image = d;
              }
              this.data.push(item);
            }

            this.infinityScroll.complete();
            this.loading.dismiss();
            this.pageRequest.page++;

            // check max data
            if (this.data.length >= data.meta.pagination.total_objects) {
              // this.infinityScroll.disabled = true;
              this.isMaxData = true;
            }
          })
        }
      }, 50);
    } else {
      this.infinityScroll.complete();
    }
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

  reset() {
    this.pageRequest = {
      page: 1,
      per_page: 12,
      total_objects: 20
    }
    this.data = [];
    this.isMaxData = false;
  }

  scrollContent() {
    this.ionContent.scrollToTop(500);
  }
}
