import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Location } from '@angular/common';
import { AlertController } from '@ionic/angular';
import { filter } from 'rxjs/operators';
export interface ShoppingCartItem {
  name: string;
  date: string;
  price: number;
  numberProduct: number;
  dayToDelivery: number;
  description: string;
  counter: number;
}

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.page.html',
  styleUrls: ['./shopping-cart.page.scss'],
})
export class ShoppingCartPage implements OnInit {
  hasTF: any = false;
  hasBackButton: boolean = false;
  urlBack;
  idBack;
  items: ShoppingCartItem[] = [
    {
      name: "Item 1",
      date: "12/12/1212",
      price: 450,
      numberProduct: 3,
      dayToDelivery: 1,
      description: "Product Product Product, Product Product, Product, Product ...",
      counter: 1
    },
    {
      name: "Item 2",
      date: "12/12/1212",
      price: 450,
      numberProduct: 3,
      dayToDelivery: 1,
      description: "Product Product Product, Product Product, Product, Product ...",
      counter: 1
    },
    {
      name: "Item 3",
      date: "12/12/1212",
      price: 450,
      numberProduct: 3,
      dayToDelivery: 1,
      description: "Product Product Product, Product Product, Product, Product ...",
      counter: 1
    },
    {
      name: "Item 4",
      date: "12/12/1212",
      price: 450,
      numberProduct: 3,
      dayToDelivery: 1,
      description: "Product Product Product, Product Product, Product, Product ...",
      counter: 1
    },
  ];

  public showSpinner = false;
  constructor(
    private router: Router,
    private location: Location,
    private route: ActivatedRoute,
    private alertCrtl: AlertController
  ) { }

  add(item) {
    item.counter++;
  }
  minus(item) {
    if (item.counter > 0)
      item.counter--;
  }
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.hasTF = JSON.parse(params['data']);
      this.urlBack = JSON.parse(params['data']).urlBack;
      this.idBack = JSON.parse(params['data']).id;
        if(this.hasTF.checkBack === true){
        this.hasTF = true;
      }else {
        this.hasTF = false;
      }
    })
  }
  goCheck() {
    this.route.queryParams.subscribe(params => {
      const tabs = document.querySelectorAll('ion-tab-bar');
      Object.keys(tabs).map((key) => {
        tabs[key].style.display = 'none';
      });
      return JSON.parse(params['data']);

    })
  }
  goBack() {
    this.router.navigate([this.urlBack], {
      queryParams: {
        id: JSON.stringify(this.idBack)
      }
    });
  }
  ngOnDestroy() {
    this.hasTF = false;
    this.urlBack = '';
  }

  async presentAlert(text: string) {
    const alert = await this.alertCrtl.create({
      header: 'Warning',
      message: text,
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            return;
          }
        },
        {
          text: 'Agree',
          handler: () => {
            return this.items.pop();
          }
        },
      ]
    });
    await alert.present();
  }
  async onCancel() {
    this.showSpinner = true;
    this.presentAlert('Are you sure to delete this item?');
  }

}
