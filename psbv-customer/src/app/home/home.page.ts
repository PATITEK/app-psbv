import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, IonInfiniteScroll, Platform } from '@ionic/angular';
import { IPageRequest, PERMISSIONS, ProductsService } from '../@app-core/http';
import { LoadingService } from '../@app-core/loading.service';
import { StorageService } from '../@app-core/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild(IonInfiniteScroll) infinityScroll: IonInfiniteScroll;
  @ViewChild(IonContent) ionContent: IonContent;

  scrHeight: any;
  scrWidth: any;

  filterProducts = [
    {
      id: 'all',
      name: 'All'
    },
    {
      id: 'seenProducts',
      name: 'Seen Products'
    },
    {
      id: 'hotTrending',
      name: 'Hot Trending'
    }
  ]

  pageRequest: IPageRequest;
  data = [];
  permission: string;
  counter = 0;
  inputValue: string = '';
  isMaxData = false;
  public activeTab = this.filterProducts[0].id;
  checkTab = true;
  isLoading = false;

  constructor(
    private router: Router,
    private productService: ProductsService,
    // public loading: LoadingService,
    private storageService: StorageService,
    private platform: Platform
  ) {
    this.reset();
    this.getScreenSize();
  }

  ngOnInit() {
    // this.loading.present();
    this.storageService.infoAccount.subscribe((data) => {
      this.permission = (data !== null) ? data.role : PERMISSIONS[0].value;
    })

    if (!this.checkGuestPermission()) {
      this.filterProducts.push({
        id: 'onSaleProducts',
        name: 'On Sale Products'
      })
    }
    this.loadData();
  }

  ionViewWillEnter() {
    const tabs = document.querySelectorAll('ion-tab-bar');
    Object.keys(tabs).map((key) => {
      tabs[key].style.display = 'flex';
    });
  }

  getScreenSize(event?) {
    this.scrHeight = window.innerHeight;
    this.scrWidth = window.innerWidth;
  }

  changeTabs(name) {
    this.activeTab = name;
  }

  async segmentChanged(event) {
    this.activeTab = event.target.value;
  }

  goToDetail(item) {
    const data = {
      id: item.id
    }
    this.router.navigate(['/main/home/detail-product'], {
      queryParams: {
        data: JSON.stringify(data)
      }
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
    this.infinityScroll.disabled = false;
    this.inputValue = event.target.value;
    this.reset();
    this.scrollContent();
    this.counter++;
    this.loadData();
  }

  searchProducts() {
    const counterTemp = this.counter;
    this.productService.searchProduct(this.pageRequest, this.inputValue, counterTemp).subscribe((data: any) => {
      if (counterTemp == this.counter) {
        for (let item of data.products) {
          // image not found
          if (item.thumb_image === null) {
            const d = {
              url: "https://i.imgur.com/dbpoag5.png"
            }
            item.thumb_image = d;
          }
          this.data.push(item);
        }

        this.isLoading = false;

        this.infinityScroll.complete();
        // this.loading.dismiss();
        this.pageRequest.page++;

        // check max data
        if (this.data.length >= data.meta.pagination.total_objects) {
          this.infinityScroll.disabled = true;
          this.isMaxData = true;
        }
      } else {
        this.infinityScroll.complete();
      }
    })
  }

  loadProducts() {
    this.productService.getProducts(this.pageRequest).subscribe(data => {
      for (let item of data.products) {
        // image not found
        if (item.thumb_image === null) {
          const d = {
            url: "https://i.imgur.com/dbpoag5.png"
          }
          item.thumb_image = d;
        }
        this.data.push(item);
      }

      this.isLoading = false;

      this.infinityScroll.complete();
      // this.loading.dismiss();
      this.pageRequest.page++;

      // check max data
      if (this.data.length >= data.meta.pagination.total_objects) {
        this.infinityScroll.disabled = true;
        this.isMaxData = true;
      }
    })
  }

  loadTrending() {
    this.productService.getProductsTrending(this.pageRequest).subscribe(data => {
      for (let item of data.order_details) {
        // image not found
        if (item.product.thumb_image === null) {
          const d = {
            url: "https://i.imgur.com/dbpoag5.png"
          }
          item.product.thumb_image = d;
        }
        this.data.push({
          id: item.product.id,
          name: item.product.name,
          thumb_image: item.product.thumb_image,
          price: item.product.price
        });
      }

      this.isLoading = false;

      this.infinityScroll.complete();
      // this.loading.dismiss();
      this.pageRequest.page++;

      // check max data
      if (this.data.length >= data.meta.pagination.total_objects) {
        this.infinityScroll.disabled = true;
        this.isMaxData = true;
      }
    })
  }

  loadData() {
    if (!this.isMaxData) {
      // if (this.activeTab == this.filterProducts[2].id) {
      //   this.loadTrending();
      // } else {
      // }
      if (this.inputValue !== '') {
        this.searchProducts();
      } else {
        this.loadProducts();
      }
    } else {
      this.infinityScroll.complete();
    }
  }

  checkGuestPermission(): boolean {
    return this.permission === PERMISSIONS[0].value;
  }

  reset() {
    this.pageRequest = {
      page: 1,
      per_page: 10,
      total_objects: 20
    }
    this.data = [];
    this.isLoading = true;
    this.isMaxData = false;
  }

  scrollContent() {
    this.ionContent.scrollToTop(500);
  }
}
