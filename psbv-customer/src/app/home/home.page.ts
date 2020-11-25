import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';
import { IPageRequest, ProductsService } from '../@app-core/http';
import { PERMISSION } from './product-info/product-info.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild(IonInfiniteScroll) infinityScroll: IonInfiniteScroll;

  pageRequest: IPageRequest = {
    page: 1,
    per_page: 6,
    total_objects: 20
  }
  data = [];
  permission: PERMISSION = PERMISSION.STANDARD;

  constructor(
    private router: Router,
    private productService: ProductsService
  ) { }

  goToDetail(item) {
    this.router.navigate(['/main/home/product-info'], {
      queryParams: {
        data: JSON.stringify(item.id),
        permission: JSON.stringify(this.permission)
      }
    });
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    setTimeout(() => {
      this.productService.getProducts(this.pageRequest).subscribe(data => {
        for (let item of data.products) {
          this.data.push(item);
        }
        this.infinityScroll.complete();
        this.pageRequest.page++;

        // check max data
        if (this.data.length >= data.meta.pagination.total_objects) {
          this.infinityScroll.disabled = true;
        }

        // cal left per_page
        const temp = data.meta.pagination.total_objects - this.data.length;
        if (temp <= this.pageRequest.per_page) {
          this.pageRequest.per_page = temp;
        }
      })
    }, 500);
  }

  checkGuestPermission(): boolean {
    return this.permission === PERMISSION.GUEST;
  }

  checkStandardPermission(): boolean {
    return this.permission === PERMISSION.STANDARD;
  }
}
