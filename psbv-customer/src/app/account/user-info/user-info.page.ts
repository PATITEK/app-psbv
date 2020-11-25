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

  constructor(
    private router: Router
  ) {}

  ngOnInit() {

  }

  checkStandardPermission(): boolean {
    return this.permission === PERMISSION.STANDARD;
  }

  upgradePremium(): void {

  }

  goToPasswordChanged(): void {
    this.router.navigateByUrl('account/password-changed')
  }

}