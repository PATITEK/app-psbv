import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PERMISSION } from 'src/app/home/product-info/product-info.page';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.page.html',
  styleUrls: ['./user-info.page.scss'],
})
export class UserInfoPage implements OnInit {
  permission: PERMISSION = PERMISSION.STANDARD;

  btn: boolean = false;
  constructor(
    private router: Router
  ) {}

  ngOnInit() {

  }

  checkStandardPermission(): boolean {
    return this.permission === PERMISSION.STANDARD;
  }

  upgradePremium(): void {
    this.router.navigateByUrl('account/user-info/upgrade');
    console.log("checked");
  }

  goToPasswordChanged(): void {
    this.router.navigateByUrl('account/password-changed')
  }
  notOn:boolean = true;
  clicked(){
    console.log("clicked");
    this.btn = true;
    this.notOn = false;
  }
  setFalse(){
    if(this.btn == true && this.notOn == true){
      this.btn = false;
    }
    else this.notOn = true;
    
    console.log("checked");
  }
}
