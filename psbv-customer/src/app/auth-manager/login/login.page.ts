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
  public type2 = 'password';
  public showPass2 = false;
  
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
 
  showPassword2(){
    this.showPass2 = !this.showPass2;
    if(this.showPass2){
      this.type2 = 'text';
    }
    else {
      this.type2 ='password';
    }
}
  onSubmit(){
    this.authService.login(this.profileForm.value).subscribe((data: any) => {
    localStorage.setItem('Authorization', data.token);
    this.router.navigateByUrl('/main/product-categories');

    })
  }
  test() {
  }
  resetPass(){
    this.router.navigateByUrl('/auth/forgot-password')
  }
    
  
}




