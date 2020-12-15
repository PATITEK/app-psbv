import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService, AuthService } from 'src/app/@app-core/http';
import { IDataNoti, PageNotiService } from 'src/app/@modular/page-noti/page-noti.service';

@Component({
  selector: 'app-password-changed',
  templateUrl: './password-changed.page.html',
  styleUrls: ['./password-changed.page.scss'],
})
export class PasswordChangedPage implements OnInit {
  public type1 = 'password';
  public type2 = 'password';
  public type3 = 'password';

  public showPassCurrent = false;
  public showPassNew = false;
  public showPassNewAgain = false;
  formNewPass: FormGroup;

  error_messages = {
    'newpassword': [
      { type: 'required', message: '  Password is required.' },
      { type: 'minlength', message: 'Min password length is 8' },
      { type: 'maxlength', message: 'Max password length is 16' }
    ],
    'confirmpassword': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Min password length is 8' },
      { type: 'maxlength', message: 'Max password length is 16' }
    ],
    'currentpassword': [
      { type: 'required', message: 'Password is required.' },

    ],
  }

  constructor(
    public formBuilder: FormBuilder, private authService: AuthService, private router: Router,
    private accountService: AccountService,
    private pageNotiService: PageNotiService
  ) {
    this.formNewPass = this.formBuilder.group({

      newpassword: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(16)
      ])),
      currentpassword: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(16)
      ])),
      confirmpassword: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(16)
      ])),
    },
    {
      validators: this.password.bind(this)
    },
    // {
    //   validators: this.areEqual
    // }
   
)}
  areEqual(formGroup: FormGroup) {
    const  cp = formGroup.get('currentpassword').value;
    console.log(cp)
    const np = formGroup.get('newpassword').value;
    if ((cp === np) && (cp!== "") && (np!== ""))
      return { error: "New password must diffrence Old password " }
    else return ""
  }

  password(formGroup: FormGroup) {
    const np = formGroup.get('newpassword').value;
    const npc = formGroup.get('confirmpassword').value;

    if (np === npc)
      return ""
    else return { error: "Password not match" }
  }
  ngOnInit() {
    // if((this.formNewPass.get('currentpassword').hasError(error.type) && (this.formNewPass.get('currentpassword').dirty || this.formNewPass.get('currentpassword').touched))
  }
  showPasswordCurrent() {
    this.showPassCurrent = !this.showPassCurrent;
    if (this.showPassCurrent) {
      this.type1 = 'text';
    }
    else {
      this.type1 = 'password';
    }
  }
  showPasswordNew() {
    this.showPassNew = !this.showPassNew;
    if (this.showPassNew) {
      this.type2 = 'text';
    }
    else {
      this.type2 = 'password';
    }
  }
  showPasswordNewAgain() {
    this.showPassNewAgain = !this.showPassNewAgain;
    if (this.showPassNewAgain) {
      this.type3 = 'text';
    }
    else {
      this.type3 = 'password';
    }
  }
  onSubmit() {
    const datapasing: IDataNoti = {
      title: 'PASSWORD CHANGED!',
      description: 'Your password has been changed, Continue using app',
      routerLink: '/main/home'
    }
    var result_object = {
      "password": this.formNewPass.get('currentpassword').value,
      "new_password": this.formNewPass.get('confirmpassword').value
    }
    this.accountService.updatePassword(result_object).subscribe((data) => {
      this.pageNotiService.setdataStatusNoti(datapasing);
      this.router.navigate(['/statusNoti']);
    })
    
  }
  onCancel() {
    // this.formNewPass.setValue({
    //   currentpassword: '',
    //   newpassword:'',
    //   confirmpassword:''
    // })

  }
  
}
