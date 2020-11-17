import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators } from '@angular/forms';
import { PATTERN} from '../../@app-core/http/@http-config/pattern';

import { FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
 
  constructor( ) {
   
   }
   onSubmit(data){
     console.log(data);
   }
   inputEmail = new FormGroup({
    email: new FormControl('',[
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])
  },);
  

  sendcode() {
    


  }

  ngOnInit() {
   
  
  }

}
