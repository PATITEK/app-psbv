import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-manager',
  templateUrl: './auth-manager.page.html',
  styleUrls: ['./auth-manager.page.scss'],
})
export class AuthManagerPage implements OnInit {

  constructor(private router: Router,) { }

  ngOnInit() {
    setTimeout(() => {
      this.gotoLogin();
    }, 2000)
  }
  gotoLogin(){
    this.router.navigateByUrl('/auth/login');
  }
}
