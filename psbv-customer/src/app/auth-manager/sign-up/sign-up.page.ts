import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/@app-core/http';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
 formSignup: FormGroup;

  error_messages = {
    'password': [
      { type: 'required', message: 'password is required.' },
      { type: 'minlength', message: 'min password length is 8 ' },
      { type: 'maxlength', message: 'max password length is 16' }
    ],
    'confirmpassword': [
      { type: 'required', message: 'password is required.' },
      { type: 'minlength', message:'min password length is 8' },
      { type: 'maxlength', message: 'max password length is 16' }
    ],
    'name': [
        { type: 'required', message: 'name is required.' },
    ],
    'email': [
      { type: 'required', message: 'email is required.' },
      { type: 'email', message: 'email invalid.' },

  ],
  }

  constructor(private router: Router, public formBuilder: FormBuilder,  private authService: AuthService
    ) { 
        this.formSignup = this.formBuilder.group(
          {
          password: new FormControl('', Validators.compose([
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(16)
          ])),
          confirmpassword: new FormControl('', Validators.compose([
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(16)
          ])),
          name: new FormControl('', Validators.compose([
            Validators.required
          ])),
          email: new FormControl('', Validators.compose([
            Validators.required,
            Validators.email
          ])),
        }, { 
          validators: this.password.bind(this)
        });
    }
    
  password(formGroup: FormGroup) {
    const np = formGroup.get('password').value;
    const cp = formGroup.get('confirmpassword').value;
    if(np === cp)
    return ""
    else return {error: "Password not match"}
  }
    public type2 = 'password';
    public showPass2 = false;
    ngOnInit() {
    }
    onSignUp(){
      var tem_obj = {
        "email": this.formSignup.get('email').value,
        "password": this.formSignup.get('password').value,
        "fullname": this.formSignup.get('name').value
      }
     
      this.authService.signup(tem_obj).subscribe((data:any) => {
        console.log(data);
        this.router.navigateByUrl("auth/login");
      })
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
  gotoLogin(){
    console.log('check');
    this.router.navigate(['/auth/login']);
  }
}
