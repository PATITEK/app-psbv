import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.page.html',
  styleUrls: ['./order-history.page.scss'],
})
export class OrderHistoryPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  gotoStatus() {
    this.router.navigateByUrl('/main/order');
  }
}
