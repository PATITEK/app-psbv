import { Route } from '@angular/compiler/src/core';
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  @ViewChild(IonContent) ionContent: IonContent;

  constructor(private router:Router) { }

  ngOnInit() {

  }
  gotoShoppingCart () {
    this.router.navigateByUrl('main/shopping-cart');
  }
}
