import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular'
import { AuthService } from 'src/app/@app-core/http';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.page.html',
  styleUrls: ['./user-info.page.scss'],
})
export class UserInfoPage implements OnInit {
  message: string;
  hidden = true;
  
  constructor(
    private router: Router,
    public alertController: AlertController,
    private authService: AuthService,
  ) {}

  ngOnInit() {
     this.message = localStorage.getItem('fullname');
  }

  ionViewWillEnter() {
    this.hidden = true;
  }

  goToPasswordChanged(): void {
    this.router.navigateByUrl('account/password-changed')
  }

  clicked(event) {
    event.stopPropagation();
    this.hidden = false;
  }

  setFalse(event) {
    this.hidden = true;
  }

  gotoChangeName(){
    this.router.navigateByUrl('account/change-name');
  }
  gotoPasswordChange() {
    this.router.navigateByUrl('account/password-changed');
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
}
