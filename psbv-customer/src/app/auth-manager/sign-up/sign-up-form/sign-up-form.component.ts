import { IfStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss'],
})
export class SignUpFormComponent implements OnInit {
  private form: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) { }
  
  public type2 = 'password';
  public showPass2 = false;
  

  ngOnInit() {
    this.addForm();
  }


  addForm() {
    this.form = this.fb.group({
      name: [''],
      email: [''],
      password: [''],
      repassword: [''],
    })
  }

  signupForm(){
    if(this.form.value.password == this.form.value.repassword){
      console.log(this.form.value)
    }
    else console.log("Confirm your password");
  }

  showPassword2(){
    this.showPass2 = !this.showPass2;
    if(this.showPass2){
      this.type2 = 'text';
    }
    else {
      this.type2 ='password';
    }
  }
}
