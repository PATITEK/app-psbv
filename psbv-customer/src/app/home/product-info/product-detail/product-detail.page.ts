import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { PERMISSION } from '../product-info.page';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {

  constructor(private router: Router, private location: Location) {
  }

  permission: PERMISSION = PERMISSION.PREMIUM;

  ngOnInit() {
    const tabs = document.querySelectorAll('ion-tab-bar');
    Object.keys(tabs).map((key) => {
      tabs[key].style.display = 'none';
    });
  }

  goBack() {
    this.location.back();
  }

  checkPremiumPermission(): boolean {
    return this.permission === PERMISSION.PREMIUM;
  }

}
