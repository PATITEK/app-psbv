import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }
  showPasswordCurent(){
    this.showPassCurrent = !this.showPassCurrent;
    if(this.showPassCurrent){
      this.type = 'text';
    }
    else {
      this.type ='password';
    }
  }
  showPasswordNew(){
    this.showPassNew = !this.showPassNew;
    if(this.showPassNew){
      this.type2 = 'text';
    }
    else {
      this.type2 ='password';
    }
  }
  showPasswordNewAgain(){
    this.showPassNewAgain = !this.showPassNewAgain;
    if(this.showPassNewAgain){
      this.type3 = 'text';
    }
    else {
      this.type3 ='password';
    }
  }

  openModal() {
    
  }
}
