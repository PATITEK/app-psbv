import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IPageRequest, ProductGroupsService } from '../@app-core/http';


@Component({
  selector: 'app-product-categories',
  templateUrl: './product-categories.page.html',
  styleUrls: ['./product-categories.page.scss'],
})
export class ProductCategoriesPage implements OnInit {
  data: [];
  
  pageRequest: IPageRequest = {
    page: 1,
    per_page: 12,
    total_objects: 1
  }

  constructor(
    private router: Router,
    private productGroupService: ProductGroupsService
  ) { }

  ngOnInit() {
    this.productGroupService.getProductGroups(this.pageRequest)
      .subscribe(data => {
        this.data = data.product_groups;
        console.log(this.data);
      })
  }

  goToDetail(item) {
    this.router.navigate(['main/product-categories/products'], {
      queryParams: {
        data: JSON.stringify(item.id)
      }
    })
  }
}
