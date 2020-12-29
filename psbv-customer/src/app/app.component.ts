import { Component } from '@angular/core';

import { AlertController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { StorageService } from './@app-core/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private router: Router,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar, 
    private storageService: StorageService,
    public alertController: AlertController,

  ) {
    this.storageService.setInfoAccount();
    this.initializeApp();
  }
  ngOnInit() {
    this.platform.backButton.subscribe(() => {
      if ((this.router.url === '/main/home')
            || (this.router.url === '/main/product-categories')
            || (this.router.url === '/main/shopping-cart')
            || (this.router.url === '/main/order-status')
            ) 
            {
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
    message: 'Do you want to exit app?',
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
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
