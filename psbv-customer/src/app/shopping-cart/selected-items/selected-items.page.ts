import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-selected-items',
  templateUrl: './selected-items.page.html',
  styleUrls: ['./selected-items.page.scss'],
})
export class SelectedItemsPage implements OnInit {
  items = [];

  constructor(
    private route: ActivatedRoute
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

  }

  calTotalPrice() {
    return this.items.reduce((acc, cur) => acc + cur.price * cur.amount, 0);
  }

  calTotalItem() {
    return this.items.reduce((acc, cur) => acc + cur.amount, 0);
  }

}
