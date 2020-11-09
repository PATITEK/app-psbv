import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/@app-core/http';
import { IDataNoti, PageNotiService } from 'src/app/@modular/page-noti/page-noti.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public type = 'password';
  public showPass = false;
  constructor(
    private router: Router,
    private pageNotiService: PageNotiService,
    private authService: AuthService
    ) { }
  profileForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  ngOnInit() {
  }
  // resetPass(){
  //   this.router.navigateByUrl('auth/reset-password');
  // }
  showPassword(){
       this.showPass = !this.showPass;
       if(this.showPass){
         this.type = 'text';
       }
       else {
         this.type ='password';
       }
     }
  login(){
    console.log();
    
    this.authService.login(this.profileForm.value).subscribe((data: any) => {
      console.log(data, 'data');
    this.router.navigateByUrl('/main/home');
    })
  }
  resetPass(){
    const data: IDataNoti = {
      title: 'PASSWORD CHANGED !',
      description: 'Dear user your password has been changeed, Continue to start using app',
      routerLink: '/auth'
    }
    this.pageNotiService.setdataStatusNoti(data);
    this.router.navigate(['/statusNoti']);
  } 
}




