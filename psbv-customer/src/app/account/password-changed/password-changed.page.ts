import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/@app-core/http';

@Component({
  selector: 'app-password-changed',
  templateUrl: './password-changed.page.html',
  styleUrls: ['./password-changed.page.scss'],
})
export class PasswordChangedPage implements OnInit {
  public type = 'password';
  public type2 = 'password';
  public type3 = 'password';

  public showPassCurrent = false;
  public showPassNew = false;
  public showPassNewAgain = false;
  formNewPass: FormGroup;

  error_messages = {
    'newpassword': [
      { type: 'required', message: '  Password is required.' },
      { type: 'minlength', message: 'Min password length is ' },
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
    }, {
      validators: this.password.bind(this)
    });
  }

  password(formGroup: FormGroup) {
    const np = formGroup.get('newpassword').value;
    const cp = formGroup.get('confirmpassword').value;
    if (np === cp)
      return ""
    else return { error: "Password not match" }
  }
  ngOnInit() {
    // if((this.formNewPass.get('currentpassword').hasError(error.type) && (this.formNewPass.get('currentpassword').dirty || this.formNewPass.get('currentpassword').touched))
  }
  showPasswordCurent() {
    this.showPassCurrent = !this.showPassCurrent;
    if (this.showPassCurrent) {
      this.type = 'text';
    }
    else {
      this.type = 'password';
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
    this.router.navigate(['/statusNoti']);
  }
}
