import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ProductsService } from 'src/app/@app-core/http';
import { LoadingService } from 'src/app/@app-core/loading.service';

export interface IAccessory {
  src: string;
  name: string;
  desc: string;
  isAdded: boolean;
}

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
 

  product = {
    id: '',
    name: ' ',
    description: ' ',
    thumb_image: {
      url: ''
    }
  }
  counter: number = 0;
  permission: PERMISSION;

  accessories: IAccessory[] = [
    {
      src: 'http://lorempixel.com/g/100/100/abstract',
      name: 'Accessory 1',
      desc: 'Info 1 Info 1 Info 1 Info 1',
      isAdded: false
    },
    {
      src: 'http://lorempixel.com/g/100/100/abstract',
      name: 'Accessory 2',
      desc: 'Info 2 Info 2 Info 2 Info 2 Info 2 Info 2 Info 2 Info 2',
      isAdded: false
    },
    {
      src: 'http://lorempixel.com/g/100/100/abstract',
      name: 'Accessory 3',
      desc: 'Info 3 Info 3 Info 3 Info 3',
      isAdded: false
    },
    {
      src: 'http://lorempixel.com/g/100/100/abstract',
      name: 'Accessory 3',
      desc: 'Info 3 Info 3 Info 3 Info 3',
      isAdded: false
    }
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toastController: ToastController,
    private productService: ProductsService,
    private loading: LoadingService
  ) { }

  ngOnInit() {
    const tabs = document.querySelectorAll('ion-tab-bar');
    Object.keys(tabs).map((key) => {
      tabs[key].style.display = 'none';
    });
    this.loading.present();

    this.route.queryParams.subscribe(params => {
      this.permission = params['permission'];
      this.productService.getProductDetail(JSON.parse(params['id']))
        .subscribe(data => {
          this.product = data.product;
          this.loading.dismiss();
        });
    })
  }

  goBack(): void {
    this.router.navigateByUrl('/main/home');
    const tabs = document.querySelectorAll('ion-tab-bar');
    Object.keys(tabs).map((key) => {
      tabs[key].style.display = 'flex';
    });
  }

  goToDetail(): void {
    if (this.checkGuestPermission()) {
      this.router.navigateByUrl('/auth/login');
    } else {
      this.router.navigate(['/main/home/product-info/product-detail'], {
        queryParams: {
          data: JSON.stringify(this.product.id),
          permission: JSON.stringify(this.permission)
        }
      });
    }
  }

  goToCart(): void {
    const data = {
      checkBack: true
    }
    this.router.navigate(['main/shopping-cart'], {
      queryParams: {
        data: JSON.stringify(data)
      }
    });
  }

  getItem(accessory: IAccessory): any {
    return accessory.isAdded ?
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

  toggleItem(accessory: IAccessory): void {
    if (this.permission !== PERMISSION.GUEST) {
      accessory.isAdded = !accessory.isAdded;
    }
  }

  selectAllItem(): void {
    this.accessories.forEach(accessory => accessory.isAdded = true);
  }

  addProduct(): void {
    // add product to cart

    // reset selected item
    this.accessories.forEach(accessory => accessory.isAdded = false);

    // inc counter
    this.counter++;
  }

  checkGuestPermission(): boolean {
    return this.permission === PERMISSION.GUEST;
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Added product',
      duration: 1000,
      position: 'top',
    });
    toast.present();

    this.addProduct();
  }
}
