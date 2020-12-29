import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.page.html',
  styleUrls: ['./shipping.page.scss'],
})
export class ShippingPage implements OnInit {
  text: string;
  statuses = [
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
    }
  ];

  constructor(
    public sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.text = `calc(${this.countPassedItem()}%)`;
  }

  ionViewWillEnter() {
    const tabs = document.querySelectorAll('ion-tab-bar');
    Object.keys(tabs).map((key) => {
      tabs[key].style.display = 'none';
    });
  }

  countPassedItem(): number {
    let num: number = this.statuses.filter(status => status.didPassed).length;
    return num * 2.5 * 10 - 25;
  }
}
