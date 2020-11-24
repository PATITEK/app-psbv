import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';
import { IPageRequest, ProductGroupsService } from '../@app-core/http';


@Component({
  selector: 'app-product-categories',
  templateUrl: './product-categories.page.html',
  styleUrls: ['./product-categories.page.scss'],
})
export class ProductCategoriesPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infinityScroll: IonInfiniteScroll;

  data = [];
  
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
    this.loadData();
  }

  loadData() {
    setTimeout(() => {
      this.productGroupService.getProductGroups(this.pageRequest).subscribe(data => {
        for (let item of data.product_groups) {
          this.data.push(item);
        }
        this.infinityScroll.complete();
        this.pageRequest.page++;

        // check max data
        if (this.data.length >= data.meta.pagination.total_objects) {
          this.infinityScroll.disabled = true;
        }
      })
    }, 500);
  }

  goToDetail(item) {
    this.router.navigate(['main/product-categories/products'], {
      queryParams: {
        data: JSON.stringify(item.id)
      }
    })
  }
}
