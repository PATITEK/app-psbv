import { Component, OnInit } from '@angular/core';

export class Item {
    count: number;
    constructor(count?: number){
        this.count = count;
    }
    add() {
        this.count++;
    }
    minus() {
        this.count--;
    }
}

@Component({
    selector: 'app-cart-item',
    templateUrl: './cart-item.component.html',
    styleUrls: ['./cart-item.component.scss'],
})
export class CartItemComponent implements OnInit {
    items: Array<Item> = [
        
    ];

    constructor() { }

    ngOnInit() { }

}
