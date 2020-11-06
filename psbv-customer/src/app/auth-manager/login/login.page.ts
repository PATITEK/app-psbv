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

// import { Component, OnInit } from '@angular/core';
// import { FormGroup, FormControl } from '@angular/forms';
// import { Router } from '@angular/router';
// import { IDataNoti, PageNotiService } from 'src/app/@modular/page-noti/page-noti.service';
// import { AuthenticationService } from '../authentication.service';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.page.html',
//   styleUrls: ['./login.page.scss'],
// })
// export class LoginPage implements OnInit {
//   public email = '';
//   public password = ''; 
//   constructor(
//     private router: Router,
//     private pageNotiService: PageNotiService,  private authenticationService: AuthenticationService,
//     ) { }
//   profileForm = new FormGroup({
//     email: new FormControl(''),
//     password: new FormControl(''),
//   });
//   ngOnInit() {
//   }
 
//   login(){
//     this.authenticationService.login(this.email, this.password).subscribe(
//       (data) => {
//         if (data != null && data.email) {
//           localStorage.setItem('email', data.email);
//           localStorage.setItem('password', data.password);
//           console.log('login Success');
//           this.router.navigateByUrl('/auth/reset-password');
//         } else {
//           return window.alert('login fail')
//         }
//       },
//       (err) => console.error(err)
//     );
//   };
//   }
   // resetPass(){
  //   this.router.navigateByUrl('auth/reset-password');
  // }
  // resetPass(){
  //   const data: IDataNoti = {
  //     title: 'PASSWORD CHANGED !',
  //     description: 'Dear user your password has been changeed, Continue to start using app',
  //     routerLink: '/auth'
  //   }
  //   this.pageNotiService.setdataStatusNoti(data);
  //   this.router.navigate(['/statusNoti']);
  // }



