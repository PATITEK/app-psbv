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
  checkTab = true;
  
  
  ngOnInit() {
  }

  ionViewWillEnter() {
    const tabs = document.querySelectorAll('ion-tab-bar');
    Object.keys(tabs).map((key) => {
      tabs[key].style.display = 'flex';
    });
  }

  changeTabs(name) {
   this.activeTab = name;
   if(this.activeTab ==='orderStatus'){
     this.checkTab = true;
   }
   else if(this.activeTab === 'orderHistory')
   {
     this.checkTab = false;
   }
   console.log(name);
  }
  gotoDetailOrder() {
    this.route.navigateByUrl('main/order-status/detail-order')
  }
  gotoOrderStatus(){
    this.route.navigateByUrl('main/order-status/order-status-detail')

  }

  async segmentChanged(event) {
    this.activeTab = event.target.value;
  }

}
