import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/@app-core/http';
import { AlertController } from '@ionic/angular';

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
  ) { }
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
    this.authService.login(this.profileForm.value).subscribe((data: any) => {
    this.showSpinner = false;
    console.log(data);
    localStorage.setItem('Authorization', data.token);
    localStorage.setItem('fullname', data.fullname);
    
    this.router.navigateByUrl('/main/product-categories');
    this.authService.sendData(this.message);
    })
  }
  resetPass() {
    this.router.navigateByUrl('/auth/forgot-password')
  }
  gotoSignUp(){
    this.router.navigateByUrl('/auth/sign-up');
  }
  
}




