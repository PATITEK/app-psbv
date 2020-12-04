import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
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

  text: string;
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
  data: number = 1;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private storageService: StorageService
  ) { }
  permiss: string; 
  ngOnInit() {
    const tabs = document.querySelectorAll('ion-tab-bar');
    Object.keys(tabs).map((key) => {
      tabs[key].style.display = 'none';
    });
    this.text = '20px 0';
    this.storageService.infoAccount.subscribe((data) => {
      console.log(data);
      this.permiss = data.role;
    })
  }

  ionViewWillEnter(){
    this.route.queryParams.subscribe((params) => {
      this.data = JSON.parse(params['data']);
    })
  }

  goBack(): void {
    if (this.data == 1) {
      this.router.navigateByUrl('/main/order-status');
    } else {
      this.router.navigateByUrl('/main/order-status/shipping');
    }
    const tabs = document.querySelectorAll('ion-tab-bar');
    Object.keys(tabs).map((key) => {
      tabs[key].style.display = 'flex';
    });
  }

  goToDetailComponent(): void {
    this.router.navigateByUrl('/main/order-status/detail-order/detail-component')
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
  checkPremium() :boolean {
    return this.permiss === 'premium';
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
