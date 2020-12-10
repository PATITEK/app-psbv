import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersService } from 'src/app/@app-core/http/orders';
import { IDataNoti, PageNotiService } from 'src/app/@modular/page-noti/page-noti.service';

@Component({
  selector: 'app-selected-products',
  templateUrl: './selected-products.page.html',
  styleUrls: ['./selected-products.page.scss'],
})
export class SelectedProductsPage implements OnInit {

  cartItems: any = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pageNotiService: PageNotiService,
    private ordersService: OrdersService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.cartItems = JSON.parse(params['data']).selectedItems;
    })
  }

  ionViewWillEnter() {
    const tabs = document.querySelectorAll('ion-tab-bar');
    Object.keys(tabs).map((key) => {
      tabs[key].style.display = 'none';
    });
  }

  goBack() {
    this.router.navigateByUrl('/main/shopping-cart');
  }

  calPrice(item) {
    return (item.price + item.accessories.reduce((acc, cur) => acc + cur.price * cur.quantity, 0)) * item.quantity;
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

  calTotalProducts() {
    return this.cartItems.reduce((acc, cur) => {
      return acc + cur.quantity;
    }, 0)
  }

  sendMailQuote() {
    const data: IDataNoti = {
      title: 'SEND A EMAIL QUOTE',
      description: '',
      routerLink: 'main/shopping-cart'
    }
    this.pageNotiService.setdataStatusNoti(data);
    this.router.navigate(['/statusNoti']);

    let orderList: any = [];
    this.cartItems.forEach(cartItem => {
      const productIndex = this.checkExistedItem('Product', cartItem.id, orderList);
      if (productIndex != -1) {
        orderList[productIndex].amount += cartItem.quantity;
      } else {
        orderList.push({
          amount: cartItem.quantity,
          yieldable_type: "Product",
          yieldable_id: cartItem.id
        })
      }

      cartItem.accessories.forEach(accessory => {
        const accessoryIndex = this.checkExistedItem('Accessory', accessory.id, orderList);
        if (accessoryIndex != -1) {
          orderList[accessoryIndex].amount += accessory.quantity * cartItem.quantity;
        } else {
          orderList.push({
            amount: accessory.quantity * cartItem.quantity,
            yieldable_type: "Accessory",
            yieldable_id: accessory.id
          })
        }
      })
    });

    const orders = {
      "order": {
        "order_details_attributes": orderList
      }
    }
    this.ordersService.createOrder(orders).subscribe();
  }

  checkExistedItem(type, id, orderList) {
    for (let i = 0; i < orderList.length; i++) {
      if (orderList[i].yieldable_type == type && id == orderList[i].yieldable_id) {
        return i;
      }
    }
    return -1;
  }
}
