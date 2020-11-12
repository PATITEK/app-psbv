import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.page.html',
  styleUrls: ['./cart-detail.page.scss'],
})
export class CartDetailPage implements OnInit {

  constructor() { }

  ngOnInit() {
    const tabs = document.querySelectorAll('ion-tab-bar');
    Object.keys(tabs).map((key) => {
   tabs[key].style.display = 'none';
   });
  }

}
