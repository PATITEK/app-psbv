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
  hasBackButton: boolean = false;
  hasTF: boolean = true;

  constructor(
    private location: Location,
    private route: ActivatedRoute
    ) {}

  add(item) {
    item.counter++;
  }
  minus(item){
    if(item.counter > 0)
      item.counter--;
  }
  ngOnInit() {
  }
  checkHasBackButton(): boolean {
    return this.hasBackButton;
  }
  onCancel() {
    // this.hasTF = false;
    return this.items.pop();
  }
  goBack() {
    this.hasBackButton = false;

    console.log('check', this.hasBackButton);

    this.location.back();
  }
}
