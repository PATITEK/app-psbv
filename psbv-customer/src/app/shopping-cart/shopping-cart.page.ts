import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.page.html',
  styleUrls: ['./shopping-cart.page.scss'],
})
export class ShoppingCartPage implements OnInit {
  public showSpinner = false;
  cartItems = [];
  cartItemsSelected = [];

  constructor(
    private alertCrtl: AlertController,
    private router: Router
  ) { }

  ngOnInit() {}

  ionViewWillEnter() {
    const tabs = document.querySelectorAll('ion-tab-bar');
    Object.keys(tabs).map((key) => {
      tabs[key].style.display = 'flex';
    });

    this.cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    this.cartItemsSelected = [];
    this.cartItems.forEach(() => this.cartItemsSelected.push({
      selected: false
    }))
  }

  calPrice(item) {
    return (item.price + item.accessories.reduce((acc, cur) => acc + cur.price, 0)) * item.quantity;
  }

  listAccessoriesName(item) {
    return item.accessories.reduce((acc, cur) => {
      return acc + ', ' + cur.name;
    }, '').substring(2);
  }

  decreaseQuantity(item) {
    if (item.quantity > 1) {
      item.quantity--;
      this.setLocalStorage();
    }
  }

  increaseQuantity(item) {
    item.quantity++;
    this.setLocalStorage();
  }

  setLocalStorage() {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems))
  }

  removeItem(item) {
    for (let i of this.cartItems) {
      if (item.id == i.id && this.isEqual(item.accessories, i.accessories)) {
        this.cartItems.splice(this.cartItems.indexOf(item), 1);
        this.cartItemsSelected.splice(this.cartItems.indexOf(item), 1);
        this.setLocalStorage();
        break;
      }
    }
  }

  isEqual(a, b) {
    // if length is not equal 
    if (a.length != b.length)
      return false;
    else {
      // comapring each element of array 
      for (var i = 0; i < a.length; i++) {
        if (a[i].id != b[i].id || a[i].quantity != b[i].quantity) {
          return false;
        }
      }
      return true;
    }
  }

  async presentAlert(item) {
    const alert = await this.alertCrtl.create({
      message: 'Delete item from your cart?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            return;
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.removeItem(item);
            return;
          }
        },
      ]
    });
    await alert.present();
  }

  async onRemove(item) {
    this.showSpinner = true;
    this.presentAlert(item);
  }

  toggleSelected(item) {
    item.selected = !item.selected;
  }

  checkAllSelected() {
    return this.cartItemsSelected.every(a => a.selected);
  }

  checkAllNotSelected() {
    return this.cartItemsSelected.every(a => !a.selected);
  }

  toggleSelectAll() {
    if (this.checkAllSelected()) {
      this.cartItemsSelected.forEach(a => a.selected = false);
    } else {
      this.cartItemsSelected.forEach(a => a.selected = true);
    }
  }

  goToSelectedProducts() {
    let data = {
      selectedItems: []
    }

    this.cartItemsSelected.forEach((a, index) => {
      if (a.selected) {
        const product = {
          name: this.cartItems[index].name,
          quantity: this.cartItems[index].quantity,
          price: this.cartItems[index].price,
          accessories: this.cartItems[index].accessories
        }

        data.selectedItems.push(product);
      }
    })
    this.router.navigate(['/main/shopping-cart/selected-products'], {
      queryParams: {
        data: JSON.stringify(data)
      }
    })
  }
}
