import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';
import { PERMISSIONS } from 'src/app/@app-core/http';
import { OrdersService } from 'src/app/@app-core/http/orders';
import { StorageService } from 'src/app/@app-core/storage.service';

@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.page.html',
  styleUrls: ['./order-status.page.scss'],
})
export class OrderStatusPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infinityScroll: IonInfiniteScroll;

  public activeTab = "orderStatus";
  checkTab = true;
  data: any = [];
  pageRequest = {
    page: 1,
    per_page: 10,
    total_objects: 20
  };
  permission: string;

  constructor(
    private router: Router,
    private ordersService: OrdersService,
    private storageService: StorageService
  ) {
    this.storageService.infoAccount.subscribe((data) => {
      this.permission = (data !== null) ? data.role : PERMISSIONS[0].value;
    })
  }

  ngOnInit() {   
    if (this.checkGuestPermission()) {
      this.router.navigateByUrl('/auth/login');
    }
  }

  ionViewWillEnter() {
    const tabs = document.querySelectorAll('ion-tab-bar');
    Object.keys(tabs).map((key) => {
      tabs[key].style.display = 'flex';
    });
    this.loadData();
  }

  loadData() {
    this.ordersService.getOrders(this.pageRequest).subscribe(data => {
      this.data = data.orders;
    })
  }

  changeTabs(name) {
    this.activeTab = name;
    if (this.activeTab === 'orderStatus') {
      this.checkTab = true;
    }
    else if (this.activeTab === 'orderHistory') {
      this.checkTab = false;
    }
  }

  gotoDetailOrder() {
    this.router.navigateByUrl('main/order-status/detail-order')
  }

  gotoOrderStatus() {
    this.router.navigateByUrl('main/order-status/order-status-detail')
  }

  async segmentChanged(event) {
    this.activeTab = event.target.value;
  }

  calProductQuantity(item) {
    return item.order_details.filter(a => a.yieldable_type == 'Product').length;
  }

  listProductsName(item) {
    return item.order_details.reduce((acc, cur) => {
      if (cur.yieldable_type == 'Product') {
        acc += ', ' + cur.name;
      }
      return acc;
    }, '').substring(2);
  }

  checkGuestPermission(): boolean {
    return this.permission === PERMISSIONS[0].value;
  }
}
