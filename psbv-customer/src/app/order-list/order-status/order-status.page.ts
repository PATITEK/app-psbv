import { Component, OnInit } from '@angular/core';
import { isBuffer } from 'util';

@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.page.html',
  styleUrls: ['./order-status.page.scss'],
})
export class OrderStatusPage implements OnInit {

  constructor() { }
  public activeTab = "orderStatus";
  
  ngOnInit() {
  }
  changeTabs(name) {
   this.activeTab = name;
   console.log(name);
  }
  async segmentChanged(event) {
    this.activeTab = event.target.value;
  }

}
