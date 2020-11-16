import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/@app-core/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public type = 'password';
  public showPass = false;
  
  constructor(
    private router: Router,
    private authService: AuthService
    ) { }
  profileForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  ngOnInit() {
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
  login(){
    this.authService.login(this.profileForm.value).subscribe((data: any) => {
    this.router.navigateByUrl('/main/product-categories');
    })
  }
  resetPass(){
    console.log('hihi');
      this.router.navigateByUrl('/auth/forgot-password')
  }
    
  
}




