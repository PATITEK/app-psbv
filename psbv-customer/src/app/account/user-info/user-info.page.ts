import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PERMISSION } from 'src/app/home/product-info/product-info.page';
import { AlertController } from '@ionic/angular'

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.page.html',
  styleUrls: ['./user-info.page.scss'],
})
export class UserInfoPage implements OnInit {
  permission: PERMISSION = PERMISSION.STANDARD;
  btn: boolean = false;
  notOn: boolean = true;

  constructor(
    private router: Router,
    public alertController: AlertController
  ) { }

  ngOnInit() {

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
      buttons: ['yes', 'no']
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
