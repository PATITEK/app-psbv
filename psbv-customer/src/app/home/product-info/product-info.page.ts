import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

export interface IAccessory {
  src: string;
  name: string;
  desc: string;
  isAdded: boolean;
}

export enum PERMISSION {
  GUEST,
  STANDARD,
  PREMIUM
};

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.page.html',
  styleUrls: ['./product-info.page.scss'],
})

export class ProductInfoPage implements OnInit {

  constructor(
    private router: Router,
    private location: Location,
  ) {}

  counter: number = 0;
  permission: PERMISSION = PERMISSION.STANDARD;

  accessories: IAccessory[] = [
    {
      src: 'http://lorempixel.com/g/100/100/abstract',
      name: 'Accessory 1',
      desc: 'Info 1 Info 1 Info 1 Info 1',
      isAdded: false
    },
    {
      src: 'http://lorempixel.com/g/100/100/abstract',
      name: 'Accessory 2',
      desc: 'Info 2 Info 2 Info 2 Info 2 Info 2 Info 2 Info 2 Info 2',
      isAdded: false
    },
    {
      src: 'http://lorempixel.com/g/100/100/abstract',
      name: 'Accessory 3',
      desc: 'Info 3 Info 3 Info 3 Info 3',
      isAdded: false
    }
  ];

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

  goToDetail(): void {
    if (this.checkGuestPermission()) {
      this.router.navigateByUrl('/auth/login');
    } else {
      this.router.navigateByUrl('/main/home/product-info/product-detail')
    }
  }

  goToCart(): void {
    this.router.navigateByUrl('main/shopping-cart');
  }

  getBg(accessory: IAccessory): string {
    return accessory.isAdded ? '#494949' : '#eaeaea';
  }

  getColor(accessory: IAccessory): string {
    return accessory.isAdded ? 'white' : ' #636363';
  }

  getIcon(accessory: IAccessory): string {
    return accessory.isAdded ? 'remove-outline' : 'add-outline';
  }

  toggleItem(accessory: IAccessory): void {
    accessory.isAdded = !accessory.isAdded;
  }

  selectAllItem(): void {
    this.accessories.forEach(accessory => accessory.isAdded = true);
  }

  addProduct(): void {
    // add product to cart

    // reset selected item
    this.accessories.forEach(accessory => accessory.isAdded = false);

    // inc counter
    this.counter++;
  }

  checkGuestPermission(): boolean {
    return this.permission === PERMISSION.GUEST;
  }

}
