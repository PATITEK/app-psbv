import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { isBuffer } from 'util';

@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.page.html',
  styleUrls: ['./order-status.page.scss'],
})
export class OrderStatusPage implements OnInit {

  constructor(private route: Router) { 
    
   }
  public activeTab = "orderStatus";

  
  ngOnInit() {
  }
  changeTabs(name) {
   this.activeTab = name;
   console.log(name);
  }
  // checkTab(): bool {
  //   return this.activeTab;

  //}
  gotoDetail() {
    this.route.navigateByUrl('main/order-status/detail-order')
  }
  async segmentChanged(event) {
    this.activeTab = event.target.value;
  }

}
