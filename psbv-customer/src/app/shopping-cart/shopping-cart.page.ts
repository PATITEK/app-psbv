import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { GlobalVariablesService } from '../@app-core/global-variables.service';
@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.page.html',
  styleUrls: ['./shopping-cart.page.scss'],
})
export class ShoppingCartPage implements OnInit {
  public showSpinner = false;
  cartItems = [];
  cartItemsSelected = [];
  permission: string;

  constructor(
    private alertCrtl: AlertController,
    private router: Router,
    private globalVariablesService: GlobalVariablesService
  ) { }

  ngOnInit() { }

  ionViewWillEnter() {
    const tabs = document.querySelectorAll('ion-tab-bar');
    Object.keys(tabs).map((key) => {
      tabs[key].style.display = 'flex';
    });

    if (this.hasBackButton()) {
      Object.keys(tabs).map((key) => {
        tabs[key].style.display = 'none';
      });
    }

    this.cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    this.cartItemsSelected = [];
    this.cartItems.forEach(() => this.cartItemsSelected.push({
      selected: false
    }))
  }

  goBack() {
    this.router.navigateByUrl(this.globalVariablesService.backUrlShoppingCart);
  }

  hasBackButton() {
    const backUrl = this.globalVariablesService.backUrlShoppingCart;
    return backUrl.search('main/home/product-info') != -1 || backUrl.search('main/product-categories/products/product-info') != -1;
  }

  calPrice(item) {
    return (item.price + item.accessories.reduce((acc, cur) => acc + cur.price * cur.quantity, 0)) * item.quantity;
  }

  listAccessoriesName(item) {
    return item.accessories.reduce((acc, cur) => {
      return acc + ', ' + cur.name;
    }, '').substring(2);
  }

  decreaseProductQuantity(item) {
    if (item.quantity > 1) {
      item.quantity--;
      this.setLocalStorage();
    }
  }

  increaseProductQuantity(item) {
    if (item.quantity < 999) {
      item.quantity++;
      this.setLocalStorage();
    }
  }

  decreaseAccessoryQuantity(item) {
    if (item.quantity > 0) {
      item.quantity--;
      this.setLocalStorage();
    }
  }

  increaseAccessoryQuantity(item) {
    if (item.quantity < 999) {
      item.quantity++;
      this.setLocalStorage();
    }
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

  calSelectedProducts() {
    let total = 0;
    for (let i = 0; i < this.cartItemsSelected.length; i++) {
      if (this.cartItemsSelected[i].selected) {
        total += this.cartItems[i].quantity;
      }
    }
    return total;
  }

  calSelectedAccessories() {
    let total = 0;
    for (let i = 0; i < this.cartItemsSelected.length; i++) {
      if (this.cartItemsSelected[i].selected) {
        total += this.cartItems[i].accessories.reduce((acc, cur) => {
          return acc + cur.quantity;
        }, 0);
      }
    }
    return total;
  }

  calAccessoriesQuantity(item) {
    return item.accessories.reduce((acc, cur) => {
      return acc + cur.quantity;
    }, 0);
  }

  goToSelectedProducts() {
    let data = {
      selectedItems: []
    }

    this.cartItemsSelected.forEach((a, index) => {
      if (a.selected) {
        const product = {
          name: this.cartItems[index].name,
          id: this.cartItems[index].id,
          quantity: this.cartItems[index].quantity,
          price: this.cartItems[index].price,
          accessories: this.cartItems[index].accessories.filter(a => a.quantity > 0)
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
