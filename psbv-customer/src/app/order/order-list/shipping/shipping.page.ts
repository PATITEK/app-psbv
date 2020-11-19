import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { IStatus } from '../order-status/order-status.page';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.page.html',
  styleUrls: ['./shipping.page.scss'],
})
export class ShippingPage implements OnInit {
  text: string;
  statuses: IStatus[] = [
    {
      name: 'Received request',
      time: '08:23am',
      date: '12/12/1212',
      didPassed: true
    },
    {
      name: 'Arrive pick up point',
      time: '08:54am',
      date: '12/12/1212',
      didPassed: true
    },
    {
      name: 'Pick up items',
      time: '09.05am',
      date: '12/12/1212',
      didPassed: true
    },
    {
      name: 'Done',
      didPassed: false
    },
    {
      name: 'Received request 1',
      didPassed: false
    },
    {
      name: 'Received request 2',
      didPassed: false
    }
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
    this.text = `calc(${this.countPassedItem()}%)`;
  }

  goBack(): void {
    this.router.navigateByUrl('/main/order/order-status');
  }

  goToDetailOrder(): void {
    this.router.navigateByUrl('/main/order/detail-order');
  }

  countPassedItem(): number {
    let num: number = this.statuses.filter(status => status.didPassed).length;
    console.log(num);
    return num * 1.667 * 10 - 16.67;
  }
}
