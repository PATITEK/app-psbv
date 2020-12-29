import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonContent, IonInfiniteScroll, Platform } from '@ionic/angular';
import { IPageRequest, ProductGroupsService } from '../@app-core/http';
import { LoadingService } from '../@app-core/loading.service';

@Component({
  selector: 'app-product-categories',
  templateUrl: './product-categories.page.html',
  styleUrls: ['./product-categories.page.scss'],
})

export class ProductCategoriesPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infinityScroll: IonInfiniteScroll;
  @ViewChild(IonContent) ionContent: IonContent;

  scrHeight: any;
  scrWidth: any;

  pageRequest: IPageRequest;
  data = [];
  permission: string;
  val = '';
  counter = 0;
  inputValue: string = '';
  isMaxData = false;
  checkSystem = false;
  isLoading = false;

  constructor(
    private router: Router,
    private productGroupService: ProductGroupsService,
    // private loading: LoadingService,
    public alertController: AlertController,

    private platform: Platform
  ) {
    this.reset();
    this.getScreenSize();
  }

  ngOnInit() {
    // this.loadingService.present();
    this.loadData();
    
    this.platform.backButton.subscribe(() => {
      if (this.router.url === '/main/product-categories'){
        console.log('222');
        this.presentAlert();
      }
      else {

        return;
      }
    }
    )
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'logout-alert',
      message: 'Do you want to exit product-category app?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            navigator['app'].exitApp();
          }
        },
        {
          text: 'No',
          handler: () => {
            return;
          }
        },

      ]
    });
    await alert.present();
  }
  ionViewWillEnter() {
    const tabs = document.querySelectorAll('ion-tab-bar');
    Object.keys(tabs).map((key) => {
      tabs[key].style.display = 'flex';
    });
  }

  getScreenSize(event?) {
    this.scrHeight = window.innerHeight;
    this.scrWidth = window.innerWidth;
  }

  goToUserInfo() {
    this.router.navigateByUrl("/account/user-info");
  }

  goToNoti() {
    this.router.navigateByUrl('notification');
  }

  gotoHome() {
    this.router.navigateByUrl('/main/product-categories');
  }

  onInput(event: any) {
    this.infinityScroll.disabled = false;
    this.inputValue = event.target.value;
    this.reset();
    this.scrollContent();
    this.counter++;
    this.loadData();
  }

  loadProductGroup() {
    this.productGroupService.getProductGroups(this.pageRequest).subscribe(data => {
      for (let item of data.product_groups) {
        // image not found
        if (item.thumb_image === null) {
          const d = {
            url: "https://i.imgur.com/dbpoag5.png"
          }
          item.thumb_image = d;
        }
        this.data.push(item);
      }

      this.isLoading = false;
      this.counter++;

      this.infinityScroll.complete();
      // this.loading.dismiss();
      this.pageRequest.page++;

      // check max data
      if (this.data.length >= data.meta.pagination.total_objects) {
        this.infinityScroll.disabled = true;
        this.isMaxData = true;
      }
    })
  }

  searchProductGroup() {
    const counterTemp = this.counter;
    this.productGroupService.searchProductGroup(this.pageRequest, this.inputValue, counterTemp).subscribe((data: any) => {
      if (counterTemp == this.counter) {
        for (let item of data.product_groups) {
          // image not found
          if (item.thumb_image === null) {
            const d = {
              url: "https://i.imgur.com/dbpoag5.png"
            }
            item.thumb_image = d;
          }
          this.data.push(item);
        }

        this.isLoading = false;
        this.counter++;

        this.infinityScroll.complete();
        // this.loading.dismiss();
        this.pageRequest.page++;

        // check max data
        if (this.data.length >= data.meta.pagination.total_objects) {
          this.infinityScroll.disabled = true;
          this.isMaxData = true;
        }
      }
    })
  }

  loadData() {
    if (!this.isMaxData) {
      if (this.inputValue !== '') {
        this.searchProductGroup();
      } else {
        this.loadProductGroup();
      }
    } else {
      this.infinityScroll.complete();
    }
  }

  goToDetail(item) {
    const data = {
      id: item.id,
      title: item.name
    }
    this.router.navigate(['main/product-categories/products'], {
      queryParams: {
        data: JSON.stringify(data)
      }
    });
  }

  reset() {
    this.pageRequest = {
      page: 1,
      per_page: 12,
      total_objects: 20
    }
    this.data = [];
    this.isLoading = true;
    this.isMaxData = false;
  }

  scrollContent() {
    this.ionContent.scrollToTop(500);
  }
}
