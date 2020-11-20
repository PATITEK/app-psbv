import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.page.html',
  styleUrls: ['./order-list.page.scss'],
})
export class OrderListPage implements OnInit {

  constructor(private router: Router) {
    
   }

  ngOnInit() {
    const tabs = document.querySelectorAll('ion-tab-bar');
    Object.keys(tabs).map((key) => {
      tabs[key].style.display = 'flex';
    });
  }

  gotoOrderStatus(){
    this.router.navigateByUrl('/main/order/order-status');
  }

  gotoHistory(){
    this.router.navigateByUrl('/main/history')
  }
}
