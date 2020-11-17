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
  }

  gotoOrderStatus(){
    this.router.navigateByUrl('/main/shopping-cart')
  }
}
