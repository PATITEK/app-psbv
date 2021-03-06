import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/@app-core/http';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public type2 = 'password';
  public showPass2 = false;
  public showSpinner = false;
  message: string ;

  constructor(
    private router: Router,
    private authService: AuthService,
    public alertCtrl: AlertController,
    private toastController: ToastController,
  ) { }

  async presentSuccessToast() {
    const toast = await this.toastController.create({
      color: 'green',
      message: 'Login successed',
      duration: 2000
    });
    await toast.present();
  }

  async presentFailedToast() {
    const toast = await this.toastController.create({
      message: 'Email or Password invalid !',
      duration: 2000
    });
    await toast.present();
  }


  profileForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  ngOnInit() {
  }

  showPassword2() {
    this.showPass2 = !this.showPass2;
    if (this.showPass2) {
      this.type2 = 'text';
    }
    else {
      this.type2 = 'password';
    }
  }
  async presentAlert(text: string) {
    const alert = await this.alertCtrl.create({
      header: 'Warning',
      message: text,
      buttons: [{
        text:'Agree',
        role:'ok'
      }]
    });
    await alert.present();
  }
   async onSubmit() {
    this.showSpinner = true;
    if(this.profileForm.value.email === ''){
      this.showSpinner = false;
      this.presentAlert('Please enter your email');
    }else if(this.profileForm.value.password === ''){
      this.showSpinner = false;
      this.presentAlert('Please enter your password');
    }
    this.authService.login(this.profileForm.value).subscribe(
    (data: any) => {
    this.showSpinner = true;
    this.router.navigateByUrl('/main/product-categories');
    },
    (data:any) =>{
      if(data.error) {
         this.showSpinner = false;
         this.presentFailedToast();
        }
    }
    )
  }
  resetPass() {
    this.router.navigateByUrl('/auth/forgot-password');
  }
  gotoSignUp(){
    this.router.navigateByUrl('/auth/sign-up');
  }
  
}




