import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';
import { GlobalVariablesService } from 'src/app/@app-core/global-variables.service';
import { AccessoriesService, IPageRequest, PERMISSIONS, ProductsService } from 'src/app/@app-core/http';
import { LoadingService } from 'src/app/@app-core/loading.service';
import { StorageService } from 'src/app/@app-core/storage.service';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.page.html',
  styleUrls: ['./product-info.page.scss'],
})

export class ProductInfoPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infinityScroll: IonInfiniteScroll;

  scrHeight: any;
  scrWidth: any;

  pageRequest: IPageRequest = {
    page: 1,
    per_page: 6,
    total_objects: 20
  }
  // counter: number = 0;
  permission: string;
  accessories = [];
  product = {
    id: '',
    name: ' ',
    description: ' ',
    short_description: ' ',
    thumb_image: {
      url: ''
    },
    price: 0
  }
  accessoryIds = [];
  products = [];
  cartItemsLength = 0;
  loadedProduct = false;
  loadedAccessories = false;
  added = JSON.parse(localStorage.getItem('added')) || false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductsService,
    private loading: LoadingService,
    private accessoriesService: AccessoriesService,
    private storageService: StorageService,
    private globalVariablesService: GlobalVariablesService
  ) {
    const arr = JSON.parse(localStorage.getItem('cartItems')) || [];
    this.cartItemsLength = arr.length;
    this.getScreenSize();
  }

  ngOnInit() {
    this.storageService.infoAccount.subscribe((data) => {
      this.permission = (data !== null) ? data.role : PERMISSIONS[0].value;
    })
    this.loading.present();
    this.loadData();
  }

  ionViewWillEnter() {
    this.added = JSON.parse(localStorage.getItem('added')) || false;
    const arr = JSON.parse(localStorage.getItem('cartItems')) || [];
    this.cartItemsLength = arr.length;

    const tabs = document.querySelectorAll('ion-tab-bar');
    Object.keys(tabs).map((key) => {
      tabs[key].style.display = 'none';
    });
  }

  ngOnDestroy() {
    localStorage.removeItem('added');
  }

  getScreenSize(event?) {
    this.scrHeight = window.innerHeight;
    this.scrWidth = window.innerWidth;
  }

  goToDetail(): void {
    if (this.checkGuestPermission()) {
      this.router.navigateByUrl('/auth/login');
    } else {
      const data = {
        id: this.product.id,
        added: this.added
      }
      this.router.navigate(['/main/home/product-info/product-detail'], {
        queryParams: {
          data: JSON.stringify(data)
        }
      });
    }
  }

  goToCart(): void {
    this.globalVariablesService.backUrlShoppingCart = this.router.url;
    this.router.navigateByUrl('main/shopping-cart');
  }

  getItem(accessory): any {
    return accessory.quantity > 0 ?
      {
        background: '#494949',
        color: 'white'
      }
      :
      {
        background: '#eaeaea',
        color: '#636363'
      }
  }

  selectAllItem(): void {
    this.accessoryIds.forEach(accessory => {
      if (accessory.quantity == 0) {
        accessory.quantity++;
      }
    });
  }

  addProduct(): void {
    // add product to cart
    // const product = {
    //   id: this.product.id,
    //   name: this.product.name,
    //   quantity: 1, // default = 1
    //   price: this.product.price,
    //   accessories: this.accessoryIds.reduce((acc, cur) => {
    //     if (cur.quantity > 0) {
    //       let name;
    //       for (let i of this.accessories) {
    //         if (cur.id == i.id) {
    //           name = i.name;
    //           break;
    //         }
    //       }
    //       acc.push({
    //         id: cur.id,
    //         name: name,
    //         quantity: cur.quantity,
    //         price: cur.price
    //       });
    //     }
    //     return acc;
    //   }, [])
    // }

    // let duplicate = false;
    // for (let j of this.cartItems) {
    //   if (product.id == j.id && this.isEqual(product.accessories, j.accessories)) {
    //     j.quantity++;
    //     duplicate = true;
    //     break;
    //   }
    // }
    // if (!duplicate) {
    //   this.cartItems.push(product);
    // }

    // // update data
    // this.setLocalStorage();

    // // reset selected item
    // this.accessoryIds.forEach(accessory => accessory.quantity = 0);

    const data = {
      id: this.product.id,
      added: this.added,
      doesOpenModal: true
    }
    this.router.navigate(['/main/home/product-info/product-detail'], {
      queryParams: {
        data: JSON.stringify(data)
      }
    });
  }

  addAccessory(accessory) {
    const data = {
      id: accessory.id,
      added: this.added
    }
    this.router.navigate(['/main/home/product-info/accessory'], {
      queryParams: {
        data: JSON.stringify(data)
      }
    });
  }

  checkGuestPermission(): boolean {
    return this.permission == PERMISSIONS[0].value;
  }

  loadData() {
    this.route.queryParams.subscribe(params => {
      if (params.data !== undefined && !this.loadedProduct) {
        this.productService.getProductDetail(JSON.parse(params['data']).id)
          .subscribe(data => {
            this.product = data.product;
            this.loadedProduct = true;
            if (this.loadedProduct && this.loadedAccessories) {
              this.loading.dismiss();
            }
          });

        this.accessoriesService.getAccessoriesWithProductId(this.pageRequest, JSON.parse(params['data']).id).subscribe(data => {
          for (let item of data.accessories) {
            this.accessories.push(item);
            this.accessoryIds.push({
              id: item.id,
              quantity: 0,
              price: item.price
            })
          }

          this.loadedAccessories = true;
          if (this.loadedProduct && this.loadedAccessories) {
            this.loading.dismiss();
          }
          this.pageRequest.page++;

          // check max data
          if (this.accessories.length >= data.meta.pagination.total_objects) {
            this.infinityScroll.disabled = true;
          }
        })
      }
    })
  }

  loadMoreAccessories() {
    this.accessoriesService.getAccessoriesWithProductId(this.pageRequest, this.product.id).subscribe(data => {
      for (let item of data.accessories) {
        this.accessories.push(item);
        this.accessoryIds.push({
          id: item.id,
          quantity: 0,
          price: item.price
        })
      }

      this.infinityScroll.complete();
      this.pageRequest.page++;

      // check max data
      if (this.accessories.length >= data.meta.pagination.total_objects) {
        this.infinityScroll.disabled = true;
      }
    })
  }

  isEqual(a, b) {
    // if length is not equal 
    if (a.length != b.length)
      return false;
    else {
      // comapring each element of array 
      for (var i = 0; i < a.length; i++) {
        if (a[i].id != b[i].id || a[i].quantity != b[i].quantity) {
          return false;
        }
      }
      return true;
    }
  }

  // setLocalStorage() {
  //   localStorage.setItem('cartItems', JSON.stringify(this.cartItems))
  // }

  // decreaseQuantity(accessory) {
  //   if (accessory.quantity > 0) {
  //     accessory.quantity--;
  //   }
  // }

  // increaseQuantity(accessory) {
  //   accessory.quantity++;
  // }
}
