import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';
import { IPageRequest, PERMISSIONS, ProductsService } from '../@app-core/http';
import { LoadingService } from '../@app-core/loading.service';
import { StorageService } from '../@app-core/storage.service';

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
  permission: string;
  val = '';

  constructor(
    private router: Router,
    private productService: ProductsService,
    private loading: LoadingService,
    private storageService: StorageService
  ) { }

  ngOnInit() {
    this.loadData();
    this.loading.present();
    this.storageService.infoAccount.subscribe((data) => {
      this.permission = (data !== null) ? data.role : PERMISSIONS[0].value;
    })
  }

  ionViewWillEnter() {
    const tabs = document.querySelectorAll('ion-tab-bar');
    Object.keys(tabs).map((key) => {
      tabs[key].style.display = 'flex';
    });
  }
  
  goToDetail(item) {
    const data = {
      id: item.id
    }

    this.router.navigate(['/main/home/product-info'], {
      queryParams: {
        data: JSON.stringify(data)
      }
    });
  }

  onGoUserInfo() {
    this.router.navigateByUrl("/account/user-info");
  }

  gotoNoti() {
    this.router.navigateByUrl('notification');
  }

  gotoHome() {
    this.router.navigateByUrl('/main/product-categories');
  }

  onInput(event: any) {
    const val = event.target.value;
    console.log(this.val.valueOf());
    this.productService.searchProduct(val).subscribe((data: any) => {
      this.data = data.products;
    })
  }

  loadData() {
    setTimeout(() => {
      this.productService.getProducts(this.pageRequest).subscribe(data => {
        for (let item of data.products) {
          this.data.push(item);
        }

        //image not found
        for (let i = 0; i < this.data.length; i++) {
          if (this.data[i].thumb_image === null) {
            const data = {
              url: "https://i.imgur.com/dbpoag5.png"
            }
            this.data[i].thumb_image = data;
          }
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
    return this.permission === PERMISSIONS[0].value;
  }
}
