import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, IonInfiniteScroll } from '@ionic/angular';
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
  @ViewChild(IonContent) ionContent: IonContent;

  pageRequest: IPageRequest;
  data = [];
  permission: string;
  val = '';
  counter = 0;
  inputValue: string = '';
  isMaxData = false;

  constructor(
    private router: Router,
    private productService: ProductsService,
    private loading: LoadingService,
    private storageService: StorageService
  ) {
    this.reset();
  }

  ngOnInit() {
    this.loading.present();
    this.loadData();
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
    this.inputValue = event.target.value;
    this.reset();
    this.scrollContent();
    this.counter++;
    this.loadData();
  }

  loadData() {
    if (!this.isMaxData) {
      setTimeout(() => {
        if (this.inputValue !== '') {
          const counterTemp = this.counter;
          this.productService.searchProduct(this.pageRequest, this.inputValue, counterTemp).subscribe((data: any) => {
            if (counterTemp == this.counter) {
              for (let item of data.products) {
                // image not found
                if (item.thumb_image === null) {
                  const d = {
                    url: "https://i.imgur.com/dbpoag5.png"
                  }
                  item.thumb_image = d;
                }
                this.data.push(item);
              }

              this.infinityScroll.complete();
              this.loading.dismiss();
              this.pageRequest.page++;

              // check max data
              if (this.data.length >= data.meta.pagination.total_objects) {
                // this.infinityScroll.disabled = true;
                this.isMaxData = true;
              }
            }
          })
        } else {
          this.productService.getProducts(this.pageRequest).subscribe(data => {
            for (let item of data.products) {
              // image not found
              if (item.thumb_image === null) {
                const d = {
                  url: "https://i.imgur.com/dbpoag5.png"
                }
                item.thumb_image = d;
              }
              this.data.push(item);
            }

            this.infinityScroll.complete();
            this.loading.dismiss();
            this.pageRequest.page++;

            // check max data
            if (this.data.length >= data.meta.pagination.total_objects) {
              // this.infinityScroll.disabled = true;
              this.isMaxData = true;
            }
          })
        }
      }, 50);
    } else {
      this.infinityScroll.complete();
    }
  }

  checkGuestPermission(): boolean {
    return this.permission === PERMISSIONS[0].value;
  }

  reset() {
    this.pageRequest = {
      page: 1,
      per_page: 10,
      total_objects: 20
    }
    this.data = [];
    this.isMaxData = false;
  }

  scrollContent() {
    this.ionContent.scrollToTop(500);
  }
}
