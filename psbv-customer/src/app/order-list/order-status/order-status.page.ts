import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';
import { OrdersService } from 'src/app/@app-core/http/orders';

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

  constructor(
    private route: Router,
    private ordersService: OrdersService
  ) { }

  ngOnInit() {}

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
    this.route.navigateByUrl('main/order-status/detail-order')
  }

  gotoOrderStatus() {
    this.route.navigateByUrl('main/order-status/order-status-detail')
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
        acc += ', ' +  cur.name;
      }
      return acc;
    }, '').substring(2);
  }
}
