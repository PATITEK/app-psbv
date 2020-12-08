import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PERMISSIONS } from 'src/app/@app-core/http';
import { StorageService } from 'src/app/@app-core/storage.service';

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
    private storageService: StorageService
  ) { }

  ngOnInit() {
    this.storageService.infoAccount.subscribe((data) => {
      this.permission = (data !== null) ? data.role : PERMISSIONS[0].value;
    })
  }

  ionViewWillEnter() {
    const tabs = document.querySelectorAll('ion-tab-bar');
    Object.keys(tabs).map((key) => {
      tabs[key].style.display = 'none';
    });
  }

  goBack(): void {
    this.router.navigateByUrl('/main/order-status');
  }

  getStatus(): any {
    if (this.item.status === STATUS.CONFIRMED) {
      return {
        name: 'Confirmed',
        background: '#b2e9fb'
      }
    }
    if (this.item.status === STATUS.DONE) {
      return {
        name: 'Done',
        background: '#91e29b'
      }
    }
    return {
      name: 'Cancel',
      background: '#ce091c'
    }
  }

  checkPremiumPermission(): boolean {
    return this.permission === PERMISSIONS[2].value;
  }

  checkConfirmedStatus(): boolean {
    return this.item.status === STATUS.CONFIRMED;
  }

  checkDoneStatus(): boolean {
    return this.item.status === STATUS.DONE;
  }

  checkCancelStatus(): boolean {
    return this.item.status === STATUS.CANCEL;
  }
}
