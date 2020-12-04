import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-status-detail',
  templateUrl: './order-status-detail.page.html',
  styleUrls: ['./order-status-detail.page.scss'],
})
export class OrderStatusDetailPage implements OnInit {
  text: string;
  statuses: IStatus[] = [
    {
      name: 'Sent Request',
      time: '08:23am',
      date: '12/12/1212',
      didPassed: true,
      iconName: 'receipt-outline'
    },
    {
      name: 'Confirmed',
      time: '08:54am',
      date: '12/12/1212',
      didPassed: true,
      iconName: 'checkbox-outline'
    },
    {
      name: 'Shipping',
      time: '09.05am',
      date: '12/12/1212',
      didPassed: true,
      childSrc: '/main/order/shipping',
      iconName: 'airplane-outline'
    },
    {
      name: 'Payment',
      didPassed: false,
      iconName: 'cash-outline'
    },
    {
      name: 'Received',
      didPassed: false,
      iconName: 'thumbs-up-outline'
    },
  ];

  constructor(
    private router: Router,
    public sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    const tabs = document.querySelectorAll('ion-tab-bar');
    Object.keys(tabs).map((key) => {
      tabs[key].style.display = 'none';
    });
    this.text = `calc(${this.countPassedItem()}% + 5px)`;
  }

  goBack(): void {
    this.router.navigateByUrl('main/order-status');
    const tabs = document.querySelectorAll('ion-tab-bar');
    Object.keys(tabs).map((key) => {
      tabs[key].style.display = 'flex';
    });
  }

  goToChild(status: IStatus) {
    if (status.childSrc && status.didPassed) {
      this.router.navigateByUrl(status.childSrc);
    }
  }
  gotoShipping() {
    console.log('hihi')
    this.router.navigateByUrl('main/order-status/shipping')
  }

  goToDetailOrder(): void {
    this.router.navigate(['main/order-status/detail-order'],{
      queryParams:{
        data: JSON.stringify(1)
      }
    });
  }

  countPassedItem(): number {
    let num: number = this.statuses.filter(status => status.didPassed).length;
    return num * 2 * 10 - 20;
  }
}

  


export interface IStatus {
  name: string;
  time?: string;
  date?: string;
  didPassed: boolean;
  childSrc?: string;
  imgSrc?: string;
  iconName?: string;
}


  