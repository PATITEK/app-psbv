import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

export interface IStatus {
  name: string;
  time?: string;
  date?: string;
  didPassed: boolean;
  childSrc?: string;
  imgSrc?: string;
  iconName?: string;
}

@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.page.html',
  styleUrls: ['./order-status.page.scss'],
})
export class OrderStatusPage implements OnInit {

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
      childSrc: '/main/order/order-status/shipping',
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
      iconName: 'thumb-up-outline'
    },
  ]

  constructor(private location: Location) { }
  
  ngOnInit() {
  }

  goBack(): void {
    this.location.back();
  }

  countPassedItem(): number {
    return this.statuses.filter(a => a.didPassed).length;
  }
}
