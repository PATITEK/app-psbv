import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';
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
  checkstatus = 'confirm';
  data: any = [];
  pageRequest = {
    page: 1,
    per_page: 10,
    total_objects: 20
  };
  permission: string;

  constructor(
    private router: Router,
    private ordersService: OrdersService
  ) {}

  ngOnInit() { }

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
  getStatus(item) {
    if(item.status == 'send_request')
      return '#CCBAFC';
    if(item.status == '')
      return '#B2E9FB';
    if(item.status == '')
    return '#F7BDAE';
    if(item.status == '')
      return '#AEF4B7';
    if(item.status == '')
    return '#F9D775';
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
}
