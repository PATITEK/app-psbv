import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular'
import { AccountService, AuthService } from 'src/app/@app-core/http';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.page.html',
  styleUrls: ['./user-info.page.scss'],
})
export class UserInfoPage implements OnInit {
 
  message: any;
  btn: boolean = false;
  notOn: boolean = true;
 
  hidden = true;
  
  constructor(
    private router: Router,
    public alertController: AlertController,
    private authService: AuthService,
    private accountService: AccountService, 
  
  ) {}

  ngOnInit() {
    this.accountService.getAccounts().subscribe((data: any)=>{
      this.message = data.user.fullname;
            
    })
    //  this.message = localStorage.getItem('fullname');
  }

  ionViewWillEnter() {
    this.hidden = true;
  }

  goToPasswordChanged(): void {
    this.router.navigateByUrl('account/password-changed')
  }

  clicked() {
    this.btn = !this.btn;
    this.notOn = !this.notOn;
  }

  clickOveride() {
    if (this.btn == true && this.notOn == true) {
      console.log("closed");
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

  goToSupport() {
    this.btn = true
    this.notOn = false;
    console.log(this.btn);
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
    this.btn = false;
    setTimeout(() => this.router.navigateByUrl('account/user-info/support'), 100);
    // this.router.navigateByUrl('account/user-info/support');
  }
}
