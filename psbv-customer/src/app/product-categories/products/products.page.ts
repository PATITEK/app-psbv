import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';


@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  constructor(private location: Location) { }
  ngOnInit() {
    const tabs = document.querySelectorAll('ion-tab-bar');
     Object.keys(tabs).map((key) => {
    tabs[key].style.display = 'none';
    });
  }
  goToHome(): void {
    this.location.back();
    const tabs = document.querySelectorAll('ion-tab-bar');
    Object.keys(tabs).map((key) => {
      tabs[key].style.display = 'flex';
    });
  }

}
