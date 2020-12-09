import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.page.html',
  styleUrls: ['./cart-detail.page.scss'],
})
export class CartDetailPage implements OnInit {
  cart = {
    name: 'Cart 1',
    items: []
  }
  urlBack;
  idBack;
  showSpinner = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private alertCrtl: AlertController
  ) {
    this.cart = JSON.parse(localStorage.getItem('cart')) || {
      name: 'Cart 1',
      items: []
    }
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (Object.keys(params).length === 0 && params.constructor === Object) {
        return;
      }
      const data = JSON.parse(params['data']);
      this.urlBack = data.urlBack;
      this.idBack = data.id;
    })
  }

  ionViewWillEnter() {
    const tabs = document.querySelectorAll('ion-tab-bar');
    Object.keys(tabs).map((key) => {
      tabs[key].style.display = 'none';
    });
    this.cart = JSON.parse(localStorage.getItem('cart')) || {
      name: 'Cart 1',
      items: []
    }
  }

  goBack() {
    if (this.urlBack === undefined) {
      this.router.navigateByUrl('main/product-categories');
    } else {
      this.router.navigate([this.urlBack], {
        queryParams: {
          id: JSON.stringify(this.idBack)
        }
      });
    }
  }

  calPrice(item) {
    return (item.price + item.accessories.reduce((acc, cur) => acc + cur.price, 0)) * item.quantity;
  }

  calTotalPrice(items) {
    return items.reduce((acc, cur) => {
      return acc + this.calPrice(cur);
    }, 0)
  }

  listAccessoriesName(item) {
    return item.accessories.reduce((acc, cur) => {
      return acc + ', ' + cur.name;
    }, '').substring(2);
  }

  decreaseQuantity(item) {
    if (item.quantity > 0) {
      item.quantity--;
      this.setLocalStorage();
    }
  }

  increaseQuantity(item) {
    item.quantity++;
    this.setLocalStorage();
  }

  setLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(this.cart))
  }

  removeItem(item) {
    for (let i of this.cart.items) {
      if (item.id == i.id && this.isEqual(item.accessories, i.accessories)) {
        this.cart.items.splice(this.cart.items.indexOf(item), 1);
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
      for (var i = 0; i < a.length; i++)
        if (a[i].id != b[i].id)
          return false;
      return true;
    }
  }

  async presentAlert(text: string, item) {
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
    this.presentAlert('Are you sure to delete this item?', item);
  }
}