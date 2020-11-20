import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { stringify } from 'querystring';
import { AuthService } from 'src/app/@app-core/http';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  data;
  inputCode = new FormGroup(
    {
      code1: new FormControl('', [
        Validators.required,
        Validators.maxLength(1),
      ]),
      code2: new FormControl('', [
        Validators.required,
        Validators.maxLength(1),
      ]),
      code3: new FormControl('', [
        Validators.required,
        Validators.maxLength(1),
      ]),
      code4: new FormControl('', [
        Validators.required,
        Validators.maxLength(1),
      ]),
      code5: new FormControl('', [
        Validators.required,
        Validators.maxLength(1),
      ]),
      code6: new FormControl('', [
        Validators.required,
        Validators.maxLength(1),
      ])
    },
  );

  constructor(private router: Router, private authService: AuthService
  ) { }
  keytab(event) {
    // let allInputs = document.getElementsByTagName('input');
    // let index = 0;
    // for(i=0;i<allInputs.length;i++) {
    // allInputs[i].onkeydown =trackInputandChangeFocus;
    // }
    
    // function trackInputandChangeFocus() {
    // let allInputsArr = Array.from(allInputs); 
    // let presentInput = allInputsArr.indexOf(this)
    // if(this.value.length == parseInt(this.getAttribute('maxlength'))) {
    //       let next;
    //       if(presentInput != 2) next = allInputsArr[presentInput+1]
    //       else next = allInputsArr[0]
    //       next.focus();
    //     }
    // }
    let nextInput = event.srcElement.nextElementSibling;

    if (nextInput == null)
      return;
    else
      nextInput.focus();
  }
  resendCode(){
    console.log("hihi");
    
  }
  onSubmit() {
      var  c1 = this.inputCode.get('code1').value;
      var c2 = this.inputCode.get('code2').value;
      var c3 = this.inputCode.get('code3').value;
      var c4 = this.inputCode.get('code4').value;
      var c5 = this.inputCode.get('code5').value;
      var c6 = this.inputCode.get('code6').value;
      var inputstring = `${c1}${c2}${c3}${c4}${c5}${c6}`;
      var tem_object = {
        "email": this.data.email,
        "code": inputstring
      }
      this.authService.checkcodePassword(tem_object).subscribe((data:any) => {
        localStorage.setItem('Authorization', data.token);
        this.router.navigateByUrl("/auth/new-password");
    })
  }
  backLogin() {
    this.router.navigateByUrl('/login');
  }
  ngOnInit() {
    this.authService.getEmailForgot.subscribe((data: any) => {
      this.data = data;
    })
  }



}
