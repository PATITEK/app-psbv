import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private pageNotiService: PageNotiService
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

  sendMailQuote() {
    const data: IDataNoti = {
      title: 'SEND A EMAIL QUOTE',
      description: '',
      routerLink: 'main/shopping-cart'
    }
    this.pageNotiService.setdataStatusNoti(data);
    this.router.navigate(['/statusNoti']);
  }
}
