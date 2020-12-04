import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';
import { AccessoriesService, IPageRequest, ProductsService } from 'src/app/@app-core/http';
import { LoadingService } from 'src/app/@app-core/loading.service';
import { StorageService } from 'src/app/@app-core/storage.service';

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
  permission: PERMISSION = PERMISSION.GUEST;
  accessories = [];
  permiss: string;
  product = {
    id: '',
    name: ' ',
    description: ' ',
    thumb_image: {
      url: ''
    },
    price: 0
  }
  accessoryIds = [];
  products = [];
  cart = {
    name: 'Cart 1',
    items: []
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductsService,
    private loading: LoadingService,
    private accessoriesService: AccessoriesService,
    private storageService: StorageService
  ) {
    this.cart = JSON.parse(localStorage.getItem('cart')) || {
      name: 'Cart 1',
      items: []
    }
  }
  
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
    this.storageService.infoAccount.subscribe((data) => {
      this.permiss = data.role;
    })
  
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
    this.router.navigate(['main/cart-detail'], {
      queryParams: {
        data: JSON.stringify(data)
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
    const product = {
      id: this.product.id,
      name: this.product.name,
      quantity: 1, // default = 1
      price: this.product.price,
      accessories: this.accessoryIds.reduce((acc, cur) => {
        if (cur.added) {
          let name;
          for (let i of this.accessories) {
            if (cur.id == i.id) {
              name = i.name;
              break;
            }
          }
          acc.push({
            id: cur.id,
            name: name,
            quantity: 1, // default = 1,
            price: 100 // default = 100
          });
        }
        return acc;
      }, [])
    }

    let duplicate = false;
    for (let j of this.cart.items) {
      if (product.id == j.id && this.isEqual(product.accessories, j.accessories)) {
        j.quantity++;
        duplicate = true;
        break;
      }
    }
    if (!duplicate) {
      this.cart.items.push(product);
    }

    // update data
    this.setLocalStorage();

    // reset selected item
    this.accessoryIds.forEach(accessory => accessory.added = false);
  }

  checkGuestPermission(): boolean {
    
    return this.permiss === 'guest'
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

  isEqual(a, b) {
    // if length is not equal 
    if (a.length != b.length)
      return false;
    else {
      // comapring each element of array 
      for (var i = 0; i < a.length; i++)
        if (a[i].id != b[i].id)
          return false;
      return true;
    }
  }

  setLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(this.cart))
  }

  calTotalItems() {
    return this.cart.items.reduce((acc, cur) => acc + cur.quantity, 0);
  }
}
