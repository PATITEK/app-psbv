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
  data = [];
  pageRequest = {
    page: 1,
    per_page: 10,
    total_objects: 20
  };

  constructor(
    private route: Router,
    private ordersService: OrdersService
  ) { }

  ngOnInit() {
    this.loadData();
  }

  ionViewWillEnter() {
    const tabs = document.querySelectorAll('ion-tab-bar');
    Object.keys(tabs).map((key) => {
      tabs[key].style.display = 'flex';
    });
  }

  loadData() {
    this.ordersService.getOrders(this.pageRequest).subscribe(data => {
      console.log(data);
      for (let item of data.orders) {
        this.data.push(item);
      }
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
}
