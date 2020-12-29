import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersService } from 'src/app/@app-core/http';
import { IDataNoti, PageNotiService } from 'src/app/@modular/page-noti/page-noti.service';

@Component({
  selector: 'app-selected-items',
  templateUrl: './selected-items.page.html',
  styleUrls: ['./selected-items.page.scss'],
})
export class SelectedItemsPage implements OnInit {
  items = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pageNotiService: PageNotiService,
    private order: OrdersService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.items = JSON.parse(params['data']).selectedItems;
    })
  }

  ionViewWillEnter() {
    const tabs = document.querySelectorAll('ion-tab-bar');
    Object.keys(tabs).map((key) => {
      tabs[key].style.display = 'none';
    });
  }

  sendMailQuote() {
    const data: IDataNoti = {
      title: 'SEND A EMAIL QUOTE',
      description: '',
      routerLink: 'main/shopping-cart'
    }
    // this.order.createOrder().subscribe((data:any) => {

    //   this.pageNotiService.setdataStatusNoti(data);
    //   this.router.navigate(['/statusNoti']);

    // }
  }

  calTotalPrice() {
    return this.items.reduce((acc, cur) => acc + cur.price * cur.amount, 0);
  }

  calTotalProducts() {
    return this.items.reduce((acc, cur) => cur.kind == 'product' ? acc + cur.amount : acc, 0);
  }

  calTotalAccessories() {
    return this.items.reduce((acc, cur) => cur.kind == 'accessory' ? acc + cur.amount : acc, 0);
  }
}
