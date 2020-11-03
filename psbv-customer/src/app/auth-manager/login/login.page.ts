import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private router: Router) { }
  profileForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  ngOnInit() {
  }
  resetPass(){
    this.router.navigateByUrl('/reset-password');
  }
}
