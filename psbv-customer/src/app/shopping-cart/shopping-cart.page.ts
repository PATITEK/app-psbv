import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

export interface ShoppingCartItem{
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
  items: ShoppingCartItem[] = [
    {
      name: "Item",
      date: "12/12/1212",
      price: 450,
      numberProduct: 3,
      dayToDelivery: 1,
      description: "Product Product Product, Product Product, Product, Product ...",
      counter: 1
    },
    {
      name: "Item",
      date: "12/12/1212",
      price: 450,
      numberProduct: 3,
      dayToDelivery: 1,
      description: "Product Product Product, Product Product, Product, Product ...",
      counter: 1
    },
    {
      name: "Item",
      date: "12/12/1212",
      price: 450,
      numberProduct: 3,
      dayToDelivery: 1,
      description: "Product Product Product, Product Product, Product, Product ...",
      counter: 1
    },
    {
      name: "Item",
      date: "12/12/1212",
      price: 450,
      numberProduct: 3,
      dayToDelivery: 1,
      description: "Product Product Product, Product Product, Product, Product ...",
      counter: 1
    },
  ];
  hasBackButton: boolean = false;
  data;

  constructor(
    private location: Location,
    private route: ActivatedRoute
    ) {}

  add(item) {
    item.counter++;
  }

  ionViewWillEnter() {

    console.log('has', this.hasBackButton);
    this.route.queryParams.subscribe((params) => {
      this.data = JSON.parse(params['data']);
      console.log('data', this.data);
      if (this.data.checkBack === true) {
        this.hasBackButton = true;
        console.log('vao true', this.hasBackButton);
      } else {
        this.hasBackButton = false;
      }
    })
  }
  ngOnInit() {

  }

  checkHasBackButton(): boolean {
    return this.hasBackButton;
  }

  goBack() {
    this.hasBackButton = false;

    console.log('check', this.hasBackButton);

    this.location.back();
  }
}
