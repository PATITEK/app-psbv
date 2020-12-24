import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-add',
  templateUrl: './modal-add.component.html',
  styleUrls: ['./modal-add.component.scss'],
})
export class ModalAddComponent implements OnInit {
  @Input() product: any;

  amount = 1;

  constructor(
    private modalController: ModalController,
  ) { }

  ngOnInit() { }

  setCartLocalStorage() {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // check duplicated product
    let duplicated = false;
    for (let i of cartItems) {
      if (this.product.id == i.id) {
        i.amount += this.amount;
        duplicated = true;
        break;
      }
    }
    if (!duplicated) {
      this.product.amount = this.amount;
      cartItems.push(this.product);
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }

  decreaseAmount() {
    if (this.amount > 1) {
      this.amount--;
    }
  }

  increaseAmount() {
    if (this.amount < 999) {
      this.amount++;
    }
  }

  choose() {
    this.setCartLocalStorage();
    const amount = this.amount;
    this.modalController.dismiss(amount, 'ok');
  }

  dismissModal() {
    this.modalController.dismiss(null, 'cancel');
  }
}
