import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonContent, IonInfiniteScroll, Platform } from '@ionic/angular';
import { OrdersService } from '../@app-core/http';
import { LoadingService } from '../@app-core/loading.service';
import { ConnectivityService } from '../@app-core/utils/connectivity.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.page.html',
  styleUrls: ['./order-list.page.scss'],
})
export class OrderListPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infinityScroll: IonInfiniteScroll;
  @ViewChild(IonInfiniteScroll) infinityScrollHistory: IonInfiniteScroll;
  @ViewChild(IonContent) ionContent: IonContent;

  public activeTab = "orderStatus";
  data: any = [];
  pageRequest = {
    page: 1,
    per_page: 5,
    total_objects: 20
  };
  loadedData = false;
  isLoading = true;

  dataHistory: any = [];
  pageRequestHistory = {
    page: 1,
    per_page: 4,
    total_objects: 20
  };
  loadedDataHistory = false;
  isLoadingHistory = true;

  firstTime = false;
  private backButtonService: any;
  isOnline;

  constructor(
    private router: Router,
    private ordersService: OrdersService,
    private loadingService: LoadingService,
    public alertController: AlertController,
    private platform: Platform,
    private connectivityService: ConnectivityService,
  ) {
    this.connectivityService.appIsOnline$.subscribe(online => {
      if (online) {
        this.isOnline = true;
        switch (this.activeTab) {
          case 'orderStatus':
            this.loadData();
            break;
          case 'orderHistory':
            this.loadDataHistory();
            break;
          default:
            break;
        }
      } else {
        this.isOnline = false;
      }
    })
  }

  ngOnInit() {
    if (this.isOnline === true) {
      this.loadData();
    }
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

  backButtonSystem(event) {
    this.backButtonService = this.platform.backButton.subscribe(() => {
      if (event) {
        this.presentAlert();
      }
      else {
        return;
      }
    })
  }

  ionViewWillEnter() {
    const tabs = document.querySelectorAll('ion-tab-bar');
    Object.keys(tabs).map((key) => {
      tabs[key].style.display = 'flex';
      this.backButtonSystem(tabs[key].style.display)
    });
  }

  ionViewDidLeave() {
    this.backButtonService.unsubscribe();
  }

  loadData() {
    this.isLoading = true;
    this.ordersService.getOrders(this.pageRequest).subscribe(data => {
      if (!this.data.some(a => a.id == data.orders[0].id)) {
        for (let item of data.orders) {
          this.data.push(item);
        }

        // this.loadingService.dismiss();
        this.infinityScroll.complete();
        this.pageRequest.page++;

        // check max data
        if (this.data.length >= data.meta.pagination.total_objects) {
          this.infinityScroll.disabled = true;
          this.loadedData = true;
        }
      }
      this.isLoading = false;
    })
  }
  loadDataHistory() {
    this.isLoadingHistory = true;
    this.ordersService.getHistory(this.pageRequestHistory).subscribe(data => {
      if (!this.dataHistory.some(a => a.id == data.orders[0].id)) {
        for (let item of data.orders) {
          this.dataHistory.push(item);
        }
        // this.loadingService.dismiss();
        this.infinityScrollHistory.complete();
        this.pageRequestHistory.page++;

        // check max data
        if (this.dataHistory.length >= data.meta.pagination.total_objects) {
          this.infinityScrollHistory.disabled = true;
          this.loadedDataHistory = true;
        }
      }
      this.isLoadingHistory = false;
    })
  }
  getStatusColor(item) {
    for (let i of this.ordersService.STATUSES) {
      if (item.status == i.NAME) {
        return i.COLOR;
      }
    }
  }
  changeTabs(name) {
    if (this.activeTab == name) {
      this.scrollToTopSmoothly();
    } else {
      this.scrollToTop();
      this.activeTab = name;
    }
    if (this.activeTab == 'orderHistory' && this.dataHistory.length == 0 && !this.loadedDataHistory) {
      this.firstTime = true;
      this.loadDataHistory();
    }
  }

  goToOrderDetail(item) {
    const data = {
      orderId: item.id
    }
    this.router.navigate(['main/order-list/order-detail'], {
      queryParams: {
        data: JSON.stringify(data)
      }
    })
  }

  goToOrderDetailHistory(item) {
    const data = {
      orderId: item.id
    }
    this.router.navigate(['main/order-list/order-detail-history'], {
      queryParams: {
        data: JSON.stringify(data)
      }
    })
  }

  calProductsAmount(item) {
    return item.order_details.reduce((acc, cur) => cur.yieldable_type == this.ordersService.TYPES.PRODUCT.NAME ? acc + cur.amount : acc, 0)
  }

  calAccessoriesAmount(item) {
    return item.order_details.reduce((acc, cur) => cur.yieldable_type == this.ordersService.TYPES.ACCESSORY.NAME ? acc + cur.amount : acc, 0)
  }

  listProductsName(item) {
    return item.order_details.reduce((acc, cur) => cur.yieldable_type == this.ordersService.TYPES.PRODUCT.NAME ? acc + ', ' + cur.name : acc, '').substring(2);
  }

  scrollToTop() {
    this.ionContent.scrollToTop();
  }

  scrollToTopSmoothly() {
    this.ionContent.scrollToTop(500);
  }

  calTotalPrice(item) {
    return item.order_details.reduce((acc, cur) => acc + cur.amount * cur.price, 0);
  }
}
