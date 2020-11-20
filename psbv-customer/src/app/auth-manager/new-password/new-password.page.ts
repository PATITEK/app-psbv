import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/@app-core/http';
import { IDataNoti, PageNotiService } from 'src/app/@modular/page-noti/page-noti.service';


@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.page.html',
  styleUrls: ['./new-password.page.scss'],
  

})
export class NewPasswordPage implements OnInit {
  public type = 'password';
  public type2 = 'password';

  public showPass = false;
  public showPassConf = false;
  formNewPass = new FormGroup({
    password: new FormControl('')
  })

  constructor(private authService: AuthService,private router: Router,
     private pageNotiService: PageNotiService ) { }
  showPassword(){
    this.showPass = !this.showPass;
    if(this.showPass){
      this.type = 'text';
    }
    else {
      this.type ='password';
    }
  }
  showPasswordConf(){
    this.showPassConf = !this.showPassConf;
    if(this.showPassConf){
      this.type2 = 'text';
    }
    else {
      this.type2 ='password';
    }
  }
  onSubmit(){
    const datapasing: IDataNoti = {
      title: 'PASSWORD CHANGED!',
      description: 'Dear user your password has been changed, Continue to start using app',
      routerLink: '/auth/login'
    }
    var result = this.formNewPass.value;
    this.authService.resetPassword(this.formNewPass.value).subscribe((data:any) => {
      this.pageNotiService.setdataStatusNoti(datapasing);
       this.router.navigate(['/statusNoti']);
  });

  }
  ngOnInit() {
  }
 

}
