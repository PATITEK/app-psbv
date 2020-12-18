import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersService } from 'src/app/@app-core/http';

@Component({
  selector: 'app-order-status-detail',
  templateUrl: './order-status-detail.page.html',
  styleUrls: ['./order-status-detail.page.scss'],
})
export class OrderStatusDetailPage implements OnInit {
  text: string;
  statuses = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public sanitizer: DomSanitizer,
    private ordersService: OrdersService
  ) { }

  ngOnInit() {
    this.text = `calc(${this.countPassedItem()}% + 5px)`;
    this.route.queryParams.subscribe(params => {
      this.ordersService.getOrderDetail(JSON.parse(params['data']).orderId).subscribe(data => {
        const audits = data.order.audits;

        const dateTimeConfirmed = audits[0].created_at;
        this.statuses.push({
          name: this.ordersService.STATUSES[0].NAME,
          color: this.ordersService.STATUSES[0].COLOR,
          date: dateTimeConfirmed.substring(0, 10),
          time: dateTimeConfirmed.substring(11, 19),
          urlIcon: 'assets/order-status/confirmed-icon.svg'
        })

        if (!this.checkCancelStatus(data.order.status)) {
          if (this.checkShippingStatus(data.order.status) || this.checkReceivedStatus(data.order.status)) {
            const dateTimeShipping = audits[1].created_at;
            this.statuses.push({
              name: this.ordersService.STATUSES[1].NAME,
              color: this.ordersService.STATUSES[1].COLOR,
              date: dateTimeShipping.substring(0, 10),
              time: dateTimeShipping.substring(11, 19),
              urlIcon: 'assets/order-status/shipping-icon.svg',
              urlChild: 'main/order-status/shipping'
            })
          } else {
            this.statuses.push({
              name: this.ordersService.STATUSES[1].NAME,
              color: this.ordersService.STATUSES[1].COLOR,
              urlIcon: 'assets/order-status/shipping-icon.svg',
              urlChild: 'main/order-status/shipping'
            })
          }

          if (this.checkReceivedStatus(data.order.status)) {
            const dateTimeReceived = audits[2].created_at;
            this.statuses.push({
              name: this.ordersService.STATUSES[2].NAME,
              color: this.ordersService.STATUSES[2].COLOR,
              date: dateTimeReceived.substring(0, 10),
              time: dateTimeReceived.substring(11, 19),
              urlIcon: 'assets/order-status/received-icon.svg'
            })
          } else {
            this.statuses.push({
              name: this.ordersService.STATUSES[2].NAME,
              color: this.ordersService.STATUSES[2].COLOR,
              urlIcon: 'assets/order-status/received-icon.svg',
            })
          }
        } else {
          // confirmed -> shipping -> cancel
          if (audits.length == 3) {
            const dateTimeShipping = audits[1].created_at;
            this.statuses.push({
              name: this.ordersService.STATUSES[1].NAME,
              color: this.ordersService.STATUSES[1].COLOR,
              date: dateTimeShipping.substring(0, 10),
              time: dateTimeShipping.substring(11, 19),
              urlIcon: 'assets/order-status/shipping-icon.svg',
              urlChild: 'main/order-status/shipping'
            })
          }

          let dateTimeCancel = audits[audits.length - 1].created_at;
          this.statuses.push({
            name: this.ordersService.STATUSES[3].NAME,
            color: this.ordersService.STATUSES[3].COLOR,
            date: dateTimeCancel.substring(0, 10),
            time: dateTimeCancel.substring(11, 19),
            nameIcon: 'close-outline',
          })
        }
      })
    })
  }

  ionViewWillEnter() {
    const tabs = document.querySelectorAll('ion-tab-bar');
    Object.keys(tabs).map((key) => {
      tabs[key].style.display = 'none';
    });
  }

  getBackgroundIconText(status) {
    const result = this.hexToRrb(status.color);
    return `rgba(${result.r}, ${result.g}, ${result.b}, .4)`;
  }

  hexToRrb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  goBack(): void {
    this.router.navigateByUrl('main/order-status');
  }

  goToChild(status) {
    if (status.urlChild && status.date) {
      this.router.navigateByUrl(status.urlChild);
    }
  }

  countPassedItem(): number {
    let num: number = this.statuses.filter(status => status.didPassed).length;
    return num * 2 * 10 - 20;
  }

  checkConfirmedStatus(status): boolean {
    return status == this.ordersService.STATUSES[0].NAME;
  }

  checkShippingStatus(status) {
    return status == this.ordersService.STATUSES[1].NAME;
  }

  checkReceivedStatus(status): boolean {
    return status == this.ordersService.STATUSES[2].NAME;
  }

  checkCancelStatus(status): boolean {
    return status == this.ordersService.STATUSES[3].NAME;
  }
}

