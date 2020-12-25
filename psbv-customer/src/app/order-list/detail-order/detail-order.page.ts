import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OrdersService } from 'src/app/@app-core/http';
import { LoadingService } from 'src/app/@app-core/loading.service';

@Component({
  selector: 'app-detail-order',
  templateUrl: './detail-order.page.html',
  styleUrls: ['./detail-order.page.scss'],
})
export class DetailOrderPage implements OnInit {
  data = {
    id: '',
    code: ' ',
    status: '',
    order_details: [],
    audits: []
  }
  items = [];

  loadedData = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ordersService: OrdersService,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
    this.loadingService.present();

    this.route.queryParams.subscribe(params => {
      if (!this.loadedData) {
        this.ordersService.getOrderDetail(JSON.parse(params['data']).orderId).subscribe(data => {
          this.data = data.order;

          if (this.checkConfirmedStatus()) {
            const dateTime = this.data.audits[0].created_at;
            this.pushData(dateTime, 'Time confirmed');
          } else if (this.checkShippingStatus()) {
            const dateTime1 = this.data.audits[0].created_at;
            const dateTime2 = this.data.audits[1].created_at;
            this.pushData(dateTime1, 'Time confirmed', dateTime2, 'Time shipping');
          } else if (this.checkReceivedStatus()) {
            const dateTime1 = this.data.audits[1].created_at;
            const dateTime2 = this.data.audits[2].created_at;
            this.pushData(dateTime1, 'Time shipping', dateTime2, 'Time received');
          } else if (this.checkCancelStatus()) {
            const dateTime1 = this.data.audits[this.data.audits.length - 1].created_at;
            const dateTime2 = ' ';
            this.pushData(dateTime1, 'Time cancel', dateTime2, 'Reason');
          }

          this.loadedData = true;
          this.loadingService.dismiss();
        })
      }
    })
  }

  ionViewWillEnter() {
    const tabs = document.querySelectorAll('ion-tab-bar');
    Object.keys(tabs).map((key) => {
      tabs[key].style.display = 'none';
    });
  }

  pushData(dateTime1, name1, dateTime2?, name2?) {
    this.items.push({
      name: name1,
      date: dateTime1.substring(0, 10),
      time: dateTime1.substring(11, 19)
    })
    if (dateTime2 && name2) {
      this.items.push({
        name: name2,
        date: dateTime2.substring(0, 10),
        time: dateTime2.substring(11, 19)
      })
    }
  }

  getStatusColor() {
    for (let i of this.ordersService.STATUSES) {
      if (this.data.status == i.NAME) {
        return i.COLOR;
      }
    }
  }

  checkConfirmedStatus(): boolean {
    return this.data.status == this.ordersService.STATUSES[0].NAME;
  }

  checkShippingStatus() {
    return this.data.status == this.ordersService.STATUSES[1].NAME;
  }

  checkReceivedStatus(): boolean {
    return this.data.status == this.ordersService.STATUSES[2].NAME;
  }

  checkCancelStatus(): boolean {
    return this.data.status == this.ordersService.STATUSES[3].NAME;
  }

  goToDetailComponent() {
    this.router.navigateByUrl('main/order-list/detail-order/detail-component');
  }
}
