import { Component, OnInit } from '@angular/core';

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

  constructor() { }
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
  ngOnInit() {
  }

}
