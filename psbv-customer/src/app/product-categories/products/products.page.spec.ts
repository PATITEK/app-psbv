import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-app-products',
  templateUrl: './app-products.page.html',
  styleUrls: ['./app-products.page.scss'],
})
export class ProductsPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  gotodetail(){
    this.router.navigateByUrl('main/app-products/products');
  }
}
