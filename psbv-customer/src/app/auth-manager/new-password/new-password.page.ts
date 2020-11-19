import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/@app-core/http';


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
  formNewPass = new FormGroup({
    password: new FormControl('',[])
  })
 

  constructor(private authService: AuthService,private router: Router ) { }
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
  onSubmit(){

    console.log(this.formNewPass.value);
    this.authService.resetPassword(this.formNewPass.value).subscribe((data:any) => {
      console.log(data);
      // this.router.navigateByUrl("/statusNoti");
     
  });

  }
  ngOnInit() {
  
  }
 

}
