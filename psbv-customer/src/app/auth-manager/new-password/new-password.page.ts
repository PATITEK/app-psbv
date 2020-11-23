import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl,  FormGroup,  Validators } from '@angular/forms';
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
  formNewPass: FormGroup;

  error_messages = {
    'password': [
      { type: 'required', message: 'password is required.' },
      { type: 'minlength', message: 'min password length is ' },
      { type: 'maxlength', message: 'max password length is 16' }
    ],
    'confirmpassword': [
      { type: 'required', message: 'password is required.' },
      { type: 'minlength', message:'min password length is 8' },
      { type: 'maxlength', message: 'max password length is 16' }
    ],
  }

  constructor(
    public formBuilder: FormBuilder, private authService: AuthService,private router: Router,
    private pageNotiService: PageNotiService
  )
   {
    this.formNewPass = this.formBuilder.group({
     
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
      description: 'Your password has been changed, Continue using app',
      routerLink: '/auth/login'
    }
    var result_object = {
      "password": this.formNewPass.get('confirmpassword').value
      
    }
  
    this.authService.resetPassword(result_object).subscribe((data:any) => {
      console.log(data)
      this.pageNotiService.setdataStatusNoti(datapasing);
      //  this.router.navigate(['/statusNoti']);
  });

  }
  ngOnInit() {
  }
 

}
