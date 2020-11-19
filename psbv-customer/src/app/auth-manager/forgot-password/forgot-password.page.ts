import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/@app-core/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
 
})
export class ForgotPasswordPage implements OnInit {

  message: string ;

  constructor(private router: Router,private authService: AuthService) {
   }

   inputEmail = new FormGroup({
    email: new FormControl('',[
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])
  },);
  onSubmit(){
   this.message = this.inputEmail.value;
    this.authService.forgotPassword(this.inputEmail.value).subscribe((data:any) => {
        this.router.navigateByUrl("/auth/reset-password");
        this.authService.setEmailForgot(this.message);
    });
  }
  ngOnInit() {

  }
 

}
