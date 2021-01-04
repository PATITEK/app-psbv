import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonContent, IonInfiniteScroll, Platform } from '@ionic/angular';
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
  @ViewChild(IonInfiniteScroll) infinityScrollTrending: IonInfiniteScroll;
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

  pageRequest: IPageRequest = {
    page: 1,
    per_page: 10,
    total_objects: 20
  }
  data = [];
  permission: string;
  counter = 0;
  inputValue: string = '';
  isMaxData = false;
  public activeTab = this.filterProducts[0].id;
  checkTab = true;
  isLoading = true;

  pageRequestTrending: IPageRequest = {
    page: 1,
    per_page: 10,
    total_objects: 20
  }
  dataTrending = [];
  isMaxDataTrending = false;
  isLoadingTrending = true;
  dataSeenProducts = JSON.parse(localStorage.getItem('seenProducts')) || [];
  constructor(
    private router: Router,
    private productService: ProductsService,
    public alertController: AlertController,
    private platform: Platform,
    // public loading: LoadingService,
    private storageService: StorageService
  ) {
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
    this.platform.backButton.subscribe(() => {
      if ((this.router.url === '/main/home')) {
        this.presentAlert();
      }
      else {
        return;
      }
    }
    )
 
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'logout-alert',
      message: 'Do you want to exit app?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            navigator['app'].exitApp();
          }
        },
        {
          text: 'No',
          handler: () => {
            return;
          }
        },

      ]
    });
    await alert.present();
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
    if (this.activeTab == name) {
      this.scrollToTopSmoothly();
    } else {
      this.scrollToTop();
      this.activeTab = name;
    }
    if (this.activeTab == this.filterProducts[2].id && this.dataTrending.length == 0) {
      this.loadDataTrending();
    }
  }

  goToDetail(item) {
    if (this.activeTab != this.filterProducts[1].id) {
      this.setCartLocalStorage(item);
    }

    const data = {
      id: item.id
    }
    this.router.navigate(['/main/home/product-info'], {
      queryParams: {
        data: JSON.stringify(data)
      }
    });
  }

  goToUserInfo() {
    this.router.navigateByUrl("/account/user-info");
  }

  goToNoti() {
    this.router.navigateByUrl('notification');
  }

  gotoHome() {
    this.router.navigateByUrl('/main/product-categories');
  }

  onInput(event: any) {
    if (this.activeTab == this.filterProducts[0].id) {
      this.infinityScroll.disabled = false;
    }
    this.activeTab = this.filterProducts[0].id;
    this.inputValue = event.target.value;
    this.reset();
    this.scrollToTop();
    this.counter++;
    this.loadData();
  }
  searchProducts(event?) {
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
  loadProducts(event?) {
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

  loadTrending(event?) {
    this.productService.getProductsTrending(this.pageRequestTrending).subscribe(data => {
      for (let item of data.order_details) {
        // image not found
        if (item.product.thumb_image === null) {
          const d = {
            url: "https://i.imgur.com/dbpoag5.png"
          }
          item.product.thumb_image = d;
        }
        this.dataTrending.push({
          id: item.product.id,
          name: item.product.name,
          thumb_image: item.product.thumb_image,
          price: item.product.price
        });
      }

      this.isLoadingTrending = false;

      this.infinityScrollTrending.complete();
      // this.loading.dismiss();
      this.pageRequestTrending.page++;

      // check max data
      if (this.dataTrending.length >= data.meta.pagination.total_objects) {
        this.infinityScrollTrending.disabled = true;
        this.isMaxDataTrending = true;
      }
    })
  }

  loadData(event?) {
    if (!this.isMaxData) {
      if (this.inputValue !== '') {
        this.searchProducts();
      } else {
        this.loadProducts();
      }
    } else {
      this.infinityScroll.complete();
    }
  }

  loadDataTrending(event?) {
    if (!this.isMaxDataTrending) {
      this.loadTrending();
    } else {
      this.infinityScrollTrending.complete();
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

  scrollToTop() {
    this.ionContent.scrollToTop();
  }

  scrollToTopSmoothly() {
    this.ionContent.scrollToTop(500);
  }

  setCartLocalStorage(item) {
    const product = {
      id: item.id,
      name: item.name,
      thumb_image: item.thumb_image,
      price: item.price
    }

    for (let i = 0, n = this.dataSeenProducts.length; i < n; i++) {
      if (item.id == this.dataSeenProducts[i].id) {
        this.dataSeenProducts.splice(i, 1);
        break;
      }
    }
    this.dataSeenProducts.unshift(product);

    localStorage.setItem('seenProducts', JSON.stringify(this.dataSeenProducts));
  }
}
