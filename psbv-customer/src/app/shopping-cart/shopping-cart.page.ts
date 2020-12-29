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
  cartItems = [];
  cartItemsSelected = [];
  permission: string;
  loadedData = false;

  scrHeight: any;
  scrWidth: any;

  constructor(
    private alertCrtl: AlertController,
    private router: Router,
    private globalVariablesService: GlobalVariablesService
  ) {
    this.getScreenSize();
  }

  ngOnInit() {
    
   }

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

  getScreenSize(event?) {
    this.scrHeight = window.innerHeight;
    this.scrWidth = window.innerWidth;
  }

  goBack() {
    this.router.navigateByUrl(this.globalVariablesService.backUrlShoppingCart);
  }

  hasBackButton() {
    const backUrl = this.globalVariablesService.backUrlShoppingCart;
    return backUrl.search('main/home/product-info') != -1 || backUrl.search('main/product-categories/products/product-info') != -1;
  }

  // calPrice(item) {
  //   return (item.price + item.accessories.reduce((acc, cur) => acc + cur.price * cur.quantity, 0)) * item.quantity;
  // }

  // listAccessoriesName(item) {
  //   return item.accessories.reduce((acc, cur) => {
  //     return acc + ', ' + cur.name;
  //   }, '').substring(2);
  // }

  decreaseAmount(item) {
    if (item.amount > 1) {
      item.amount--;
      this.setLocalStorage();
    }
  }

  increaseAmount(item) {
    if (item.amount < 999) {
      item.amount++;
      this.setLocalStorage();
    }
  }

  setLocalStorage() {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems))
  }

  removeItem(item) {
    for (let i of this.cartItems) {
      if (item.id == i.id) {
        this.cartItems.splice(this.cartItems.indexOf(item), 1);
        this.cartItemsSelected.splice(this.cartItems.indexOf(item), 1);
        this.setLocalStorage();
        break;
      }
    }
  }

  // isEqual(a, b) {
  //   // if length is not equal 
  //   if (a.length != b.length)
  //     return false;
  //   else {
  //     // comapring each element of array 
  //     for (var i = 0; i < a.length; i++) {
  //       if (a[i].id != b[i].id || a[i].quantity != b[i].quantity) {
  //         return false;
  //       }
  //     }
  //     return true;
  //   }
  // }

  async openModalRemove(item) {
    const alert = await this.alertCrtl.create({
      message: 'Delete item from your cart?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.removeItem(item);
            return;
          }
        },
        {
          text: 'No',
          handler: () => {
            return;
          }
        }
      ]
    });
    await alert.present();
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
        total += this.cartItems[i].amount;
      }
    }
    return total;
  }

  // calSelectedAccessories() {
  //   let total = 0;
  //   for (let i = 0; i < this.cartItemsSelected.length; i++) {
  //     if (this.cartItemsSelected[i].selected) {
  //       total += this.cartItems[i].accessories.reduce((acc, cur) => {
  //         return acc + cur.quantity;
  //       }, 0);
  //     }
  //   }
  //   return total;
  // }

  // calAccessoriesQuantity(item) {
  //   return item.accessories.reduce((acc, cur) => {
  //     return acc + cur.quantity;
  //   }, 0);
  // }

  goToSelectedItems() {
    let data = {
      selectedItems: []
    }

    this.cartItemsSelected.forEach((a, index) => {
      if (a.selected) {
        const product = {
          name: this.cartItems[index].name,
          id: this.cartItems[index].id,
          amount: this.cartItems[index].amount,
          price: this.cartItems[index].price,
          // accessories: this.cartItems[index].accessories.filter(a => a.quantity > 0)
        }

        data.selectedItems.push(product);
      }
    })
    this.router.navigate(['/main/shopping-cart/selected-items'], {
      queryParams: {
        data: JSON.stringify(data)
      }
    })
  }

  getIonContentAttribute(footerHeight) {
    return this.cartItems.length == 0 ? {
      height: `calc(100% - 90px)`,
      bottom: 0
    } : {
        height: `calc(100% - 90px - ${footerHeight}px)`,
        bottom: `${footerHeight}px`
      }
  }
}
