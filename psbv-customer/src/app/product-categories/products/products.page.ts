import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';
import { IPageRequest, ProductGroupsService } from 'src/app/@app-core/http';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infinityScroll: IonInfiniteScroll;

  pageRequest: IPageRequest = {
    page: 1,
    per_page: 6,
    total_objects: 20
  }
  data = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productGroupService: ProductGroupsService
  ) { }

  ngOnInit() {
    const tabs = document.querySelectorAll('ion-tab-bar');
    Object.keys(tabs).map((key) => {
      tabs[key].style.display = 'none';
    });
    this.loadData();
  }

  loadData() {
    setTimeout(() => {
      this.route.queryParams.subscribe((params) => {
        this.productGroupService.getProductGroupDetail(JSON.parse(params['data']))
        .subscribe(data => {
          console.log(data);
          for (let item of data.product_group.products) {
            this.data.push(item);
          }
          console.log(this.data);
  
          this.infinityScroll.complete();
          this.pageRequest.page++;
  
          // check max data
          if (this.data.length >= data.meta.pagination.total_objects) {
            this.infinityScroll.disabled = true;
          }
        });
      });
    }, 500);
  }

  goBack(): void {
    this.router.navigateByUrl('main/product-categories');
    const tabs = document.querySelectorAll('ion-tab-bar');
    Object.keys(tabs).map((key) => {
      tabs[key].style.display = 'flex';
    });
  }

  goToNoti() {

  }

  goToUserInfo() {
    this.router.navigateByUrl('main/home/user-info');
  }

  goToDetail(item) {
    this.router.navigate(['/main/home/product-info'], {
      queryParams: {
        data: JSON.stringify(item.id)
      }
    });
  }
}
