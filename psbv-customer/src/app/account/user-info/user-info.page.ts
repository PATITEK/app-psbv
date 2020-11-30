import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PERMISSION } from 'src/app/home/product-info/product-info.page';
import { AlertController } from '@ionic/angular'
import { AuthService } from 'src/app/@app-core/http';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.page.html',
  styleUrls: ['./user-info.page.scss'],
})
export class UserInfoPage implements OnInit {
  permission: PERMISSION = PERMISSION.STANDARD;
  message: string;
  btn: boolean = false;
  notOn: boolean = true;

  constructor(
    private router: Router,
    public alertController: AlertController,
    private authService: AuthService
  ) {}

  ngOnInit() {
     this.message = localStorage.getItem('fullname');
  }

  checkStandardPermission(): boolean {
    return this.permission == PERMISSION.STANDARD;
  }

  upgradePremium(): void {
    this.router.navigateByUrl('account/user-info/upgrade');
    console.log("checked");
  }

  goToPasswordChanged(): void {
    this.router.navigateByUrl('account/password-changed')
  }

  clicked() {
    console.log("clicked");
    this.btn = true;
    this.notOn = false;
  }

  setFalse() {
    if (this.btn == true && this.notOn == true) {
      this.btn = false;
    }
    else this.notOn = true;
  }

  gotoChangeName(){
    this.router.navigateByUrl('account/change-name');
  }
  gotoPasswordChange() {
    this.router.navigateByUrl('account/password-changed');
  }
  

  gotoUpgrade() {
    this.router.navigateByUrl('account/user-info/upgrade');
  }

  goToSupport() {
    this.router.navigateByUrl('account/user-info/support');
  }

  goToAbout() {
    
  }

  // alert
  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'logout-alert',
      message: 'Do you want to log out account?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
           this.authService.logout();
          }
        },
        {
          text: 'No',
          handler: (  ) => {
            return;
          }
        },

      ]
    });
    await alert.present();
  }

  showAlert() {
    this.presentAlert();
  }
  gotoSupport(){
    this.router.navigateByUrl('account/support');
  }
}
