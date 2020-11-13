import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-product-categories',
  templateUrl: './product-categories.page.html',
  styleUrls: ['./product-categories.page.scss'],
})
export class ProductCategoriesPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  gotodetail(){
    this.router.navigateByUrl('main/product-categories/products');
  }
}
