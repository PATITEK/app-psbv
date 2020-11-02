import { Component, OnInit } from '@angular/core';
import {Input} from '@angular/core';
import {  StoreServiceService } from '../store-service.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {

  @Input() title = "PASSWORD CHANGED !";
  @Input() des  = "Dear user your password has been changeed, Continue to start using app";

  constructor(private storeService: StoreServiceService) { }

  ngOnInit() {
  }
  

  getInfo(){
      this.storeService.dataChangePassword((data: any)=> {
      this.title = data
    })
  }
  // setInfo() {
  //   const data = {
  //     title: 'sdasd',
  //     des: "dsadas",
  //     mavigate: 'dsadsa'
  //   }
  //   this.storeService.setInfoAccount(data)
  // }    
    


}
