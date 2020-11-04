import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { IDataNoti, PageNotiService } from 'src/app/@modular/page-noti/page-noti.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private router: Router,
    private pageNotiService: PageNotiService,
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
  login(){
    this.router.navigateByUrl('/main/home');
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
