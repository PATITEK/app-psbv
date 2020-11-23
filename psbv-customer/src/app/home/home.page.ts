import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IPageRequest, ProductsService } from '../@app-core/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  data; 
  
  constructor(private router: Router, private productService: ProductsService) { }

  ngOnInit() {
    const page: IPageRequest = {
      page: 1,
      per_page: 11,
      total_objects: 2
    }
    this.productService.getProducts(page).subscribe(data => {
      this.data = data.products;
      console.log(this.data);
    })
  }

  goToDetail() {
    this.router.navigateByUrl('/main/home/product-info')
  }
}
