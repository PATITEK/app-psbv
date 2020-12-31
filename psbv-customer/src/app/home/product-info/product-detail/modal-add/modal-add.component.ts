import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-modal-add',
  templateUrl: './modal-add.component.html',
  styleUrls: ['./modal-add.component.scss'],
})
export class ModalAddComponent implements OnInit {
  @Input() data: any;

  amount = 1;

  constructor(
    private modalController: ModalController,
    public toastController: ToastController
  ) { }

  ngOnInit( ) {}

  setCartLocalStorage() {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // check duplicated
    let duplicated = false;
    for (let i of cartItems) {
      if (i.kind == this.data.kind && this.data.id == i.id) {
        i.amount += this.amount;
        duplicated = true;
        break;
      }
    }
    if (!duplicated) {
      this.data.amount = this.amount;
      cartItems.push(this.data);
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
    this.alertToast();
  }

  async alertToast() {
    const toast = await this.toastController.create({
      message: `Add ${this.data.kind} successfully`,
      duration: 1000
    });
    toast.present();
  }

  dismissModal() {
    this.modalController.dismiss(null, 'cancel');
  }
}
