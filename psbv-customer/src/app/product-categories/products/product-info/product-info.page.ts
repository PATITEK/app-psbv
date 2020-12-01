import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';
import { AccessoriesService, IPageRequest, ProductsService } from 'src/app/@app-core/http';
import { LoadingService } from 'src/app/@app-core/loading.service';

export enum PERMISSION {
  GUEST,
  STANDARD,
  PREMIUM
};

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.page.html',
  styleUrls: ['./product-info.page.scss'],
})

export class ProductInfoPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infinityScroll: IonInfiniteScroll;

  pageRequest: IPageRequest = {
    page: 1,
    per_page: 6,
    total_objects: 20
  }
  counter: number = 0;
  permission: PERMISSION = PERMISSION.GUEST;
  accessories = [];
  product = {
    id: '',
    name: ' ',
    description: ' ',
    thumb_image: {
      url: ''
    }
  }
  accessoryIds = [];
  products = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductsService,
    private loading: LoadingService,
    private accessoriesService: AccessoriesService
  ) { }
  
  ngOnInit() {
    this.loading.present();
    this.route.queryParams.subscribe(params => {
      if (params.permission !== undefined) {
        this.permission = JSON.parse(params['permission']);
      }
      if (params.id !== undefined) {
        this.productService.getProductDetail(JSON.parse(params['id']))
        .subscribe(data => {
          this.product = data.product;
        });
      }
    })
    this.loadData();
  }

  ionViewWillEnter() {
    const tabs = document.querySelectorAll('ion-tab-bar');
    Object.keys(tabs).map((key) => {
      tabs[key].style.display = 'none';
    });
  }

  goBack(): void {
    this.productService.getProductDetail(this.product.id)
      .subscribe(data => {
        this.router.navigate(['main/product-categories/products'], {
          queryParams: {
            id: JSON.stringify(data.product.product_group_id)
          }
        })
      })
    const tabs = document.querySelectorAll('ion-tab-bar');
    Object.keys(tabs).map((key) => {
      tabs[key].style.display = 'none';
    });
  }


  goToDetail(): void {
    if (this.checkGuestPermission()) {
      this.router.navigateByUrl('/auth/login');
    } else {
      this.router.navigate(['main/product-categories/products/product-info/product-detail'], {
        queryParams: {
          id: JSON.stringify(this.product.id),
          permission: JSON.stringify(this.permission)
        }
      });
    }
  }

  goToCart(): void {
    const data = {
      checkBack: true,
      urlBack: 'main/product-categories/products/product-info',
      id: this.product.id
    }
    this.router.navigate(['main/shopping-cart'], {
      queryParams: {
        data: JSON.stringify(data),
        products: JSON.stringify(this.products)
      }
    });
  }

  getItem(accessory): any {
    for (let i of this.accessoryIds) {
      if (i.id == accessory.id) {
        return i.added ?
          {
            background: '#494949',
            color: 'white',
            iconName: 'remove-outline'
          }
          :
          {
            background: '#eaeaea',
            color: '#636363',
            iconName: 'add-outline'
          }
      }
    }
  }

  toggleItem(accessory): void {
    if (this.permission !== PERMISSION.GUEST) {
      for (let i of this.accessoryIds) {
        if (i.id == accessory.id) {
          i.added = !i.added;
          break;
        }
      }
    }
  }

  selectAllItem(): void {
    this.accessoryIds.forEach(accessory => accessory.added = true);
  }

  addProduct(): void {
    // add product to cart
    // add product to cart
    this.products.push({
      productId: this.product.id,
      accessoryIds: this.accessoryIds.reduce((acc, cur) => {
        if (cur.added) {
          acc.push(cur.id);
        }
        return acc;
      }, [])
    })

    // reset selected item
    this.accessoryIds.forEach(accessory => accessory.added = false);

    // inc counter
    this.counter++;
  }

  checkGuestPermission(): boolean {
    return this.permission == PERMISSION.GUEST;
  }

  loadData() {
    setTimeout(() => {
      this.accessoriesService.getAccessories(this.pageRequest).subscribe(data => {
        for (let item of data.accessories) {
          this.accessories.push(item);
          this.accessoryIds.push({
            id: item.id,
            added: false
          })
        }

        this.infinityScroll.complete();
        this.loading.dismiss();
        this.pageRequest.page++;

        // check max data
        if (this.accessories.length >= data.meta.pagination.total_objects) {
          this.infinityScroll.disabled = true;
        }
      })
    }, 50);
  }
}
