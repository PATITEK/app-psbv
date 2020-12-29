import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { IonInfiniteScroll, Platform } from '@ionic/angular';
import { GlobalVariablesService } from 'src/app/@app-core/global-variables.service';
import { IPageRequest, PERMISSIONS, ProductGroupsService } from 'src/app/@app-core/http';
import { LoadingService } from 'src/app/@app-core/loading.service';
import { StorageService } from 'src/app/@app-core/storage.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infinityScroll: IonInfiniteScroll;

  scrHeight: any;
  scrWidth: any;

  pageRequest: IPageRequest = {
    page: 1,
    per_page: 10,
    total_objects: 20
  }
  data = [];
  permission: string;
  title = '';
  id = '';

  loadedData = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productGroupService: ProductGroupsService,
    private loading: LoadingService,
    private storageService: StorageService,
    private platform: Platform,
    private globalVariablesService: GlobalVariablesService

  ) {
    this.getScreenSize();
    console.log('hihi');
   }

  ngOnInit() {
   
    this.platform.backButton.subscribe((event) => {
      console.log('hello');
     
    }) 
    this.platform.backButton.subscribeWithPriority(9999, () => {
      console.log('hello');

      document.addEventListener('backbutton', function (event) {
        console.log('hello');

        event.preventDefault();
        event.stopPropagation();
      }, false);
    
    
  })
   
    this.loading.present();
    this.loadData();
    this.storageService.infoAccount.subscribe((data) => {
      this.permission = (data !== null) ? data.role : PERMISSIONS[0].value;
    })

    this.route.queryParams.subscribe(params => {
      if (params.data !== undefined) {
        this.title = JSON.parse(params['data']).title;
        this.id = JSON.parse(params['data']).id;
      }
    })
  }

  ionViewWillEnter() {
    const tabs = document.querySelectorAll('ion-tab-bar');
    Object.keys(tabs).map((key) => {
      tabs[key].style.display = 'none';
    });
  }

  getScreenSize(event?) {
    this.scrHeight = window.innerHeight;
    this.scrWidth = window.innerWidth;
  }

  loadData() {
    setTimeout(() => {
      if (this.id != '') {
        this.productGroupService.getProductGroupDetail(this.id, this.pageRequest)
          .subscribe(data => {
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

            this.loadedData = true;

            this.infinityScroll.complete();
            this.loading.dismiss();
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
      }
    }, 50)
  }

  checkGuestPermission(): boolean {
    return this.permission === PERMISSIONS[0].value;
  }

  checkStandardPermission(): boolean {
    return this.permission == PERMISSIONS[1].value;
  }

  goToNoti() {
    this.router.navigateByUrl('notification');
  }

  goToUserInfo() {
    this.router.navigateByUrl('account/user-info');
  }

  goToDetail(item) {
    this.setCartLocalStorage(item);

    const data = {
      id: item.id,
      categoryId: this.id,
      categoryTitle: this.title
    }
    this.router.navigate(['main/product-categories/products/product-info'], {
      queryParams: {
        data: JSON.stringify(data)
      }
    });
  }

  setCartLocalStorage(item) {
    let dataSeenProducts = JSON.parse(localStorage.getItem('seenProducts')) || [];

    const product = {
      id: item.id,
      name: item.name,
      thumb_image: item.thumb_image,
      price: item.price
    }

    for (let i = 0, n = dataSeenProducts.length; i < n; i++) {
      if (item.id == dataSeenProducts[i].id) {
        dataSeenProducts.splice(i, 1);
        break;
      }
    }
    dataSeenProducts.unshift(product);

    localStorage.setItem('seenProducts', JSON.stringify(dataSeenProducts));
  }
}
