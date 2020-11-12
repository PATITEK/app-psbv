import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  constructor() { }

  ngOnInit() {
    const tabs = document.querySelectorAll('ion-tab-bar');
     Object.keys(tabs).map((key) => {
    tabs[key].style.display = 'none';
    });
  }

}
