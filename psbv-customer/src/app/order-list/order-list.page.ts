import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, IonInfiniteScroll } from '@ionic/angular';
import { OrdersService } from '../@app-core/http';
import { LoadingService } from '../@app-core/loading.service';

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

  constructor(
    private router: Router,
    private ordersService: OrdersService,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
    // this.loadingService.present();
    this.loadData();
  }

  ionViewWillEnter() {
    const tabs = document.querySelectorAll('ion-tab-bar');
    Object.keys(tabs).map((key) => {
      tabs[key].style.display = 'flex';
    });
  }

  loadData() {
    this.isLoading = true;
    this.ordersService.getOrders(this.pageRequest).subscribe(orders => {
      for (let item of orders.orders) {
        this.data.push(item);
      }

      this.isLoading = false;

      // this.loadingService.dismiss();
      this.infinityScroll.complete();
      this.pageRequest.page++;

      // check max data
      if (this.data.length >= orders.meta.pagination.total_objects) {
        this.infinityScroll.disabled = true;
        this.loadedData = true;
      }
    })
  }

  loadDataHistory() {
    this.isLoadingHistory = true;
    this.ordersService.getHistory(this.pageRequestHistory).subscribe(orders => {
      for (let item of orders.orders) {
        this.dataHistory.push(item);
      }

      this.isLoadingHistory = false;

      // this.loadingService.dismiss();
      this.infinityScrollHistory.complete();
      this.pageRequestHistory.page++;

      // check max data
      if (this.dataHistory.length >= orders.meta.pagination.total_objects) {
        this.infinityScrollHistory.disabled = true;
        this.loadedDataHistory = true;
      }
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
    if (this.activeTab == 'orderHistory' && this.dataHistory.length == 0) {
      this.firstTime = true;
      this.loadDataHistory();
    }
  }

  gotoDetailOrder(item) {
    const data = {
      orderId: item.id
    }
    this.router.navigate(['main/order-list/detail-order'], {
      queryParams: {
        data: JSON.stringify(data)
      }
    })
  }

  gotoOrderStatus(item) {
    const data = {
      orderId: item.id
    }
    this.router.navigate(['main/order-list/order-status-detail'], {
      queryParams: {
        data: JSON.stringify(data)
      }
    })
  }

  goToReOrder(item) {
    const data = {
      orderId: item.id
    }
  }

  // calProductQuantity(item) {
  //   return item.order_details.filter(a => a.yieldable_type == this.ordersService.TYPES.PRODUCT.NAME).length;
  // }

  // listProductsName(item) {
  //   return item.order_details.reduce((acc, cur) => {
  //     if (cur.yieldable_type == 'Product') {
  //       acc += ', ' + cur.name;
  //     }
  //     return acc;
  //   }, '').substring(2);
  // }

  listItemsName(item) {
    return item.order_details.reduce((acc, cur) => acc + ', ' + cur.name, '').substring(2);
  }

  scrollToTop() {
    this.ionContent.scrollToTop();
  }

  scrollToTopSmoothly() {
    this.ionContent.scrollToTop(500);
  }
}
