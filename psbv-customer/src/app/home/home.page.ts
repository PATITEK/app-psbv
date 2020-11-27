import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';
import { AuthService, IPageRequest, ProductsService } from '../@app-core/http';
import { LoadingService } from '../@app-core/loading.service';
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
    per_page: 10,
    total_objects: 20
  }
  data = [];
  permission: PERMISSION = PERMISSION.STANDARD;
  isLoading = false;


  constructor(
    private router: Router,
    private productService: ProductsService,
    private loading: LoadingService,
    private auth: AuthService
  ) { }

  goToDetail(item) {
    this.router.navigate(['/main/home/product-info'], {
      queryParams: {
        id: JSON.stringify(item.id),
        permission: JSON.stringify(this.permission)
      }
    });
  }

  ngOnInit() {
    this.loading.present();
    this.loadData();
  }

  loadData() {
    setTimeout(() => {
      this.productService.getProducts(this.pageRequest).subscribe(data => {
        for (let item of data.products) {
          this.data.push(item);
        }
        this.infinityScroll.complete();
        this.loading.dismiss();
        this.pageRequest.page++;

        // check max data
        if (this.data.length >= data.meta.pagination.total_objects) {
          this.infinityScroll.disabled = true;
        }
      })
    }, 50);
  }

  checkGuestPermission(): boolean {
    return this.permission == PERMISSION.GUEST;
  }

  checkStandardPermission(): boolean {
    return this.permission == PERMISSION.STANDARD;
  }
}
