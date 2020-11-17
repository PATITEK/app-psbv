import { Component, OnInit } from '@angular/core';

export interface Item{
    count: number;
}

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
})
export class CartItemComponent implements OnInit {
    items: Array<Item> = [
        {
            count: 1
        },
        {
            count: 1
        },
        {
            count: 1
        },
    ]

  constructor() { }

  ngOnInit() {}

}
