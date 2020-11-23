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
}
