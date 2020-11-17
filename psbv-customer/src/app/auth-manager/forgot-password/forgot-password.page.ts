import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators } from '@angular/forms';
import { PATTERN} from '../../@app-core/http/@http-config/pattern';

import { FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/@app-core/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
 
  constructor(private router: Router,private authService: AuthService) {
   
   }
  
   inputEmail = new FormGroup({
    email: new FormControl('',[
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])
  },);
  onSubmit(){
    console.log("hihi");
    console.log(this.inputEmail.value);
    this.authService.forgotPassword(this.inputEmail.value).subscribe((data:any) => {
      this.router.navigateByUrl("/auth/reset-password");
    })
  }


  sendcode() {
    


  }

  ngOnInit() {
   
  
  }

}
