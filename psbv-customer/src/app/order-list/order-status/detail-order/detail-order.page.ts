import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersService, PERMISSIONS } from 'src/app/@app-core/http';
import { StorageService } from 'src/app/@app-core/storage.service';
import { threadId } from 'worker_threads';

export enum STATUS {
  CONFIRMED,
  DONE,
  CANCEL
};

export interface ISubItem {
  name: string;
  desc1: string;
  desc2?: string;
}

export interface IItem {
  name: string;
  status: STATUS;
  subItems: ISubItem[];
}

export interface IAccessory {
  src: string;
  name: string;
}

export interface IProduct {
  src: string;
  amount: number;
  name: string;
  accessories: IAccessory[];
}

@Component({
  selector: 'app-detail-order',
  templateUrl: './detail-order.page.html',
  styleUrls: ['./detail-order.page.scss'],
})
export class DetailOrderPage implements OnInit {
  permission: string;
  item: IItem = {
    name: 'Item 12/12/1212',
    status: STATUS.DONE,
    subItems: [
      {
        name: 'ID',
        desc1: '#1212121212'
      },
      {
        name: 'Time shipping',
        desc1: '12-12-1212',
        desc2: '12:12'
      },
      {
        name: 'Time received',
        desc1: '13-12-1212',
        desc2: '12:12'
      }
    ]
  }
  data = {
    id: '',
    name: 'Item 12/12/1212',
    status: '',
    order_details: [],
    audits: []
  }
  items = [];
  products: IProduct[] = [
    {
      src: 'https://dummyimage.com/165x165.jpg',
      amount: 2,
      name: 'Product 1',
      accessories: [
        {
          src: 'https://dummyimage.com/90x90.jpg',
          name: 'Accessory 1-1'
        },
        {
          src: 'https://dummyimage.com/90x90.jpg',
          name: 'Accessory 1-2'
        },
      ]
    },
    {
      src: 'https://dummyimage.com/165x165.jpg',
      amount: 99,
      name: 'Product 2',
      accessories: [
        {
          src: 'https://dummyimage.com/90x90.jpg',
          name: 'Accessory 2-1'
        }
      ]
    },
    {
      src: 'https://dummyimage.com/165x165.jpg',
      amount: 3,
      name: 'Product 3',
      accessories: []
    },
  ]

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private storageService: StorageService,
    private ordersService: OrdersService
  ) { }

  ngOnInit() {
    this.storageService.infoAccount.subscribe((data) => {
      this.permission = (data !== null) ? data.role : PERMISSIONS[0].value;
    })

    this.route.queryParams.subscribe(params => {
      this.ordersService.getOrderDetail(JSON.parse(params['data']).orderId).subscribe(data => {
        this.data = data.order;

        if (this.checkConfirmedStatus()) {
          const dateTime = this.data.audits[0].created_at;
          this.pushData(dateTime, 'Time confirmed');
        } else if (this.checkShippingStatus()) {
          const dateTime1 = this.data.audits[0].created_at;
          const dateTime2 = this.data.audits[1].created_at;
          this.pushData(dateTime1, 'Time confirmed', dateTime2, 'Time shipping');
        } else if (this.checkDoneStatus()) {
          const dateTime1 = this.data.audits[1].created_at;
          const dateTime2 = this.data.audits[2].created_at;
          this.pushData(dateTime1, 'Time shipping', dateTime2, 'Time confirmed');
        } else if (this.checkCancelStatus()) {
          const dateTime1 = this.data.audits[this.data.audits.length - 1].created_at;
          const dateTime2 = ' ';
          this.pushData(dateTime1, 'Time cancel', dateTime2, 'Reason');
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

  goBack(): void {
    this.router.navigateByUrl('/main/order-status');
  }

  getStatusColor() {
    for (let i of this.ordersService.STATUSES) {
      if (this.data.status == i.NAME) {
        return i.COLOR;
      }
    }
  }

  checkPremiumPermission(): boolean {
    return this.permission === PERMISSIONS[2].value;
  }

  checkConfirmedStatus(): boolean {
    return this.data.status == this.ordersService.STATUSES[0].NAME;
  }

  checkShippingStatus() {
    return this.data.status == this.ordersService.STATUSES[1].NAME;
  }

  checkDoneStatus(): boolean {
    return this.data.status == this.ordersService.STATUSES[2].NAME;
  }

  checkCancelStatus(): boolean {
    return this.data.status == this.ordersService.STATUSES[3].NAME;
  }
}
